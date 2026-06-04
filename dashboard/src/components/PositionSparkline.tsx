import type { SparklineBar } from '../types'

interface Props {
  series: SparklineBar[]
  entryPrice: number
}

export function PositionSparkline({ series, entryPrice }: Props) {
  if (!series.length) {
    return <div className="h-14 flex items-center justify-center text-xs text-slate-600">loading chart…</div>
  }

  const closes = series.map(b => b.close)
  const min = Math.min(...closes, entryPrice) * 0.999
  const max = Math.max(...closes, entryPrice) * 1.001
  const range = max - min || 1

  const W = 300, H = 56
  const toX = (i: number) => (i / (closes.length - 1)) * W
  const toY = (v: number) => H - ((v - min) / range) * H

  const pts = closes.map((c, i) => `${toX(i).toFixed(1)},${toY(c).toFixed(1)}`).join(' ')
  const polyFill = `${pts} ${W},${H} 0,${H}`
  const entryY = toY(entryPrice).toFixed(1)
  const lastClose = closes[closes.length - 1]
  const isUp = lastClose >= entryPrice
  const color = isUp ? '#34d399' : '#f87171'
  const fillColor = isUp ? 'rgba(52,211,153,0.12)' : 'rgba(248,113,113,0.12)'

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-14 mb-1" preserveAspectRatio="none">
      <polygon points={polyFill} fill={fillColor} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      {/* entry price line */}
      <line x1="0" y1={entryY} x2={W} y2={entryY}
        stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 3" />
    </svg>
  )
}
