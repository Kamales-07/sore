import { useEffect, useRef } from 'react'
import Button from './Button'

/**
 * Accessible modal dialog: Escape closes, focus moves inside on open and
 * returns to the opener on close, body scroll is locked while open.
 */
export default function Modal({ open, onClose, title, children, closeLabel = 'Close', tone = 'paper' }) {
  const panelRef = useRef(null)
  const openerRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    openerRef.current = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return
      const focusables = panelRef.current.querySelectorAll(
        'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusables.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)

    const focusTimer = setTimeout(() => {
      panelRef.current?.querySelector('[data-autofocus]')?.focus()
    }, 30)

    return () => {
      clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      if (openerRef.current && typeof openerRef.current.focus === 'function') {
        openerRef.current.focus()
      }
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div
        ref={panelRef}
        className={`modal__panel modal__panel--${tone}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal__head">
          <h3 id="modal-title" className="modal__title">
            {title}
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label={closeLabel} data-autofocus>
            ✕
          </Button>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  )
}
