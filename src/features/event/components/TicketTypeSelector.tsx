import type { TicketType } from "../types"

type TicketTypeSelectorProps = {
  ticketTypes: TicketType[]
  quantities: Record<string, number>
  onChange: (ticketTypeId: string, quantity: number) => void
}

function formatXAF(amount: number) {
  return `XAF ${amount.toLocaleString()}`
}

export function TicketTypeSelector({ ticketTypes, quantities, onChange }: TicketTypeSelectorProps) {
  return (
    <div className="flex flex-col gap-sm">
      {ticketTypes.map((ticket) => {
        const qty = quantities[ticket.id] ?? 0
        const soldOut = ticket.available === 0

        return (
          <div
            key={ticket.id}
            className={`flex items-center justify-between p-md rounded-xl border transition-colors ${
              qty > 0 ? "border-primary bg-primary-container/5" : "border-outline-variant"
            } ${soldOut ? "opacity-50" : ""}`}
          >
            <div>
              <p className="font-label-lg text-on-surface">{ticket.name}</p>
              <p className="font-body-md text-on-surface-variant">{formatXAF(ticket.price)}</p>
              {soldOut && <p className="font-label-sm text-error mt-xs">Sold out</p>}
              {!soldOut && ticket.available <= 10 && (
                <p className="font-label-sm text-tertiary mt-xs">Only {ticket.available} left</p>
              )}
            </div>

            <div className="flex items-center gap-sm">
              <button
                disabled={soldOut || qty === 0}
                onClick={() => onChange(ticket.id, Math.max(0, qty - 1))}
                className="w-9 h-9 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant disabled:opacity-30 hover:border-primary hover:text-primary transition-colors"
                aria-label={`Decrease ${ticket.name} quantity`}
              >
                <span className="material-symbols-outlined text-base">remove</span>
              </button>
              <span className="w-6 text-center font-label-lg">{qty}</span>
              <button
                disabled={soldOut || qty >= ticket.available}
                onClick={() => onChange(ticket.id, qty + 1)}
                className="w-9 h-9 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant disabled:opacity-30 hover:border-primary hover:text-primary transition-colors"
                aria-label={`Increase ${ticket.name} quantity`}
              >
                <span className="material-symbols-outlined text-base">add</span>
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
