import { useState } from "react"
import { useDashboard } from "@/contexts/DashboardContext"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

const Trips = () => {
    const { data } = useDashboard()
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null)
    const [filter, setFilter] = useState("")

    const handleSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc'

        // Default to descending for numeric columns
        if (['receitaTransportada', 'custoTotal', 'valorLucro', 'margem'].includes(key)) {
            direction = 'desc'
        }

        if (sortConfig && sortConfig.key === key) {
            direction = sortConfig.direction === 'asc' ? 'desc' : 'asc'
        }
        setSortConfig({ key, direction })
    }

    const filteredManifests = (data.manifests || []).filter((m) =>
        (m.motorista || "").toLowerCase().includes(filter.toLowerCase()) ||
        (m.veiculo || "").toLowerCase().includes(filter.toLowerCase()) ||
        (m.cidadeOrigem || "").toLowerCase().includes(filter.toLowerCase()) ||
        (m.cidadeDestino || "").toLowerCase().includes(filter.toLowerCase())
    )

    const sortedManifests = [...filteredManifests].sort((a, b) => {
        if (!sortConfig) return 0

        const { key, direction } = sortConfig

        let aValue: any = a[key as keyof typeof a]
        let bValue: any = b[key as keyof typeof b]

        // Handle calculated margin since it's not directly on the object
        if (key === 'margem') {
            aValue = a.receitaTransportada > 0 ? (a.valorLucro / a.receitaTransportada) * 100 : 0
            bValue = b.receitaTransportada > 0 ? (b.valorLucro / b.receitaTransportada) * 100 : 0
        }

        // Handle string comparisons safely
        if (typeof aValue === 'string') aValue = aValue.toLowerCase()
        if (typeof bValue === 'string') bValue = bValue.toLowerCase()

        // Handle null/undefined
        if (aValue === null || aValue === undefined) aValue = ''
        if (bValue === null || bValue === undefined) bValue = ''

        if (aValue < bValue) {
            return direction === 'asc' ? -1 : 1
        }
        if (aValue > bValue) {
            return direction === 'asc' ? 1 : -1
        }
        return 0
    })

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val)

    const SortIcon = ({ columnKey }: { columnKey: string }) => {
        if (sortConfig?.key !== columnKey) return <ArrowUpDown className="ml-2 h-4 w-4" />
        return sortConfig.direction === 'asc' ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Relatório de Viagens</h2>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Relatório Detalhado</CardTitle>
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input
                            placeholder="Filtrar por motorista, veículo ou cidade..."
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="max-w-sm"
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="cursor-pointer hover:bg-slate-50" onClick={() => handleSort('motorista')}>
                                        <div className="flex items-center">Motorista <SortIcon columnKey="motorista" /></div>
                                    </TableHead>
                                    <TableHead className="cursor-pointer hover:bg-slate-50" onClick={() => handleSort('veiculo')}>
                                        <div className="flex items-center">Veículo <SortIcon columnKey="veiculo" /></div>
                                    </TableHead>
                                    <TableHead>Origem</TableHead>
                                    <TableHead>Destino</TableHead>
                                    <TableHead className="text-right cursor-pointer hover:bg-slate-50" onClick={() => handleSort('receitaTransportada')}>
                                        <div className="flex items-center justify-end">Receita <SortIcon columnKey="receitaTransportada" /></div>
                                    </TableHead>
                                    <TableHead className="text-right cursor-pointer hover:bg-slate-50" onClick={() => handleSort('custoTotal')}>
                                        <div className="flex items-center justify-end">Custo <SortIcon columnKey="custoTotal" /></div>
                                    </TableHead>
                                    <TableHead className="text-right cursor-pointer hover:bg-slate-50" onClick={() => handleSort('valorLucro')}>
                                        <div className="flex items-center justify-end">Lucro <SortIcon columnKey="valorLucro" /></div>
                                    </TableHead>
                                    <TableHead className="text-right cursor-pointer hover:bg-slate-50" onClick={() => handleSort('margem')}>
                                        <div className="flex items-center justify-end">Margem % <SortIcon columnKey="margem" /></div>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sortedManifests.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="h-24 text-center">
                                            Nenhum resultado encontrado.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    sortedManifests.map((m, index) => {
                                        const marginPercent = m.receitaTransportada > 0
                                            ? (m.valorLucro / m.receitaTransportada) * 100
                                            : 0

                                        const isLowMargin = marginPercent < 10

                                        return (
                                            <TableRow key={index} className={cn(isLowMargin ? "bg-red-50 dark:bg-red-900/10" : "")}>
                                                <TableCell className="font-medium">{m.motorista}</TableCell>
                                                <TableCell>{m.veiculo}</TableCell>
                                                <TableCell>{m.cidadeOrigem}</TableCell>
                                                <TableCell>{m.cidadeDestino}</TableCell>
                                                <TableCell className="text-right">{formatCurrency(m.receitaTransportada)}</TableCell>
                                                <TableCell className="text-right">{formatCurrency(m.custoTotal)}</TableCell>
                                                <TableCell className="text-right font-bold">{formatCurrency(m.valorLucro)}</TableCell>
                                                <TableCell className={cn("text-right", isLowMargin ? "text-red-600 font-bold" : "")}>
                                                    {marginPercent.toFixed(2)}%
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Trips
