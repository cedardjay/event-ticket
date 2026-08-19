import { BrowserRouter, Routes, Route } from "react-router-dom"
import { PublicLayout } from "./components/layout/PublicLayout"
import { DiscoverPage } from "./features/event/DiscoverPage"

// Admin pages + AdminLayout get added here later, behind a protected route wrapper.

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<DiscoverPage />} />
          {/* <Route path="/events" element={<EventListPage />} /> */}
          {/* <Route path="/events/:id" element={<EventDetailsPage />} /> */}
          {/* <Route path="/checkout/:id" element={<CheckoutPage />} /> */}
          {/* <Route path="/ticket/:id" element={<TicketConfirmationPage />} /> */}
        </Route>

        {/* <Route path="/admin/login" element={<AdminLoginPage />} /> */}
        {/* <Route element={<ProtectedAdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<DashboardPage />} />
          </Route>
        </Route> */}
      </Routes>
    </BrowserRouter>
  )
}
