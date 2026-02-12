import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface KPICardsProps {
    metrics: {
        fretes: number
        receita: number
        despesas: number
        margemPercentual: number
    }
}

export const KPICards = ({ metrics }: KPICardsProps) => {
    const formatCurrency = (val: number) =>
        new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val)

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Fretes */}
            <Card className="bg-white border-0 shadow-sm rounded-xl">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Fretes</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-gray-900">{metrics.fretes}</div>

                </CardContent>
            </Card>

            {/* Receita */}
            <Card className="bg-white border-0 shadow-sm rounded-xl">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">Receita Total</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-gray-900">{formatCurrency(metrics.receita)}</div>

                </CardContent>
            </Card>

            {/* Despesas */}
            <Card className="bg-white border-0 shadow-sm rounded-xl">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">Despesas</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-gray-900">{formatCurrency(metrics.despesas)}</div>

                </CardContent>
            </Card>

            {/* Margem */}
            <Card className="bg-white border-0 shadow-sm rounded-xl">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">Margem Líquida</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className={cn("text-3xl font-bold", metrics.margemPercentual >= 30 ? "text-green-600" : "text-yellow-600")}>
                        {metrics.margemPercentual.toFixed(2)}%
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}
