import { Outlet } from "react-router-dom"
import Sidebar from "@/components/Sidebar"

const MainLayout = () => {
    return (
        <div className="flex min-h-screen bg-background text-foreground">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <header className="h-16 border-b border-border flex items-center px-6 bg-card/50 backdrop-blur-sm z-10 sticky top-0">
                    <h2 className="text-lg font-semibold">Gestão de Frotas</h2>
                </header>
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default MainLayout
