import { BarChart } from '@tremor/react'
import type { RMultiplesData } from '../types'

export function RMultipleChart({ rm }: { rm?: RMultiplesData }) {
  const total = rm?.buckets?.reduce((s, b) => s + b.count, 0) ?? 0

  if (!total) {
    return (
      <div className="card-glass p-5">
        <h2 className="text-sm font-semibold text-white mb-4">R-Multiple Distribution</h2>
        <p className="text-xs text-slate-500 mt-8 text-center">
          No closed trades yet — R-multiples appear once positions are realized.
        </p>
      </div>
    )
  }

  const data = (rm?.buckets ?? []).map(b => ({ bucket: b.label, Trades: b.count }))

  return (
    <div className="card-glass p-5">
      <h2 className="text-sm font-semibold text-white mb-4">R-Multiple Distribution</h2>
      <BarChart
        data={data}
        index="bucket"
        categories={['Trades']}
        colors={['blue']}
        valueFormatter={v => `${v} trade${v !== 1 ? 's' : ''}`}
        showLegend={false}
        showGridLines={false}
        className="h-40"
      />
    </div>
  )
}
