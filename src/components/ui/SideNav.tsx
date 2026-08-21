import { NavLink} from "react-router-dom"

type SideNavProps = {
  open: boolean
  onClose: () => void
}

const sideLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? "font-label-lg text-primary bg-primary/5 px-4 py-3 rounded-xl"
    : "font-label-lg text-on-surface-variant px-4 py-3 rounded-xl hover:text-primary hover:bg-primary/5 transition-colors"

export function SideNav({ open, onClose }: SideNavProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity lg:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-surface/95 backdrop-blur-xl z-50 shadow-lg border-l border-outline-variant/60
        transform transition-transform duration-300 lg:hidden
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between h-16 px-md border-b border-outline-variant/60">
          <span className="font-display-lg-mobile text-primary flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Event-Ticket
          </span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="text-on-surface-variant w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/5 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav className="flex flex-col p-md gap-xs">
          <NavLink to="/" end onClick={onClose} className={sideLinkClass}>
            Discover
          </NavLink>
          <NavLink to="/events" onClick={onClose} className={sideLinkClass}>
            Events
          </NavLink>
          <NavLink to="/organizer" onClick={onClose} className={sideLinkClass}>
            Organizer
          </NavLink>

        </nav>
      </aside>
    </>
  )
}
