import { useEffect, useState } from 'react'
import useReducedMotion from '../../hooks/useReducedMotion'

/** Short, funny full-screen loader shown between the intro and the main site. */
export default function LoadingScreen({ lines, onDone }) {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(reduced ? lines.length - 1 : 0)

  useEffect(() => {
    if (reduced) {
      const timer = setTimeout(onDone, 500)
      return () => clearTimeout(timer)
    }
    if (index < lines.length - 1) {
      const timer = setTimeout(() => setIndex((i) => i + 1), 480)
      return () => clearTimeout(timer)
    }
    const timer = setTimeout(onDone, 520)
    return () => clearTimeout(timer)
  }, [index, lines.length, onDone, reduced])

  const percent = Math.round(((index + 1) / lines.length) * 100)

  return (
    <div className="loading" role="status" aria-live="polite">
      <div className="loading__emoji" aria-hidden="true">
        🤡
      </div>
      <p className="loading__line hand">{lines[index]}</p>
      <div className="loading__bar" aria-hidden="true">
        <div className="loading__fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
