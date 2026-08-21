import { HeroMarquee } from "../../../components/ui/HeroMarquee"
import { EventCard, type Event } from "../components/EventCard"
import { useState, useEffect } from "react"
import ApiService from "../../../services/ApiService"



const heroImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAoJ0PTyjGAhyPEB5-3JU3U0HEZwIEXDNtJfjc5MsjFQbU2KqklgvWK1H7MqyECUC8SjwIJtIuTKJHx-A5sW_UTHDYw8RIv35dOIZzCD6jQJpKkYhyz-3Y8HZH5hC-7kWjeU6fJGwKvithUVkiFe5meEe5NYaTYxmptQbf3YOR3n0m5DwyAd8THPLTyZmTkd5ahWiuDFShZlphOPNVhRAj6rxhkdhpzeXL-21zHUHaqZje9HvGsJ1kW",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA379-pq3mQ9BQfxUkxpVAVuf-VCkbyhlYEIvD3lRc1ZiYRw6t2lbd_orSccyQMpX_5BPvAZUG7DMArAhptBTrNd5w4pxZz7G9k50juVvLCIggBY4_tyAgs5ICGx23678x_tqrAfnozSysLGkp1BV3WYO5kFicp8YbRYDIIqvc-U8KPyzBis2GIT4TEUBEJBHAKFkS1jidXA8caCjw_AO7oOUB0vTFjTGXbmlG8d0TpQDAHT5WdDKKt",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuATZJWfDrz2HRBI4SGFKiVyKGJwBewF7SP_jNTICANKP8uHmW9FlqN6ECS3GVM2Rynx1tBQRsLQrbqk7dFvyyIk2yOULiQ1xx-ac1pbYAJqVaa5Pyb2W5z_bZiYl7J-8CoglX-Rpw5MIWEWjGz8n9Df4QZUEC_mNmJWZkRW5cul0Q-_5vfXLeAHAKDPqkVa33BFA50_wvcGC4kuCkmDx67d-g7xj4AyxTsvZlmBQ-Mtc3GZBmYdhpVO",
]

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



export function DiscoverPage() {

  const [allEvents, setAllEvents] = useState<Event[]>([])

  useEffect(() => {
    ApiService.allEvents().then(setAllEvents)
  }, [])
  const trendingEvents: Event[] = allEvents.slice(-3);

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
            {trendingEvents[0] && <EventCard event={trendingEvents[0]} size="large" />}          </div>
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
