import { sectorStyle } from '../utils'

interface Props { sector?: string }

export function SectorBadge({ sector }: Props) {
  if (!sector) return null
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-[0.65rem] font-bold border ${sectorStyle(sector)}`}>
      {sector}
    </span>
  )
}
