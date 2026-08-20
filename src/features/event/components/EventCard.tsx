import { Link } from "react-router-dom"

export type Event = {
  id: string
  title: string
  description: string
  location: string
  city: string
  startDate: string
  endDate: string
  price: number
  capacity: number
  image?: string
  organiserId: string
  status: string
}

export const allEvents: Event[] = [
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

export function EventCard({ event, size = "small" }: { event: Event; size?: "large" | "small" }) {
  const isLarge = size === "large"

  return (
    <Link
      to={`/events/${event.id}`}
      className={`relative rounded-xl overflow-hidden group cursor-pointer border border-outline-variant h-full block transition-shadow ${isLarge ? "pulse-shadow" : "hover:pulse-shadow"
        }`}
    >
      <img
        src={event.image}
        alt={event.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className={isLarge ? "absolute bottom-0 left-0 p-lg w-full" : "absolute bottom-0 left-0 p-md w-full"}>

        <h3 className={isLarge ? "font-headline-lg text-headline-lg text-white mb-xs" : "font-headline-md text-white mb-xs"}>
          {event.title}
        </h3>
        <p className="font-label-sm text-white/80 mb-sm flex items-center gap-xs">
          <span className="material-symbols-outlined text-sm">calendar_month</span> {event.startDate} • {event.location}
        </p>
        {isLarge ? (
          <div className="flex justify-between items-center">
            <span className="font-headline-md text-white">{event.price}</span>
            <button className="bg-primary text-on-primary font-label-lg px-md py-2 rounded-lg hover:bg-primary/90 transition-colors">
              Get Tickets
            </button>
          </div>
        ) : (
          <span className="font-label-lg text-white">{event.price}</span>
        )}
      </div>
    </Link>
  )
}
