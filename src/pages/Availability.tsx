import { useDashboard } from "@/contexts/DashboardContext"
import { AvailabilityList } from "@/components/availability/AvailabilityList"
import { AvailabilitySummary } from "@/components/availability/AvailabilitySummary"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Upload } from "lucide-react"
import { AutoRefreshControl } from "@/components/common/AutoRefreshControl"

const Availability = () => {
    const { data } = useDashboard()
    const { vehicleStatus } = data

    if (!vehicleStatus || vehicleStatus.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[500px] space-y-6 animate-in fade-in duration-500">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Nenhum dado de disponibilidade</h2>
                    <p className="text-muted-foreground max-w-[500px]">
                        Importe o arquivo "GERAL 2025.xlsx - TV 01 - RECADOS.csv" para visualizar o status da frota.
                    </p>
                </div>
                <Link to="/importar">
                    <Button className="bg-primary hover:bg-green-700 text-white shadow-lg shadow-green-200/50 h-12 px-8 rounded-xl text-base">
                        <Upload className="mr-2 h-5 w-5" />
                        Importar Disponibilidade
                    </Button>
                </Link>
            </div>
        )
    }

    // Split data into two lists (left and right) for the UI
    const half = Math.ceil(vehicleStatus.length / 2)
    const leftList = vehicleStatus.slice(0, half)
    const rightList = vehicleStatus.slice(half)

    return (
        <div className="space-y-4 animate-in fade-in duration-500 h-[calc(100vh-2rem)] flex flex-col">
            <div className="flex items-center justify-between shrink-0">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Disponibilidade da Frota</h2>
                    <p className="text-gray-500">
                        Última atualização: {data.lastUpdated ? data.lastUpdated.toLocaleString() : "N/A"}
                    </p>
                </div>
                <AutoRefreshControl />
            </div>

            <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">
                {/* Left Column - List 1 */}
                <div className="col-span-4 h-full overflow-hidden">
                    <AvailabilityList data={leftList} title="Frota - Grupo A" />
                </div>

                {/* Center Column - Summary */}
                <div className="col-span-4 h-full overflow-hidden">
                    <AvailabilitySummary data={vehicleStatus} />
                </div>

                {/* Right Column - List 2 */}
                <div className="col-span-4 h-full overflow-hidden">
                    <AvailabilityList data={rightList} title="Frota - Grupo B" />
                </div>
            </div>
        </div>
    )
}

export default Availability
