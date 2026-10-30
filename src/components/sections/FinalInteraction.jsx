import { useState } from 'react'
import { finalInteraction } from '../../content/content'
import Chapter from '../ui/Chapter'
import Button from '../ui/Button'
import CopyButton from '../ui/CopyButton'

export default function FinalInteraction() {
  const [choice, setChoice] = useState(null)
  const [text, setText] = useState('')
  const [hint, setHint] = useState('')
  const { options, form } = finalInteraction

  return (
    <Chapter id="reply" num="08" label="That's Everything" title={finalInteraction.heading} subtitle={finalInteraction.note} tone="deepest">
      <div className="reply">
        <div className="reply__options" role="group" aria-label="Optional responses">
          {Object.entries(options).map(([key, option]) => (
            <Button key={key} variant="secondary" aria-pressed={choice === key} className={choice === key ? 'is-selected' : ''} onClick={() => setChoice(key)}>
              {option.label}
            </Button>
          ))}
        </div>

        <div className="reply__response" aria-live="polite">
          {choice && choice !== 'say' && (
            <p className="reply__text" key={choice}>
              {options[choice].response}
            </p>
          )}
          {choice === 'say' && (
            <form className="reply__form panel" onSubmit={(event) => event.preventDefault()}>
              <label htmlFor="reply-text" className="mono">
                {form.label}
              </label>
              <textarea
                id="reply-text"
                rows={5}
                placeholder={form.placeholder}
                value={text}
                onChange={(event) => {
                  setText(event.target.value)
                  if (hint) setHint('')
                }}
              />
              <div className="reply__actions">
                <CopyButton text={text} label={form.copy} copiedLabel={form.copied} variant="primary" onEmpty={() => setHint(form.empty)} />
                <Button variant="ghost" onClick={() => setText('')} disabled={!text}>
                  {form.clear}
                </Button>
              </div>
              {hint && <p className="reply__hint">{hint}</p>}
              <p className="footnote">{form.note}</p>
            </form>
          )}
        </div>
      </div>
    </Chapter>
  )
}
