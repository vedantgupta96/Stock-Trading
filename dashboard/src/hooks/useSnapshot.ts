import { useQuery } from '@tanstack/react-query'
import type { SnapshotData } from '../types'

export function useSnapshot() {
  return useQuery<SnapshotData>({
    queryKey: ['snapshot'],
    queryFn: () => fetch('/api/snapshot').then(r => r.json()),
    staleTime: 30_000,
  })
}
