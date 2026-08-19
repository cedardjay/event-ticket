import type { EventDetails } from "../../event/types"
import type { CheckoutFormData } from "../types"

type IwomipayModalProps = {
  open: boolean
  onClose: () => void
  onSelectMethod: (method: "mtn" | "orange") => void
  event: EventDetails
  formData: CheckoutFormData
  total: number
  isProcessing?: boolean
}

function formatXAF(amount: number) {
  return `FCFA${amount.toLocaleString()}`
}

export function IwomipayModal({
  open,
  onClose,
  onSelectMethod,
  event,
  formData,
  total,
  isProcessing = false,
}: IwomipayModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-margin-mobile">
      <div onClick={onClose} className="absolute inset-0 bg-black/60" />

      <div className="relative w-full max-w-md bg-surface-container-lowest rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-md py-md border-b border-outline-variant">
          <h2 className="font-headline-md text-headline-md text-on-surface">Make payment</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <div className="p-md flex flex-col gap-md max-h-[70vh] overflow-y-auto">
          {/* Transaction summary */}
          <div className="border border-outline-variant rounded-lg overflow-hidden">
            <div className="bg-surface-container-high px-sm py-2 text-center">
              <span className="font-label-lg text-on-surface">Transaction Summary</span>
            </div>
            <div className="divide-y divide-outline-variant">
              <div className="grid grid-cols-3 px-sm py-2 gap-sm">
                <span className="font-label-sm text-on-surface-variant col-span-1">Payment to</span>
                <span className="font-body-md text-on-surface col-span-2">{event.organizationName}</span>
              </div>
              <div className="grid grid-cols-3 px-sm py-2 gap-sm">
                <span className="font-label-sm text-on-surface-variant col-span-1">Description</span>
                <span className="font-body-md text-on-surface col-span-2">Ticket purchase — {event.title}</span>
              </div>
              <div className="grid grid-cols-3 px-sm py-2 gap-sm">
                <span className="font-label-sm text-on-surface-variant col-span-1">Amount</span>
                <span className="font-body-md text-on-surface col-span-2">{formatXAF(total)}</span>
              </div>
              <div className="grid grid-cols-3 px-sm py-2 gap-sm">
                <span className="font-label-sm text-on-surface-variant col-span-1">Name</span>
                <span className="font-body-md text-on-surface col-span-2">{formData.fullName}</span>
              </div>
              <div className="grid grid-cols-3 px-sm py-2 gap-sm">
                <span className="font-label-sm text-on-surface-variant col-span-1">Email</span>
                <div className="col-span-2">
                  <span className="font-body-md text-on-surface flex items-center gap-xs">
                    <span className="material-symbols-outlined text-sm">mail</span>
                    {formData.email}
                  </span>
                  <p className="font-label-sm text-primary mt-xs">Your transaction receipt will be sent to this email</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment options */}
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-sm">Available payment options</h3>
            <div className="flex flex-col gap-sm">
              <button
                disabled={isProcessing}
                onClick={() => onSelectMethod("mtn")}
                className="flex items-center gap-sm p-md rounded-lg border border-outline-variant hover:border-primary hover:bg-primary/5 transition-colors disabled:opacity-50"
              >
                <div className="w-9 h-9 rounded-md bg-[#FFCC00] flex items-center justify-center text-on-background font-label-sm shrink-0">
                  MTN
                </div>
                <span className="font-body-lg text-on-surface">MTN Mobile Money</span>
              </button>

              <button
                disabled={isProcessing}
                onClick={() => onSelectMethod("orange")}
                className="flex items-center gap-sm p-md rounded-lg border border-outline-variant hover:border-primary hover:bg-primary/5 transition-colors disabled:opacity-50"
              >
                <div className="w-9 h-9 rounded-md bg-[#FF6600] flex items-center justify-center text-white font-label-sm shrink-0">
                  OM
                </div>
                <span className="font-body-lg text-on-surface">Orange Money</span>
              </button>
            </div>
          </div>

          {isProcessing && (
            <p className="text-center font-label-sm text-on-surface-variant">Redirecting to complete payment...</p>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end px-md py-md border-t border-outline-variant">
          <button
            onClick={onClose}
            className="px-md py-2 rounded-lg bg-on-surface-variant/80 text-white font-label-lg hover:bg-on-surface-variant transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
