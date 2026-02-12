import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FreightMargin } from "@/types"
import { cn } from "@/lib/utils"

interface ClientMetricsProps {
    data: FreightMargin[]
}

export const ClientMetrics = ({ data }: ClientMetricsProps) => {
    // Helper to calculate metrics
    const calculateMetrics = (items: FreightMargin[]) => {
        const fretes = items.length
        const receita = items.reduce((acc, curr) => acc + curr.valorFrete, 0)
        const despesas = items.reduce((acc, curr) => acc + curr.totalDespesas, 0)
        const margem = receita > 0 ? ((receita - despesas) / receita) * 100 : 0

        return { fretes, receita, despesas, margem }
    }

    // Filter Gestamp vs Others
    const gestampItems = data.filter(m =>
        (m.pagador || "").toLowerCase().includes("gestamp")
    )

    // Others are those that do NOT contain Gestamp
    const otherItems = data.filter(m =>
        !(m.pagador || "").toLowerCase().includes("gestamp")
    )

    const gestampMetrics = calculateMetrics(gestampItems)
    const otherMetrics = calculateMetrics(otherItems)

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val)

    const MetricRow = ({ label, value }: { label: string, value: string }) => (
        <div className="flex justify-between items-center py-1 border-b border-dashed border-yellow-500/30 last:border-0">
            <span className="text-sm font-medium">{label}:</span>
            <span className="text-lg font-bold">{value}</span>
        </div>
    )

    return (
        <div className="grid gap-6 md:grid-cols-2 mb-8">
            {/* Gestamp Card - Black Theme */}
            <Card className="bg-black text-yellow-400 border-yellow-400 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400/10 rounded-full -mr-12 -mt-12 blur-xl"></div>
                <CardHeader className="uppercase tracking-widest border-b border-yellow-400/20 pb-2">
                    <CardTitle className="text-center text-xl font-bold">GRUPO 01 - GESTAMP</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-2">
                    <MetricRow label="FRETES" value={gestampMetrics.fretes.toString()} />
                    <MetricRow label="RECEITAS" value={formatCurrency(gestampMetrics.receita)} />
                    <MetricRow label="DESPESAS" value={formatCurrency(gestampMetrics.despesas)} />
                    <MetricRow label="MARGEM" value={`${gestampMetrics.margem.toFixed(2)}%`} />
                </CardContent>
            </Card>

            {/* Others Card - Black Theme (as per image likely similar) */}
            <Card className="bg-black text-yellow-400 border-yellow-400 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400/10 rounded-full -mr-12 -mt-12 blur-xl"></div>
                <CardHeader className="uppercase tracking-widest border-b border-yellow-400/20 pb-2">
                    <CardTitle className="text-center text-xl font-bold">GRUPO 02 - OUTROS CLIENTES</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-2">
                    <MetricRow label="FRETES" value={otherMetrics.fretes.toString()} />
                    <MetricRow label="RECEITAS" value={formatCurrency(otherMetrics.receita)} />
                    <MetricRow label="DESPESAS" value={formatCurrency(otherMetrics.despesas)} />
                    <MetricRow label="MARGEM" value={`${otherMetrics.margem.toFixed(2)}%`} />
                </CardContent>
            </Card>
        </div>
    )
}
