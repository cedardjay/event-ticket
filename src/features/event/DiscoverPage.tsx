import { HeroMarquee } from "../../components/ui/HeroMarquee"
import { EventCard, type EventCardData } from "../../components/ui/EventCard"

const heroImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAoJ0PTyjGAhyPEB5-3JU3U0HEZwIEXDNtJfjc5MsjFQbU2KqklgvWK1H7MqyECUC8SjwIJtIuTKJHx-A5sW_UTHDYw8RIv35dOIZzCD6jQJpKkYhyz-3Y8HZH5hC-7kWjeU6fJGwKvithUVkiFe5meEe5NYaTYxmptQbf3YOR3n0m5DwyAd8THPLTyZmTkd5ahWiuDFShZlphOPNVhRAj6rxhkdhpzeXL-21zHUHaqZje9HvGsJ1kW",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA379-pq3mQ9BQfxUkxpVAVuf-VCkbyhlYEIvD3lRc1ZiYRw6t2lbd_orSccyQMpX_5BPvAZUG7DMArAhptBTrNd5w4pxZz7G9k50juVvLCIggBY4_tyAgs5ICGx23678x_tqrAfnozSysLGkp1BV3WYO5kFicp8YbRYDIIqvc-U8KPyzBis2GIT4TEUBEJBHAKFkS1jidXA8caCjw_AO7oOUB0vTFjTGXbmlG8d0TpQDAHT5WdDKKt",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuATZJWfDrz2HRBI4SGFKiVyKGJwBewF7SP_jNTICANKP8uHmW9FlqN6ECS3GVM2Rynx1tBQRsLQrbqk7dFvyyIk2yOULiQ1xx-ac1pbYAJqVaa5Pyb2W5z_bZiYl7J-8CoglX-Rpw5MIWEWjGz8n9Df4QZUEC_mNmJWZkRW5cul0Q-_5vfXLeAHAKDPqkVa33BFA50_wvcGC4kuCkmDx67d-g7xj4AyxTsvZlmBQ-Mtc3GZBmYdhpVO",
]

const categories = ["All", "Music", "Tech", "Workshops", "Sports", "Arts & Culture"]

// Replace with data fetched from your events API
const trendingEvents: EventCardData[] = [
  {
    id: "1",
    title: "Douala Afrobeats Festival 2024",
    date: "Oct 15, 2024",
    venue: "Parcours Vita",
    price: "XAF 15,000",
    image: heroImages[0],
    featured: true,
  },
  {
    id: "2",
    title: "Cameroon Tech Summit",
    date: "Nov 2",
    venue: "Yaoundé Conference Centre",
    price: "Free",
    image: heroImages[1],
  },
  {
    id: "3",
    title: "Contemporary Art Gala",
    date: "Dec 10",
    venue: "National Museum",
    price: "XAF 25,000",
    image: heroImages[2],
  },
]

export function DiscoverPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative w-full h-[calc(100svh-64px)] min-h-[560px] overflow-hidden bg-on-background">
        <HeroMarquee images={heroImages} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/80" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-margin-mobile md:px-margin-desktop gap-md">
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg max-w-3xl text-white">
            Find Your Next Unforgettable Experience
          </h1>
          <p className="font-body-lg text-body-lg text-white/85 max-w-2xl">
            Discover the best concerts, tech meetups, and cultural events happening across Cameroon.
          </p>

          <div className="w-full max-w-4xl mt-lg bg-white/25 backdrop-blur-xl p-xs rounded-2xl shadow-2xl border border-white/30 flex flex-col md:flex-row gap-xs items-center focus-within:border-white/50 focus-within:bg-white/30 transition-all">
            <div className="flex-1 flex items-center gap-sm w-full px-sm py-2">
              <span className="material-symbols-outlined text-white/80">search</span>
              <input
                className="w-full bg-transparent border-none focus:ring-0 text-white placeholder:text-white/70 font-body-md h-[44px]"
                placeholder="Search events, artists, venues..."
                type="text"
              />
            </div>
            <div className="w-full md:w-px h-[1px] md:h-8 bg-white/30" />
            <div className="flex-1 flex items-center gap-sm w-full px-sm py-2">
              <span className="material-symbols-outlined text-white/80">location_on</span>
              <input
                className="w-full bg-transparent border-none focus:ring-0 text-white placeholder:text-white/70 font-body-md h-[44px]"
                placeholder="Location (e.g. Douala, Yaoundé)"
                type="text"
              />
            </div>
            <button className="w-full md:w-auto bg-white text-primary font-label-lg px-xl py-3 rounded-xl hover:bg-white/90 transition-colors h-[44px]">
              Search
            </button>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/70 animate-bounce">
          <span className="material-symbols-outlined">expand_more</span>
        </div>

      </section>

      {/* Categories */}
      <section className="w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-md">
        <div className="flex gap-sm overflow-x-auto pb-xs scrollbar-hide">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={
                i === 0
                  ? "whitespace-nowrap px-md py-2 rounded-full bg-primary-container text-on-primary-fixed font-label-lg border border-transparent"
                  : "whitespace-nowrap px-md py-2 rounded-full bg-surface-container-lowest border border-outline-variant text-on-surface-variant font-label-lg hover:border-primary hover:text-primary transition-colors"
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-lg">
        <div className="flex justify-between items-end mb-md">
          <h2 className="font-headline-lg text-headline-lg">Trending Now</h2>
          <a className="font-label-lg text-primary hover:underline" href="#">
            View All
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter h-[600px]">
          <div className="md:col-span-8 h-full">
            <EventCard event={trendingEvents[0]} size="large" />
          </div>
          <div className="md:col-span-4 flex flex-col gap-gutter h-full">
            {trendingEvents.slice(1).map((event) => (
              <div key={event.id} className="flex-1">
                <EventCard event={event} size="small" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
