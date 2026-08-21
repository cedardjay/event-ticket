import { useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { OrderSummary } from "../components/OrderSummary"
import { CheckoutForm } from "../components/CheckoutForm"
import type { CheckoutFormData } from "../types"
import { useEffect } from "react"
import { Event } from "../../event/components/EventCard"
import ApiService from "../../../services/ApiService"




/*
const allEvents: Event[] = [
  {
    id: "1",
    title: "Cameroon Tech Summit",
    description:
      "Cameroon Tech Summit is a premier technology and innovation event bringing together developers, entrepreneurs, startups, investors, tech enthusiasts, and industry leaders from across Cameroon and beyond. The summit features inspiring talks, practical workshops, networking opportunities, product demonstrations, and discussions on the future of technology in Africa.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA379-pq3mQ9BQfxUkxpVAVuf-VCkbyhlYEIvD3lRc1ZiYRw6t2lbd_orSccyQMpX_5BPvAZUG7DMArAhptBTrNd5w4pxZz7G9k50juVvLCIggBY4_tyAgs5ICGx23678x_tqrAfnozSysLGkp1BV3WYO5kFicp8YbRYDIIqvc-U8KPyzBis2GIT4TEUBEJBHAKFkS1jidXA8caCjw_AO7oOUB0vTFjTGXbmlG8d0TpQDAHT5WdDKKt",
    startDate: "2026-10-15T19:00:00",
    endDate: "2026-10-16T02:00:00",
    capacity: 200,
    status: "published",
    location: "Palais des Congrès de Yaoundé",
    city: "Yaounde",
    organiserId: "2",
    price: 5000,

  },
  {
    id: "1",
    title: "Cameroon Tech Summit",
    description:
      "Cameroon Tech Summit is a premier technology and innovation event bringing together developers, entrepreneurs, startups, investors, tech enthusiasts, and industry leaders from across Cameroon and beyond. The summit features inspiring talks, practical workshops, networking opportunities, product demonstrations, and discussions on the future of technology in Africa.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA379-pq3mQ9BQfxUkxpVAVuf-VCkbyhlYEIvD3lRc1ZiYRw6t2lbd_orSccyQMpX_5BPvAZUG7DMArAhptBTrNd5w4pxZz7G9k50juVvLCIggBY4_tyAgs5ICGx23678x_tqrAfnozSysLGkp1BV3WYO5kFicp8YbRYDIIqvc-U8KPyzBis2GIT4TEUBEJBHAKFkS1jidXA8caCjw_AO7oOUB0vTFjTGXbmlG8d0TpQDAHT5WdDKKt",
    startDate: "2026-10-15T19:00:00",
    endDate: "2026-10-16T02:00:00",
    capacity: 200,
    status: "published",
    location: "Palais des Congrès de Yaoundé",
    city: "Yaounde",
    organiserId: "2",
    price: 5000,

  }
]

*/

export function CheckoutPage() {

const [allEvents, setAllEvents] = useState<Event[]>([])

useEffect(() => {
  ApiService.allEvents().then(setAllEvents)
}, [])

  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const event = allEvents.find((e) => e.id === id)
  const quantity: number = (location.state as { quantity?: number })?.quantity ?? 1

  const [formData, setFormData] = useState<CheckoutFormData>({ fullName: "", phoneNumber: "", email: "" })

  if (!event) {
    return (
      <div className="w-full max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop py-xl text-center">
        <p className="font-body-lg text-on-surface-variant">Event not found.</p>
      </div>
    )
  }

  const total = event.price * quantity
  const isFormValid = formData.fullName.trim() && formData.phoneNumber.trim() && formData.email.trim()

  function handleContinue() {
    navigate(`/checkout/${id}/pay`, { state: { event, quantity, formData } })
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
          <OrderSummary event={event} quantity={quantity} />
          <button
            disabled={!isFormValid || total === 0}
            onClick={handleContinue}
            className="w-full bg-primary text-on-primary font-label-lg py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-40"
          >
            Continue with Payment
          </button>
        </div>
      </div>
    </div>
  )
}