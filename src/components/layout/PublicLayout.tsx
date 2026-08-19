import { Outlet } from "react-router-dom"
import { Header } from "../ui/Header"
import { Footer } from "../ui/Footer"

export function PublicLayout() {
  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen">
      <Header />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
