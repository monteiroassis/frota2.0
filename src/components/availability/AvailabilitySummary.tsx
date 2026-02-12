import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { VehicleStatus } from "@/types"

interface AvailabilitySummaryProps {
    data: VehicleStatus[]
}

export const AvailabilitySummary = ({ data }: AvailabilitySummaryProps) => {
    // Group by status
    const statusCounts = data.reduce((acc, match) => {
        const status = match.operacao || "DESCONHECIDO"
        acc[status] = (acc[status] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    // Sort by count descending
    const sortedStatus = Object.entries(statusCounts).sort((a, b) => b[1] - a[1])

    return (
        <Card className="bg-white border-0 shadow-sm rounded-xl h-full">
            <CardHeader className="pb-3 border-b border-gray-100">
                <CardTitle className="text-lg font-bold text-center">Resumo da Frota</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 px-2">
                <div className="space-y-3">
                    {sortedStatus.map(([status, count]) => (
                        <div key={status} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                            <span className="text-sm font-medium text-gray-700">{status}</span>
                            <span className="text-lg font-bold text-slate-900 bg-white px-3 py-1 rounded shadow-sm min-w-[3rem] text-center border">
                                {count}
                            </span>
                        </div>
                    ))}

                    <div className="mt-8 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900 text-white shadow-lg">
                            <span className="font-medium">TOTAL FROTA</span>
                            <span className="text-2xl font-bold">{data.length}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
