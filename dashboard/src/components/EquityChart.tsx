import { useState } from 'react'
import { AreaChart, Tab, TabGroup, TabList } from '@tremor/react'
import type { DrawdownData, EODSnapshot } from '../types'

interface Props {
  equityHistory: EODSnapshot[]
  drawdown: DrawdownData | undefined
}

export function EquityChart({ equityHistory, drawdown }: Props) {
  const [tab, setTab] = useState(0)

  const equityData = equityHistory.map(s => ({ date: s.date, Equity: s.equity }))
  const baseline = equityHistory.length ? equityHistory[0].equity : 0

  const drawdownData = (drawdown?.series ?? []).map(s => ({ date: s.date, Drawdown: s.drawdown }))

  return (
    <div className="card-glass p-5 lg:col-span-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-white">Portfolio History</h2>
        <TabGroup index={tab} onIndexChange={setTab}>
          <TabList variant="solid" className="bg-slate-800/60">
            <Tab className="text-xs px-3">Equity</Tab>
            <Tab className="text-xs px-3">Drawdown</Tab>
          </TabList>
        </TabGroup>
      </div>

      {tab === 0 && (
        equityData.length > 0 ? (
          <AreaChart
            data={[...equityData, { date: 'Baseline', Equity: baseline }].slice(0, -1).map((_, i) => ({
              ...equityData[i],
              Baseline: baseline,
            }))}
            index="date"
            categories={['Equity', 'Baseline']}
            colors={['blue', 'slate']}
            valueFormatter={v => `$${v.toLocaleString()}`}
            showLegend={false}
            showGridLines={false}
            className="h-40 mt-2"
            curveType="monotone"
          />
        ) : (
          <p className="text-xs text-slate-500 mt-6 text-center">No EOD snapshots yet.</p>
        )
      )}

      {tab === 1 && (
        drawdownData.length > 0 ? (
          <AreaChart
            data={drawdownData}
            index="date"
            categories={['Drawdown']}
            colors={['rose']}
            valueFormatter={v => `${v.toFixed(2)}%`}
            showLegend={false}
            showGridLines={false}
            className="h-40 mt-2"
            curveType="monotone"
          />
        ) : (
          <p className="text-xs text-slate-500 mt-6 text-center">No drawdown data yet.</p>
        )
      )}

      <p className="text-xs text-slate-600 mt-2">From memory/TRADE-LOG.md EOD snapshots</p>
    </div>
  )
}
