"use client"

import { useEffect, useState } from "react"
import { Wifi, WifiOff, CheckCircle2 } from "lucide-react"

export function ServiceWorkerRegister() {
  const [isOffline, setIsOffline] = useState(false)
  const [swReady, setSwReady] = useState(false)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    // Check initial connection status
    if (typeof window !== "undefined") {
      setIsOffline(!navigator.onLine)

      const handleOnline = () => setIsOffline(false)
      const handleOffline = () => setIsOffline(true)

      window.addEventListener("online", handleOnline)
      window.addEventListener("offline", handleOffline)

      // Register Service Worker
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register("/sw.js")
          .then((reg) => {
            console.log("[PWA] ServiceWorker registered with scope:", reg.scope)
            setSwReady(true)
            // Show toast briefly on registration success
            setShowToast(true)
            setTimeout(() => setShowToast(false), 4000)
          })
          .catch((err) => {
            console.error("[PWA] ServiceWorker registration failed:", err)
          })
      }

      return () => {
        window.removeEventListener("online", handleOnline)
        window.removeEventListener("offline", handleOffline)
      }
    }
  }, [])

  return (
    <>
      {/* Offline Alert Banner */}
      {isOffline && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-amber-500/90 text-slate-950 font-medium text-xs sm:text-sm backdrop-blur-md shadow-lg border border-amber-300/30 animate-bounce">
          <WifiOff className="h-4 w-4" />
          <span>You are offline — using saved offline version!</span>
        </div>
      )}

      {/* Offline Ready Toast Notification */}
      {showToast && !isOffline && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-emerald-950/90 text-emerald-200 text-xs sm:text-sm backdrop-blur-md shadow-xl border border-emerald-500/30 transition-all duration-500">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>Offline mode enabled! Link will work offline.</span>
        </div>
      )}
    </>
  )
}
