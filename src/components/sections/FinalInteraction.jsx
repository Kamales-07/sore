import { useState } from 'react'
import { finalInteraction } from '../../content/text'
import Section from '../ui/Section'
import Button from '../ui/Button'
import SpeechBubble from '../ui/SpeechBubble'
import Confetti from '../ui/Confetti'
import CopyButton from '../ui/CopyButton'

export default function FinalInteraction() {
  const [choice, setChoice] = useState(null) // 'laugh' | 'time' | 'advice' | null
  const [burst, setBurst] = useState(0)
  const [advice, setAdvice] = useState('')
  const [hint, setHint] = useState('')
  const { buttons } = finalInteraction

  const pick = (key) => {
    setChoice(key)
    if (key === 'laugh') setBurst((b) => b + 1)
  }

  return (
    <Section
      id="interaction"
      tone="lavender"
      eyebrow="Section 11 · Judge Madam-oda choice"
      title={finalInteraction.heading}
      subtitle={finalInteraction.intro}
    >
      <Confetti burst={burst} />

      <div className="final-actions" role="group" aria-label="Optional responses">
        <Button variant="yellow" size="lg" onClick={() => pick('laugh')} aria-pressed={choice === 'laugh'}>
          {buttons.laugh.label}
        </Button>
        <Button variant="secondary" size="lg" onClick={() => pick('time')} aria-pressed={choice === 'time'}>
          {buttons.time.label}
        </Button>
        <Button variant="primary" size="lg" onClick={() => pick('advice')} aria-pressed={choice === 'advice'}>
          {buttons.advice.label}
        </Button>
      </div>

      <div className="final-response" aria-live="polite">
        {choice === 'laugh' && (
          <SpeechBubble tone="yellow" side="left">
            {buttons.laugh.response}
          </SpeechBubble>
        )}
        {choice === 'time' && (
          <SpeechBubble tone="mint" side="left">
            {buttons.time.response}
          </SpeechBubble>
        )}
        {choice === 'advice' && (
          <form className="advice card" onSubmit={(event) => event.preventDefault()}>
            <label className="advice__label" htmlFor="advice-text">
              {buttons.advice.formTitle}
            </label>
            <textarea
              id="advice-text"
              className="advice__textarea"
              placeholder={buttons.advice.placeholder}
              value={advice}
              onChange={(event) => {
                setAdvice(event.target.value)
                if (hint) setHint('')
              }}
            />
            <div className="advice__actions">
              <CopyButton
                text={advice}
                label={buttons.advice.copyLabel}
                copiedLabel={buttons.advice.copiedLabel}
                variant="primary"
                onEmpty={() => setHint(buttons.advice.emptyCopy)}
              />
              <Button variant="ghost" size="sm" onClick={() => setAdvice('')} disabled={!advice}>
                {buttons.advice.clearLabel}
              </Button>
            </div>
            {hint && <p className="advice__hint">{hint}</p>}
            <p className="advice__note">{buttons.advice.note}</p>
          </form>
        )}
      </div>
    </Section>
  )
}
