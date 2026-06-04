import { useQuery } from '@tanstack/react-query'
import type { AnalyticsData } from '../types'

export function useAnalytics() {
  return useQuery<AnalyticsData>({
    queryKey: ['analytics'],
    queryFn: () => fetch('/api/analytics').then(r => r.json()),
    staleTime: 30_000,
  })
}
