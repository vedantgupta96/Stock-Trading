import { useQuery } from '@tanstack/react-query'
import type { NewsData } from '../types'

export function useNews() {
  return useQuery<NewsData>({
    queryKey: ['news'],
    queryFn: () => fetch('/api/news').then(r => r.json()),
    staleTime: 5 * 60_000,
  })
}
