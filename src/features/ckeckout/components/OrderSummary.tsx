import type { Event } from "../../event/components/EventCard"

type OrderSummaryProps = {
  event: Event
  quantity: number
}

function formatXAF(amount: number) {
  return `XAF ${amount.toLocaleString()}`
}

export function OrderSummary({ event, quantity }: OrderSummaryProps) {
  const total = event.price * quantity

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col gap-md">
      <div className="flex gap-sm items-center">
        <img src={event.image} alt={event.title} className="w-16 h-16 rounded-lg object-cover" />
        <div>
          <p className="font-label-lg text-on-surface">{event.title}</p>
          <p className="font-label-sm text-on-surface-variant">{event.city}</p>
        </div>
      </div>

      <div className="border-t border-outline-variant pt-sm flex justify-between font-body-md text-on-surface-variant">
        <span>{quantity} × Ticket</span>
        <span>{formatXAF(total)}</span>
      </div>

      <div className="border-t border-outline-variant pt-sm flex justify-between items-center">
        <span className="font-label-lg text-on-surface">Total</span>
        <span className="font-headline-md text-headline-md text-primary">{formatXAF(total)}</span>
      </div>
    </div>
  )
}