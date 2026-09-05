"use client"

import { useEffect, useState } from "react"
import { CONFIG } from "@/lib/birthday-config"
import { AmbientBackground } from "@/components/ambient-background"
import { IntroStage } from "@/components/intro-stage"
import { AvatarHero } from "@/components/avatar-hero"
import { MusicPlayer } from "@/components/music-player"
import { MemoryLane } from "@/components/memory-lane"
import { OpenWhen } from "@/components/open-when"
import { Wishes } from "@/components/wishes"
import { LetterCard } from "@/components/letter-card"
import { EasterEgg } from "@/components/easter-egg"
import { AmbientMusicToggle } from "@/components/ambient-music-toggle"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function Page() {
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("birthday_entered") === "true") {
      setEntered(true)
    }
  }, [])

  const handleEnter = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("birthday_entered", "true")
    }
    setEntered(true)
  }

  return (
    <main className="relative min-h-screen">
      <AmbientBackground />

      <IntroStage entered={entered} onEnter={handleEnter} />

      <div
        className={`transition-all duration-1000 ${
          entered ? "opacity-100 blur-0" : "pointer-events-none opacity-0 blur-md"
        }`}
      >
        <AvatarHero />

        {/* Bento layout */}
        <div className="mx-auto max-w-5xl px-6 pb-24">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Music — wide */}
            <div className="md:col-span-2">
              <MusicPlayer />
            </div>
            {/* Wishes */}
            <div className="md:col-span-1">
              <Wishes />
            </div>

            {/* Memory Lane — full width panel */}
            <div className="glass rounded-2xl p-6 sm:p-8 md:col-span-3">
              <MemoryLane />
            </div>

            {/* Open When — two thirds */}
            <div className="glass rounded-2xl p-6 sm:p-8 md:col-span-2">
              <OpenWhen />
            </div>
            {/* Letter — one third */}
            <div className="md:col-span-1">
              <LetterCard />
            </div>
          </div>

          <footer className="mt-16 text-center">
            <p className="font-hand text-2xl text-gold-soft">
              made with love, for {CONFIG.recipientName}
            </p>
            <p className="mt-1 text-sm text-ivory-dim">
              {CONFIG.senderName} &middot; happy birthday
            </p>
          </footer>
        </div>
      </div>

      <EasterEgg />
      <AmbientMusicToggle active={entered} />
      <WhatsAppButton />
    </main>
  )
}
