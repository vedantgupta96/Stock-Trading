import { useEffect, useRef } from 'react'
import { colorClass, fmt } from '../utils'

interface Props {
  equity: number | null
  cash: number | null
  dayPnl: number | null
  phasePnl: string
}

function AnimatedValue({ value, signed = false }: { value: number | null; signed?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const prev = useRef<number>(0)

  useEffect(() => {
    if (value == null || !ref.current) return
    const from = prev.current
    const to = value
    prev.current = value
    if (Math.abs(from - to) < 0.01) return

    const start = performance.now()
    const duration = 700
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const e = 1 - Math.pow(1 - t, 3)
      const cur = from + (to - from) * e
      if (ref.current) {
        const sign = signed ? (cur >= 0 ? '+' : '-') : cur < 0 ? '-' : ''
        ref.current.textContent = `${sign}$${Math.abs(cur).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
      }
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [value, signed])

  if (value == null) return <span ref={ref}>—</span>
  const sign = signed ? (value >= 0 ? '+' : '-') : value < 0 ? '-' : ''
  return <span ref={ref}>{sign}{fmt(value)}</span>
}

export function PortfolioCards({ equity, cash, dayPnl, phasePnl }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="card-glass p-4">
        <p className="text-xs text-slate-500 mb-1">Portfolio Value</p>
        <p className="text-2xl font-bold text-white"><AnimatedValue value={equity} /></p>
      </div>
      <div className="card-glass p-4">
        <p className="text-xs text-slate-500 mb-1">Cash Available</p>
        <p className="text-2xl font-bold text-white"><AnimatedValue value={cash} /></p>
      </div>
      <div className="card-glass p-4">
        <p className="text-xs text-slate-500 mb-1">Day P&L</p>
        <p className={`text-2xl font-bold ${dayPnl != null ? colorClass(dayPnl) : 'text-white'}`}>
          <AnimatedValue value={dayPnl} signed />
        </p>
      </div>
      <div className="card-glass p-4">
        <p className="text-xs text-slate-500 mb-1">Phase P&L</p>
        <p className={`text-2xl font-bold ${phasePnl.includes('-') ? 'text-red-400' : 'text-emerald-400'}`}>
          {phasePnl || '—'}
        </p>
      </div>
    </div>
  )
}
