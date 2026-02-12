import Papa from "papaparse"
import { Manifest, FreightMargin, Person, VehicleStatus } from "@/types"

// Helper to parse Brazilian number format (e.g., "1.733,350" -> 1733.35)
export const parseBrazilianNumber = (value: string | number | undefined): number => {
    if (typeof value === "number") return value
    if (!value) return 0

    // Remove thousands separator (.) and replace decimal separator (,) with (.)
    const cleanValue = value.replace(/\./g, "").replace(",", ".")
    const parsed = parseFloat(cleanValue)
    return isNaN(parsed) ? 0 : parsed
}

export const parseManifests = (file: File): Promise<Manifest[]> => {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            encoding: "ISO-8859-1",
            complete: (results) => {
                try {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const data = results.data.map((row: any) => ({
                        motorista: row["Motorista"] || row["Motorista/Veículo"] || "",
                        veiculo: row["Veículo"] || row["Veculo"] || row["Veculo"] || row["Placa"] || "",
                        cidadeOrigem: row["Cidade Origem"] || "",
                        cidadeDestino: row["Cidade Destino"] || "",
                        receitaTransportada: parseBrazilianNumber(row["Receita Transportada"] || row["Faturamento"] || "0"),
                        custoTotal: parseBrazilianNumber(row["Custo Total"] || row["Despesas"] || "0"),
                        valorLucro: parseBrazilianNumber(row["Valor"] || row["Valor (Lucro)"] || row["Lucro"] || "0"),
                        kmRodado: parseBrazilianNumber(row["km Rodado"] || row["KM"] || "0"),
                        data: new Date().toISOString(), // Placeholder if no date in row
                        cliente: row["Pagador"] || row["Cliente"] || row["Tomador"] || row["Destinatario"] || "Desconhecido",
                    }))
                    resolve(data)
                } catch (error) {
                    reject(error)
                }
            },
            error: (error) => reject(error),
        })
    })
}

export const parseFreightMargins = (file: File): Promise<FreightMargin[]> => {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            encoding: "ISO-8859-1",
            complete: (results) => {
                try {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const data = results.data.map((row: any) => ({
                        origem: row["Origem"] || "",
                        destino: row["Destino"] || "",
                        valorFrete: parseBrazilianNumber(row["Valor Frete"] || "0"),
                        totalDespesas: parseBrazilianNumber(row["Total Despesas"] || "0"),
                        margem: parseBrazilianNumber(row["Margem"] || "0"),
                        margemPercentual: parseBrazilianNumber(row["% Margem"] || "0"),
                        pagador: row["Pagador"] || "Desconhecido",
                    }))
                    resolve(data)
                } catch (error) {
                    reject(error)
                }
            },
            error: (error) => reject(error),
        })
    })
}

export const parsePeople = (file: File): Promise<Person[]> => {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            encoding: "ISO-8859-1",
            complete: (results) => {
                try {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const data = results.data.map((row: any) => ({
                        nome: row["Nome"] || row["Pessoa"] || "",
                        tipo: (row["Tipos"] && row["Tipos"].includes("Agregado")) ? "Agregado" : "Frota Própria",
                    }))
                    resolve(data)
                } catch (error) {
                    reject(error)
                }
            },
            error: (error) => reject(error),
        })
    })
}

export const parseVehicleStatus = (file: File): Promise<VehicleStatus[]> => {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: false, // We use index because of duplicate headers in A/B and F/G
            skipEmptyLines: true,
            encoding: "UTF-8",
            complete: (results) => {
                try {
                    const statusList: VehicleStatus[] = []
                    const now = new Date().toISOString()

                    // Skip header row usually index 0
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    results.data.slice(1).forEach((row: any) => {
                        // First pair: Column A (0) and B (1)
                        if (row[0] && row[1]) {
                            statusList.push({
                                placa: row[0],
                                operacao: row[1],
                                updated_at: now
                            })
                        }

                        // Second pair: Column F (5) and G (6)
                        if (row[5] && row[6]) {
                            statusList.push({
                                placa: row[5],
                                operacao: row[6],
                                updated_at: now
                            })
                        }
                    })

                    resolve(statusList)
                } catch (error) {
                    reject(error)
                }
            },
            error: (error) => reject(error),
        })
    })
}
