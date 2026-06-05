import { useEffect, useRef } from 'react'
import type { SparklineBar } from '../types'

interface Props { series: SparklineBar[]; entryPrice: number; symbol?: string; h?: number; animate?: boolean }

export function PositionSparkline({ series, entryPrice, symbol, h = 52, animate = true }: Props) {
  const lineRef = useRef<SVGPathElement>(null)
  const W = 300

  if (!series.length) {
    return <div style={{ height: h, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: 10, color: 'var(--fg-4)' }}>loading…</span>
    </div>
  }

  const closes = series.map(b => b.close)
  const min = Math.min(...closes, entryPrice) * 0.999
  const max = Math.max(...closes, entryPrice) * 1.001
  const rng = max - min || 1

  const X = (i: number) => (i / (closes.length - 1)) * W
  const Y = (v: number) => h - 4 - ((v - min) / rng) * (h - 8)

  const pts = closes.map((v, i) => [X(i), Y(v)] as [number, number])
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ')
  const area = d + ` L ${W} ${h} L 0 ${h} Z`
  const entryY = Y(entryPrice)
  const lastClose = closes[closes.length - 1]
  const isUp = lastClose >= entryPrice
  const color = isUp ? 'var(--up)' : 'var(--down)'
  const gid = symbol ? `sp_${symbol}` : `sp_${Math.round(closes[0] * 100)}`

  useEffect(() => {
    const el = lineRef.current
    if (!el || !animate || closes.length < 2) return
    const len = el.getTotalLength()
    el.style.strokeDasharray = String(len)
    el.style.strokeDashoffset = String(len)
    el.getBoundingClientRect()
    el.style.transition = 'stroke-dashoffset 900ms cubic-bezier(0.22,1,0.36,1)'
    el.style.strokeDashoffset = '0'
  }, [animate])

  return (
    <svg viewBox={`0 0 ${W} ${h}`} preserveAspectRatio="none" style={{ width: '100%', height: h, display: 'block' }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gid})`} />
      <line x1="0" y1={entryY} x2={W} y2={entryY} stroke="var(--fg-4)" strokeWidth="1" strokeDasharray="3 3" />
      <path ref={lineRef} d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
