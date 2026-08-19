import { useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { TicketTypeSelector } from "../components/TicketTypeSelector"
import type { EventDetails } from "../types"

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
  const { id } = useParams()
  const navigate = useNavigate()
  const event = mockEvent // TODO: fetch by id

  const [quantities, setQuantities] = useState<Record<string, number>>({})

  const totalTickets = useMemo(
    () => Object.values(quantities).reduce((sum, q) => sum + q, 0),
    [quantities]
  )

  const totalPrice = useMemo(
    () =>
      event.ticketTypes.reduce((sum, t) => sum + (quantities[t.id] ?? 0) * t.price, 0),
    [quantities, event.ticketTypes]
  )

  function handleQuantityChange(ticketTypeId: string, quantity: number) {
    setQuantities((prev) => ({ ...prev, [ticketTypeId]: quantity }))
  }

  function handleReserve() {
    navigate(`/checkout/${id}`, { state: { quantities } })
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-margin-mobile md:px-margin-desktop py-lg pb-32">
      {/* Flyer */}
      <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden mb-lg">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {/* Left: details */}
        <div className="md:col-span-2 flex flex-col gap-md">
          <div>
            <p className="font-label-lg text-primary mb-xs">{event.organizationName}</p>
            <h1 className="font-headline-lg text-headline-lg text-on-surface">{event.title}</h1>
          </div>

          <div className="flex flex-col gap-sm">
            <div className="flex items-center gap-sm text-on-surface-variant">
              <span className="material-symbols-outlined">calendar_month</span>
              <span className="font-body-md">{formatDateRange(event.startDate, event.endDate)}</span>
            </div>
            <div className="flex items-center gap-sm text-on-surface-variant">
              <span className="material-symbols-outlined">location_on</span>
              <span className="font-body-md">{event.venue}</span>
            </div>
          </div>

          <div>
            <h2 className="font-headline-md text-headline-md mb-sm">About this event</h2>
            <p className="font-body-md text-on-surface-variant whitespace-pre-line">{event.description}</p>
          </div>
        </div>

        {/* Right: ticket selector */}
        <div className="md:col-span-1">
          <div className="sticky top-24 bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col gap-md">
            <h2 className="font-headline-md text-headline-md">Select Tickets</h2>
            <TicketTypeSelector
              ticketTypes={event.ticketTypes}
              quantities={quantities}
              onChange={handleQuantityChange}
            />
          </div>
        </div>
      </div>

      {/* Sticky reserve bar */}
      {totalTickets > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-surface-container-lowest border-t border-outline-variant z-40">
          <div className="max-w-5xl mx-auto px-margin-mobile md:px-margin-desktop py-sm flex items-center justify-between">
            <div>
              <p className="font-label-sm text-on-surface-variant">{totalTickets} ticket{totalTickets > 1 ? "s" : ""}</p>
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
      )}
    </div>
  )
}
