import { DashboardData, Manifest, FreightMargin, Person } from "@/types"

export const generateMockData = (): DashboardData => {
    const mockManifests: Manifest[] = Array.from({ length: 50 }, (_, i) => {
        const receita = Math.random() * 5000 + 1000
        const custo = Math.random() * 3000 + 500
        const lucro = receita - custo
        const margemPct = (lucro / receita) * 100

        return {
            filial: "Matriz",
            cnpj: "00000000000000",
            numero: String(1000 + i),
            data: new Date(2026, 1, Math.floor(Math.random() * 28) + 1).toLocaleDateString("pt-BR"),
            motorista: `Motorista ${i + 1}`,
            veiculo: `ABC-${1000 + i}`,
            cidadeOrigem: "São Paulo",
            cidadeDestino: i % 2 === 0 ? "Rio de Janeiro" : "Curitiba",
            receitaTransportada: receita,
            custoTotal: custo,
            valorLucro: lucro,
            margemPercentual: margemPct,
            status: "Encerrado",
            pesoTransportado: 1000,
            kmRodado: 500
        }
    })

    const mockFreightMargins: FreightMargin[] = Array.from({ length: 50 }, (_, i) => ({
        filial: "Matriz",
        pagador: i % 3 === 0 ? "GESTAMP" : i % 3 === 1 ? "CAMPO LIMPO" : "OUTROS",
        origem: "São Paulo",
        destino: i % 2 === 0 ? "Rio de Janeiro" : "Curitiba",
        dataFrete: new Date(2026, 1, Math.floor(Math.random() * 28) + 1).toLocaleDateString("pt-BR"),
        documento: String(5000 + i),
        veiculo: `ABC-${1000 + i}`,
        valorFrete: Math.random() * 5000 + 2000,
        totalDespesas: Math.random() * 3000 + 1000,
        margem: 0, // Logic will recalc
        margemPercentual: 0
    })).map(m => ({
        ...m,
        margem: m.valorFrete - m.totalDespesas,
        margemPercentual: ((m.valorFrete - m.totalDespesas) / m.valorFrete) * 100
    }))

    const mockPeople: Person[] = [
        { nome: "Motorista 1", tipo: "Motorista", cpfCnpj: "000", cidade: "SP", uf: "SP" },
        { nome: "Motorista 2", tipo: "Motorista", cpfCnpj: "001", cidade: "RJ", uf: "RJ" }
    ]

    return {
        manifests: mockManifests,
        freightMargins: mockFreightMargins,
        people: mockPeople,
        lastUpdated: new Date()
    }
}
