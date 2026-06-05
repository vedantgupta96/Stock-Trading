import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import type { RMultiplesData } from '../types'

function RTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  const count: number = payload[0]?.value ?? 0
  return (
    <div className="chart-tooltip">
      <p className="text-[0.65rem] text-slate-500 mb-1">{label}</p>
      <p className="metric text-sm text-slate-200">{count} trade{count !== 1 ? 's' : ''}</p>
    </div>
  )
}

export function RMultipleChart({ rm }: { rm?: RMultiplesData }) {
  const total = rm?.buckets?.reduce((s, b) => s + b.count, 0) ?? 0

  return (
    <div className="card-glass p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="section-label mb-1">R-Multiple Distribution</p>
          <p className="text-xs text-slate-500">Risk-normalized trade outcomes</p>
        </div>
        {rm?.avg_r != null && (
          <div className="text-right">
            <p className="section-label mb-1">Avg R</p>
            <p className={`metric text-lg ${rm.avg_r >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {rm.avg_r >= 0 ? '+' : ''}{rm.avg_r.toFixed(2)}R
            </p>
          </div>
        )}
      </div>

      {total === 0 ? (
        <div className="h-40 flex items-center justify-center">
          <p className="text-xs text-slate-600 text-center">
            No closed trades yet.<br />R-multiples appear once positions are realized.
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={rm?.buckets ?? []} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <XAxis dataKey="label" tick={{ fill: '#475569', fontSize: 9 }} axisLine={false} tickLine={false} />
            <YAxis allowDecimals={false} tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} width={24} />
            <Tooltip content={<RTooltip />} />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {(rm?.buckets ?? []).map((_b, i) => (
                <Cell key={i}
                  fill={i < 2 ? 'rgba(244,63,94,0.65)' : 'rgba(16,185,129,0.65)'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
