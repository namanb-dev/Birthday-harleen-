"use client"

import { useState } from "react"
import { CONFIG } from "@/lib/birthday-config"
import { Modal } from "@/components/modal"
import { heartBurst } from "@/lib/celebrate"
import { Heart } from "lucide-react"

export function EasterEgg() {
  const [open, setOpen] = useState(false)

  const reveal = () => {
    setOpen(true)
    heartBurst()
  }

  return (
    <>
      <button
        onClick={reveal}
        aria-label="A hidden message"
        className="fixed bottom-5 left-5 z-[70] flex h-11 w-11 items-center justify-center rounded-full glass text-blush transition-transform hover:scale-110"
      >
        <Heart className="h-5 w-5 animate-pulse" />
      </button>

      <Modal open={open} onClose={() => setOpen(false)} label="A hidden message">
        <div className="glass-strong rounded-2xl p-8 text-center sm:p-10">
          <Heart className="mx-auto h-9 w-9 fill-blush text-blush" />
          <p className="mt-4 font-hand text-2xl leading-relaxed text-ivory sm:text-3xl">
            {CONFIG.eggMessage}
          </p>
          <p className="mt-4 font-serif italic text-gold-soft">{CONFIG.letterSignOff}</p>
        </div>
      </Modal>
    </>
  )
}
