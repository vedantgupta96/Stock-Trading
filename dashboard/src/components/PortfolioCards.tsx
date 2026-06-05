import { useEffect, useRef } from 'react'
import { fmt, clsPL } from '../utils'

function AnimatedNumber({ value, format = fmt, sign = false, className = '' }: {
  value: number; format?: (v: number) => string; sign?: boolean; className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const prev = useRef(value)
  const render = (v: number) => (sign ? (v >= 0 ? '+' : '−') : '') + format(Math.abs(v))

  useEffect(() => {
    const from = prev.current, to = value; prev.current = value
    if (from === to) { if (ref.current) ref.current.textContent = render(to); return }
    const start = performance.now(), dur = 750
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / dur)
      const e = 1 - Math.pow(1 - t, 3)
      if (ref.current) ref.current.textContent = render(from + (to - from) * e)
      if (t < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [value])

  return <span ref={ref} className={className}>{render(value)}</span>
}

interface StatCardProps {
  label: string
  icon: React.ReactNode
  value: React.ReactNode
  sub?: React.ReactNode
  subClass?: string
  accent?: string
  delay?: number
}

function StatCard({ label, icon, value, sub, subClass, accent, delay = 0 }: StatCardProps) {
  return (
    <div className="v-card v-card-pad rise" style={{ animationDelay: `${delay}ms`, position: 'relative', overflow: 'hidden' }}>
      {accent && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: `var(${accent})`, boxShadow: `0 0 12px var(${accent})` }} />
      )}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span className="lbl">{label}</span>
        <span style={{ color: 'var(--fg-4)' }}>{icon}</span>
      </div>
      <div className="mono" style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1 }}>{value}</div>
      {sub && <div className={`mono ${subClass ?? 'muted'}`} style={{ fontSize: 12.5, fontWeight: 600, marginTop: 8 }}>{sub}</div>}
    </div>
  )
}

// small icon components
const WalletIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4z" /></svg>
const ShieldIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
const TrendUpIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
const TrendDownIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline points="17 18 23 18 23 12" /></svg>
const ActivityIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>

interface Props {
  equity: number | null
  cash: number | null
  dayPnl: number | null
  dayPnlPct: number | null
  phasePnl: string
  weekReturn: string
  posCount: number
}

export function PortfolioCards({ equity, cash, dayPnl, dayPnlPct, phasePnl, weekReturn, posCount }: Props) {
  // Parse "-$23.61 (-0.02%)" → { dollars: "-$23.61", pct: -0.02 }
  const phase = (() => {
    if (!phasePnl || phasePnl === 'N/A') return null
    const m = phasePnl.match(/([+\-]?\$[\d,]+\.?\d*)\s*\(([+\-]?[\d.]+)%\)/)
    if (!m) return null
    return { dollars: m[1], pct: parseFloat(m[2]) }
  })()
  const phaseUp = (phase?.pct ?? 0) >= 0
  const hasWeek = weekReturn && weekReturn !== 'N/A'

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 16 }}>
      <StatCard
        label="Portfolio Value" icon={<WalletIcon />} accent="--volt" delay={0}
        value={<AnimatedNumber value={equity ?? 0} />}
        sub={dayPnl != null
          ? <><AnimatedNumber value={dayPnl} sign format={fmt} className={clsPL(dayPnl)} /> today</>
          : '—'}
        subClass={clsPL(dayPnl ?? 0)}
      />
      <StatCard
        label="Cash Available" icon={<ShieldIcon />} delay={60}
        value={<AnimatedNumber value={cash ?? 0} />}
        sub={`${posCount} position${posCount !== 1 ? 's' : ''} deployed`}
      />
      <StatCard
        label="Day P&L" delay={120}
        icon={dayPnl != null && dayPnl >= 0 ? <TrendUpIcon /> : <TrendDownIcon />}
        accent={dayPnl != null ? (dayPnl >= 0 ? '--up' : '--down') : undefined}
        value={dayPnlPct != null
          ? <AnimatedNumber value={dayPnlPct} sign format={v => Math.abs(v).toFixed(2) + '%'} className={clsPL(dayPnlPct)} />
          : <span className="muted">—</span>}
        sub={dayPnl != null ? <AnimatedNumber value={dayPnl} sign className={clsPL(dayPnl)} /> : ''}
        subClass={clsPL(dayPnl ?? 0)}
      />
      <StatCard
        label="Phase P&L" icon={<ActivityIcon />} delay={180}
        accent={phase ? (phaseUp ? '--up' : '--down') : undefined}
        value={phase != null
          ? <span className={phaseUp ? 'up' : 'down'}>
              {phase.pct >= 0 ? '+' : ''}{phase.pct.toFixed(2)}%
            </span>
          : <span className="muted">—</span>}
        sub={hasWeek
          ? <span style={{ color: 'var(--fg-3)' }}>{weekReturn} this week</span>
          : phase != null
            ? <span className={phaseUp ? 'up' : 'down'}>{phase.dollars} since inception</span>
            : ''}
        subClass={phaseUp ? 'up' : 'down'}
      />
    </div>
  )
}
