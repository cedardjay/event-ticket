import { EventCard } from "../components/EventCard"
import { allEvents } from "../components/EventCard";

export function EventListPage() {
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
