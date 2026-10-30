import { useState } from 'react'
import { court } from '../../content/text'
import useReducedMotion from '../../hooks/useReducedMotion'
import Section from '../ui/Section'
import Button from '../ui/Button'
import Stamp from '../ui/Stamp'
import JudgeGayu from '../illustrations/JudgeGayu'
import AccusedKamal from '../illustrations/AccusedKamal'

function EvidenceCard({ item, index }) {
  const [open, setOpen] = useState(false)
  const panelId = `evidence-panel-${index}`
  return (
    <article className={`evidence ${open ? 'is-open' : ''}`} style={{ '--i': index }}>
      <button
        type="button"
        className="evidence__toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="evidence__exhibit">{item.exhibit}</span>
        <span className="evidence__emoji" aria-hidden="true">
          {item.emoji}
        </span>
        <span className="evidence__title">{item.title}</span>
        <span className="evidence__hint">{open ? 'Close file 📁' : court.openHint}</span>
      </button>
      <div id={panelId} className="evidence__panel" hidden={!open}>
        <p className="evidence__summary">“{item.summary}”</p>
        <dl className="facts">
          {item.facts.map((fact) => (
            <div className="facts__row" key={fact.label}>
              <dt>{fact.label}:</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  )
}

export default function Courtroom() {
  const reduced = useReducedMotion()

  const goInterrogate = () => {
    const target = document.getElementById('interrogation')
    if (!target) return
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
    document.getElementById('interrogation-title')?.focus({ preventScroll: true })
  }

  return (
    <Section id="court" tone="blue" eyebrow="Section 2 · Case file" title={court.heading}>
      <div className="tape" aria-hidden="true">
        <div className="tape__track">
          <span>{court.tape}</span>
          <span>{court.tape}</span>
        </div>
      </div>

      <div className="court__top">
        <p className="case-badge">
          CASE NO. <strong>{court.caseNumber}</strong>
        </p>
        <Stamp tone="ink" rotate={6}>
          Confidential-u 🤫
        </Stamp>
      </div>

      <div className="court__people">
        <figure className="person">
          <JudgeGayu />
          <figcaption>JUDGE: Gayu Madam 👩‍⚖️</figcaption>
        </figure>
        <div className="court__vs hand" aria-hidden="true">
          vs
        </div>
        <figure className="person">
          <AccusedKamal />
          <figcaption>ACCUSED: Kamal 🤡</figcaption>
        </figure>
      </div>

      <dl className="court__details card">
        {court.details.map((row) => (
          <div className="court__row" key={row.label}>
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>

      <p className="callout callout--yellow">
        <span aria-hidden="true">📢</span>
        <span>{court.announcement}</span>
      </p>

      <div className="evidence-grid">
        {court.evidence.map((item, index) => (
          <EvidenceCard key={item.exhibit} item={item} index={index} />
        ))}
      </div>

      <div className="section__cta">
        <Button variant="coral" size="lg" onClick={goInterrogate}>
          {court.button}
        </Button>
      </div>
    </Section>
  )
}
