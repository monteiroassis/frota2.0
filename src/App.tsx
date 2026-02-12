import { BrowserRouter, Routes, Route } from "react-router-dom"
import { DashboardProvider } from "@/contexts/DashboardContext"
import MainLayout from "@/layouts/MainLayout"
import Dashboard from "@/pages/Dashboard"
import ImportPage from "@/pages/Import"
import Trips from "@/pages/Trips"
import Fleet from "@/pages/Fleet"
import Availability from "@/pages/Availability" // Added import for Availability

function App() {
  return (
    <DashboardProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="importar" element={<ImportPage />} />
            <Route path="viagens" element={<Trips />} />
            <Route path="frota" element={<Fleet />} />
            <Route path="disponibilidade" element={<Availability />} /> {/* Added route for Availability */}
          </Route>
        </Routes>
      </BrowserRouter>
    </DashboardProvider>
  )
}

export default App
