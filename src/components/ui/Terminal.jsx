import { useEffect, useState } from 'react'
import useInView from '../../hooks/useInView'
import useReducedMotion from '../../hooks/useReducedMotion'

/**
 * Fake terminal that reveals lines one at a time once scrolled into view.
 * With reduced motion (or `instant`) every line shows immediately.
 */
export default function Terminal({ lines, title = 'terminal', instant = false, stepMs = 650, onDone }) {
  const reduced = useReducedMotion()
  const [ref, inView] = useInView({ threshold: 0.3 })
  const showAll = instant || reduced
  const [typedCount, setTypedCount] = useState(0)
  // Derived: show everything at once, or however many lines have "typed" so far.
  const shown = showAll ? lines.length : typedCount

  useEffect(() => {
    if (showAll || !inView || typedCount >= lines.length) return undefined
    const timer = setTimeout(() => setTypedCount((n) => n + 1), stepMs)
    return () => clearTimeout(timer)
  }, [inView, typedCount, lines.length, stepMs, showAll])

  useEffect(() => {
    if (shown >= lines.length && onDone) onDone()
  }, [shown, lines.length, onDone])

  const done = shown >= lines.length

  return (
    <div ref={ref} className="terminal" role="log" aria-live="polite" aria-label={title}>
      <div className="terminal__bar" aria-hidden="true">
        <span className="terminal__dot terminal__dot--coral" />
        <span className="terminal__dot terminal__dot--yellow" />
        <span className="terminal__dot terminal__dot--mint" />
        <span className="terminal__title">{title}</span>
      </div>
      <pre className="terminal__body">
        {lines.slice(0, shown).map((line, index) => {
          const isError = /error/i.test(line)
          const isSystem = /system message/i.test(line)
          return (
            <span key={index} className={`terminal__line ${isError ? 'is-error' : ''} ${isSystem ? 'is-system' : ''}`}>
              <span className="terminal__prompt">&gt;</span> {line}
            </span>
          )
        })}
        {!done && <span className="terminal__cursor" aria-hidden="true" />}
      </pre>
    </div>
  )
}
