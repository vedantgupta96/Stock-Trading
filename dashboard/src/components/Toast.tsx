import { createContext, useCallback, useContext, useState } from 'react'

type ToastType = 'info' | 'success' | 'warn' | 'error'

interface ToastItem {
  id: number
  msg: string
  type: ToastType
}

interface ToastCtx {
  showToast: (msg: string, type?: ToastType, ms?: number) => void
}

const Ctx = createContext<ToastCtx>({ showToast: () => {} })
export const useToast = () => useContext(Ctx)

let _id = 0

const TYPE_STYLES: Record<ToastType, string> = {
  info:    'bg-slate-900/95 border-blue-500/40 text-slate-200',
  success: 'bg-emerald-950/95 border-emerald-500/50 text-emerald-300',
  warn:    'bg-amber-950/95 border-amber-500/50 text-amber-300',
  error:   'bg-red-950/95 border-red-500/50 text-red-300',
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const showToast = useCallback((msg: string, type: ToastType = 'info', ms = 5000) => {
    const id = ++_id
    setToasts(t => [...t, { id, msg, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), ms)
  }, [])

  return (
    <Ctx.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        {toasts.map(t => (
          <div
            key={t.id}
            className={`px-4 py-2.5 rounded-xl border text-sm font-medium shadow-xl min-w-[240px] max-w-sm
              animate-[slideIn_0.2s_ease] ${TYPE_STYLES[t.type]}`}
          >
            {t.msg}
          </div>
        ))}
      </div>
    </Ctx.Provider>
  )
}
