import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import type { DrawdownData, EODSnapshot } from '../types'

const fmt$ = (v: number) =>
  v >= 1_000_000 ? `$${(v / 1_000_000).toFixed(2)}M`
  : v >= 1_000   ? `$${(v / 1_000).toFixed(1)}K`
  :                `$${v.toFixed(0)}`

function EquityTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <p className="text-[0.65rem] text-slate-500 mb-1">{label}</p>
      <p className="metric text-base text-sky-400">{fmt$(payload[0]?.value ?? 0)}</p>
    </div>
  )
}

function DrawdownTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <p className="text-[0.65rem] text-slate-500 mb-1">{label}</p>
      <p className="metric text-base text-rose-400">{(payload[0]?.value ?? 0).toFixed(2)}%</p>
    </div>
  )
}

interface Props {
  equityHistory: EODSnapshot[]
  drawdown: DrawdownData | undefined
}

export function EquityChart({ equityHistory, drawdown }: Props) {
  const [tab, setTab] = useState<'equity' | 'drawdown'>('equity')

  const equityData = equityHistory.map(s => ({ date: s.date.slice(5), value: s.equity }))
  const ddData = (drawdown?.series ?? []).map(s => ({ date: s.date.slice(5), value: s.drawdown }))

  return (
    <div className="card-glass p-5 lg:col-span-2">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="section-label mb-1">Portfolio History</p>
          {equityHistory.length > 0 && (
            <p className="metric text-2xl text-slate-100">
              {fmt$(equityHistory[equityHistory.length - 1].equity)}
            </p>
          )}
        </div>
        <div className="flex rounded-lg overflow-hidden border border-slate-800">
          {(['equity', 'drawdown'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 text-xs font-semibold transition-colors ${
                tab === t
                  ? 'bg-sky-500/20 text-sky-400'
                  : 'bg-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {tab === 'equity' && (
        equityData.length > 1 ? (
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={equityData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="equityGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={fmt$} tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} width={54} />
              <Tooltip content={<EquityTooltip />} />
              <Area type="monotone" dataKey="value" stroke="#38bdf8" strokeWidth={2}
                fill="url(#equityGrad)" dot={false} activeDot={{ r: 4, fill: '#38bdf8' }} />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-40 flex items-center justify-center">
            <p className="text-xs text-slate-600">No EOD snapshots yet.</p>
          </div>
        )
      )}

      {tab === 'drawdown' && (
        ddData.length > 1 ? (
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={ddData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="ddGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f43f5e" stopOpacity={0} />
                  <stop offset="100%" stopColor="#f43f5e" stopOpacity={0.3} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={v => `${v.toFixed(1)}%`} tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} width={44} />
              <CartesianGrid stroke="rgba(148,163,184,0.05)" horizontal vertical={false} />
              <Tooltip content={<DrawdownTooltip />} />
              <Area type="monotone" dataKey="value" stroke="#f43f5e" strokeWidth={2}
                fill="url(#ddGrad)" dot={false} activeDot={{ r: 4, fill: '#f43f5e' }} />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-40 flex items-center justify-center">
            <p className="text-xs text-slate-600">No drawdown data yet.</p>
          </div>
        )
      )}

      <p className="text-[0.6rem] text-slate-700 mt-3">From memory/TRADE-LOG.md EOD snapshots</p>
    </div>
  )
}
