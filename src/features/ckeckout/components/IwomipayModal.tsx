import { useState } from "react"
import type { Event } from "../../event/components/EventCard"
import type { CheckoutFormData } from "../types"

type PaymentMethod = "mtn" | "orange"

type IwomipayModalProps = {
  open: boolean
  onClose: () => void
  onSubmitPayment: (method: PaymentMethod, phoneNumber: string) => void
  event: Event
  formData: CheckoutFormData
  total: number
  isProcessing?: boolean
}

function formatXAF(amount: number) {
  return `FCFA${amount.toLocaleString()}`
}

const methodMeta: Record<PaymentMethod, { label: string; badge: string; badgeColor: string; textColor: string; dialCode: string }> = {
  mtn: { label: "MTN Mobile Money", badge: "MTN", badgeColor: "bg-[#FFCC00]", textColor: "text-on-background", dialCode: "+237" },
  orange: { label: "Orange Money", badge: "OM", badgeColor: "bg-[#FF6600]", textColor: "text-white", dialCode: "+237" },
}

export function IwomipayModal({
  open,
  onClose,
  onSubmitPayment,
  event,
  formData,
  total,
  isProcessing = false,
}: IwomipayModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null)
  const [phoneNumber, setPhoneNumber] = useState("")

  if (!open) return null

  function handleClose() {
    setSelectedMethod(null)
    setPhoneNumber("")
    onClose()
  }

  function handleChangeMethod() {
    setSelectedMethod(null)
    setPhoneNumber("")
  }

  const meta = selectedMethod ? methodMeta[selectedMethod] : null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-margin-mobile">
      <div onClick={handleClose} className="absolute inset-0 bg-black/60" />

      <div className="relative w-full max-w-md bg-surface-container-lowest rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-md py-md border-b border-outline-variant">
          <h2 className="font-headline-md text-headline-md text-on-surface">Make payment</h2>
          <button
            onClick={handleClose}
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
                <span className="font-label-sm text-on-surface-variant col-span-1">Payment for</span>
                <span className="font-body-md text-on-surface col-span-2">{event.title}</span>
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

          {/* Step 1: choose method */}
          {!selectedMethod && (
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-sm">Available payment options</h3>
              <div className="flex flex-col gap-sm">
                <button
                  onClick={() => setSelectedMethod("mtn")}
                  className="flex items-center gap-sm p-md rounded-lg border border-outline-variant hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  <div className="w-9 h-9 rounded-md bg-[#FFCC00] flex items-center justify-center text-on-background font-label-sm shrink-0">
                    MTN
                  </div>
                  <span className="font-body-lg text-on-surface">MTN Mobile Money</span>
                </button>

                <button
                  onClick={() => setSelectedMethod("orange")}
                  className="flex items-center gap-sm p-md rounded-lg border border-outline-variant hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  <div className="w-9 h-9 rounded-md bg-[#FF6600] flex items-center justify-center text-white font-label-sm shrink-0">
                    OM
                  </div>
                  <span className="font-body-lg text-on-surface">Orange Money</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: confirm with phone number */}
          {selectedMethod && meta && (
            <div className="flex flex-col gap-sm">
              <button
                onClick={handleChangeMethod}
                className="font-label-lg text-primary underline text-left w-fit"
              >
                Change payment method
              </button>

              <div className="border border-outline-variant rounded-lg overflow-hidden">
                <div className="bg-[#e3f6fb] p-md">
                  <p className="font-label-lg text-[#0f4c5c]">
                    Attention! You should have more than {formatXAF(total)} as account balance to complete this
                    transaction successfully.
                  </p>
                  <p className="font-label-sm text-[#0f4c5c] mt-xs">
                    ( {meta.label} may deduct a small commission for each transaction made through their service )
                  </p>
                </div>

                <div className="p-md flex flex-col gap-sm">
                  <div className="flex items-stretch border border-outline-variant rounded-lg overflow-hidden">
                    <span className={`flex items-center px-sm text-white font-label-lg shrink-0 ${selectedMethod === "orange" ? "bg-[#FF6600]" : selectedMethod === "mtn" ? "bg-[#FFCC00]" : ""
                      }`}>                      
                      {meta.dialCode}
                    </span>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Enter account number"
                      className="flex-1 px-sm py-2 bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-on-surface-variant font-body-md"
                    />
                  </div>

                  <button
                    disabled={!phoneNumber.trim() || isProcessing}
                    onClick={() => onSubmitPayment(selectedMethod, phoneNumber)}
                    className="flex items-center justify-center gap-sm bg-on-surface-variant/90 text-white font-label-lg py-3 rounded-lg hover:bg-on-surface-variant transition-colors disabled:opacity-50"
                  >
                    <div className={`w-6 h-6 rounded ${meta.badgeColor} flex items-center justify-center ${meta.textColor} text-[10px] font-label-sm shrink-0`}>
                      {meta.badge}
                    </div>
                    {isProcessing ? "Processing..." : `Make payment (${formatXAF(total)})`}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end px-md py-md border-t border-outline-variant">
          <button
            onClick={handleClose}
            className="px-md py-2 rounded-lg bg-on-surface-variant/80 text-white font-label-lg hover:bg-on-surface-variant transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
