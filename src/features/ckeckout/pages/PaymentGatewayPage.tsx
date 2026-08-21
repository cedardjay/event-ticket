import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate, Link } from "react-router-dom"
import { IwomipayModal } from "../components/IwomipayModal"
import type { Event } from "../../event/components/EventCard"
import type { CheckoutFormData } from "../types"
import ApiService from "../../../services/ApiService"

type LocationState = {
  event?: Event
  quantity?: number
  formData?: CheckoutFormData
}

// Confirmed from real backend responses: "PENDING" (initiate) and "SUCCESS" (status check).
// Failure/cancel/expiry values are NOT confirmed yet — placeholders below, update once
// you've seen a real failed-payment payload.
type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED" | "CANCELLED" | "EXPIRED"
type OrderStatus = "PENDING" | "PAID" | "FAILED" | "CANCELLED" | "EXPIRED"

interface PaymentResponse {
  id: string
  orderId: string
  provider: string
  externalReference: string | null
  transactionId: string | null
  amount: string
  currency: string
  phoneNumber: string
  status: PaymentStatus
  providerResponse: unknown
  paidAt: string | null
  createdAt: string
  updatedAt: string
  paymentMethod: string
}

// Shape returned by the INITIATE endpoint: order object with `payment` nested inside.
interface OrderWithPayment {
  id: string
  reference: string
  status: OrderStatus
  payment: PaymentResponse
  [key: string]: unknown
}

// Shape returned by the STATUS CHECK endpoint: payment and order as separate siblings.
interface OrderSummary {
  id: string
  reference: string
  status: OrderStatus
  [key: string]: unknown
}

interface InitiatePaymentApiResponse {
  success: boolean
  message: string
  data: OrderWithPayment
}

interface GetPaymentStatusApiResponse {
  success: boolean
  message: string
  data: {
    payment: PaymentResponse
    order: OrderSummary
  }
}

// Shape handed to the /order/:id route via navigate() state on a successful payment.
// This was previously referenced (`as OrderConfirmationState`) without being declared —
// that's a hard TS error (Cannot find name 'OrderConfirmationState'), not a warning.
// It must be exported since OrderConfirmationPage imports it from this file.
export interface OrderConfirmationState {
  order: OrderSummary
  payment: PaymentResponse
  event: Event
}

type Stage = "idle" | "initiating" | "awaiting_confirmation" | "success" | "failed" | "timeout"

const POLL_INTERVAL_MS = 4000
const MAX_POLL_ATTEMPTS = 30 // ~2 minutes at 4s intervals

function formatXAF(amount: number) {
  return `XAF ${amount.toLocaleString()}`
}

