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

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<DashboardData>(() => {
        const saved = localStorage.getItem("dashboardData")
        if (saved) {
            try {
                const parsed = JSON.parse(saved)

                return {
                    ...initialState, // Ensure all keys exist
                    ...parsed,
                    lastUpdated: parsed.lastUpdated ? new Date(parsed.lastUpdated) : null
                }
            } catch (error) {
                console.error("Failed to parse local storage data:", error)
            }
        }
        return initialState
    })
    const [isLoading, setIsLoading] = useState(false)

    React.useEffect(() => {
        localStorage.setItem("dashboardData", JSON.stringify(data))
    }, [data])

    const setManifests = (manifests: Manifest[]) => {
        setData((prev) => ({ ...prev, manifests, lastUpdated: new Date() }))
    }

    const setFreightMargins = (margins: FreightMargin[]) => {
        setData((prev) => ({ ...prev, freightMargins: margins, lastUpdated: new Date() }))
    }

    const setPeople = (people: Person[]) => {
        setData((prev) => ({ ...prev, people, lastUpdated: new Date() }))
    }

    const setVehicleStatus = (status: VehicleStatus[]) => {
        setData((prev) => ({ ...prev, vehicleStatus: status, lastUpdated: new Date() }))
    }

    const refreshData = () => {
        const saved = localStorage.getItem("dashboardData")
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                setData({
                    ...initialState, // Ensure all keys exist
                    ...parsed,
                    lastUpdated: parsed.lastUpdated ? new Date(parsed.lastUpdated) : null
                })
            } catch (error) {
                console.error("Failed to parse local storage data:", error)
            }
        } else {
            setData(initialState)
        }
    }

    const resetData = () => {
        setData(initialState)
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
