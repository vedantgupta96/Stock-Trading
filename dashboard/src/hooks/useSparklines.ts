import { useQuery } from '@tanstack/react-query'
import type { SparklineData } from '../types'

export function useSparklines(symbols: string[]) {
  const key = symbols.slice().sort().join(',')
  return useQuery<SparklineData>({
    queryKey: ['sparklines', key],
    queryFn: () =>
      fetch(`/api/sparklines?symbols=${symbols.join(',')}&days=30`).then(r => r.json()),
    enabled: symbols.length > 0,
    staleTime: 10 * 60_000,
  })
}
