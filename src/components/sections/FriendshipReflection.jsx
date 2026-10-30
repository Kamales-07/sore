import { useState } from 'react'
import { reflection } from '../../content/content'
import Chapter from '../ui/Chapter'
import Button from '../ui/Button'

/* Paragraph indexes shown in the larger serif style. */
const KEY_LINES = [0, 2, 4, 5]

export default function FriendshipReflection() {
  const [open, setOpen] = useState(false)
  return (
    <Chapter id="reflection" num="06" label="A quieter page" title={reflection.heading} tone="navy">
      <article className="reflect">
        <div className="reflect__card">
          {reflection.paragraphs.map((p, index) => (
            <p key={p} className={KEY_LINES.includes(index) ? 'is-key' : ''}>
              {p}
            </p>
          ))}
          <div className="reflect__action">
            {!open ? (
              <Button variant="secondary" onClick={() => setOpen(true)}>
                {reflection.button}
              </Button>
            ) : null}
            <p className={`reflect__reveal ${open ? 'is-open' : ''}`} aria-live="polite">
              {open ? reflection.reveal : ''}
            </p>
          </div>
        </div>
      </article>
    </Chapter>
  )
}