export function PaymentGatewayPage() {
  const location = useLocation()
  const navigate = useNavigate()

  const [modalOpen, setModalOpen] = useState(false)
  const [stage, setStage] = useState<Stage>("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [order, setOrder] = useState<OrderWithPayment | null>(null)

  const pollTimer = useRef<ReturnType<typeof setInterval> | null>(null)
  const pollAttempts = useRef(0)

  const state = (location.state as LocationState) ?? {}
  const { event, quantity, formData } = state

  useEffect(() => {
    return () => {
      if (pollTimer.current) clearInterval(pollTimer.current)
    }
  }, [])

  if (!event || !quantity || !formData) {
    return (
      <div className="w-full max-w-xl mx-auto px-margin-mobile md:px-margin-desktop py-xl text-center">
        <p className="font-body-lg text-on-surface-variant mb-md">
          We couldn't find your order details for this session.
        </p>
        <Link to="/events" className="font-label-lg text-primary hover:underline">
          Back to Events
        </Link>
      </div>
    )
  }

  const safeEvent: Event = event
  const safeQuantity: number = quantity
  const safeFormData: CheckoutFormData = formData

  const total = event.price * quantity

  function stopPolling() {
    if (pollTimer.current) {
      clearInterval(pollTimer.current)
      pollTimer.current = null
    }
    pollAttempts.current = 0
  }

  function startPolling(paymentId: string, orderId: string) {
    pollAttempts.current = 0
    pollTimer.current = setInterval(async () => {
      pollAttempts.current += 1

      if (pollAttempts.current > MAX_POLL_ATTEMPTS) {
        stopPolling()
        setStage("timeout")
        return
      }

      try {
        const res: GetPaymentStatusApiResponse = await ApiService.getPaymentStatus(paymentId)
        const paymentStatus = res.data.payment.status

        if (paymentStatus === "SUCCESS") {
          stopPolling()
          setStage("success")
          navigate(`/order/${orderId}`, {
            state: {
              order: res.data.order,
              payment: res.data.payment,
              event: safeEvent,
            } as OrderConfirmationState,
          })
        } else if (
          paymentStatus === "FAILED" ||
          paymentStatus === "CANCELLED" ||
          paymentStatus === "EXPIRED"
        ) {
          // NOTE: these three failure values are unconfirmed placeholders — swap in
          // whatever your backend actually sends for a declined/expired payment.
          stopPolling()
          setStage("failed")
          setErrorMessage(res.message || "The payment was not completed. You can try again below.")
        }
        // "PENDING" -> keep polling, no state change needed
      } catch (err) {
        // A single failed poll shouldn't kill the loop — network blips happen.
        // MAX_POLL_ATTEMPTS still catches it eventually if it never recovers.
        console.error("Payment status poll failed:", err)
      }
    }, POLL_INTERVAL_MS)
  }

  async function handleConfirmPayment(accountNumber: string) {
    setErrorMessage(null)
    setStage("initiating")

    try {
      // TODO: confirm these field names against your actual backend contract
      // and CheckoutFormData shape.

      const payload = {
        eventId: safeEvent.id,
        quantity: safeQuantity,
        fullName: safeFormData.fullName,
        email: safeFormData.email,
        phoneNumber: accountNumber,
      }

      const res: InitiatePaymentApiResponse = await ApiService.initiatePayment(payload)

      if (!res.success) {
        throw new Error(res.message || "Failed to initiate payment.")
      }

      setOrder(res.data)
      setModalOpen(false)
      setStage("awaiting_confirmation")
      startPolling(res.data.payment.id, res.data.id)
    } catch (err) {
      setStage("failed")
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong initiating the payment."
      )
    }
  }

  function handleRetry() {
    setErrorMessage(null)
    setStage("idle")
    setOrder(null)
  }

  if (stage === "initiating" || stage === "awaiting_confirmation") {
    return (
      <div className="w-full max-w-xl mx-auto px-margin-mobile md:px-margin-desktop py-xl flex flex-col items-center text-center gap-md">
        <div className="w-16 h-16 rounded-full border-4 border-outline-variant border-t-primary animate-spin" />
        <h1 className="font-headline-md text-headline-md text-on-surface">Processing your payment</h1>
        {stage === "awaiting_confirmation" && order && (
          <p className="font-body-md text-on-surface-variant max-w-sm">
            Check your phone for a payment prompt on{" "}
            <span className="text-on-surface font-label-lg">{order.payment.phoneNumber}</span> and confirm
            to complete the payment.
          </p>
        )}
        <p className="font-body-md text-on-surface-variant">
          Amount: <span className="text-on-surface font-label-lg">{formatXAF(total)}</span>
        </p>
      </div>
    )
  }

  if (stage === "failed") {
    return (
      <div className="w-full max-w-xl mx-auto px-margin-mobile md:px-margin-desktop py-xl flex flex-col items-center text-center gap-md">
        <span className="material-symbols-outlined text-error text-5xl">error</span>
        <h1 className="font-headline-md text-headline-md text-on-surface">Payment failed</h1>
        <p className="font-body-md text-on-surface-variant max-w-sm">{errorMessage}</p>
        <button
          onClick={handleRetry}
          className="font-label-lg text-white bg-primary px-xl py-3 rounded-xl hover:bg-primary/90 transition-colors"
        >
          Try again
        </button>
      </div>
    )
  }

  if (stage === "timeout") {
    return (
      <div className="w-full max-w-xl mx-auto px-margin-mobile md:px-margin-desktop py-xl flex flex-col items-center text-center gap-md">
        <span className="material-symbols-outlined text-secondary text-5xl">schedule</span>
        <h1 className="font-headline-md text-headline-md text-on-surface">Still waiting on confirmation</h1>
        <p className="font-body-md text-on-surface-variant max-w-sm">
          This is taking longer than usual. If you already confirmed on your phone, your ticket may still
          be on its way — otherwise, try again below.
        </p>
        <div className="flex gap-sm">
          {order && (
            <button
              onClick={() => {
                setStage("awaiting_confirmation")
                startPolling(order.payment.id, order.id)
              }}
              className="font-label-lg text-primary border border-outline-variant px-lg py-3 rounded-xl hover:border-primary transition-colors"
            >
              Check again
            </button>
          )}
          <button
            onClick={handleRetry}
            className="font-label-lg text-white bg-primary px-xl py-3 rounded-xl hover:bg-primary/90 transition-colors"
          >
            Start over
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-xl mx-auto px-margin-mobile md:px-margin-desktop py-lg flex flex-col items-center text-center gap-md">
      <div>
        <h1 className="font-headline-md text-headline-md text-on-surface">
          Ticket Payment for <span className="text-primary">{event.title}</span>
        </h1>
        <p className="font-label-lg text-secondary mt-sm">
          Choose a payment portal to complete payment for your ticket(s)
        </p>
      </div>

      <p className="font-body-md text-on-surface-variant">
        Amount to pay: <span className="text-on-surface font-label-lg">{formatXAF(total)}</span>
      </p>

      <button
        onClick={() => setModalOpen(true)}
        className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:border-primary hover:shadow-lg transition-all"
      >
        <div className="bg-gradient-to-br from-primary to-primary-container p-lg flex flex-col items-center gap-sm">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
            <span className="font-headline-md text-headline-md text-primary">IW</span>
          </div>
          <p className="font-headline-md text-headline-md text-white">IWOMIPAY</p>

          <div className="flex items-center gap-sm mt-xs">
            <span className="px-3 py-1 rounded-md bg-white/90 text-[#FF6600] font-label-sm">Orange Money</span>
            <span className="px-3 py-1 rounded-md bg-white/90 text-[#FFCC00] font-label-sm">MTN MoMo</span>
          </div>
        </div>

        <div className="p-md flex items-center justify-center gap-xs">
          <span className="font-label-lg text-on-surface">Pay With IWOMIPAY</span>
          <span className="material-symbols-outlined text-on-surface-variant">arrow_forward</span>
        </div>
      </button>

      <button
        onClick={() => navigate(-1)}
        className="mt-md flex items-center gap-xs font-label-lg text-primary hover:underline"
      >
        <span className="material-symbols-outlined text-base">arrow_back</span>
        Back
      </button>

      <IwomipayModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmitPayment={handleConfirmPayment}
        event={event}
        formData={formData}
        total={total}
        isProcessing={false}
      />
    </div>
  )
}
