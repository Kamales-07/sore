import { useCallback, useState } from 'react'
import { easterEgg } from '../../content/content'
import { useSound } from '../../audio/soundContextObject'
import Button from '../ui/Button'
import Modal from '../ui/Modal'

/** The full stop in the footer wordmark. Discoverable, never required. */
export default function EasterEgg() {
  const [open, setOpen] = useState(false)
  const { chime } = useSound()
  const close = useCallback(() => setOpen(false), [])

  return (
    <>
      <button
        type="button"
        className="egg"
        aria-label={easterEgg.dotLabel}
        onClick={() => {
          setOpen(true)
          chime()
        }}
      />
      <Modal open={open} onClose={close} labelledBy="egg-title" className="egg-modal">
        <span className="egg-modal__dot" aria-hidden="true" />
        <h3 id="egg-title" className="sr-only">
          {easterEgg.title}
        </h3>
        {easterEgg.lines.map((line) => (
          <p key={line} className="egg-modal__line">
            {line}
          </p>
        ))}
        <p className="egg-modal__after">{easterEgg.after}</p>
        <Button variant="secondary" size="sm" onClick={close} data-autofocus>
          {easterEgg.close}
        </Button>
      </Modal>
    </>
  )
}
