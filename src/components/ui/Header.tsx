import { useState } from "react"
import { NavLink, Link } from "react-router-dom"
import { SideNav } from "./SideNav"

const pillLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? "text-primary bg-surface font-label-lg px-4 py-1.5 rounded-full shadow-sm"
    : "text-on-surface-variant font-label-lg px-4 py-1.5 rounded-full hover:text-primary transition-colors"

export function Header() {
  const [navOpen, setNavOpen] = useState(false)

  return (
    <>
      <header className="bg-surface/70 backdrop-blur-xl fixed top-0 w-full z-50 border-b border-outline-variant/60 supports-[backdrop-filter]:bg-surface/60">
        <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16 w-full max-w-7xl mx-auto">
          <Link to="/" className="font-display-lg text-display-lg-mobile text-primary tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Event-Ticket
          </Link>

          <nav className="hidden lg:flex items-center gap-1 bg-on-surface/[0.03] border border-outline-variant/50 rounded-full px-1 py-1">
            <NavLink to="/" end className={pillLinkClass}>
              Discover
            </NavLink>
            <NavLink to="/events" className={pillLinkClass}>
              Events
            </NavLink>
            <NavLink to="/organizers" className={pillLinkClass}>
              Organizers
            </NavLink>
          </nav>

          <div className="hidden lg:flex items-center gap-sm">
            <Link
              to="/admin/login"
              className="font-label-lg text-primary px-4 py-2 rounded-full hover:bg-primary/5 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/become-organizer"
              className="font-label-lg text-on-primary bg-primary px-5 py-2 rounded-full hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all"
            >
              Become an Organizer
            </Link>
          </div>

          <button
            onClick={() => setNavOpen(true)}
            className="lg:hidden text-primary w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/5 transition-colors"
            aria-label="Open menu"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </header>

      <SideNav open={navOpen} onClose={() => setNavOpen(false)} />
    </>
  )
}
