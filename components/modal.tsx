"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"

export function Modal({
  open,
  onClose,
  children,
  label,
  maxWidthClass = "max-w-xl",
}: {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  label?: string
  maxWidthClass?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"

    if (containerRef.current) {
      containerRef.current.scrollTop = 0
    }

    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="fixed inset-0 z-[100] overflow-y-auto bg-[rgba(10,6,14,0.85)] backdrop-blur-md animate-in fade-in duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="min-h-full w-full flex justify-center items-start sm:items-center p-4 sm:p-6"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose()
        }}
      >
        <div className={`relative w-full ${maxWidthClass} my-auto text-left animate-in fade-in zoom-in-95 duration-300`}>
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute -top-3 -right-2 sm:-top-4 sm:-right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900/90 text-ivory-dim transition hover:bg-gold/20 hover:text-gold border border-white/10 shadow-lg"
          >
            <X className="h-5 w-5" />
          </button>
          {children}
        </div>
      </div>
    </div>
  )
}


