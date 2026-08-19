import { useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { OrderSummary } from "../components/OrderSummary"
import { CheckoutForm } from "../components/CheckoutForm"
import { PaymentModal } from "../components/PaymentModal"
import type { CheckoutFormData } from "../types"
import type { EventDetails } from "../../event/types"

// Replace with a real fetch from your events API, keyed by useParams().id
const mockEvent: EventDetails = {
  id: "1",
  title: "Cameroon Tech Summit",
  organizationName: "IWOMI Technologies",
  description:
    "Cameroon Tech Summit is a premier technology and innovation event bringing together developers, entrepreneurs, startups, investors, tech enthusiasts, and industry leaders from across Cameroon and beyond. The summit features inspiring talks, practical workshops, networking opportunities, product demonstrations, and discussions on the future of technology in Africa.",
  image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA379-pq3mQ9BQfxUkxpVAVuf-VCkbyhlYEIvD3lRc1ZiYRw6t2lbd_orSccyQMpX_5BPvAZUG7DMArAhptBTrNd5w4pxZz7G9k50juVvLCIggBY4_tyAgs5ICGx23678x_tqrAfnozSysLGkp1BV3WYO5kFicp8YbRYDIIqvc-U8KPyzBis2GIT4TEUBEJBHAKFkS1jidXA8caCjw_AO7oOUB0vTFjTGXbmlG8d0TpQDAHT5WdDKKt",
  startDate: "2026-10-15T19:00:00",
  endDate: "2026-10-16T02:00:00",
  venue: "Palais des Congrès de Yaoundé",
  ticketTypes: [
    {
      id: "standard",
      name: "Standard",
      price: 15000,
      available: 240,
    },
    {
      id: "vip",
      name: "VIP",
      price: 35000,
      available: 8,
    },
    {
      id: "vvip",
      name: "VVIP",
      price: 75000,
      available: 2,
    },
  ],
};


export function CheckoutPage() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const event = mockEvent // TODO: fetch by id
  const quantities: Record<string, number> = (location.state as { quantities?: Record<string, number> })?.quantities ?? {}

  const [formData, setFormData] = useState<CheckoutFormData>({ fullName: "", phone: "", email: "" })
  const [paymentOpen, setPaymentOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const total = event.ticketTypes.reduce((sum, t) => sum + t.price * (quantities[t.id] ?? 0), 0)
  const isFormValid = formData.fullName.trim() && formData.phone.trim() && formData.email.trim()

  function handleConfirmPayment() {
    setIsProcessing(true)
    // TODO: call IWOMIPAY's "collect" / checkout-init endpoint here.
    // IWOMIPAY returns a redirect URL (or opens its own hosted payment page/widget)
    // where the user actually picks Orange Money / MTN MoMo and completes payment.
    // On success, IWOMIPAY calls your webhook/status endpoint — poll or listen for that,
    // then navigate to the ticket page once payment is confirmed.
    setTimeout(() => {
      setIsProcessing(false)
      setPaymentOpen(false)
      navigate(`/ticket/${id}`, { state: { event, quantities, formData } })
    }, 1500)
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop py-lg">
      <h1 className="font-headline-lg text-headline-lg mb-md">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <div className="md:col-span-2 flex flex-col gap-md">
          <h2 className="font-headline-md text-headline-md">Your details</h2>
          <CheckoutForm data={formData} onChange={setFormData} />
        </div>

        <div className="md:col-span-1 flex flex-col gap-md">
          <OrderSummary event={event} quantities={quantities} />
          <button
            disabled={!isFormValid || total === 0}
            onClick={() => setPaymentOpen(true)}
            className="w-full bg-primary text-on-primary font-label-lg py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-40"
          >
            Continue with Payment
          </button>
        </div>
      </div>

      <PaymentModal
        open={paymentOpen}
        total={total}
        onClose={() => setPaymentOpen(false)}
        onConfirm={handleConfirmPayment}
        isProcessing={isProcessing}
      />
    </div>
  )
}
