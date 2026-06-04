import type { Research } from '../types'

export function MarketContext({ research }: { research?: Research }) {
  if (!research) {
    return (
      <div className="card-glass p-5">
        <h2 className="text-sm font-semibold text-white mb-3">Market Context</h2>
        <p className="text-xs text-slate-500">Loading research log...</p>
      </div>
    )
  }
  return (
    <div className="card-glass p-5">
      <h2 className="text-sm font-semibold text-white mb-3">Market Context</h2>
      <div className="space-y-2 text-sm">
        {research.vix && (
          <div>
            <span className="text-slate-500 text-xs">VIX </span>
            <span className="text-white font-semibold">{research.vix}</span>
          </div>
        )}
        {research.regime_note && (
          <p className="text-xs text-slate-600 leading-relaxed">
            {research.regime_note.slice(0, 120)}
          </p>
        )}
        {research.decision && (
          <div className="mt-2 p-2 rounded-lg bg-slate-800/70 text-xs">
            <span className="text-slate-500">Decision: </span>
            <span className="text-white">{research.decision}</span>
          </div>
        )}
        {!research.vix && !research.decision && (
          <p className="text-xs text-slate-500">No research log entries yet.</p>
        )}
      </div>
    </div>
  )
}
