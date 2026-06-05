import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import type { SectorPnl } from '../types'

function SectorTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  const v: number = payload[0]?.value ?? 0
  return (
    <div className="chart-tooltip">
      <p className="text-[0.65rem] text-slate-500 mb-1">{label}</p>
      <p className={`metric text-sm ${v >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
        {v >= 0 ? '+' : ''}${v.toFixed(2)}
      </p>
      <p className="text-[0.6rem] text-slate-600 mt-0.5">{payload[0]?.payload?.count} trades</p>
    </div>
  )
}

export function SectorPnlChart({ sectorPnl }: { sectorPnl?: SectorPnl }) {
  const sectors = Object.keys(sectorPnl ?? {})

  return (
    <div className="card-glass p-5">
      <p className="section-label mb-1">Per-Sector P&L</p>
      <p className="text-xs text-slate-500 mb-4">Realized gains/losses by sector</p>

      {sectors.length === 0 ? (
        <div className="h-40 flex items-center justify-center">
          <p className="text-xs text-slate-600 text-center">
            No closed trades yet.<br />Sector P&L populates as positions are realized.
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={sectors.map(s => ({ sector: s, pnl: sectorPnl![s].pnl, count: sectorPnl![s].count }))}
            margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <XAxis dataKey="sector" tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={v => `$${v}`} tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} width={44} />
            <Tooltip content={<SectorTooltip />} />
            <Bar dataKey="pnl" radius={[4, 4, 0, 0]}>
              {sectors.map((s, i) => (
                <Cell key={i}
                  fill={sectorPnl![s].pnl >= 0 ? 'rgba(16,185,129,0.7)' : 'rgba(244,63,94,0.7)'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
