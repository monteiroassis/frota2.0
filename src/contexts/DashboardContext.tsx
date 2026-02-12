import React, { createContext, useContext, useState, ReactNode } from "react"
import { Manifest, FreightMargin, Person, DashboardData } from "@/types"

interface DashboardContextType {
    data: DashboardData
    setManifests: (manifests: Manifest[]) => void
    setFreightMargins: (margins: FreightMargin[]) => void
    setPeople: (people: Person[]) => void
    setVehicleStatus: (status: VehicleStatus[]) => void
    isLoading: boolean
    setIsLoading: (loading: boolean) => void
    resetData: () => void
    refreshData: () => void
}

const initialState: DashboardData = {
    manifests: [],
    freightMargins: [],
    people: [],
    vehicleStatus: [],
    lastUpdated: null,
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

const API_URL = import.meta.env.VITE_API_URL || `${window.location.protocol}//${window.location.hostname}:5002/api`

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<DashboardData>(initialState)
    const [isLoading, setIsLoading] = useState(false)

    // Load initial data from API
    const refreshData = async () => {
        setIsLoading(true)
        try {
            const [manifests, margins, people, vehicleStatus] = await Promise.all([
                fetch(`${API_URL}/manifests`).then(res => res.json()),
                fetch(`${API_URL}/margins`).then(res => res.json()),
                fetch(`${API_URL}/people`).then(res => res.json()),
                fetch(`${API_URL}/vehicle-status`).then(res => res.json())
            ])

            setData({
                manifests: Array.isArray(manifests) ? manifests : [],
                freightMargins: Array.isArray(margins) ? margins : [],
                people: Array.isArray(people) ? people : [],
                vehicleStatus: Array.isArray(vehicleStatus) ? vehicleStatus : [],
                lastUpdated: new Date()
            })
        } catch (error) {
            console.error("Failed to fetch data from API:", error)
            // Fallback to local storage if API fails
            const saved = localStorage.getItem("dashboardData")
            if (saved) {
                try {
                    const parsed = JSON.parse(saved)
                    setData({
                        ...initialState,
                        ...parsed,
                        lastUpdated: parsed.lastUpdated ? new Date(parsed.lastUpdated) : null
                    })
                } catch (e) {
                    console.error("Local storage fallback failed:", e)
                }
            }
        } finally {
            setIsLoading(false)
        }
    }

    React.useEffect(() => {
        refreshData()
    }, [])

    const setManifests = async (manifests: Manifest[]) => {
        setIsLoading(true)
        try {
            await fetch(`${API_URL}/manifests`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(manifests)
            })
            setData((prev) => ({ ...prev, manifests, lastUpdated: new Date() }))
        } catch (error) {
            console.error("Failed to save manifests:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const setFreightMargins = async (margins: FreightMargin[]) => {
        setIsLoading(true)
        try {
            await fetch(`${API_URL}/margins`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(margins)
            })
            setData((prev) => ({ ...prev, freightMargins: margins, lastUpdated: new Date() }))
        } catch (error) {
            console.error("Failed to save margins:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const setPeople = async (people: Person[]) => {
        setIsLoading(true)
        try {
            await fetch(`${API_URL}/people`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(people)
            })
            setData((prev) => ({ ...prev, people, lastUpdated: new Date() }))
        } catch (error) {
            console.error("Failed to save people:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const setVehicleStatus = async (status: VehicleStatus[]) => {
        setIsLoading(true)
        try {
            await fetch(`${API_URL}/vehicle-status`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(status)
            })
            setData((prev) => ({ ...prev, vehicleStatus: status, lastUpdated: new Date() }))
        } catch (error) {
            console.error("Failed to save vehicle status:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const resetData = () => {
        setData(initialState)
        localStorage.removeItem("dashboardData")
    }

    return (
        <DashboardContext.Provider
            value={{
                data,
                setManifests,
                setFreightMargins,
                setPeople,
                setVehicleStatus,
                isLoading,
                setIsLoading,
                resetData,
                refreshData,
            }}
        >
            {children}
        </DashboardContext.Provider>
    )
}

export const useDashboard = () => {
    const context = useContext(DashboardContext)
    if (context === undefined) {
        throw new Error("useDashboard must be used within a DashboardProvider")
    }
    return context
}
