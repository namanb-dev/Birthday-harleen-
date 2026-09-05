"use client"

import { useEffect, useRef, useState } from "react"
import { CONFIG } from "@/lib/birthday-config"
import { Volume2, VolumeX } from "lucide-react"

export function AmbientMusicToggle({ active }: { active: boolean }) {
  const ref = useRef<HTMLAudioElement | null>(null)
  const [on, setOn] = useState(false)
  const hasMusic = Boolean(CONFIG.backgroundMusicSrc)

  useEffect(() => {
    if (!hasMusic) return
    const audio = new Audio(CONFIG.backgroundMusicSrc)
    audio.loop = true
    audio.volume = 0.35
    ref.current = audio
    return () => audio.pause()
  }, [hasMusic])

  // try to auto-start softly once the user enters
  useEffect(() => {
    if (!active || !hasMusic || !ref.current) return
    ref.current
      .play()
      .then(() => setOn(true))
      .catch(() => setOn(false))
  }, [active, hasMusic])

  const toggle = () => {
    const audio = ref.current
    if (!audio) return
    if (on) audio.pause()
    else audio.play().catch(() => {})
    setOn((v) => !v)
  }

  if (!hasMusic) return null

  return (
    <button
      onClick={toggle}
      aria-label={on ? "Mute background music" : "Play background music"}
      className="fixed bottom-20 right-5 z-[70] flex h-11 w-11 items-center justify-center rounded-full glass text-gold transition-transform hover:scale-110 sm:bottom-24 sm:right-6"
    >
      {on ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
    </button>
  )
}
