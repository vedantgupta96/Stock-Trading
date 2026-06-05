import { sectorVar } from '../utils'

export function SectorBadge({ sector }: { sector?: string }) {
  if (!sector) return null
  const v = sectorVar(sector)
  return (
    <span className="v-badge" style={{
      background: `color-mix(in srgb, var(${v}) 14%, transparent)`,
      color: `var(${v})`,
      border: `1px solid color-mix(in srgb, var(${v}) 42%, transparent)`,
      textTransform: 'none',
      letterSpacing: 'normal',
      fontSize: 11,
    }}>
      {sector}
    </span>
  )
}
