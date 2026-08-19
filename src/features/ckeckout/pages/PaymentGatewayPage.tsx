import { useState } from "react"
import { useLocation, useNavigate, useParams, Link } from "react-router-dom"
import { IwomipayModal } from "../components/IwomipayModal"
import type { EventDetails } from "../../event/types"
import type { CheckoutFormData } from "../types"

type LocationState = {
  event?: EventDetails
  quantities?: Record<string, number>
  formData?: CheckoutFormData
}

function formatXAF(amount: number) {
  return `XAF ${amount.toLocaleString()}`
}

export function PaymentGatewayPage() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const state = (location.state as LocationState) ?? {}
  const { event, quantities, formData } = state

  if (!event || !quantities || !formData) {
    return (
      <div className="w-full max-w-xl mx-auto px-margin-mobile md:px-margin-desktop py-xl text-center">
        <p className="font-body-lg text-on-surface-variant mb-md">
          We couldn't find your order details for this session.
        </p>
        <Link to="/" className="font-label-lg text-primary hover:underline">
          Back to Discover
        </Link>
      </div>
    )
  }

  const total = event.ticketTypes.reduce((sum, t) => sum + t.price * (quantities[t.id] ?? 0), 0)

  function handleSelectMethod(_method: "mtn" | "orange") {
    setIsProcessing(true)
    // TODO: call IWOMIPAY's collect/checkout-init endpoint here with the chosen method.
    // IWOMIPAY returns a redirect URL (or a USSD prompt confirmation) to complete payment.
    // On success, IWOMIPAY notifies you via webhook — verify status,
    // then send the user to the ticket confirmation page.
    setTimeout(() => {
      setIsProcessing(false)
      setModalOpen(false)
      navigate(`/ticket/${id}`, { state: { event, quantities, formData } })
    }, 1500)
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

      {/* Gateway card */}
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
        onSelectMethod={handleSelectMethod}
        event={event}
        formData={formData}
        total={total}
        isProcessing={isProcessing}
      />
    </div>
  )
}
