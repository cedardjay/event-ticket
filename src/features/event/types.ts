export type TicketType = {
  id: string
  name: "Standard" | "VIP" | "VVIP" | string
  price: number
  available: number
}

export type EventDetails = {
  id: string
  title: string
  organizationName: string
  description: string
  image: string
  startDate: string // ISO string
  endDate: string // ISO string
  venue: string
  ticketTypes: TicketType[]
}
