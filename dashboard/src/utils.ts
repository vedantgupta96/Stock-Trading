export const fmt = (n: number | string | null | undefined, decimals = 2): string => {
  if (n == null || n === '') return '—'
  const val = parseFloat(String(n))
  if (isNaN(val)) return '—'
  return `$${Math.abs(val).toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
}

export const fmtSigned = (n: number | null | undefined): string => {
  if (n == null) return '—'
  const sign = n >= 0 ? '+' : '-'
  return `${sign}${fmt(n)}`
}

export const colorClass = (n: number): string =>
  n >= 0 ? 'text-emerald-400' : 'text-red-400'

export const relativeTime = (iso: string): string => {
  const secs = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (secs < 60) return 'just now'
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`
  if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`
  return `${Math.floor(secs / 86400)}d ago`
}

export const parsePrice = (raw: string | undefined): number => {
  if (!raw) return 0
  return parseFloat(raw.replace(/[^0-9.]/g, '')) || 0
}

const SECTOR_STYLES: Record<string, string> = {
  Technology:  'bg-blue-900/40 text-blue-300 border-blue-700/50',
  Energy:      'bg-amber-900/40 text-amber-300 border-amber-700/50',
  Healthcare:  'bg-emerald-900/40 text-emerald-300 border-emerald-700/50',
  Financials:  'bg-yellow-900/40 text-yellow-300 border-yellow-700/50',
  Consumer:    'bg-purple-900/40 text-purple-300 border-purple-700/50',
  Industrials: 'bg-cyan-900/40 text-cyan-300 border-cyan-700/50',
  Materials:   'bg-rose-900/40 text-rose-300 border-rose-700/50',
}

export const sectorStyle = (sector: string): string =>
  SECTOR_STYLES[sector] ?? 'bg-slate-800/60 text-slate-400 border-slate-600/50'
