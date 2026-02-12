import { useState, useEffect } from "react"

export const useAutoRefresh = () => {
    const [refreshInterval, setRefreshInterval] = useState<number>(() => {
        const saved = localStorage.getItem("dashboard_refresh_interval")
        return saved ? Number(saved) : 0
    })

    useEffect(() => {
        localStorage.setItem("dashboard_refresh_interval", refreshInterval.toString())

        if (refreshInterval > 0) {
            const interval = setInterval(() => {
                window.location.reload()
            }, refreshInterval)
            return () => clearInterval(interval)
        }
    }, [refreshInterval])

    return { refreshInterval, setRefreshInterval }
}
