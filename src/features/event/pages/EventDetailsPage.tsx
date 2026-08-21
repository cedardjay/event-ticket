import { useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Event, EventCard } from "../components/EventCard";
import { useEffect } from "react";
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

function formatDateRange(startISO: string, endISO: string) {
  const start = new Date(startISO)
  const end = new Date(endISO)
  const dateFmt: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long", year: "numeric" }
  const timeFmt: Intl.DateTimeFormatOptions = { hour: "numeric", minute: "2-digit" }

  const sameDay = start.toDateString() === end.toDateString()

  if (sameDay) {
    return `${start.toLocaleDateString(undefined, dateFmt)} · ${start.toLocaleTimeString(undefined, timeFmt)} – ${end.toLocaleTimeString(undefined, timeFmt)}`
  }

  return `${start.toLocaleDateString(undefined, dateFmt)} ${start.toLocaleTimeString(undefined, timeFmt)} → ${end.toLocaleDateString(undefined, dateFmt)} ${end.toLocaleTimeString(undefined, timeFmt)}`
}

function formatXAF(amount: number) {
  return `XAF ${amount.toLocaleString()}`
}

export function EventDetailsPage() {


const [allEvents, setAllEvents] = useState<Event[]>([])

useEffect(() => {
  ApiService.allEvents().then(setAllEvents)
}, [])


  const { id } = useParams()
  const navigate = useNavigate()
  const event = allEvents.find((e) => e.id === id)

  const [quantity, setQuantity] = useState(1)

  const totalPrice = useMemo(
    () => (event ? event.price * quantity : 0),
    [quantity, event]
  )

  function handleQuantityChange(next: number) {
    if (!event) return
    const clamped = Math.max(1, Math.min(next, event.capacity))
    setQuantity(clamped)
  }

  function handleReserve() {
    navigate(`/checkout/${id}`, { state: { quantity } })
  }

  if (!event) {
    return (
      <div className="w-full max-w-5xl mx-auto px-margin-mobile md:px-margin-desktop py-xl text-center">
        <p className="font-body-lg text-on-surface-variant">Event not found.</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-margin-mobile md:px-margin-desktop py-lg pb-32">
      {/* Flyer */}
      <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden mb-lg">
              <EventCard event={event} size="small" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {/* Left: details */}
        <div className="md:col-span-2 flex flex-col gap-md">
          <h1 className="font-headline-lg text-headline-lg text-on-surface">{event.title}</h1>

          <div className="flex flex-col gap-sm">
            <div className="flex items-center gap-sm text-on-surface-variant">
              <span className="material-symbols-outlined">calendar_month</span>
              <span className="font-body-md">{formatDateRange(event.startDate, event.endDate)}</span>
            </div>
            <div className="flex items-center gap-sm text-on-surface-variant">
              <span className="material-symbols-outlined">location_on</span>
              <span className="font-body-md">{event.location}</span>
            </div>
          </div>

          <div>
            <h2 className="font-headline-md text-headline-md mb-sm">About this event</h2>
            <p className="font-body-md text-on-surface-variant whitespace-pre-line">{event.description}</p>
          </div>
        </div>

        {/* Right: buy ticket */}
        <div className="md:col-span-1">
          <div className="sticky top-24 bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col gap-md">
            <h2 className="font-headline-md text-headline-md">Buy Tickets</h2>
            <p className="font-body-lg text-on-surface">{formatXAF(event.price)} <span className="text-on-surface-variant font-body-sm">/ ticket</span></p>

            <div className="flex items-center gap-sm">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center"
              >
                -
              </button>
              <span className="font-label-lg w-8 text-center">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky reserve bar */}
      <div className="fixed bottom-0 left-0 w-full bg-surface-container-lowest border-t border-outline-variant z-40">
        <div className="max-w-5xl mx-auto px-margin-mobile md:px-margin-desktop py-sm flex items-center justify-between">
          <div>
            <p className="font-label-sm text-on-surface-variant">{quantity} ticket{quantity > 1 ? "s" : ""}</p>
            <p className="font-headline-md text-headline-md text-on-surface">{formatXAF(totalPrice)}</p>
          </div>
          <button
            onClick={handleReserve}
            className="bg-primary text-on-primary font-label-lg px-xl py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Continue with Payment
          </button>
        </div>
      </div>
    </div>
  )
}
