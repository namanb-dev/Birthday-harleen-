"use client"

import { useState } from "react"
import { fireworks, heartBurst } from "@/lib/celebrate"
import { PartyPopper, Heart } from "lucide-react"

export function Wishes() {
  const [revealed, setRevealed] = useState(false)

  const celebrate = () => {
    setRevealed(true)
    fireworks()
    setTimeout(heartBurst, 400)
    setTimeout(heartBurst, 1200)
  }

  return (
    <div className="glass relative flex h-full flex-col items-center justify-center overflow-hidden rounded-2xl p-8 text-center">
      <div className="animate-float-slow pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(232,185,192,0.35),transparent_70%)] blur-2xl" />
      <p className="text-xs uppercase tracking-[0.25em] text-gold">the surprise</p>
      {revealed ? (
        <div className="animate-fade-up mt-3">
          <Heart className="mx-auto h-8 w-8 fill-blush text-blush" />
          <h3 className="mt-3 font-serif text-3xl font-bold text-gradient-gold">
            Make a wish!
          </h3>
          <p className="mx-auto mt-3 max-w-xs text-ivory-dim">
            Wishing you a year that feels just as wonderful as you are. Everything good, and a little extra.
          </p>
          <button
            onClick={celebrate}
            className="mt-6 text-sm text-gold underline-offset-4 hover:underline"
          >
            again! &rarr;
          </button>
        </div>
      ) : (
        <>
          <h3 className="mt-3 font-serif text-2xl font-semibold sm:text-3xl">
            One more thing...
          </h3>
          <p className="mt-2 max-w-xs text-ivory-dim">Press the button. Trust me.</p>
          <button
            onClick={celebrate}
            className="mt-6 flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-medium text-ink shadow-[0_10px_30px_rgba(217,180,117,0.4)] transition-transform hover:-translate-y-0.5 hover:scale-105"
          >
            <PartyPopper className="h-5 w-5" />
            Celebrate
          </button>
        </>
      )}
    </div>
  )
}
