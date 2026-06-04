import type { OpenTrade } from '../types'

export function TradeTimeline({ trades }: { trades: OpenTrade[] }) {
  const open = trades.filter(t => t.time_stop && t.date)
  if (!open.length) return null

  const today = Date.now()

  return (
    <div className="card-glass p-5 mb-6">
      <h2 className="text-sm font-semibold text-white mb-4">Open Trade Timeline</h2>
      <div className="space-y-3">
        {open.map(t => {
          const entry = new Date(t.date).getTime()
          const stop = new Date(t.time_stop!).getTime()
          const total = Math.max(1, (stop - entry) / 86_400_000)
          const elapsed = Math.min(total, Math.max(0, (today - entry) / 86_400_000))
          const pct = Math.round((elapsed / total) * 100)
          const daysLeft = Math.max(0, Math.ceil((stop - today) / 86_400_000))

          return (
            <div key={t.symbol} className="flex items-center gap-3">
              <span className="w-12 text-xs font-bold text-white flex-shrink-0">{t.symbol}</span>
              <div className="flex-1 h-4 bg-slate-800/70 rounded overflow-hidden relative">
                <div
                  className="h-full rounded bg-gradient-to-r from-emerald-500/70 to-emerald-400/40 transition-all duration-700"
                  style={{ width: `${pct}%` }}
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[0.6rem] text-slate-400">
                  {daysLeft}d left
                </span>
              </div>
              <span className="text-xs text-slate-500 w-8 text-right">{pct}%</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
