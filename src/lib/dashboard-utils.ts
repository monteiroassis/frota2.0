import { Manifest, Person, DashboardData } from "@/types"

export const calculateKPIs = (data: DashboardData) => {
    const { manifests } = data

    const totalRevenue = manifests.reduce((sum, m) => sum + m.receitaTransportada, 0)
    const totalProfit = manifests.reduce((sum, m) => sum + m.valorLucro, 0)
    const totalCost = manifests.reduce((sum, m) => sum + m.custoTotal, 0)
    const totalKM = manifests.reduce((sum, m) => sum + m.kmRodado, 0)

    const avgMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0
    const costPerKM = totalKM > 0 ? totalCost / totalKM : 0

    return {
        totalRevenue,
        totalProfit,
        avgMargin,
        costPerKM,
    }
}

export const prepareRouteMarginChart = (data: DashboardData) => {
    const { manifests } = data
    const routeStats: { [key: string]: { profit: number; count: number } } = {}

    manifests.forEach((m) => {
        const route = `${m.cidadeOrigem} -> ${m.cidadeDestino}`
        if (!routeStats[route]) {
            routeStats[route] = { profit: 0, count: 0 }
        }
        routeStats[route].profit += m.valorLucro
        routeStats[route].count += 1
    })

    // Convert to array and sort by profit (top 10)
    return Object.entries(routeStats)
        .map(([route, stats]) => ({
            name: route,
            value: stats.profit,
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 10)
}

export const prepareFleetProfitChart = (data: DashboardData) => {
    const { manifests, people } = data
    const vehicleStats: { [key: string]: number } = {} // Fix: explicit type to avoid TS7053

    // Create a map for quick lookup of person type
    const personTypeMap = new Map<string, "Agregado" | "Frota Própria">()
    people.forEach((p) => {
        if (p.nome) personTypeMap.set(p.nome.toLowerCase(), p.tipo)
    })

    manifests.forEach((m) => {
        // Try to find driver in people list
        const driverName = m.motorista.toLowerCase()
        const type = personTypeMap.get(driverName) || "Frota Própria" // Default to Frota Própria

        if (vehicleStats[type] !== undefined) {
            vehicleStats[type] += m.valorLucro
        } else {
            vehicleStats[type] = m.valorLucro // Initialize if undefined
        }
    })

    return Object.entries(vehicleStats).map(([name, value]) => ({ name, value }))
}

export const prepareTopProfitableTripsChart = (data: DashboardData) => {
    // Sort manifests by Profit (valorLucro) descending and take top 7
    return [...data.manifests]
        .filter(m => m.valorLucro && !isNaN(m.valorLucro)) // Filter out invalid profits
        .sort((a, b) => b.valorLucro - a.valorLucro)
        .slice(0, 7)
        .map(m => {
            const driverName = m.motorista ? m.motorista.split(' ')[0] : "Desconhecido";
            const fullName = m.motorista || "Motorista Desconhecido";
            const route = m.cidadeOrigem && m.cidadeDestino ? `${m.cidadeOrigem} -> ${m.cidadeDestino}` : "Rota Indefinida";
            const vehicle = m.veiculo || "N/A";

            return {
                name: driverName,
                fullName: fullName,
                route: route,
                vehicle: vehicle,
                value: m.valorLucro,
                margin: isNaN(m.margemPercentual) ? 0 : m.margemPercentual
            }
        })
}

export const prepareRevenueCostChart = (data: DashboardData) => {
    return data.manifests.slice(0, 20).map((m, index) => ({
        name: `Viagem ${index + 1}`,
        revenue: m.receitaTransportada,
        cost: m.custoTotal,
    }))
}

export const prepareScatterChart = (data: DashboardData) => {
    return data.manifests.map((m) => ({
        x: m.kmRodado, // KM
        y: m.custoTotal, // Cost (Proxy for fuel if strictly correlated, or total cost)
        z: m.veiculo, // Tooltip info
    }))
}
