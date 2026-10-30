import { useEffect, useMemo, useState } from 'react'
import useReducedMotion from '../../hooks/useReducedMotion'

const COLORS = ['#c9b8f5', '#a9d3f5', '#ffe27a', '#ff8a76', '#bdebd2', '#f5c842', '#7f66d6']
const SHAPES = ['confetti__piece--square', 'confetti__piece--circle', 'confetti__piece--strip']

function makePieces(count, seed) {
  const pieces = []
  for (let i = 0; i < count; i += 1) {
    const r = (n) => {
      // small deterministic pseudo random so re-renders do not reshuffle
      const x = Math.sin(seed * 9301 + i * 49297 + n * 233) * 10000
      return x - Math.floor(x)
    }
    pieces.push({
      id: i,
      left: `${r(1) * 100}%`,
      delay: `${r(2) * 0.9}s`,
      duration: `${2.4 + r(3) * 1.8}s`,
      color: COLORS[Math.floor(r(4) * COLORS.length)],
      shape: SHAPES[Math.floor(r(5) * SHAPES.length)],
      drift: `${(r(6) - 0.5) * 160}px`,
      spin: `${r(7) * 720 - 360}deg`,
      scale: 0.7 + r(8) * 0.8,
    })
  }
  return pieces
}

/**
 * Lightweight CSS confetti. Mount with `burst` changing (a number) to fire.
 * Respects reduced motion by showing a short static emoji burst instead.
 */
export default function Confetti({ burst = 0, count = 90, emojis = ['🎉', '✨', '🎊', '🫂'] }) {
  const reduced = useReducedMotion()
  // A burst is "active" until its timer marks it expired; derived, no sync setState.
  const [expiredBurst, setExpiredBurst] = useState(0)
  const active = burst > 0 && burst !== expiredBurst

  useEffect(() => {
    if (!burst) return undefined
    const timer = setTimeout(() => setExpiredBurst(burst), reduced ? 1800 : 4600)
    return () => clearTimeout(timer)
  }, [burst, reduced])

  const pieces = useMemo(() => makePieces(count, burst || 1), [count, burst])

  if (!active) return null

  if (reduced) {
    return (
      <div className="confetti confetti--static" aria-hidden="true">
        {emojis.map((emoji, index) => (
          <span key={index}>{emoji}</span>
        ))}
      </div>
    )
  }

  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className={`confetti__piece ${piece.shape}`}
          style={{
            left: piece.left,
            animationDelay: piece.delay,
            animationDuration: piece.duration,
            background: piece.color,
            '--drift': piece.drift,
            '--spin': piece.spin,
            '--scale': piece.scale,
          }}
        />
      ))}
    </div>
  )
}
