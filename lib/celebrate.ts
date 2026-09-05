import confetti from "canvas-confetti"

const COLORS = ["#D9B475", "#EAD3A0", "#E8B9C0", "#F3E9DD"]

export function sideCannons(duration = 2200) {
  const end = Date.now() + duration
  ;(function frame() {
    confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0 }, colors: COLORS })
    confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1 }, colors: COLORS })
    if (Date.now() < end) requestAnimationFrame(frame)
  })()
}

export function fireworks(duration = 3000) {
  const end = Date.now() + duration
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 200, colors: COLORS }
  const rand = (min: number, max: number) => Math.random() * (max - min) + min
  const interval = window.setInterval(() => {
    const timeLeft = end - Date.now()
    if (timeLeft <= 0) return clearInterval(interval)
    const count = 50 * (timeLeft / duration)
    confetti({ ...defaults, particleCount: count, origin: { x: rand(0.1, 0.3), y: Math.random() - 0.2 } })
    confetti({ ...defaults, particleCount: count, origin: { x: rand(0.7, 0.9), y: Math.random() - 0.2 } })
  }, 250)
}

export function heartBurst() {
  const heart = confetti.shapeFromText({ text: "\u2665", scalar: 3 })
  confetti({
    particleCount: 34,
    spread: 90,
    origin: { y: 0.6 },
    scalar: 2.2,
    shapes: [heart],
    colors: ["#E8B9C0", "#D9B475", "#EAD3A0"],
    ticks: 200,
    gravity: 0.7,
  })
}

export function pop(x: number, y: number) {
  confetti({
    particleCount: 40,
    spread: 55,
    startVelocity: 28,
    origin: { x, y },
    colors: COLORS,
    ticks: 90,
  })
}
