import { fmt, parsePrice } from '../utils'

interface Props {
  stopRaw?: string
  targetRaw?: string
  current: number
  pct: number
}

export function RRBar({ stopRaw, targetRaw, current, pct }: Props) {
  const stopV   = parsePrice(stopRaw)
  const targetV = parsePrice(targetRaw)
  if (!stopV || !targetV || !current) return null

  const range = targetV - stopV
  if (range <= 0) return null

  const pos = Math.max(0, Math.min(100, ((current - stopV) / range) * 100))
  const fillColor = pos < 25 ? '#f87171' : pos > 75 ? '#34d399' : '#fbbf24'

  return (
    <div>
      {/* bar */}
      <div className="relative h-1.5 rounded-full bg-slate-700/80 mt-2.5 mb-4">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pos}%`, background: fillColor }}
        />
        {/* current price marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 rounded bg-white/80 shadow-[0_0_6px_rgba(255,255,255,0.5)]"
          style={{ left: `${pos}%`, transform: 'translate(-50%, -50%)' }}
        />
      </div>
      {/* labels */}
      <div className="flex justify-between text-[0.6rem] text-slate-500">
        <span>Stop {fmt(stopV)}</span>
        <span className={pct >= 0 ? 'text-emerald-400' : 'text-red-400'}>
          {fmt(current)} ({pct >= 0 ? '+' : ''}{pct.toFixed(2)}%)
        </span>
        <span>Target {fmt(targetV)}</span>
      </div>
    </div>
  )
}
