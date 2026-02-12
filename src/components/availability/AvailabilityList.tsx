import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { VehicleStatus } from "@/types"
import { Badge } from "@/components/ui/badge"

interface AvailabilityListProps {
    data: VehicleStatus[]
    title: string
}

export const AvailabilityList = ({ data, title }: AvailabilityListProps) => {
    const getStatusColor = (status: string) => {
        const s = status.toUpperCase()
        if (s.includes("CARREGADA")) return "bg-green-100 text-green-800 hover:bg-green-100"
        if (s.includes("MATRIZ")) return "bg-blue-100 text-blue-800 hover:bg-blue-100"
        if (s.includes("MANUTENÇÃO") || s.includes("OFICINA")) return "bg-red-100 text-red-800 hover:bg-red-100"
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-900">{title}</h3>
                <p className="text-xs text-muted-foreground">{data.length} veículos</p>
            </div>
            <div className="max-h-[600px] overflow-y-auto">
                <Table>
                    <TableHeader className="sticky top-0 bg-white z-10 shadow-sm">
                        <TableRow>
                            <TableHead className="w-[150px]">Placa</TableHead>
                            <TableHead>Operação</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={index} className="hover:bg-gray-50/50">
                                <TableCell className="font-medium font-mono text-xs">{item.placa}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className={getStatusColor(item.operacao)}>
                                        {item.operacao}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
