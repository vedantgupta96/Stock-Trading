import { colorClass, fmt } from '../utils'
import { SectorBadge } from './SectorBadge'
import { RRBar } from './RRBar'
import { PositionSparkline } from './PositionSparkline'
import type { OpenTrade, Position, SparklineData } from '../types'

// ── Snapshot mode table ────────────────────────────────────────────────────────
function SnapshotTable({ trades }: { trades: OpenTrade[] }) {
  if (!trades.length) {
    return <p className="text-sm text-slate-500 py-4 text-center">No open positions in trade log.</p>
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-800">
            {['Symbol', 'Sector', 'Shares', 'Entry', 'Current', 'P&L', 'Stop / Target', 'Time Stop'].map(h => (
              <th key={h} className="text-left text-[0.68rem] uppercase tracking-widest text-slate-600 px-3 py-2">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {trades.map(t => (
            <tr key={t.symbol} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
              <td className="px-3 py-2.5 font-bold text-white">{t.symbol}</td>
              <td className="px-3 py-2.5"><SectorBadge sector={t.sector} /></td>
              <td className="px-3 py-2.5 text-slate-300">{t.shares ?? '—'}</td>
              <td className="px-3 py-2.5 text-slate-300">{t.entry_price ?? '—'}</td>
              <td className="px-3 py-2.5 text-slate-500 text-xs">— <span className="opacity-40">(refresh)</span></td>
              <td className="px-3 py-2.5 text-slate-500">—</td>
              <td className="px-3 py-2.5 text-xs text-slate-500">{t.stop_level ?? '—'} → {t.target ?? '—'}</td>
              <td className="px-3 py-2.5 text-xs text-amber-400">{t.time_stop ? `⏰ ${t.time_stop}` : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Live mode cards ────────────────────────────────────────────────────────────
function PositionCard({ p, sparklines }: { p: Position; sparklines?: SparklineData }) {
  const pct = parseFloat(p.unrealized_plpc ?? '0') * 100
  const pnl = parseFloat(p.unrealized_pl ?? '0')
  const cur = parseFloat(p.current_price ?? '0')
  const series = sparklines?.[p.symbol] ?? []

  const flags: string[] = []
  if (!p.has_stop) flags.push('⚠ NO STOP')
  if (pct <= -6) flags.push(`⚠ Near -8% stop`)
  if (pct >= 18) flags.push('💰 Tighten to 5%')
  else if (pct >= 13) flags.push('↑ Tighten to 7%')

  const glowStyle = !p.has_stop || pct <= -6
    ? 'border-red-500/30 shadow-[0_0_20px_rgba(248,113,113,0.12)]'
    : pct >= 13
    ? 'border-emerald-500/30 shadow-[0_0_20px_rgba(52,211,153,0.12)]'
    : 'border-slate-700/60'

  return (
    <div className={`bg-slate-900/80 border rounded-xl p-4 transition-all ${glowStyle}`}>
      {/* header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-lg font-bold text-white">{p.symbol}</span>
          <SectorBadge sector={p.sector} />
        </div>
        <div className="text-right">
          <p className={`font-bold ${colorClass(pct)}`}>{pct >= 0 ? '+' : ''}{pct.toFixed(2)}%</p>
          <p className={`text-xs ${colorClass(pnl)}`}>{pnl >= 0 ? '+' : ''}{fmt(pnl)}</p>
        </div>
      </div>

      {/* flags */}
      {flags.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-2 text-xs">
          {flags.map(f => (
            <span key={f} className={f.includes('STOP') ? 'text-red-400 font-bold' : f.includes('5%') || f.includes('7%') ? 'text-emerald-400' : 'text-amber-400'}>{f}</span>
          ))}
        </div>
      )}

      {/* sparkline */}
      <PositionSparkline series={series} entryPrice={parseFloat(p.avg_entry_price ?? '0')} />

      {/* R/R bar */}
      <RRBar
        stopRaw={p.stop_level}
        targetRaw={p.target}
        current={cur}
        pct={pct}
      />

      {/* footer */}
      <div className="flex justify-between text-xs text-slate-500 mt-3 pt-2.5 border-t border-slate-800/60">
        <span>{p.qty} shares @ {fmt(p.avg_entry_price)}</span>
        {p.time_stop && <span className="text-amber-400/70">⏰ {p.time_stop}</span>}
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────
interface Props {
  snapshotTrades: OpenTrade[]
  livePositions?: Position[]
  sparklines?: SparklineData
  isLive: boolean
}

export function OpenPositions({ snapshotTrades, livePositions, sparklines, isLive }: Props) {
  const count = isLive ? (livePositions?.length ?? 0) : snapshotTrades.length

  return (
    <div className="card-glass p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-white">Open Positions</h2>
        <span className="text-xs text-slate-500">{count} position{count !== 1 ? 's' : ''}</span>
      </div>

      {isLive && livePositions ? (
        livePositions.length === 0
          ? <p className="text-sm text-slate-500 text-center py-4">No open positions.</p>
          : <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {livePositions.map(p => (
                <PositionCard key={p.symbol} p={p} sparklines={sparklines} />
              ))}
            </div>
      ) : (
        <SnapshotTable trades={snapshotTrades} />
      )}
    </div>
  )
}
