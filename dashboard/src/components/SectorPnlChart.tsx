import { BarChart } from '@tremor/react'
import type { SectorPnl } from '../types'

export function SectorPnlChart({ sectorPnl }: { sectorPnl?: SectorPnl }) {
  const sectors = Object.keys(sectorPnl ?? {})

  if (!sectors.length) {
    return (
      <div className="card-glass p-5">
        <h2 className="text-sm font-semibold text-white mb-4">Per-Sector P&L</h2>
        <p className="text-xs text-slate-500 mt-8 text-center">
          No closed trades yet — sector P&L appears once positions are realized.
        </p>
      </div>
    )
  }

  const data = sectors.map(s => ({
    sector: s,
    'P&L': sectorPnl![s].pnl,
  }))

  return (
    <div className="card-glass p-5">
      <h2 className="text-sm font-semibold text-white mb-4">Per-Sector P&L</h2>
      <BarChart
        data={data}
        index="sector"
        categories={['P&L']}
        colors={['emerald']}
        valueFormatter={v => `$${v.toFixed(0)}`}
        showLegend={false}
        showGridLines={false}
        className="h-40"
      />
    </div>
  )
}
