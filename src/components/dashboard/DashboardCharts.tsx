import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, TrendingUp } from "lucide-react"

interface TopTrip {
    name: string
    fullName: string
    route: string
    vehicle: string
    value: number
    margin: number
}

interface ChartsProps {
    routeMarginData: any[]
    fleetProfitData: any[]
    topTripsData: TopTrip[] // New Prop
    scatterData: any[]
}

const COLORS = ["#22c55e", "#ef4444", "#eab308", "#3b82f6"]

export const DashboardCharts = ({
    routeMarginData,
    fleetProfitData,
    topTripsData, // Used instead of revenueCostData
}: ChartsProps) => {

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length && payload[0].payload) {
            const data = payload[0].payload;
            return (
                <div className="bg-white p-3 border border-slate-100 shadow-xl rounded-lg text-sm">
                    <p className="font-bold text-gray-900 mb-1">{data.fullName || "N/A"}</p>
                    <p className="text-gray-600"><span className="font-semibold">Rota:</span> {data.route || "N/A"}</p>
                    <p className="text-gray-600"><span className="font-semibold">Veículo:</span> {data.vehicle || "N/A"}</p>
                    <p className="text-green-600 mt-2 font-bold text-base">
                        Lucro: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.value || 0)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Margem: {(data.margin || 0).toFixed(2)}%</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="grid gap-6 md:grid-cols-2">
            {/* Top Profitable Trips Chart (Replacing Fluxo de Caixa) */}
            <Card className="shadow-sm border-0">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        <CardTitle className="text-lg font-bold text-gray-800">Top Viagens (Maior Lucro)</CardTitle>
                    </div>
                    <div className="flex gap-1 bg-slate-50 p-1 rounded-lg">
                        <Button variant="ghost" size="sm" className="h-7 text-xs px-2 text-gray-400">Recentes</Button>
                        <Button variant="outline" size="sm" className="h-7 text-xs px-2 bg-white text-gray-800 shadow-sm border-slate-200">Top 7</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="h-[350px] w-full min-h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={topTripsData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                barGap={8}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                                    tickFormatter={(value) => `R$${value / 1000}k`}
                                />
                                <Tooltip cursor={{ fill: '#f1f5f9', radius: 4 }} content={<CustomTooltip />} />
                                <Bar
                                    dataKey="value"
                                    fill="#22c55e"
                                    radius={[6, 6, 0, 0]}
                                    barSize={32}
                                    name="Lucro"
                                >
                                    {
                                        topTripsData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index < 3 ? '#16a34a' : '#22c55e'} />
                                        ))
                                    }
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Saldos Chart (Pie/Distribution) */}
            <Card className="shadow-sm border-0">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-bold text-gray-800">Distribuição de Lucro (Frota)</CardTitle>
                    <Clock className="w-5 h-5 text-gray-400" />
                </CardHeader>
                <CardContent>
                    <div className="h-[350px] w-full min-h-[350px] flex flex-col items-center justify-center">
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={fleetProfitData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {fleetProfitData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="mt-4 w-full space-y-3 px-4">
                            {fleetProfitData.slice(0, 3).map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between text-sm group cursor-default">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                                        <span className="text-gray-600 font-medium group-hover:text-gray-900 transition-colors">{item.name}</span>
                                    </div>
                                    <span className="font-bold text-gray-900 bg-slate-50 px-2 py-1 rounded-md">R$ {item.value.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
