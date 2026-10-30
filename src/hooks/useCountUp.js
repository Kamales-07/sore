import { useEffect, useState } from 'react'
import useReducedMotion from './useReducedMotion'

/** Animates a number from 0 to `target` once `run` is true. Instant with reduced motion. */
export default function useCountUp(target, { run = true, duration = 1400 } = {}) {
  const reduced = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!run || reduced) return undefined
    let frame = 0
    const start = performance.now()
    const step = (now) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [target, run, duration, reduced])

  if (!run) return 0
  return reduced ? target : value
}
