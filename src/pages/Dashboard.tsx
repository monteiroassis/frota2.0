import { useDashboard } from "@/contexts/DashboardContext"
import React from "react"
import { KPICards } from "@/components/dashboard/KPICards"
import { ClientMetrics } from "@/components/dashboard/ClientMetrics"
import { DashboardCharts } from "@/components/dashboard/DashboardCharts"
import { calculateGeneralMetrics } from "@/lib/group-utils"
import {
    prepareRouteMarginChart,
    prepareFleetProfitChart,
    prepareRevenueCostChart,
    prepareScatterChart,
    prepareTopProfitableTripsChart // New import
} from "@/lib/dashboard-utils"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Upload, BarChart2 } from "lucide-react"
import { generateMockData } from "@/lib/mock-data"
import { AutoRefreshControl } from "@/components/common/AutoRefreshControl"

const Dashboard = () => {
    const { data, setManifests, setFreightMargins, setPeople } = useDashboard()

    // Auto-refresh logic handled by AutoRefreshControl component

    const hasData = data.manifests.length > 0 || data.freightMargins.length > 0

    const handleLoadDemo = () => {
        const mock = generateMockData()
        setManifests(mock.manifests)
        setFreightMargins(mock.freightMargins)
        setPeople(mock.people)
    }

    if (!hasData) {
        return (
            <div className="flex flex-col items-center justify-center h-[500px] space-y-6">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Seja bem-vindo, André!</h2>
                    <p className="text-muted-foreground max-w-[500px]">
                        Para visualizar o painel, importe seus dados ou carregue um exemplo.
                    </p>
                </div>

                <div className="flex gap-4">
                    <Link to="/importar">
                        <Button className="bg-primary hover:bg-green-700 text-white shadow-lg shadow-green-200/50 h-12 px-8 rounded-xl text-base">
                            <Upload className="mr-2 h-5 w-5" />
                            Importar Dados
                        </Button>
                    </Link>
                    <Button variant="outline" onClick={handleLoadDemo} className="h-12 px-8 rounded-xl text-base border-gray-200 hover:bg-gray-50 text-gray-700">
                        <BarChart2 className="mr-2 h-5 w-5" />
                        Carregar Exemplo
                    </Button>
                </div>
            </div>
        )
    }

    const generalMetrics = calculateGeneralMetrics(data.freightMargins) // Or calculate from manifests if preferred
    const routeMarginData = prepareRouteMarginChart(data)
    const fleetProfitData = prepareFleetProfitChart(data)
    const revenueCostData = prepareRevenueCostChart(data)
    const scatterData = prepareScatterChart(data)
    const topTripsData = prepareTopProfitableTripsChart(data) // Calculate top trips

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h2>
                    <p className="text-gray-500 mt-1">Visão geral da operação da sua frota.</p>
                </div>
                <AutoRefreshControl />
            </div>

            {/* KPI Cards */}
            <KPICards metrics={generalMetrics} />

            {/* Client Metrics (Gestamp vs Others) */}
            <ClientMetrics data={data.freightMargins} />

            {/* Main Charts Area */}
            <DashboardCharts
                routeMarginData={routeMarginData}
                fleetProfitData={fleetProfitData}
                topTripsData={topTripsData} // Pass new data
                scatterData={scatterData}
                revenueCostData={revenueCostData} // Kept for interface compatibility if needed, but unused
            />
        </div>
    )
}

export default Dashboard
