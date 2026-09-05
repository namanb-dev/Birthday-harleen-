"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { CONFIG } from "@/lib/birthday-config"
import { Play, Pause, Music4, Volume2, AlertCircle } from "lucide-react"

const BARS = 40

function fmt(t: number) {
  if (!isFinite(t) || isNaN(t)) return "0:00"
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60)
    .toString()
    .padStart(2, "0")
  return `${m}:${s}`
}

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressBarRef = useRef<HTMLDivElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [hasError, setHasError] = useState(false)

  const songSrc = CONFIG.songSrc || "/audio/birthday-background.mp3"
  const songTitle = CONFIG.songTitle || "A Little Something For You"
  const songArtist = CONFIG.songArtist || "press play & stay a while"

  useEffect(() => {
    const audio = new Audio(songSrc)
    audio.loop = true
    audio.volume = 0.3 // comfortable low volume (30%)
    audioRef.current = audio

    const onTime = () => {
      setCurrent(audio.currentTime)
      setProgress((audio.currentTime / (audio.duration || 1)) * 100)
    }

    const onMeta = () => {
      setDuration(audio.duration || 0)
      setHasError(false)
    }

    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onError = () => {
      setHasError(true)
      setPlaying(false)
    }

    audio.addEventListener("timeupdate", onTime)
    audio.addEventListener("loadedmetadata", onMeta)
    audio.addEventListener("play", onPlay)
    audio.addEventListener("pause", onPause)
    audio.addEventListener("error", onError)

    return () => {
      audio.pause()
      audio.removeEventListener("timeupdate", onTime)
      audio.removeEventListener("loadedmetadata", onMeta)
      audio.removeEventListener("play", onPlay)
      audio.removeEventListener("pause", onPause)
      audio.removeEventListener("error", onError)
    }
  }, [songSrc])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      audio.pause()
    } else {
      audio
        .play()
        .then(() => {
          setHasError(false)
        })
        .catch((err) => {
          console.warn("Playback error or audio file missing:", err)
          setHasError(true)
          setPlaying(false)
        })
    }
  }

  const handleSeek = useCallback((clientX: number) => {
    const audio = audioRef.current
    const bar = progressBarRef.current
    if (!audio || !bar || !audio.duration) return
    const rect = bar.getBoundingClientRect()
    const clickX = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const newTime = (clickX / rect.width) * audio.duration
    audio.currentTime = newTime
    setCurrent(newTime)
    setProgress((newTime / audio.duration) * 100)
  }, [])

  const onProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    handleSeek(e.clientX)
  }

  const onProgressTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      handleSeek(e.touches[0].clientX)
    }
  }

  return (
    <div className="glass flex h-full flex-col rounded-2xl p-6 relative overflow-hidden transition-all duration-300">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.25em] text-gold font-medium">chapter one</p>
        {playing && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-gold border border-gold/20 animate-pulse">
            <Volume2 className="h-3 w-3" /> Playing
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center gap-4">
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold transition-transform duration-300 hover:scale-105">
          <Music4 className={`h-6 w-6 transition-transform duration-500 ${playing ? "scale-110 text-gold" : "text-gold/70"}`} />
          {playing && (
            <>
              <span className="absolute -inset-1 rounded-xl bg-gold/20 blur-sm animate-pulse" />
              <span className="absolute inset-0 animate-ping rounded-xl border border-gold/40 duration-1000" />
            </>
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate font-serif text-xl italic text-gold-soft">{songTitle}</p>
          <p className="truncate text-sm text-ivory-dim">{songArtist}</p>
        </div>
      </div>

      {/* Waveform visualizer */}
      <div className="mt-6 flex h-16 items-center justify-between gap-[3px]">
        {Array.from({ length: BARS }).map((_, i) => (
          <span
            key={i}
            className="w-full rounded-full bg-gradient-to-t from-gold/40 to-blush transition-all duration-300"
            style={{
              height: playing ? undefined : "18%",
              animation: playing
                ? `wave 900ms ease-in-out ${(i % 10) * 90}ms infinite alternate`
                : "none",
              opacity: playing ? 0.95 : 0.35,
            }}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="mt-5 flex items-center gap-4">
        <button
          onClick={toggle}
          aria-label={playing ? "Pause background music" : "Play background music"}
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold text-ink shadow-[0_8px_20px_rgba(217,180,117,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 ${
            playing ? "shadow-[0_0_25px_rgba(217,180,117,0.6)]" : ""
          }`}
        >
          {playing ? <Pause className="h-5 w-5 fill-current" /> : <Play className="ml-0.5 h-5 w-5 fill-current" />}
        </button>

        <div
          ref={progressBarRef}
          onClick={onProgressClick}
          onTouchStart={onProgressTouch}
          onTouchMove={onProgressTouch}
          className="group relative h-2 flex-1 cursor-pointer rounded-full bg-white/10 p-0.5 transition-all hover:h-2.5"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold/80 to-gold shadow-[0_0_8px_rgba(217,180,117,0.5)] transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
          {playing && (
            <div
              className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-gold shadow-[0_0_10px_rgba(217,180,117,0.9)] transition-all duration-75"
              style={{ left: `calc(${progress}% - 7px)` }}
            />
          )}
        </div>

        <span className="min-w-[78px] text-right text-xs tabular-nums text-ivory-dim font-mono">
          {fmt(current)} / {fmt(duration)}
        </span>
      </div>

      {hasError && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-amber-500/10 border border-amber-500/20 p-2.5 text-xs text-amber-200/90">
          <AlertCircle className="h-4 w-4 shrink-0 text-amber-400" />
          <span>
            Audio file not found at <code className="text-gold font-mono">public/audio/birthday-background.mp3</code>. Place your MP3 file there to start playback.
          </span>
        </div>
      )}

      <style jsx>{`
        @keyframes wave {
          from {
            height: 15%;
          }
          to {
            height: 100%;
          }
        }
      `}</style>
    </div>
  )
}
