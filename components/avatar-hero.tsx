"use client"

import { useState } from "react"
import Image from "next/image"
import { CONFIG } from "@/lib/birthday-config"
import { Sparkles } from "lucide-react"

export function AvatarHero() {
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [bumped, setBumped] = useState(false)

  const cycle = () => {
    setQuoteIndex((i) => (i + 1) % CONFIG.avatarQuotes.length)
    setBumped(true)
    setTimeout(() => setBumped(false), 300)
  }

  return (
    <section className="relative mx-auto flex max-w-5xl flex-col items-center gap-10 px-6 pt-24 pb-10 text-center md:flex-row md:pt-32 md:text-left">
      {/* Avatar in glowing frame */}
      <div className="relative shrink-0">
        <div className="animate-float-slow absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(217,180,117,0.4),transparent_70%)] blur-2xl" />
        <button
          onClick={cycle}
          aria-label="Tap the avatar for a new quote"
          className={`group relative block rounded-full p-1.5 transition-transform duration-300 hover:scale-[1.03] ${
            bumped ? "scale-[1.05]" : ""
          }`}
        >
          <div className="rounded-full bg-[conic-gradient(from_0deg,#d9b475,#e8b9c0,#7a4896,#d9b475)] p-[3px] shadow-[0_0_50px_rgba(217,180,117,0.35)]">
            <div className="relative h-44 w-44 overflow-hidden rounded-full bg-ink sm:h-52 sm:w-52">
              <Image
                src={CONFIG.avatarSrc || "/placeholder.svg"}
                alt={`Photo of ${CONFIG.recipientName}`}
                width={320}
                height={320}
                priority
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <span className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-gold text-ink shadow-lg transition-transform group-hover:rotate-12">
            <Sparkles className="h-4 w-4" />
          </span>
        </button>
      </div>

      {/* Speech + intro */}
      <div className="max-w-md">
        <p className="text-sm uppercase tracking-[0.3em] text-gold">the guest of honor</p>
        <h2 className="mt-2 font-serif text-4xl font-bold leading-tight sm:text-5xl">
          It&apos;s all about <span className="italic text-gradient-gold">{CONFIG.recipientName}</span>
        </h2>

        <button
          onClick={cycle}
          className="group relative mt-6 block w-full text-left"
          aria-live="polite"
        >
          <div className="glass-strong relative rounded-2xl rounded-tl-sm px-5 py-4 transition-colors group-hover:border-gold/50">
            <span
              key={quoteIndex}
              className="animate-fade-up block font-hand text-2xl leading-snug text-gold-soft"
            >
              &ldquo;{CONFIG.avatarQuotes[quoteIndex]}&rdquo;
            </span>
          </div>
          <span className="mt-2 block text-xs text-ivory-dim">
            tap the bubble (or the avatar) for more &rarr;
          </span>
        </button>
      </div>
    </section>
  )
}
