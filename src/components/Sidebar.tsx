import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, Truck, Upload, Map, Calendar } from "lucide-react"
import { useDashboard } from "@/contexts/DashboardContext"
import { cn } from "@/lib/utils"

const Sidebar = () => {
    const location = useLocation()

    const links = [
        { href: "/", label: "Dashboard", icon: LayoutDashboard },
        { href: "/disponibilidade", label: "Disponibilidade", icon: Truck },
        { href: "/viagens", label: "Viagens", icon: Map }, // Renamed to match user request
        { href: "/importar", label: "Importar Dados", icon: Upload }, // Keep this one
    ]

    const { data } = useDashboard()

    return (
        <div className="sticky top-0 flex flex-col w-64 h-screen bg-white border-r border-border p-4 overflow-y-auto shrink-0">
            {/* Brand */}
            <div className="flex items-center gap-2 mb-8 px-2">
                <img src="/logo.svg" alt="Desksolution Logo" className="h-10 w-auto" />
            </div>

            {/* Last Import Info */}
            <div className="mb-6 p-3 bg-blue-50 rounded-xl border border-blue-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                    <Calendar size={18} />
                </div>
                <div className="overflow-hidden">
                    <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">Última Importação</p>
                    <p className="text-xs font-medium truncate text-blue-900">
                        {data.lastUpdated ? data.lastUpdated.toLocaleString() : "Sem dados"}
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1">
                {links.map((link) => {
                    const Icon = link.icon
                    const isActive = location.pathname === link.href
                    return (
                        <Link
                            key={link.href}
                            to={link.href}
                            className={cn(
                                "flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                                isActive
                                    ? "bg-primary text-white shadow-md shadow-green-200"
                                    : "text-gray-500 hover:bg-slate-50 hover:text-gray-900"
                            )}
                        >
                            <Icon className={cn("w-5 h-5 mr-3", isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600")} />
                            {link.label}
                        </Link>
                    )
                })}
            </nav>

            <div className="mt-auto px-2">
                <p className="text-xs text-muted-foreground">&copy; Desksolution 2026</p>
            </div>
        </div>
    )
}

export default Sidebar
