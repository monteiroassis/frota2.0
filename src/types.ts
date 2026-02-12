export interface Manifest {
    motorista: string
    veiculo: string
    cidadeOrigem: string
    cidadeDestino: string
    receitaTransportada: number
    custoTotal: number
    valorLucro: number
    kmRodado: number
    data: string
    cliente?: string // Added for Gestamp vs Others analysis
}

export interface VehicleStatus {
    placa: string
    operacao: string
    updated_at: string
}

export interface FreightMargin {
    origem: string
    destino: string
    valorFrete: number
    totalDespesas: number
    margem: number
    margemPercentual: number
    pagador: string
}

export interface Person {
    nome: string
    tipo: "Agregado" | "Frota Própria"
}

export interface DashboardData {
    manifests: Manifest[]
    freightMargins: FreightMargin[]
    people: Person[]
    vehicleStatus: VehicleStatus[]
    lastUpdated: Date | null
}
