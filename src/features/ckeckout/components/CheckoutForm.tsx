import type { CheckoutFormData } from "../types"

type CheckoutFormProps = {
  data: CheckoutFormData
  onChange: (data: CheckoutFormData) => void
}

export function CheckoutForm({ data, onChange }: CheckoutFormProps) {
  function handleField(field: keyof CheckoutFormData, value: string) {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="flex flex-col gap-md">
      <div className="flex flex-col gap-xs">
        <label className="font-label-lg text-on-surface" htmlFor="fullName">
          Full name
        </label>
        <input
          id="fullName"
          type="text"
          value={data.fullName}
          onChange={(e) => handleField("fullName", e.target.value)}
          placeholder="e.g. Jooe Fru"
          className="w-full h-[48px] px-sm rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:ring-1 focus:ring-primary transition-all"
        />
      </div>

      <div className="flex flex-col gap-xs">
        <label className="font-label-lg text-on-surface" htmlFor="phone">
          Phone number
        </label>
        <input
          id="phone"
          type="tel"
          value={data.phone}
          onChange={(e) => handleField("phone", e.target.value)}
          placeholder="e.g. 6XX XX XX XX"
          className="w-full h-[48px] px-sm rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:ring-1 focus:ring-primary transition-all"
        />
      </div>

      <div className="flex flex-col gap-xs">
        <label className="font-label-lg text-on-surface" htmlFor="email">
          Email address
        </label>
        <input
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => handleField("email", e.target.value)}
          placeholder="e.g. jooe@example.com"
          className="w-full h-[48px] px-sm rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:ring-1 focus:ring-primary transition-all"
        />
        <p className="font-label-sm text-on-surface-variant">Your ticket and QR code will be sent here.</p>
      </div>
    </div>
  )
}
