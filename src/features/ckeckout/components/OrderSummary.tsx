import type { EventDetails } from "../../event/types"

type OrderSummaryProps = {
  event: EventDetails
  quantities: Record<string, number>
}

function formatXAF(amount: number) {
  return `XAF ${amount.toLocaleString()}`
}

export function OrderSummary({ event, quantities }: OrderSummaryProps) {
  const selected = event.ticketTypes.filter((t) => (quantities[t.id] ?? 0) > 0)
  const total = selected.reduce((sum, t) => sum + t.price * (quantities[t.id] ?? 0), 0)

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col gap-md">
      <div className="flex gap-sm items-center">
        <img src={event.image} alt={event.title} className="w-16 h-16 rounded-lg object-cover" />
        <div>
          <p className="font-label-lg text-on-surface">{event.title}</p>
          <p className="font-label-sm text-on-surface-variant">{event.organizationName}</p>
        </div>
      </div>

      <div className="border-t border-outline-variant pt-sm flex flex-col gap-xs">
        {selected.map((t) => (
          <div key={t.id} className="flex justify-between font-body-md text-on-surface-variant">
            <span>
              {quantities[t.id]} × {t.name}
            </span>
            <span>{formatXAF(t.price * (quantities[t.id] ?? 0))}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-outline-variant pt-sm flex justify-between items-center">
        <span className="font-label-lg text-on-surface">Total</span>
        <span className="font-headline-md text-headline-md text-primary">{formatXAF(total)}</span>
      </div>
    </div>
  )
}
