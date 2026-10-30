import { useState } from 'react'
import { apology } from '../../content/text'
import Section from '../ui/Section'
import Button from '../ui/Button'
import CopyButton from '../ui/CopyButton'

export default function ApologyGenerator() {
  const [modeId, setModeId] = useState(apology.modes[0].id)
  const [spin, setSpin] = useState(0)
  const mode = apology.modes.find((m) => m.id === modeId) ?? apology.modes[0]

  const surprise = () => {
    const others = apology.modes.filter((m) => m.id !== modeId)
    const pick = others[Math.floor(Math.random() * others.length)]
    setModeId(pick.id)
    setSpin((s) => s + 1)
  }

  return (
    <Section id="apology" tone="blue" eyebrow="Section 8 · Sorry, four flavours" title={apology.heading} subtitle={apology.intro}>
      <div className="apology__tabs" role="group" aria-label="Apology style">
        {apology.modes.map((m) => (
          <Button
            key={m.id}
            variant={m.id === modeId ? 'primary' : 'secondary'}
            size="sm"
            aria-pressed={m.id === modeId}
            onClick={() => setModeId(m.id)}
          >
            {m.label}
          </Button>
        ))}
        <Button variant="yellow" size="sm" onClick={surprise}>
          {apology.randomLabel}
        </Button>
      </div>

      <article key={`${mode.id}-${spin}`} className="card card--paper apology__card" aria-live="polite">
        <p className="apology__mode">{mode.title}</p>
        <p className="apology__text">{mode.text}</p>
        <div className="apology__actions">
          <CopyButton text={mode.text} label={apology.copyLabel} copiedLabel={apology.copiedLabel} />
        </div>
      </article>
    </Section>
  )
}
