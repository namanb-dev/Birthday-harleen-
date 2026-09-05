"use client"

import { useState } from "react"
import { CONFIG } from "@/lib/birthday-config"

export function WhatsAppButton() {
  const [dismissed, setDismissed] = useState(false)
  const [hovered, setHovered] = useState(false)
  const wa = CONFIG.whatsapp

  if (!wa || !wa.enabled) return null

  // Format phone number by removing non-digit characters
  const cleanNumber = wa.phoneNumber.replace(/[^\d]/g, "")
  const encodedText = encodeURIComponent(wa.message || "")
  // wa.me format automatically routes to WhatsApp App on Mobile & WhatsApp Web / App on Desktop
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedText}`

  const badgeText = wa.badgeMessage || wa.tooltip || "I am just a button away from making a call or msg!"

  return (
    <div className="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">
      {/* Floating Speech Bubble Message over WhatsApp logo */}
      {!dismissed && (
        <div
          className={`relative max-w-[250px] sm:max-w-[290px] rounded-2xl bg-ink/95 p-3.5 text-xs sm:text-sm font-medium text-ivory shadow-[0_10px_35px_rgba(0,0,0,0.6)] backdrop-blur-md border border-gold/40 transition-all duration-300 ${
            hovered ? "scale-105 border-gold shadow-[0_12px_40px_rgba(217,180,117,0.35)]" : "animate-fade-up"
          }`}
        >
          {/* Close / Dismiss button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              setDismissed(true)
            }}
            className="absolute -top-2 -left-2 flex h-5 w-5 items-center justify-center rounded-full bg-panel-soft text-ivory-dim border border-white/10 hover:bg-red-500 hover:text-white transition-colors text-[10px]"
            title="Dismiss message"
            aria-label="Dismiss message"
          >
            ✕
          </button>

          {/* Clickable link box */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="flex items-start gap-2.5 group/bubble text-left"
          >
            {/* Status Indicator / Icon */}
            <span className="relative flex h-2.5 w-2.5 mt-1 shrink-0">
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold" />
            </span>

            {/* Bubble Text */}
            <div className="flex-1">
              <p className="leading-snug text-ivory/90 group-hover/bubble:text-white transition-colors">
                {badgeText}
              </p>
              <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold tracking-wide text-gold group-hover/bubble:translate-x-0.5 transition-transform">
                Click to open WhatsApp &rarr;
              </span>
            </div>
          </a>

          {/* Speech Bubble Arrow Tail pointing down to logo */}
          <div className="absolute -bottom-2 right-5 h-0 w-0 border-x-8 border-x-transparent border-t-8 border-t-ink/95" />
        </div>
      )}

      {/* Floating Action WhatsApp Logo Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Open WhatsApp Chat"
        className="group relative flex h-13 w-13 items-center justify-center rounded-full bg-gold text-ink shadow-[0_8px_25px_rgba(217,180,117,0.45)] transition-all duration-300 hover:scale-110 hover:bg-gold-soft hover:shadow-[0_12px_30px_rgba(217,180,117,0.65)] active:scale-95 sm:h-14 sm:w-14"
      >
        {/* WhatsApp Icon SVG */}
        <svg
          className="relative h-7 w-7 fill-current transition-transform duration-300 group-hover:rotate-6 sm:h-8 sm:w-8"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.008 3.684 3.751-.983zm11.23-6.071c-.328-.164-1.942-.958-2.242-1.068-.3-.11-.518-.164-.737.164-.219.328-.849 1.068-1.041 1.287-.192.219-.384.246-.712.082s-1.385-.51-2.639-1.628c-.976-.87-1.636-1.944-1.827-2.272-.192-.328-.02-.505.144-.668.148-.147.328-.383.493-.575.164-.192.219-.328.328-.547.11-.219.055-.411-.027-.575-.082-.164-.737-1.778-1.009-2.435-.265-.64-.536-.554-.737-.564-.192-.01-.411-.01-.63-.01s-.575.082-.876.411c-.301.328-1.15 1.123-1.15 2.738 0 1.615 1.177 3.176 1.341 3.395.164.219 2.316 3.536 5.611 4.958.784.339 1.396.541 1.873.693.787.251 1.503.215 2.069.13.632-.095 1.942-.794 2.216-1.56.274-.766.274-1.423.192-1.56-.082-.136-.301-.219-.629-.383z" />
        </svg>
      </a>
    </div>
  )
}
