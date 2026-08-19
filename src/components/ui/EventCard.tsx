export type EventCardData = {
  id: string
  title: string
  date: string
  venue: string
  price: string
  image: string
  featured?: boolean
}

export function EventCard({ event, size = "small" }: { event: EventCardData; size?: "large" | "small" }) {
  const isLarge = size === "large"

  return (
    <div
      className={`relative rounded-xl overflow-hidden group cursor-pointer border border-outline-variant h-full transition-shadow ${
        isLarge ? "pulse-shadow" : "hover:pulse-shadow"
      }`}
    >
      <img
        src={event.image}
        alt={event.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className={isLarge ? "absolute bottom-0 left-0 p-lg w-full" : "absolute bottom-0 left-0 p-md w-full"}>
        {event.featured && (
          <span className="inline-block px-3 py-1 bg-secondary text-on-secondary font-label-sm rounded-full mb-sm">
            Featured
          </span>
        )}
        <h3 className={isLarge ? "font-headline-lg text-headline-lg text-white mb-xs" : "font-headline-md text-white mb-xs"}>
          {event.title}
        </h3>
        <p className="font-label-sm text-white/80 mb-sm flex items-center gap-xs">
          <span className="material-symbols-outlined text-sm">calendar_month</span> {event.date} • {event.venue}
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
    </div>
  )
}
