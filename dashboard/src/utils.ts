export const fmt = (n: number | string | null | undefined, d = 2): string => {
  if (n == null || n === '') return '—'
  const v = parseFloat(String(n))
  if (isNaN(v)) return '—'
  return '$' + Math.abs(v).toLocaleString(undefined, { minimumFractionDigits: d, maximumFractionDigits: d })
}
export const signed = (n: number | null | undefined, d = 2): string => {
  if (n == null) return '—'
  return (n >= 0 ? '+' : '−') + fmt(n, d)
}
export const pct = (n: number | null | undefined): string => {
  if (n == null) return '—'
  return (n >= 0 ? '+' : '−') + Math.abs(n).toFixed(2) + '%'
}
export const clsPL = (n: number | null | undefined): string =>
  n == null ? '' : n >= 0 ? 'up' : 'down'

export const sectorVar = (s: string): string => ({
  Technology:    '--cat-tech',
  Energy:        '--cat-energy',
  Healthcare:    '--cat-health',
  Financials:    '--cat-fin',
  Consumer:      '--cat-consumer',
  Industrials:   '--cat-indust',
  Materials:     '--cat-material',
  Communication: '--cat-comm',
} as Record<string, string>)[s] ?? '--fg-3'

export const parsePrice = (raw: string | undefined): number =>
  raw ? parseFloat(raw.replace(/[^0-9.]/g, '')) || 0 : 0

export const relativeTime = (iso: string): string => {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (s < 60) return 'just now'
  if (s < 3600) return `${Math.floor(s / 60)}m ago`
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`
  return `${Math.floor(s / 86400)}d ago`
}
