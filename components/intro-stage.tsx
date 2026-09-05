"use client"

import { useEffect, useState } from "react"
import { CONFIG } from "@/lib/birthday-config"
import { sideCannons } from "@/lib/celebrate"

type Phase = "countdown" | "greeting"

function getDiff(unlock: Date) {
  const diff = unlock.getTime() - Date.now()
  return {
    diff,
    d: Math.max(0, Math.floor(diff / 86400000)),
    h: Math.max(0, Math.floor(diff / 3600000) % 24),
    m: Math.max(0, Math.floor(diff / 60000) % 60),
    s: Math.max(0, Math.floor(diff / 1000) % 60),
  }
}

export function IntroStage({ entered, onEnter }: { entered: boolean; onEnter: () => void }) {
  const unlock = new Date(CONFIG.unlockISO)
  const alreadyUnlocked = CONFIG.previewMode || Date.now() >= unlock.getTime()

  const [phase, setPhase] = useState<Phase>(alreadyUnlocked ? "greeting" : "countdown")
  const [time, setTime] = useState(() => getDiff(unlock))

  // countdown tick
  useEffect(() => {
    if (phase !== "countdown") return
    const id = setInterval(() => {
      const next = getDiff(unlock)
      setTime(next)
      if (next.diff <= 0) setPhase("greeting")
    }, 1000)
    return () => clearInterval(id)
  }, [phase, unlock])

  // confetti on greeting
  useEffect(() => {
    if (phase === "greeting" && !entered) {
      try {
        sideCannons()
      } catch {
        // ignore confetti errors
      }
    }
  }, [phase, entered])

  const units = [
    { label: "days", value: time.d },
    { label: "hrs", value: time.h },
    { label: "min", value: time.m },
    { label: "sec", value: time.s },
  ]

  return (
    <div
      className={`fixed inset-0 z-[80] flex items-center justify-center px-6 text-center transition-all duration-700 ${
        entered ? "pointer-events-none opacity-0 scale-105" : "opacity-100 pointer-events-auto"
      }`}
    >
      {phase === "countdown" ? (
        <div className="animate-fade-up">
          <h1 className="font-serif text-3xl font-semibold leading-tight sm:text-4xl">
            {"something's coming, "}
            <span className="italic text-gradient-gold">{CONFIG.recipientName}...</span>
          </h1>
          <p className="mt-3 text-ivory-dim">a little something, made for your birthday</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {units.map((u) => (
              <div
                key={u.label}
                className="glass min-w-[80px] rounded-lg px-5 py-4"
              >
                <span
                  suppressHydrationWarning
                  className="block font-serif text-3xl font-semibold text-gold tabular-nums"
                >
                  {String(u.value).padStart(2, "0")}
                </span>
                <span className="text-[0.65rem] uppercase tracking-[0.15em] text-ivory-dim">
                  {u.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="animate-fade-up">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-gold">happy birthday</p>
          <h1 className="font-serif text-5xl font-bold leading-[1.05] sm:text-6xl md:text-7xl">
            Happy Birthday,
            <br />
            <span className="italic text-gradient-gold">{CONFIG.recipientName}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-md text-ivory-dim">
            I made you something. Hope you like it.
          </p>
          <button
            type="button"
            onClick={onEnter}
            className="mt-10 cursor-pointer rounded-full bg-gold px-9 py-3.5 font-medium tracking-wide text-ink shadow-[0_10px_30px_rgba(217,180,117,0.35)] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(217,180,117,0.5)] active:scale-95"
          >
            ENTER
          </button>
        </div>
      )}
    </div>
  )
}
