import { useEffect, useMemo, useState } from 'react'
import useReducedMotion from '../../hooks/useReducedMotion'

const COLORS = ['#2563EB', '#60A5FA', '#DBEAFE', '#F8FAFC', '#1D4ED8']

function pieces(count, seed) {
  const list = []
  for (let i = 0; i < count; i += 1) {
    const rand = (n) => {
      const x = Math.sin(seed * 7919 + i * 104729 + n * 1299709) * 10000
      return x - Math.floor(x)
    }
    list.push({
      id: i,
      left: `${rand(1) * 100}%`,
      delay: `${rand(2) * 0.6}s`,
      duration: `${2.2 + rand(3) * 1.6}s`,
      color: COLORS[Math.floor(rand(4) * COLORS.length)],
      drift: `${(rand(5) - 0.5) * 140}px`,
      spin: `${rand(6) * 720 - 360}deg`,
      wide: rand(7) > 0.6,
    })
  }
  return list
}

/** Small blue confetti burst. Fires whenever `burst` increases. Hidden for reduced motion. */
export default function Confetti({ burst = 0, count = 70 }) {
  const reduced = useReducedMotion()
  const [expired, setExpired] = useState(0)
  const active = burst > 0 && burst !== expired && !reduced

  useEffect(() => {
    if (!burst) return undefined
    const timer = setTimeout(() => setExpired(burst), 4200)
    return () => clearTimeout(timer)
  }, [burst])

  const list = useMemo(() => pieces(count, burst || 1), [count, burst])
  if (!active) return null

  return (
    <div className="confetti" aria-hidden="true">
      {list.map((p) => (
        <span
          key={p.id}
          className={`confetti__piece ${p.wide ? 'is-wide' : ''}`}
          style={{
            left: p.left,
            background: p.color,
            animationDelay: p.delay,
            animationDuration: p.duration,
            '--drift': p.drift,
            '--spin': p.spin,
          }}
        />
      ))}
    </div>
  )
}
