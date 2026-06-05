import { createContext, useCallback, useContext, useState } from 'react'

type ToastType = 'success' | 'error' | 'warn' | 'info'
interface ToastItem { id: number; msg: string; type: ToastType }
interface Ctx { showToast: (msg: string, type?: ToastType, ms?: number) => void }

const ToastCtx = createContext<Ctx>({ showToast: () => {} })
export const useToast = () => useContext(ToastCtx)

let _id = 0

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const showToast = useCallback((msg: string, type: ToastType = 'info', ms = 4200) => {
    const id = ++_id
    setToasts(t => [...t, { id, msg, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), ms)
  }, [])

  return (
    <ToastCtx.Provider value={{ showToast }}>
      {children}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 100, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {toasts.map(t => (
          <div key={t.id} className={`v-toast v-toast-${t.type}`}>{t.msg}</div>
        ))}
      </div>
    </ToastCtx.Provider>
  )
}
