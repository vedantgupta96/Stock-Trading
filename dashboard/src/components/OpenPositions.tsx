import { SectorBadge } from './SectorBadge'
import { RRBar } from './RRBar'
import { PositionSparkline } from './PositionSparkline'
import type { OpenTrade, Position, SparklineData } from '../types'

function SnapshotTable({ trades }: { trades: OpenTrade[] }) {
  if (!trades.length)
    return <p className="text-sm text-slate-600 py-6 text-center">No open positions in trade log.</p>

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr>
            {['Symbol','Sector','Shares','Entry','Current','P&L','Stop / Target','Time Stop'].map(h => (
              <th key={h} className="section-label px-3 py-2 text-left border-b border-slate-800/80">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {trades.map(t => (
            <tr key={t.symbol} className="border-b border-slate-800/40 hover:bg-slate-800/20 transition-colors">
              <td className="px-3 py-3 font-bold text-white metric">{t.symbol}</td>
              <td className="px-3 py-3"><SectorBadge sector={t.sector} /></td>
              <td className="px-3 py-3 text-slate-400 metric">{t.shares ?? '—'}</td>
              <td className="px-3 py-3 text-slate-400 metric">{t.entry_price ?? '—'}</td>
              <td className="px-3 py-3 text-slate-600 text-xs">— <span className="opacity-40">(refresh)</span></td>
              <td className="px-3 py-3 text-slate-600">—</td>
              <td className="px-3 py-3 text-xs text-slate-500 metric">{t.stop_level ?? '—'} → {t.target ?? '—'}</td>
              <td className="px-3 py-3 text-xs text-amber-500">{t.time_stop ? `⏰ ${t.time_stop}` : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function PositionCard({ p, sparklines }: { p: Position; sparklines?: SparklineData }) {
  const pct = parseFloat(p.unrealized_plpc ?? '0') * 100
  const pnl = parseFloat(p.unrealized_pl ?? '0')
  const cur = parseFloat(p.current_price ?? '0')
  const series = sparklines?.[p.symbol] ?? []

  const isWarn = !p.has_stop || pct <= -6
  const isBull = pct >= 13

  const flags: { text: string; cls: string }[] = []
  if (!p.has_stop) flags.push({ text: '⚠ NO STOP', cls: 'text-rose-400 font-bold' })
  if (pct <= -6) flags.push({ text: `⚠ ${pct.toFixed(1)}% — near stop`, cls: 'text-amber-400' })
  if (pct >= 18) flags.push({ text: '💰 Tighten to 5%', cls: 'text-emerald-400' })
  else if (pct >= 13) flags.push({ text: '↑ Tighten to 7%', cls: 'text-emerald-400' })

  return (
    <div
      className="rounded-2xl p-4 relative overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, rgba(13,20,40,0.98) 0%, rgba(7,11,22,1) 100%)',
        border: `1px solid ${isWarn ? 'rgba(244,63,94,0.35)' : isBull ? 'rgba(16,185,129,0.3)' : 'rgba(148,163,184,0.1)'}`,
        boxShadow: isWarn
          ? '0 8px 32px rgba(0,0,0,0.5), 0 0 24px rgba(244,63,94,0.1)'
          : isBull
          ? '0 8px 32px rgba(0,0,0,0.5), 0 0 24px rgba(16,185,129,0.08)'
          : '0 8px 32px rgba(0,0,0,0.4)',
      }}
    >
      {/* subtle top-edge glow */}
      <div className="absolute inset-x-0 top-0 h-px"
        style={{
          background: isWarn
            ? 'linear-gradient(90deg, transparent, rgba(244,63,94,0.5), transparent)'
            : isBull
            ? 'linear-gradient(90deg, transparent, rgba(16,185,129,0.4), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(56,189,248,0.2), transparent)',
        }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xl font-bold tracking-tight text-white metric">{p.symbol}</span>
          <SectorBadge sector={p.sector} />
        </div>
        <div className="text-right">
          <p className={`metric text-lg font-bold leading-none ${pct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {pct >= 0 ? '+' : ''}{pct.toFixed(2)}%
          </p>
          <p className={`text-xs mt-0.5 metric ${pnl >= 0 ? 'text-emerald-500/70' : 'text-rose-500/70'}`}>
            {pnl >= 0 ? '+' : '−'}${Math.abs(pnl).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Flags */}
      {flags.length > 0 && (
        <div className="flex gap-3 flex-wrap mb-2 text-xs">
          {flags.map((f, i) => <span key={i} className={f.cls}>{f.text}</span>)}
        </div>
      )}

      {/* Sparkline */}
      <div className="mb-2 rounded-lg overflow-hidden" style={{ background: 'rgba(0,0,0,0.3)' }}>
        <PositionSparkline series={series} entryPrice={parseFloat(p.avg_entry_price ?? '0')} />
      </div>

      {/* R/R bar */}
      <RRBar stopRaw={p.stop_level} targetRaw={p.target} current={cur} pct={pct} />

      {/* Footer */}
      <div className="flex justify-between items-center text-xs text-slate-600 mt-3 pt-2.5"
        style={{ borderTop: '1px solid rgba(148,163,184,0.07)' }}>
        <span className="metric">{p.qty} shares @ ${parseFloat(p.avg_entry_price ?? '0').toFixed(2)}</span>
        {p.time_stop && (
          <span className="text-amber-500/70">⏰ {p.time_stop}</span>
        )}
      </div>
    </div>
  )
}

export function OpenPositions({ snapshotTrades, livePositions, sparklines, isLive }: {
  snapshotTrades: OpenTrade[]
  livePositions?: Position[]
  sparklines?: SparklineData
  isLive: boolean
}) {
  const count = isLive ? (livePositions?.length ?? 0) : snapshotTrades.length

  return (
    <div className="card-glass p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="section-label mb-1">Open Positions</p>
          <p className="text-xs text-slate-500">{count} active position{count !== 1 ? 's' : ''}</p>
        </div>
        {!isLive && (
          <span className="text-[0.6rem] text-slate-600 font-mono uppercase tracking-wider">
            snapshot mode — click Refresh Live for prices
          </span>
        )}
      </div>

      {isLive && livePositions ? (
        livePositions.length === 0
          ? <p className="text-sm text-slate-600 text-center py-6">No open positions.</p>
          : <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {livePositions.map(p => <PositionCard key={p.symbol} p={p} sparklines={sparklines} />)}
            </div>
      ) : (
        <SnapshotTable trades={snapshotTrades} />
      )}
    </div>
  )
}
