import { relativeTime } from '../utils'
import type { NewsData } from '../types'

export function NewsWidget({ data, isLoading }: { data?: NewsData; isLoading: boolean }) {
  return (
    <div className="card-glass p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-white">Latest Market News</h2>
        <span className="text-xs text-slate-500">
          {data?.symbols?.slice(0, 8).join(' · ')}
        </span>
      </div>

      {isLoading && <p className="text-sm text-slate-500">Loading headlines...</p>}

      {!isLoading && !data?.headlines?.length && (
        <p className="text-sm text-slate-500">No recent headlines.</p>
      )}

      <div className="space-y-3">
        {data?.headlines?.map((h, i) => (
          <div key={i} className="pb-3 border-b border-slate-800/70 last:border-0 last:pb-0">
            <a
              href={h.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white font-medium hover:text-blue-300 transition-colors block"
            >
              {h.headline}
            </a>
            <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 flex-wrap">
              <span>{h.source}</span>
              <span>·</span>
              <span>{relativeTime(h.created_at)}</span>
              <span className="flex gap-1">
                {h.symbols.slice(0, 4).map(s => (
                  <span
                    key={s}
                    className="px-1.5 py-0.5 rounded-full text-[0.6rem] font-bold bg-blue-900/30 text-blue-300 border border-blue-700/30"
                  >
                    {s}
                  </span>
                ))}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
