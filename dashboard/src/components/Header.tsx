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
  const [spin, setSpin] = useState(false)

  const handleRefresh = () => { setSpin(true); onRefresh(); setTimeout(() => setSpin(false), 1000) }

  const allText = [research?.regime_note, research?.decision, research?.raw]
    .filter(Boolean).join(' ').toLowerCase()
  const regimeOn  = /regime[:\s]+on\b|s&p.{0,30}above|regime filter on/.test(allText)
  const regimeOff = /regime[:\s]+off\b|s&p.{0,30}below|regime filter off/.test(allText)

  return (
    <>
      {/* Top accent bar */}
      <div className="h-px w-full mb-6"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.5) 30%, rgba(56,189,248,0.8) 50%, rgba(56,189,248,0.5) 70%, transparent)' }}
      />

      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-100">
            Trading Dashboard
            <span className="ml-2 text-[0.6rem] font-mono uppercase tracking-widest text-sky-500/70 align-middle">PAPER</span>
          </h1>
          <p className="text-xs text-slate-600 mt-0.5 font-mono">{lastUpdated}</p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Regime pill */}
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
            regimeOn  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
            regimeOff ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' :
                        'bg-slate-800 text-slate-500 border-slate-700'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${
              regimeOn ? 'bg-emerald-400 pulse-ring' : regimeOff ? 'bg-rose-400' : 'bg-slate-600'
            }`} />
            REGIME {regimeOn ? 'ON' : regimeOff ? 'OFF' : '?'}
          </div>

          {/* Auto-refresh */}
          <div className="flex items-center gap-2">
            {autoRefresh > 0 && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-ring" />}
            <select
              value={autoRefresh}
              onChange={e => onAutoRefreshChange(+e.target.value)}
              className="text-xs rounded-lg px-2.5 py-1.5 font-mono font-medium cursor-pointer
                bg-slate-900 border border-slate-800 text-slate-400 hover:border-slate-700 transition-colors"
            >
              <option value={0}>AUTO · OFF</option>
              <option value={30}>AUTO · 30s</option>
              <option value={60}>AUTO · 60s</option>
            </select>
          </div>

          {/* Refresh button */}
          <button
            onClick={handleRefresh}
            disabled={isFetching}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white
              disabled:opacity-50 transition-all duration-200 select-none"
            style={{
              background: 'linear-gradient(135deg, #0369a1, #0284c7)',
              boxShadow: '0 0 20px rgba(14,165,233,0.25), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}
          >
            {(spin || isFetching) && (
              <span className="w-3.5 h-3.5 border-2 border-sky-300/30 border-t-sky-300 rounded-full animate-spin" />
            )}
            <span>Refresh Live</span>
          </button>
        </div>
      </div>
    </>
  )
}
