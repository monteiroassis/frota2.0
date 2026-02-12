import { Button } from "@/components/ui/button"
import { useAutoRefresh } from "@/hooks/useAutoRefresh"

export const AutoRefreshControl = () => {
    const { refreshInterval, setRefreshInterval } = useAutoRefresh()

    return (
        <div className="flex gap-2 items-center">
            <select
                className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(Number(e.target.value))}
            >
                <option value={0}>Auto Refresh: Desligado</option>
                <option value={5000}>5 segundos</option>
                <option value={10000}>10 segundos</option>
            </select>

            <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
                Atualizar Agora
            </Button>
        </div>
    )
}
