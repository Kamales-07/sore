import { useEffect, useState } from 'react'
import { techSupport } from '../../content/text'
import useReducedMotion from '../../hooks/useReducedMotion'
import Section from '../ui/Section'
import Button from '../ui/Button'
import Meter from '../ui/Meter'
import Terminal from '../ui/Terminal'

export default function TechSupport() {
  const reduced = useReducedMotion()
  const [state, setState] = useState('idle') // idle | restarting | done
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (state !== 'restarting') return undefined
    if (reduced) {
      const timer = setTimeout(() => setState('done'), 300)
      return () => clearTimeout(timer)
    }
    if (step < techSupport.restarting.length - 1) {
      const timer = setTimeout(() => setStep((s) => s + 1), 700)
      return () => clearTimeout(timer)
    }
    const timer = setTimeout(() => setState('done'), 800)
    return () => clearTimeout(timer)
  }, [state, step, reduced])

  const restart = () => {
    setStep(0)
    setState('restarting')
  }

  return (
    <Section id="diagnostics" tone="lavender" eyebrow="Section 4 · Technical support" title={techSupport.heading}>
      <div className="oswindow">
        <div className="oswindow__bar">
          <span>{techSupport.windowTitle}</span>
          <span className="oswindow__controls" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </div>
        <div className="oswindow__body">
          <div>
            <p className="diag__title">SYSTEM METRICS</p>
            {techSupport.metrics.map((metric) => (
              <Meter key={metric.label} {...metric} />
            ))}
          </div>
          <div>
            <p className="diag__title">LIVE LOG</p>
            <Terminal lines={techSupport.terminal} title="friendship.log" />
          </div>

          <div className="restart" aria-live="polite">
            {state === 'idle' && (
              <Button variant="primary" size="lg" onClick={restart}>
                {techSupport.restartButton}
              </Button>
            )}
            {state === 'restarting' && (
              <>
                <div className="restart__spinner" aria-hidden="true">
                  🔄
                </div>
                <p className="restart__line">{techSupport.restarting[step]}</p>
              </>
            )}
            {state === 'done' && (
              <>
                <div className="card restart__result">
                  {techSupport.restartResult.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
                <Button variant="ghost" size="sm" onClick={restart}>
                  Thirumba restart pannu 🔄
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </Section>
  )
}
