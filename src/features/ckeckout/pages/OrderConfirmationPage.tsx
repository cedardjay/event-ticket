import { useLocation, useParams, Link } from "react-router-dom"
import type { OrderConfirmationState } from "./PaymentGatewayPage"

function formatXAF(amount: number | string) {
  const n = typeof amount === "string" ? Number(amount) : amount
  return `XAF ${n.toLocaleString()}`
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  })
}

export function OrderConfirmationPage() {
  const { id } = useParams()
  const location = useLocation()

  const state = location.state as OrderConfirmationState | null

  // This state only exists in-memory (React Router's location.state), so a page
  // refresh or a bookmarked/shared link lands here with state = null. There's no
  // fetch-by-id fallback wired in yet — add one via ApiService if that matters
  // for your flow (e.g. sharing a receipt link, or users refreshing this page).
  if (!state) {
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

  const { order, payment, event } = state

  return (
    <div className="w-full max-w-xl mx-auto px-margin-mobile md:px-margin-desktop py-lg flex flex-col items-center text-center gap-md">
      <span className="material-symbols-outlined text-primary text-5xl">check_circle</span>
      <h1 className="font-headline-md text-headline-md text-on-surface">Payment successful</h1>
      <p className="font-body-md text-on-surface-variant">
        Your ticket for <span className="text-on-surface font-label-lg">{event.title}</span> is confirmed.
      </p>

      <div className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl p-md text-left flex flex-col gap-sm">
        {id && <Row label="Order ID" value={id} />}
        <Row label="Order reference" value={order.reference} />
        <Row label="Transaction ID" value={payment.transactionId ?? "—"} />
        <Row label="Amount paid" value={formatXAF(payment.amount)} />
        <Row label="Payment method" value={`${payment.provider} · ${payment.paymentMethod}`} />
        <Row label="Phone number" value={payment.phoneNumber} />
        {payment.paidAt && <Row label="Paid at" value={formatDateTime(payment.paidAt)} />}
        <Row label="Event" value={event.title} />
        {event.startDate && <Row label="Event date" value={formatDateTime(event.startDate)} />}
        <Row label="Order status" value={order.status} />
      </div>

      <div className="flex gap-sm mt-md">
        <Link
          to="/"
          className="font-label-lg text-primary border border-outline-variant px-lg py-3 rounded-xl hover:border-primary transition-colors"
        >
          Back to Discover
        </Link>
        {/* TODO: point this at wherever tickets/receipts actually get downloaded or viewed */}
        <Link
          to={`/tickets/${order.id}`}
          className="font-label-lg text-white bg-primary px-xl py-3 rounded-xl hover:bg-primary/90 transition-colors"
        >
          View my ticket
        </Link>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-md">
      <span className="font-body-sm text-on-surface-variant">{label}</span>
      <span className="font-label-lg text-on-surface text-right">{value}</span>
    </div>
  )
}
