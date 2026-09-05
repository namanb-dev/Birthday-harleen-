"use client"

import { useState } from "react"
import { CONFIG, type OpenWhen as OpenWhenType } from "@/lib/birthday-config"
import { Modal } from "@/components/modal"
import { Mail, MailOpen } from "lucide-react"

export function OpenWhen() {
  const [active, setActive] = useState<OpenWhenType | null>(null)

  return (
    <div>
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.25em] text-gold">chapter three</p>
        <h3 className="mt-1 font-serif text-2xl font-semibold sm:text-3xl">Open When...</h3>
        <p className="mt-1 text-sm text-ivory-dim">little letters for whenever you need them</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {CONFIG.openWhen.map((env, i) => (
          <button
            key={i}
            onClick={() => setActive(env)}
            className="glass group flex items-center gap-4 rounded-xl p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_16px_36px_rgba(0,0,0,0.4)]"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blush/15 text-blush transition-colors group-hover:bg-gold/20 group-hover:text-gold">
              <Mail className="h-5 w-5 group-hover:hidden" />
              <MailOpen className="hidden h-5 w-5 group-hover:block" />
            </span>
            <span className="font-serif text-lg text-ivory">Open {env.title}</span>
          </button>
        ))}
      </div>

      <Modal open={Boolean(active)} onClose={() => setActive(null)} label="Open when letter">
        <div className="glass-strong rounded-2xl p-8 sm:p-10">
          <div className="mb-4 flex items-center gap-3 text-gold">
            <MailOpen className="h-6 w-6" />
            <p className="text-sm uppercase tracking-[0.25em]">open {active?.title}</p>
          </div>
          <p className="font-hand text-2xl leading-relaxed text-ivory sm:text-3xl">
            {active?.message}
          </p>
        </div>
      </Modal>
    </div>
  )
}
