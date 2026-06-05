import { fmt, parsePrice } from '../utils'

interface Props { stopRaw?: string; targetRaw?: string; current: number; pct: number }

export function RRBar({ stopRaw, targetRaw, current, pct }: Props) {
  const stop   = parsePrice(stopRaw)
  const target = parsePrice(targetRaw)
  if (!stop || !target || !current || target <= stop) return null

  const pos = Math.max(2, Math.min(98, ((current - stop) / (target - stop)) * 100))

  return (
    <div style={{ marginTop: 4 }}>
      {/* full-width gradient bar: down → warn → up */}
      <div style={{ position: 'relative', height: 6, borderRadius: 99, overflow: 'hidden',
        background: 'linear-gradient(90deg, var(--down) 0%, var(--warn) 42%, var(--up) 100%)', opacity: 0.85 }} />
      {/* cursor marker */}
      <div style={{ position: 'relative', height: 0 }}>
        <div style={{ position: 'absolute', top: -9,
          left: `calc(${pos}% - 1.5px)`,
          width: 3, height: 12, background: 'var(--fg-1)', borderRadius: 2,
          boxShadow: '0 0 6px rgba(255,255,255,0.5)' }} />
      </div>
      {/* labels */}
      <div className="mono" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--fg-4)', marginTop: 8 }}>
        <span>stop {fmt(stop)}</span>
        <span className={pct >= 0 ? 'up' : 'down'} style={{ fontWeight: 700 }}>{fmt(current)} ({pct >= 0 ? '+' : ''}{pct.toFixed(2)}%)</span>
        <span>target {fmt(target)}</span>
      </div>
    </div>
  )
}
