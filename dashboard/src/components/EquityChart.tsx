import { useState } from 'react'
import { AreaChart, Tab, TabGroup, TabList } from '@tremor/react'
import type { DrawdownData, EODSnapshot } from '../types'

const shortK = (v: number) =>
  v >= 1_000_000 ? `${(v / 1_000_000).toFixed(1)}M` :
  v >= 1_000     ? `${(v / 1_000).toFixed(0)}K`     :
                   v.toFixed(0)

interface Props {
  equityHistory: EODSnapshot[]
  drawdown: DrawdownData | undefined
}

export function EquityChart({ equityHistory, drawdown }: Props) {
  const [tab, setTab] = useState(0)

  const equityData = equityHistory.map(s => ({ date: s.date, Equity: s.equity }))

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
            data={equityData}
            index="date"
            categories={['Equity']}
            colors={['blue']}
            valueFormatter={v => `$${shortK(v)}`}
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
