import { Card, CardContent } from "@/components/ui/card"
import { GroupMetric } from "@/lib/group-utils"
import { Badge } from "@/components/ui/badge" // We might need to create this or use a div
// Creating inline Badge style since we didn't add the component yet
import { cn } from "@/lib/utils"

// Helper for currency
const formatCurrency = (val: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val)

export const GroupCard = ({ group }: { group: GroupMetric }) => {
    return (
        <Card className="mb-3 hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg truncate">{group.name}</h3>
                        <span className={cn(
                            "px-2 py-0.5 rounded-full text-xs font-medium",
                            group.margemPercentual >= 30 ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        )}>
                            {group.margemPercentual.toFixed(1)}%
                        </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{group.fretes} Fretes realizados</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full md:w-auto">
                    <div className="text-left md:text-right">
                        <p className="text-xs text-muted-foreground uppercase">Receita</p>
                        <p className="font-bold text-green-600">{formatCurrency(group.receita)}</p>
                    </div>
                    <div className="text-left md:text-right">
                        <p className="text-xs text-muted-foreground uppercase">Despesas</p>
                        <p className="font-bold text-red-600">{formatCurrency(group.despesas)}</p>
                    </div>
                    <div className="text-left md:text-right hidden md:block">
                        <p className="text-xs text-muted-foreground uppercase">Lucro</p>
                        <p className="font-bold text-primary">{formatCurrency(group.margem)}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
