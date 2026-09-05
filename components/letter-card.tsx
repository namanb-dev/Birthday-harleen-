"use client"

import { useState } from "react"
import { CONFIG } from "@/lib/birthday-config"
import { Modal } from "@/components/modal"
import { Feather } from "lucide-react"

export function LetterCard() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="glass group flex h-full w-full flex-col items-start justify-between gap-6 rounded-2xl p-7 text-left transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_18px_40px_rgba(0,0,0,0.4)]"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-gold transition-transform group-hover:rotate-6">
          <Feather className="h-6 w-6" />
        </span>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-gold">chapter four</p>
          <h3 className="mt-1 font-serif text-2xl font-semibold sm:text-3xl">The Letter</h3>
          <p className="mt-2 text-sm text-ivory-dim">
            everything I wanted to say — click to read
          </p>
        </div>
      </button>

      <Modal open={open} onClose={() => setOpen(false)} label="A birthday letter" maxWidthClass="max-w-2xl">
        <div className="glass-strong rounded-2xl p-8 sm:p-10">
          <p className="mb-2 text-xs uppercase tracking-[0.25em] text-gold">the letter</p>
          <div className="space-y-4">
            {CONFIG.letterParagraphs.map((p, i) => (
              <p key={i} className="font-hand text-2xl leading-relaxed text-ivory sm:text-[1.7rem]">
                {p}
              </p>
            ))}
            <p className="pt-2 font-hand text-3xl text-gold-soft">{CONFIG.letterSignOff}</p>
          </div>
        </div>
      </Modal>
    </>
  )
}
