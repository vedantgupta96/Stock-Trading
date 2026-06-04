import { useState } from 'react'
import type { Research } from '../types'

interface Props {
  research?: Research
  lastUpdated: string
  onRefresh: () => void
  isFetching: boolean
  autoRefresh: number
  onAutoRefreshChange: (secs: number) => void
}

export function Header({ research, lastUpdated, onRefresh, isFetching, autoRefresh, onAutoRefreshChange }: Props) {
  const [spinning, setSpinning] = useState(false)

  const handleRefresh = async () => {
    setSpinning(true)
    onRefresh()
    setTimeout(() => setSpinning(false), 1200)
  }

  const note = (research?.regime_note ?? research?.decision ?? '').toLowerCase()
  const regimeOn = note.includes('above') || note.includes(' on ') || note.includes('trade')
  const regimeOff = note.includes('below') || note.includes(' off') || note.includes('hold')

  return (
    <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Trading Dashboard</h1>
        <p className="text-xs text-slate-500 mt-0.5">{lastUpdated}</p>
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        {/* Regime badge */}
        <span className={`px-3 py-1 rounded-full text-xs font-bold border
          ${regimeOn  ? 'bg-emerald-900/50 text-emerald-300 border-emerald-700/60' :
            regimeOff ? 'bg-red-900/50 text-red-300 border-red-700/60' :
                        'bg-slate-800 text-slate-400 border-slate-700'}`}>
          REGIME: {regimeOn ? 'ON' : regimeOff ? 'OFF' : '?'}
        </span>

        {/* Auto-refresh */}
        <div className="flex items-center gap-2">
          {autoRefresh > 0 && (
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          )}
          <select
            value={autoRefresh}
            onChange={e => onAutoRefreshChange(Number(e.target.value))}
            className="text-xs rounded-lg px-2 py-1.5 font-medium cursor-pointer bg-slate-800 border border-slate-700 text-slate-400"
          >
            <option value={0}>Auto: Off</option>
            <option value={30}>Auto: 30s</option>
            <option value={60}>Auto: 60s</option>
          </select>
        </div>

        {/* Refresh button */}
        <button
          onClick={handleRefresh}
          disabled={isFetching}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white
            bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600
            shadow-[0_2px_12px_rgba(49,130,206,0.35)] transition-all disabled:opacity-60"
        >
          {spinning || isFetching
            ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            : null}
          <span>Refresh Live</span>
        </button>
      </div>
    </div>
  )
}
