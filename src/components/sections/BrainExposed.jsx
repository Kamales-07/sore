import { useEffect, useState } from 'react'
import { brain } from '../../content/text'
import useReducedMotion from '../../hooks/useReducedMotion'
import Section from '../ui/Section'
import Button from '../ui/Button'
import Meter from '../ui/Meter'
import SpeechBubble from '../ui/SpeechBubble'
import BrainCartoon from '../illustrations/BrainCartoon'

const TILTS = [-2, 1.5, -1, 2, -1.5, 1]

export default function BrainExposed() {
  const reduced = useReducedMotion()
  const [state, setState] = useState('idle') // idle | sending | done

  useEffect(() => {
    if (state !== 'sending') return undefined
    const timer = setTimeout(() => setState('done'), reduced ? 200 : 1400)
    return () => clearTimeout(timer)
  }, [state, reduced])

  return (
    <Section id="brain" tone="coral" eyebrow="Section 6 · Live telecast" title={brain.heading} subtitle={brain.intro}>
      <div className="brain-stage">
        <div className="brain-stage__illo">
          <BrainCartoon />
        </div>
        <ul className="thoughts" aria-label="Kamal's thoughts">
          {brain.thoughts.map((thought, index) => (
            <li key={thought}>
              <SpeechBubble
                thought
                tone={index === brain.thoughts.length - 1 ? 'mint' : 'paper'}
                className="thought"
                style={{ '--d': `${index * 0.6}s`, '--r': `${TILTS[index % TILTS.length]}deg` }}
              >
                {thought}
              </SpeechBubble>
            </li>
          ))}
        </ul>
      </div>

      <div className="brain-dash card">
        <p className="brain-dash__title">{brain.dashboardTitle}</p>
        {brain.dashboard.map((item) => (
          <Meter key={item.label} {...item} />
        ))}
      </div>

      <div className="section__cta" aria-live="polite">
        {state === 'idle' && (
          <Button variant="yellow" size="lg" onClick={() => setState('sending')}>
            {brain.button}
          </Button>
        )}
        {state === 'sending' && <p className="brain__sending">{brain.sending}</p>}
        {state === 'done' && (
          <div className="card brain__report">
            <h3>{brain.reportTitle}</h3>
            <ul>
              {brain.report.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Section>
  )
}
