import { useEffect, useState } from 'react'
import useReducedMotion from '../../hooks/useReducedMotion'

/** Terminal-style lines that appear one by one after mounting. */
export default function TypeLines({ lines, step = 520, title = 'terminal' }) {
  const reduced = useReducedMotion()
  const [count, setCount] = useState(0)
  const shown = reduced ? lines.length : count

  useEffect(() => {
    if (reduced || count >= lines.length) return undefined
    const timer = setTimeout(() => setCount((n) => n + 1), count === 0 ? 250 : step)
    return () => clearTimeout(timer)
  }, [count, lines.length, step, reduced])

  return (
    <div className="terminal" role="log" aria-label={title}>
      <div className="terminal__bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>{title}</span>
      </div>
      <pre className="terminal__body">
        {lines.slice(0, shown).map((line, index) => (
          <span key={line} className={`terminal__line ${index === lines.length - 1 ? 'is-final' : ''}`}>
            <span className="terminal__prompt" aria-hidden="true">
              &gt;
            </span>{' '}
            {line}
          </span>
        ))}
        {shown < lines.length && <span className="terminal__cursor" aria-hidden="true" />}
      </pre>
    </div>
  )
}
