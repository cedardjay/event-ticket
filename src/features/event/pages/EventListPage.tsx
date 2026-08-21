import { EventCard, type Event } from "../components/EventCard"
import { useEffect } from "react";
import { useState } from "react";
import ApiService from "../../../services/ApiService"


/*
const allEvents: Event[] = [
  {
    id: "1",
    title: "Cameroon Tech Summit",
    description:
      "Cameroon Tech Summit is a premier technology and innovation event bringing together developers, entrepreneurs, startups, investors, tech enthusiasts, and industry leaders from across Cameroon and beyond. The summit features inspiring talks, practical workshops, networking opportunities, product demonstrations, and discussions on the future of technology in Africa.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA379-pq3mQ9BQfxUkxpVAVuf-VCkbyhlYEIvD3lRc1ZiYRw6t2lbd_orSccyQMpX_5BPvAZUG7DMArAhptBTrNd5w4pxZz7G9k50juVvLCIggBY4_tyAgs5ICGx23678x_tqrAfnozSysLGkp1BV3WYO5kFicp8YbRYDIIqvc-U8KPyzBis2GIT4TEUBEJBHAKFkS1jidXA8caCjw_AO7oOUB0vTFjTGXbmlG8d0TpQDAHT5WdDKKt",
    startDate: "2026-10-15T19:00:00",
    endDate: "2026-10-16T02:00:00",
    capacity: 200,
    status: "published",
    location: "Palais des Congrès de Yaoundé",
    city: "Yaounde",
    organiserId: "2",
    price: 5000,

  },
  {
    id: "2",
    title: "Cameroon Tech Summit",
    description:
      "Cameroon Tech Summit is a premier technology and innovation event bringing together developers, entrepreneurs, startups, investors, tech enthusiasts, and industry leaders from across Cameroon and beyond. The summit features inspiring talks, practical workshops, networking opportunities, product demonstrations, and discussions on the future of technology in Africa.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA379-pq3mQ9BQfxUkxpVAVuf-VCkbyhlYEIvD3lRc1ZiYRw6t2lbd_orSccyQMpX_5BPvAZUG7DMArAhptBTrNd5w4pxZz7G9k50juVvLCIggBY4_tyAgs5ICGx23678x_tqrAfnozSysLGkp1BV3WYO5kFicp8YbRYDIIqvc-U8KPyzBis2GIT4TEUBEJBHAKFkS1jidXA8caCjw_AO7oOUB0vTFjTGXbmlG8d0TpQDAHT5WdDKKt",
    startDate: "2026-10-15T19:00:00",
    endDate: "2026-10-16T02:00:00",
    capacity: 200,
    status: "published",
    location: "Palais des Congrès de Yaoundé",
    city: "Yaounde",
    organiserId: "2",
    price: 5000,

  }
]
*/

export function EventListPage() {

const [allEvents, setAllEvents] = useState<Event[]>([])

useEffect(() => {
  ApiService.allEvents().then(setAllEvents)
}, [])

  return (
    <div className="w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-lg">
      <h1 className="font-headline-lg text-headline-lg mb-md">All Events</h1>

      {/* Search - dumb, does nothing */}
      <div className="w-full bg-surface-container-lowest p-xs rounded-xl border border-outline-variant flex items-center gap-sm mb-md focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
        <span className="material-symbols-outlined text-outline pl-sm">search</span>
        <input
          placeholder="Search events, artists, venues..."
          className="w-full bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-on-surface-variant font-body-md h-[44px]"
          type="text"
        />
      </div>

      {/* Grid */}
      {allEvents.length === 0 ? (
        <div className="text-center py-xl">
          <p className="font-body-lg text-on-surface-variant">No events found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {allEvents.map((event) => (
            <div key={event.id} className="h-72">
              <EventCard event={event} size="small" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
