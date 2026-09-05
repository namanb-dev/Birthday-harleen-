import Image from "next/image"

export function AmbientBackground() {
  // Delicate sparkles positions & properties
  const sparkles = [
    { top: "8%", left: "12%", size: 14, delay: "0s", duration: "4s" },
    { top: "22%", left: "85%", size: 10, delay: "1.2s", duration: "5s" },
    { top: "42%", left: "8%", size: 12, delay: "2.5s", duration: "4.5s" },
    { top: "58%", left: "92%", size: 16, delay: "0.8s", duration: "6s" },
    { top: "72%", left: "18%", size: 10, delay: "3s", duration: "4s" },
    { top: "88%", left: "75%", size: 14, delay: "1.7s", duration: "5.5s" },
    { top: "32%", left: "48%", size: 8, delay: "2s", duration: "4.2s" },
    { top: "15%", left: "38%", size: 12, delay: "0.5s", duration: "5.2s" },
  ]

  const characters = [
    {
      id: "snoopy-moon",
      src: "/snoopy-moon.png",
      position: "top-6 right-2 sm:top-10 sm:right-8",
      size: "w-44 h-44 sm:w-64 sm:h-64",
      opacity: "opacity-50",
      animation: "animate-float-slow",
    },
    {
      id: "playful-cat",
      src: "/playful-cat-balloons.png",
      position: "top-[32%] left-1 sm:left-6",
      size: "w-40 h-40 sm:w-60 sm:h-60",
      opacity: "opacity-45",
      animation: "animate-drift",
    },
    {
      id: "snoopy-hug",
      src: "/snoopy-hug.png",
      position: "top-[60%] right-1 sm:right-6",
      size: "w-44 h-44 sm:w-60 sm:h-60",
      opacity: "opacity-45",
      animation: "animate-float-slow",
    },
    {
      id: "cozy-cat",
      src: "/cozy-cat-lineart.png",
      position: "bottom-4 left-2 sm:bottom-8 sm:left-8",
      size: "w-44 h-44 sm:w-64 sm:h-64",
      opacity: "opacity-50",
      animation: "animate-drift",
    },
  ]

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none">
      {/* Base radial gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#2e1b38_0%,#16101f_60%)]" />

      {/* Floating gradient meshes */}
      <div className="animate-drift absolute -left-[10%] top-[-15%] h-[55vmax] w-[55vmax] rounded-full bg-[radial-gradient(circle,rgba(217,180,117,0.22),transparent_70%)] blur-3xl" />
      <div className="animate-float-slow absolute right-[-15%] top-[20%] h-[45vmax] w-[45vmax] rounded-full bg-[radial-gradient(circle,rgba(232,185,192,0.20),transparent_70%)] blur-3xl" />
      <div className="animate-drift absolute bottom-[-20%] left-[25%] h-[50vmax] w-[50vmax] rounded-full bg-[radial-gradient(circle,rgba(122,72,150,0.28),transparent_70%)] blur-3xl [animation-delay:-8s]" />

      {/* Soft floating sparkles particle layer */}
      {sparkles.map((sp, idx) => (
        <div
          key={idx}
          className="absolute text-gold-soft opacity-35"
          style={{
            top: sp.top,
            left: sp.left,
            animation: `pulse-sparkle ${sp.duration} ease-in-out infinite, float-dust 7s ease-in-out infinite`,
            animationDelay: `${sp.delay}, ${sp.delay}`,
          }}
        >
          <svg
            width={sp.size}
            height={sp.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="drop-shadow-[0_0_8px_rgba(234,211,160,0.6)]"
          >
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </div>
      ))}

      {/* Elegant Transparent Cartoon Characters (Snoopy & Cats) spread across the background */}
      {characters.map((char) => (
        <div
          key={char.id}
          className={`absolute ${char.position} ${char.size} ${char.opacity} ${char.animation} pointer-events-none transition-all duration-700`}
        >
          <Image
            src={char.src}
            alt=""
            width={256}
            height={256}
            className="w-full h-full object-contain filter brightness-110"
          />
        </div>
      ))}

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.5)_100%)]" />
    </div>
  )
}
