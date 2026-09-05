"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { CONFIG, type Memory } from "@/lib/birthday-config"
import { Modal } from "@/components/modal"

function Polaroid({
  memory,
  rotate,
  onOpenModal,
}: {
  memory: Memory
  rotate: number
  onOpenModal: (memory: Memory) => void
}) {
  const [flipped, setFlipped] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const ref = useRef<HTMLDivElement>(null)
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    setTilt({ x: py * -12, y: px * 12 })
  }

  const reset = () => setTilt({ x: 0, y: 0 })

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (clickTimerRef.current) {
      // Second click within threshold -> Double click: flip card
      clearTimeout(clickTimerRef.current)
      clickTimerRef.current = null
      setFlipped((f) => !f)
    } else {
      // First click -> Single click: set timer to open modal popup
      clickTimerRef.current = setTimeout(() => {
        clickTimerRef.current = null
        onOpenModal(memory)
      }, 260)
    }
  }

  useEffect(() => {
    return () => {
      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`Memory: ${memory.caption}. Single click to expand photo, double click to flip.`}
      className="preserve-3d group relative aspect-[4/5] w-full cursor-pointer select-none [perspective:1000px]"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div
        className="preserve-3d relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${flipped ? 180 : tilt.y}deg)`,
        }}
      >
        {/* Front — photo */}
        <div className="backface-hidden absolute inset-0 flex flex-col rounded-md bg-ivory p-2.5 pb-8 shadow-[0_18px_40px_rgba(0,0,0,0.5)]">
          <div className="relative flex-1 overflow-hidden rounded-sm bg-panel-soft">
            <Image
              src={memory.img || "/placeholder.svg"}
              alt={memory.caption}
              fill
              sizes="(max-width: 768px) 45vw, 220px"
              className="object-cover"
            />
          </div>
          <span className="mt-2 text-center font-hand text-xl text-ink">{memory.caption}</span>
        </div>

        {/* Back — note */}
        {(() => {
          const len = memory.note.length
          let fontClasses = "text-base sm:text-lg leading-snug"
          if (len > 160) {
            fontClasses = "text-[0.72rem] sm:text-xs leading-tight sm:leading-tight"
          } else if (len > 90) {
            fontClasses = "text-xs sm:text-sm leading-tight sm:leading-tight"
          } else if (len > 50) {
            fontClasses = "text-sm sm:text-base leading-snug"
          }

          return (
            <div
              className="backface-hidden glass-strong absolute inset-0 flex flex-col items-center justify-center rounded-md p-4 text-center shadow-[0_18px_40px_rgba(0,0,0,0.5)] overflow-hidden"
              style={{ transform: "rotateY(180deg)" }}
            >
              <div className="flex h-full w-full items-center justify-center overflow-hidden">
                <p className={`font-hand text-gold-soft ${fontClasses} overflow-hidden`}>
                  {memory.note}
                </p>
              </div>
            </div>
          )
        })()}
      </div>
    </div>
  )
}

const ROTATIONS = [-3, 2, -2, 3, -1.5, 2.5, -2.5, 1.5]

export function MemoryLane() {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null)

  return (
    <div>
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.25em] text-gold">chapter two</p>
        <h3 className="mt-1 font-serif text-2xl font-semibold sm:text-3xl">Memory Lane</h3>
        <p className="mt-1 text-sm text-ivory-dim">
          hover to tilt &bull; single click to enlarge photo &bull; double click to flip over
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {CONFIG.memories.map((m, i) => (
          <Polaroid
            key={i}
            memory={m}
            rotate={ROTATIONS[i % ROTATIONS.length]}
            onOpenModal={(mem) => setSelectedMemory(mem)}
          />
        ))}
      </div>

      <Modal
        open={Boolean(selectedMemory)}
        onClose={() => setSelectedMemory(null)}
        label="Expanded Memory Photo"
        maxWidthClass="max-w-3xl"
      >
        {selectedMemory && (
          <div className="glass-strong rounded-2xl p-4 sm:p-6 text-center shadow-2xl">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full max-h-[70vh] min-h-[280px] overflow-hidden rounded-xl bg-panel-soft">
              <Image
                src={selectedMemory.img || "/placeholder.svg"}
                alt={selectedMemory.caption}
                fill
                sizes="(max-width: 1024px) 90vw, 800px"
                className="object-contain"
                priority
              />
            </div>
            <h4 className="mt-4 font-hand text-2xl sm:text-3xl text-gold-soft">
              {selectedMemory.caption}
            </h4>
            {selectedMemory.note && (
              <p className="mt-2 text-sm sm:text-base text-ivory-dim italic">
                "{selectedMemory.note}"
              </p>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}

