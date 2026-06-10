import * as React from "react"
import { cn } from "@/lib/utils"

interface ToastProps {
  message: string
  show: boolean
  onClose: () => void
}

export function Toast({ message, show, onClose }: ToastProps) {
  React.useEffect(() => {
    if (!show) return
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [show, onClose])

  if (!show) return null

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-md border border-slate-200 bg-white px-5 py-4 shadow-lg",
        "animate-in fade-in slide-in-from-bottom-4 duration-300"
      )}
      role="status"
      aria-live="polite"
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white text-xs font-bold">
        ✓
      </span>
      <p className="text-sm font-medium text-slate-900">{message}</p>
      <button
        onClick={onClose}
        className="ml-2 text-slate-400 hover:text-slate-600 text-lg leading-none"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  )
}

export default Toast
