import { useCallback, useEffect, useRef, useState } from 'react'

function legacyCopy(text) {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.top = '0'
  textarea.style.left = '0'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.focus()
  textarea.select()
  let ok = false
  try {
    ok = document.execCommand('copy')
  } catch {
    ok = false
  }
  document.body.removeChild(textarea)
  return ok
}

/**
 * Copy text to the clipboard with a modern API + legacy fallback.
 * Returns [copy(text), status] where status is 'idle' | 'copied' | 'failed'.
 */
export default function useCopyToClipboard(resetAfter = 2200) {
  const [status, setStatus] = useState('idle')
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = useCallback(
    async (text) => {
      let ok = false
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(text)
          ok = true
        } catch {
          ok = legacyCopy(text)
        }
      } else {
        ok = legacyCopy(text)
      }
      setStatus(ok ? 'copied' : 'failed')
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setStatus('idle'), resetAfter)
      return ok
    },
    [resetAfter],
  )

  return [copy, status]
}
