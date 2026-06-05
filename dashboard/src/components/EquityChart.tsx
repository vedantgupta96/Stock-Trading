import { useEffect, useRef, useState } from 'react'
import { fmt } from '../utils'
import type { DrawdownData, EODSnapshot } from '../types'

type Tab = 'equity' | 'drawdown'

interface AreaChartProps {
  series: { date: string; value: number }[]
  color: string
  fmtVal: (v: number) => string
  fmtAxis: (v: number) => string
  negative?: boolean
}

function AreaChart({ series, color, fmtVal, fmtAxis, negative }: AreaChartProps) {
  const lineRef = useRef<SVGPathElement>(null)
  const [hover, setHover] = useState<number | null>(null)
  const W = 640, H = 188, padB = 26, padT = 12, padL = 50, padR = 8
  const plotW = W - padL - padR

  const vals = series.map(s => s.value)
  const rawMin = Math.min(...vals), rawMax = Math.max(...vals)
  const mean = (rawMin + rawMax) / 2 || 1
  // Ensure at least 1% of mean is visible so small moves don't look catastrophic
  const dataRng = rawMax - rawMin
  const minPad = Math.max(dataRng, Math.abs(mean) * 0.01) - dataRng
  const paddedMin = rawMin - minPad / 2
  const paddedMax = rawMax + minPad / 2
  const min = negative ? Math.min(paddedMin, 0) : paddedMin
  const max = negative ? Math.max(paddedMax, 0) : paddedMax
  const rng = max - min || 1

  const X = (i: number) => padL + (i / Math.max(series.length - 1, 1)) * plotW
  const Y = (v: number) => padT + (1 - (v - min) / rng) * (H - padT - padB)

  const linePath = series.map((s, i) => (i ? 'L' : 'M') + X(i).toFixed(1) + ' ' + Y(s.value).toFixed(1)).join(' ')
  const areaPath = linePath + ` L ${X(series.length - 1)} ${H - padB} L ${padL} ${H - padB} Z`
  const gradId = `ac_${color.replace(/[^a-zA-Z]/g, '_')}`

  useEffect(() => {
    const el = lineRef.current
    if (!el || series.length < 2) return
    const len = el.getTotalLength()
    el.style.strokeDasharray = String(len)
    el.style.strokeDashoffset = String(len)
    el.getBoundingClientRect()
    el.style.transition = 'stroke-dashoffset 1100ms cubic-bezier(0.22,1,0.36,1)'
    el.style.strokeDashoffset = '0'
  }, [series.length > 1])

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(g => min + (1 - g) * rng)
  const xIdxs = series.length > 3
    ? [0, Math.round((series.length - 1) * 0.33), Math.round((series.length - 1) * 0.66), series.length - 1]
    : series.map((_, i) => i)

  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const frac = ((e.clientX - r.left) / r.width * W - padL) / plotW
    setHover(Math.max(0, Math.min(series.length - 1, Math.round(frac * (series.length - 1)))))
  }

  const axFont: React.CSSProperties = { fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--fg-4)' } as any

  if (series.length < 2) {
    return (
      <div style={{ height: H, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: 'var(--fg-4)', fontSize: 13 }}>No data yet</span>
      </div>
    )
  }

  return (
    <div style={{ position: 'relative' }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}
        onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.34" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {yTicks.map((v, k) => {
          const gy = padT + (k / (yTicks.length - 1)) * (H - padT - padB)
          return (
            <g key={k}>
              <line x1={padL} x2={W - padR} y1={gy} y2={gy} stroke="var(--line)" strokeWidth="1" />
              <text x={padL - 6} y={gy + 3.5} textAnchor="end" style={axFont as any}>{fmtAxis(v)}</text>
            </g>
          )
        })}
        {xIdxs.map((i, k) => (
          <text key={k} x={X(i)} y={H - 6} textAnchor={k === 0 ? 'start' : k === xIdxs.length - 1 ? 'end' : 'middle'} style={axFont as any}>
            {series[i].date.slice(5)}
          </text>
        ))}
        <path d={areaPath} fill={`url(#${gradId})`} />
        <path ref={lineRef} d={linePath} fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        {hover != null && (
          <g>
            <line x1={X(hover)} x2={X(hover)} y1={padT} y2={H - padB} stroke="var(--line-strong)" strokeWidth="1" />
            <circle cx={X(hover)} cy={Y(series[hover].value)} r="4.5" fill={color} stroke="var(--ink-900)" strokeWidth="2" />
          </g>
        )}
      </svg>
      {hover != null && (
        <div className="mono" style={{ position: 'absolute', top: 6, pointerEvents: 'none', whiteSpace: 'nowrap',
          left: `${((X(hover)) / W) * 100}%`, transform: 'translateX(-50%)',
          background: 'var(--ink-700)', border: '1px solid var(--line-strong)',
          borderRadius: 8, padding: '4px 9px', fontSize: 11, color: 'var(--fg-1)' }}>
          <span style={{ color: 'var(--fg-3)' }}>{series[hover].date} </span>
          <span style={{ color }}>{fmtVal(series[hover].value)}</span>
        </div>
      )}
    </div>
  )
}

interface Props { equityHistory: EODSnapshot[]; drawdown: DrawdownData | undefined }

export function EquityChart({ equityHistory, drawdown }: Props) {
  const [tab, setTab] = useState<Tab>('equity')
  const equitySeries = equityHistory.map(s => ({ date: s.date, value: s.equity }))
  const ddSeries = (drawdown?.series ?? []).map(s => ({ date: s.date, value: s.drawdown }))

  // Smarter axis formatter: use more decimal places when the equity range is narrow
  const eqVals = equitySeries.map(s => s.value)
  const eqRange = eqVals.length > 1 ? Math.max(...eqVals) - Math.min(...eqVals) : 0
  const eqMean = eqVals.length ? eqVals.reduce((a, b) => a + b, 0) / eqVals.length : 1
  const eqFmtAxis = eqRange / eqMean < 0.005
    ? (v: number) => '$' + (v / 1000).toFixed(2) + 'k'
    : (v: number) => '$' + (v / 1000).toFixed(1) + 'k'

  return (
    <div className="v-card v-card-pad rise" style={{ gridColumn: 'span 2', animationDelay: '80ms' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="v-card-title">Portfolio History</span>
          {equityHistory.length > 0 && (
            <span className="mono" style={{ fontSize: 12, color: 'var(--fg-3)' }}>
              {equityHistory.length} EOD snapshot{equityHistory.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        <div className="v-seg">
          <button className={tab === 'equity' ? 'on' : ''} onClick={() => setTab('equity')}>Equity</button>
          <button className={tab === 'drawdown' ? 'on' : ''} onClick={() => setTab('drawdown')}>Drawdown</button>
        </div>
      </div>

      {tab === 'equity'
        ? <AreaChart series={equitySeries} color="var(--volt)"
            fmtVal={v => fmt(v)} fmtAxis={eqFmtAxis} />
        : <AreaChart series={ddSeries} color="var(--down)" negative
            fmtVal={v => v.toFixed(2) + '%'} fmtAxis={v => v.toFixed(0) + '%'} />}
    </div>
  )
}
