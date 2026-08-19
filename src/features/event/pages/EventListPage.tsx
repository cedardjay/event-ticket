import { useMemo, useState } from "react"
import { EventCard } from "../components/EventCard"
import type { EventCardData } from "../components/EventCard"

const categories = ["All", "Music", "Tech", "Workshops", "Sports", "Arts & Culture"]

// Replace with data fetched from your events API
const allEvents: (EventCardData & { category: string })[] = [
  {
    id: "1",
    title: "Douala Afrobeats Festival 2024",
    date: "Oct 15, 2026",
    venue: "Parcours Vita",
    price: "XAF 15,000",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAoJ0PTyjGAhyPEB5-3JU3U0HEZwIEXDNtJfjc5MsjFQbU2KqklgvWK1H7MqyECUC8SjwIJtIuTKJHx-A5sW_UTHDYw8RIv35dOIZzCD6jQJpKkYhyz-3Y8HZH5hC-7kWjeU6fJGwKvithUVkiFe5meEe5NYaTYxmptQbf3YOR3n0m5DwyAd8THPLTyZmTkd5ahWiuDFShZlphOPNVhRAj6rxhkdhpzeXL-21zHUHaqZje9HvGsJ1kW",
    category: "Music",
    featured: true,
  },
  {
    id: "2",
    title: "Cameroon Tech Summit",
    date: "Oct 15, 2026",
    venue: "Yaoundé Conference Centre",
    price: "Free",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA379-pq3mQ9BQfxUkxpVAVuf-VCkbyhlYEIvD3lRc1ZiYRw6t2lbd_orSccyQMpX_5BPvAZUG7DMArAhptBTrNd5w4pxZz7G9k50juVvLCIggBY4_tyAgs5ICGx23678x_tqrAfnozSysLGkp1BV3WYO5kFicp8YbRYDIIqvc-U8KPyzBis2GIT4TEUBEJBHAKFkS1jidXA8caCjw_AO7oOUB0vTFjTGXbmlG8d0TpQDAHT5WdDKKt",
    category: "Tech",
  },
  {
    id: "3",
    title: "Contemporary Art Gala",
    date: "Dec 10",
    venue: "National Museum",
    price: "XAF 25,000",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuATZJWfDrz2HRBI4SGFKiVyKGJwBewF7SP_jNTICANKP8uHmW9FlqN6ECS3GVM2Rynx1tBQRsLQrbqk7dFvyyIk2yOULiQ1xx-ac1pbYAJqVaa5Pyb2W5z_bZiYl7J-8CoglX-Rpw5MIWEWjGz8n9Df4QZUEC_mNmJWZkRW5cul0Q-_5vfXLeAHAKDPqkVa33BFA50_wvcGC4kuCkmDx67d-g7xj4AyxTsvZlmBQ-Mtc3GZBmYdhpVO",
    category: "Arts & Culture",
  },
]

const PAGE_SIZE = 9

export function EventListPage() {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return allEvents.filter((e) => {
      const matchesCategory = activeCategory === "All" || e.category === activeCategory
      const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [search, activeCategory])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function handleCategoryClick(cat: string) {
    setActiveCategory(cat)
    setPage(1)
  }

  function handleSearchChange(value: string) {
    setSearch(value)
    setPage(1)
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-lg">
      <h1 className="font-headline-lg text-headline-lg mb-md">All Events</h1>

      {/* Search */}
      <div className="w-full bg-surface-container-lowest p-xs rounded-xl border border-outline-variant flex items-center gap-sm mb-md focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
        <span className="material-symbols-outlined text-outline pl-sm">search</span>
        <input
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search events, artists, venues..."
          className="w-full bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-on-surface-variant font-body-md h-[44px]"
          type="text"
        />
      </div>

      {/* Category filter */}
      <div className="flex gap-sm overflow-x-auto pb-xs scrollbar-hide mb-lg">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={
              activeCategory === cat
                ? "whitespace-nowrap px-md py-2 rounded-full bg-primary-container text-on-primary-fixed font-label-lg border border-transparent"
                : "whitespace-nowrap px-md py-2 rounded-full bg-surface-container-lowest border border-outline-variant text-on-surface-variant font-label-lg hover:border-primary hover:text-primary transition-colors"
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {paged.length === 0 ? (
        <div className="text-center py-xl">
          <p className="font-body-lg text-on-surface-variant">No events match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {paged.map((event) => (
            <div key={event.id} className="h-72">
              <EventCard event={event} size="small" />
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-sm mt-lg">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant disabled:opacity-30 hover:border-primary hover:text-primary transition-colors"
            aria-label="Previous page"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-10 h-10 rounded-full font-label-lg transition-colors ${
                p === page
                  ? "bg-primary text-on-primary"
                  : "text-on-surface-variant hover:bg-surface-container-highest"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant disabled:opacity-30 hover:border-primary hover:text-primary transition-colors"
            aria-label="Next page"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      )}
    </div>
  )
}
