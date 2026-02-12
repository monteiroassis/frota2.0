import { FreightMargin } from "@/types"

export interface GroupMetric {
    name: string
    fretes: number
    receita: number
    despesas: number
    margem: number
    margemPercentual: number
}

export const calculateGeneralMetrics = (margins: FreightMargin[]) => {
    const fretes = margins.length
    const receita = margins.reduce((sum, m) => sum + m.valorFrete, 0)
    const despesas = margins.reduce((sum, m) => sum + m.totalDespesas, 0)
    const margem = receita - despesas // Calculate explicitly or use sum of margins? Using calculated for consistency.
    // Or use sum of m.margem if available. Let's use m.margem to match file exactly if possible, but calculating ensures math consistency.
    // Actually, let's use sum of 'valorFrete' and 'totalDespesas'.
    const margemPercentual = receita > 0 ? (margem / receita) * 100 : 0

    return { fretes, receita, despesas, margem, margemPercentual }
}

export const groupMetricsByPagador = (margins: FreightMargin[]): GroupMetric[] => {
    const groups: { [key: string]: GroupMetric } = {}

    margins.forEach((m) => {
        const name = m.pagador || "OUTROS"
        if (!groups[name]) {
            groups[name] = {
                name,
                fretes: 0,
                receita: 0,
                despesas: 0,
                margem: 0,
                margemPercentual: 0,
            }
        }

        groups[name].fretes += 1
        groups[name].receita += m.valorFrete
        groups[name].despesas += m.totalDespesas
        groups[name].margem += m.margem // Use the file's margin
    })

    return Object.values(groups).map(g => ({
        ...g,
        margemPercentual: g.receita > 0 ? (g.margem / g.receita) * 100 : 0
    })).sort((a, b) => b.receita - a.receita) // Sort by Revenue desc
}
