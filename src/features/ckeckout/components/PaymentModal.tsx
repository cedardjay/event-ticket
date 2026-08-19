type PaymentModalProps = {
  open: boolean
  total: number
  onClose: () => void
  onConfirm: () => void
  isProcessing?: boolean
}

function formatXAF(amount: number) {
  return `XAF ${amount.toLocaleString()}`
}

export function PaymentModal({ open, total, onClose, onConfirm, isProcessing = false }: PaymentModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div onClick={onClose} className="absolute inset-0 bg-black/60" />

      <div className="relative w-full md:max-w-md bg-surface-container-lowest rounded-t-2xl md:rounded-2xl p-lg flex flex-col gap-md">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-md text-headline-md">Confirm Payment</h2>
          <button onClick={onClose} aria-label="Close" className="text-on-surface-variant">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <p className="font-body-md text-on-surface-variant">
          Amount to pay: <span className="text-on-surface font-label-lg">{formatXAF(total)}</span>
        </p>

        {/* Gateway hand-off notice, not a method picker */}
        <div className="flex items-center gap-sm p-md rounded-xl border border-outline-variant bg-surface-container-low">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-on-primary font-label-sm shrink-0">
            IW
          </div>
          <div>
            <p className="font-label-lg text-on-surface">Secured by IWOMIPAY</p>
            <p className="font-label-sm text-on-surface-variant">
              You'll choose Orange Money, MTN Mobile Money, or another supported method on the next screen.
            </p>
          </div>
        </div>

        <button
          disabled={isProcessing}
          onClick={onConfirm}
          className="w-full bg-primary text-on-primary font-label-lg py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-40 flex items-center justify-center gap-sm"
        >
          {isProcessing ? (
            "Redirecting..."
          ) : (
            <>
              Pay with IWOMIPAY
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </>
          )}
        </button>

        <p className="font-label-sm text-on-surface-variant text-center">
          You will be redirected to a secure IWOMIPAY payment page to complete your purchase.
        </p>
      </div>
    </div>
  )
}
