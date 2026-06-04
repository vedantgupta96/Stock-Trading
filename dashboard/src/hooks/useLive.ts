import { useQuery } from '@tanstack/react-query'
import type { LiveData } from '../types'

export function useLive(autoRefreshSecs: number) {
  return useQuery<LiveData>({
    queryKey: ['live'],
    queryFn: () => fetch('/api/live').then(r => r.json()),
    enabled: false,                    // only fires on explicit refetch or interval
    refetchInterval: autoRefreshSecs > 0 ? autoRefreshSecs * 1000 : false,
    staleTime: Infinity,
  })
}
