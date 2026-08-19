import { Link } from "react-router-dom"

type SideNavProps = {
  open: boolean
  onClose: () => void
}

const navLinks = [
  { to: "/", label: "Discover" },
  { to: "/events", label: "Events" },
  { to: "/organizers", label: "Organizers" },
]

export function SideNav({ open, onClose }: SideNavProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      {/* Panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-surface-container-lowest z-50 shadow-2xl border-l border-outline-variant/60
        transform transition-transform duration-300 ease-out md:hidden
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between h-16 px-md border-b border-outline-variant/60">
          <span className="flex items-center gap-2 font-display-lg-mobile text-primary">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            <span>EvenTicket</span>
          </span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="text-on-surface-variant w-9 h-9 flex items-center justify-center rounded-full hover:bg-on-surface/5 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav className="flex flex-col p-md gap-1">
          {navLinks.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={onClose}
              className={`font-label-lg px-3 py-2.5 rounded-xl transition-colors ${
                i === 0
                  ? "text-primary bg-primary/10"
                  : "text-on-surface-variant hover:text-primary hover:bg-primary/5"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="flex flex-col gap-sm mt-lg pt-md border-t border-outline-variant/60">
            <Link
              to="/admin/login"
              onClick={onClose}
              className="text-center font-label-lg text-primary px-4 py-2.5 rounded-full hover:bg-primary/5 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/become-organizer"
              onClick={onClose}
              className="text-center font-label-lg text-on-primary bg-primary px-4 py-2.5 rounded-full hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all"
            >
              Become an Organizer
            </Link>
          </div>
        </nav>
      </aside>
    </>
  )
}