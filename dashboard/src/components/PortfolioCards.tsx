import { useEffect, useRef } from 'react'

interface AnimatedProps { value: number | null; signed?: boolean; prefix?: string }

function AnimatedMetric({ value, signed = false, prefix = '$' }: AnimatedProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const prev = useRef<number>(0)

  useEffect(() => {
    if (value == null || !ref.current) return
    const from = prev.current
    prev.current = value
    if (Math.abs(from - value) < 0.01) { ref.current.textContent = format(value, signed, prefix); return }
    const start = performance.now()
    const dur = 750
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur)
      const e = 1 - Math.pow(1 - t, 3)
      const cur = from + (value - from) * e
      if (ref.current) ref.current.textContent = format(cur, signed, prefix)
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [value, signed, prefix])

  return <span ref={ref}>{value == null ? '—' : format(value, signed, prefix)}</span>
}

function format(v: number, signed: boolean, prefix: string) {
  const abs = Math.abs(v)
  const formatted = abs >= 1000
    ? `${prefix}${abs.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : `${prefix}${abs.toFixed(2)}`
  const sign = signed ? (v >= 0 ? '+' : '−') : v < 0 ? '−' : ''
  return `${sign}${formatted}`
}

interface CardProps {
  label: string
  value: number | null
  sub?: string
  signed?: boolean
  accent: 'blue' | 'green' | 'red' | 'amber' | 'slate'
}

const ACCENT = {
  blue:  { border: 'border-l-sky-500',    text: 'text-sky-400',     bg: 'bg-sky-500/5' },
  green: { border: 'border-l-emerald-500', text: 'text-emerald-400', bg: 'bg-emerald-500/5' },
  red:   { border: 'border-l-rose-500',    text: 'text-rose-400',    bg: 'bg-rose-500/5' },
  amber: { border: 'border-l-amber-500',   text: 'text-amber-400',   bg: 'bg-amber-500/5' },
  slate: { border: 'border-l-slate-600',   text: 'text-slate-300',   bg: '' },
}

function MetricCard({ label, value, sub, signed, accent }: CardProps) {
  const a = ACCENT[accent]
  return (
    <div className={`card-glass p-4 border-l-2 ${a.border} ${a.bg}`}>
      <p className="section-label mb-2">{label}</p>
      <p className={`metric text-2xl font-bold ${a.text}`}>
        <AnimatedMetric value={value} signed={signed} />
      </p>
      {sub && <p className="text-xs text-slate-600 mt-1.5">{sub}</p>}
    </div>
  )
}

interface Props {
  equity: number | null
  cash: number | null
  dayPnl: number | null
  phasePnl: string
}

export function PortfolioCards({ equity, cash, dayPnl, phasePnl }: Props) {
  const dayAccent = dayPnl == null ? 'slate' : dayPnl >= 0 ? 'green' : 'red'
  const phaseAccent = phasePnl.startsWith('-') ? 'red' : phasePnl && phasePnl !== 'N/A' ? 'green' : 'slate'
  // Parse phase P&L to number for animation
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <MetricCard label="Portfolio Value" value={equity} accent="blue" sub="total equity" />
      <MetricCard label="Cash Available" value={cash} accent="slate" sub="buying power" />
      <MetricCard label="Day P&L" value={dayPnl} signed accent={dayAccent}
        sub={dayPnl != null ? `${dayPnl >= 0 ? 'up' : 'down'} today` : ''} />
      <div className={`card-glass p-4 border-l-2 ${ACCENT[phaseAccent].border} ${ACCENT[phaseAccent].bg}`}>
        <p className="section-label mb-2">Phase P&L</p>
        <p className={`metric text-2xl font-bold ${ACCENT[phaseAccent].text}`}>
          {phasePnl && phasePnl !== 'N/A' ? phasePnl : '—'}
        </p>
        <p className="text-xs text-slate-600 mt-1.5">since inception</p>
      </div>
    </div>
  )
}
