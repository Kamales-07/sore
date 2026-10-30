import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function getInitial() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia(QUERY).matches
}

/** Returns true when the visitor asked the OS/browser to reduce motion. */
export default function useReducedMotion() {
  const [reduced, setReduced] = useState(getInitial)

  useEffect(() => {
    if (!window.matchMedia) return undefined
    const mql = window.matchMedia(QUERY)
    const onChange = (event) => setReduced(event.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return reduced
}
