export function Footer() {
  const links = [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Support", href: "#" },
    { label: "Contact", href: "#" },
  ]

  return (
    <footer className="bg-surface-container-highest border-t border-outline-variant/60 mt-xl">
      <div className="flex flex-col md:flex-row justify-between items-center gap-md py-lg px-margin-desktop max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-headline-md text-headline-md text-on-surface">
          <span className="w-2 h-2 rounded-full bg-primary bg-primary"></span>
          <span>Event-Ticket</span>
        </div>

        <div className="flex flex-wrap justify-center gap-1 bg-on-surface/[0.03] border border-outline-variant/50 rounded-full px-1 py-1">
          {links.map((link) => (
            <a key={link.label}
              href={link.href}
              className="font-body-md text-on-surface-variant px-4 py-1.5 rounded-full hover:text-primary hover:bg-surface transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <p className="font-body-md text-body-md text-primary/80">
          © 2024 Event-Ticket. Built for Cameroon.
        </p>
      </div>
    </footer >
  )
}