

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ApiService from "../../../services/ApiService"

type EventStatus = "draft" | "published"

export interface CreateEventPayload {
  title: string
  description: string
  location: string
  city: string
  startDate: string
  endDate: string
  price: number
  capacity: number
  organiserId: string
  status: EventStatus
}

const initialState: CreateEventPayload = {
  title: "",
  description: "",
  location: "",
  city: "",
  startDate: "",
  endDate: "",
  price: 0,
  capacity: 0,
  organiserId: "",
  status: "draft",
}

export default function OrganiserPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState<CreateEventPayload>(initialState)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function updateField<K extends keyof CreateEventPayload>(
    key: K,
    value: CreateEventPayload[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function validate(): string | null {
    if (!form.title.trim()) return "Title is required."
    if (!form.description.trim()) return "Description is required."
    if (!form.location.trim()) return "Location is required."
    if (!form.city.trim()) return "City is required."
    if (!form.startDate) return "Start date is required."
    if (!form.endDate) return "End date is required."
    if (new Date(form.endDate) < new Date(form.startDate))
      return "End date cannot be before start date."
    if (form.price < 0) return "Price cannot be negative."
    if (form.capacity <= 0) return "Capacity must be at least 1."
    if (!form.organiserId.trim()) return "Organiser ID is required."
    return null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setSubmitting(true)
    try {
      const created = await ApiService.createEvent(form)
      navigate(`/events/${created.id ?? ""}`)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create event. Please try again."
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="w-full max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop py-xl">
      <div className="mb-lg">
        <h1 className="font-headline-lg text-headline-lg">Create an Event</h1>
        <p className="font-body-md text-on-surface-variant mt-xs">
          Fill in the details below to publish a new event.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-md">
        <Field label="Title">
          <input
            className={inputClasses}
            type="text"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="e.g. Douala Music Festival"
          />
        </Field>

        <Field label="Description">
          <textarea
            className={`${inputClasses} min-h-[120px] resize-y`}
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder="What's this event about?"
          />
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <Field label="Location">
            <input
              className={inputClasses}
              type="text"
              value={form.location}
              onChange={(e) => updateField("location", e.target.value)}
              placeholder="Venue or address"
            />
          </Field>
          <Field label="City">
            <input
              className={inputClasses}
              type="text"
              value={form.city}
              onChange={(e) => updateField("city", e.target.value)}
              placeholder="e.g. Yaoundé"
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <Field label="Start Date">
            <input
              className={inputClasses}
              type="date"
              value={form.startDate}
              onChange={(e) => updateField("startDate", e.target.value)}
            />
          </Field>
          <Field label="End Date">
            <input
              className={inputClasses}
              type="date"
              value={form.endDate}
              onChange={(e) => updateField("endDate", e.target.value)}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <Field label="Price (FCFA)">
            <input
              className={inputClasses}
              type="number"
              min={0}
              value={form.price}
              onChange={(e) => updateField("price", Number(e.target.value))}
            />
          </Field>
          <Field label="Capacity">
            <input
              className={inputClasses}
              type="number"
              min={1}
              value={form.capacity}
              onChange={(e) => updateField("capacity", Number(e.target.value))}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <Field label="Organiser ID">
            <input
              className={inputClasses}
              type="text"
              value={form.organiserId}
              onChange={(e) => updateField("organiserId", e.target.value)}
              placeholder="Your organiser account ID"
            />
          </Field>
          <Field label="Status">
            <select
              className={inputClasses}
              value={form.status}
              onChange={(e) => updateField("status", e.target.value as EventStatus)}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </Field>
        </div>

        {error && (
          <p className="font-body-md text-error" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full md:w-auto self-start bg-primary text-on-primary font-label-lg px-xl py-3 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Creating..." : "Create Event"}
        </button>
      </form>
    </section>
  )
}

const inputClasses =
  "w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-md py-3 font-body-md text-on-background placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary transition-colors"

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-xs">
      <span className="font-label-lg text-on-surface-variant">{label}</span>
      {children}
    </label>
  )
}
