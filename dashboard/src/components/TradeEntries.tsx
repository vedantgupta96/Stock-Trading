import { SectorBadge } from './SectorBadge'
import type { OpenTrade } from '../types'

export function TradeEntries({ trades }: { trades: OpenTrade[] }) {
  if (!trades.length) {
    return (
      <div className="card-glass p-5">
        <h2 className="text-sm font-semibold text-white mb-4">Open Trade Entries (from log)</h2>
        <p className="text-sm text-slate-500">No open trade entries in log.</p>
      </div>
    )
  }
  return (
    <div className="card-glass p-5">
      <h2 className="text-sm font-semibold text-white mb-4">Open Trade Entries (from log)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {trades.map(t => (
          <div
            key={t.symbol}
            className="p-3 rounded-xl text-xs bg-slate-900/80 border border-slate-800/60"
          >
            <div className="flex justify-between items-center mb-1.5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">{t.symbol}</span>
                <SectorBadge sector={t.sector} />
              </div>
              <span className="text-slate-500">{t.date}</span>
            </div>
            <p className="text-slate-400">{t.shares ?? '—'} shares @ {t.entry_price ?? '—'}</p>
            <p className="text-slate-500">Stop: {t.stop_level ?? '—'} · Target: {t.target ?? '—'}</p>
            {t.catalyst && (
              <p className="mt-1 text-blue-400">{t.catalyst.slice(0, 100)}</p>
            )}
            {t.time_stop && (
              <p className="mt-1 text-amber-400">⏰ {t.time_stop}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
