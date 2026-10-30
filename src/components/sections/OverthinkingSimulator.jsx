import { useState } from 'react'
import { overthinking } from '../../content/content'
import { useSound } from '../../audio/soundContextObject'
import useCountUp from '../../hooks/useCountUp'
import Chapter from '../ui/Chapter'
import Button from '../ui/Button'
import Icon from '../ui/Icon'

const ROUNDS = overthinking.rounds
const BASE_LEVEL = 10

function levelFrom(history) {
  const total = Object.entries(history).reduce((sum, [round, key]) => {
    const option = ROUNDS[round].options.find((o) => o.key === key)
    return sum + (option?.delta ?? 0)
  }, BASE_LEVEL)
  return Math.max(0, Math.min(100, total))
}

function Stage({ stage }) {
  const count = useCountUp(stage.target ?? 0, { run: stage.type === 'document' || stage.type === 'counter', duration: 1600 })

  if (stage.type === 'document') {
    return (
      <div className="stage stage--document">
        <div className="stage__metric">
          <span className="mono">{stage.label}</span>
          <strong className="mono">{count}</strong>
        </div>
        <div className="doc" aria-hidden="true">
          {Array.from({ length: stage.lines }, (_, i) => (
            <i key={i} style={{ '--i': i, width: `${62 + ((i * 37) % 36)}%` }} />
          ))}
        </div>
      </div>
    )
  }

  if (stage.type === 'counter') {
    return (
      <div className="stage stage--counter">
        <strong className="stage__big mono">{count}</strong>
        <span className="mono">{stage.label}</span>
        <span className="stage__foot mono">{stage.foot}</span>
      </div>
    )
  }

  if (stage.type === 'chips') {
    return (
      <div className="stage stage--chips">
        <span className="mono">{stage.label}</span>
        <ul className="thoughts">
          {stage.items.map((item, i) => (
            <li key={item} style={{ '--i': i }}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="stage stage--calm">
      <svg viewBox="0 0 300 40" className="calmwave" aria-hidden="true" focusable="false">
        <path d="M0 20 Q 37.5 8 75 20 T 150 20 T 225 20 T 300 20" />
      </svg>
      <span className="mono">{overthinking.calmStage}</span>
    </div>
  )
}

export default function OverthinkingSimulator() {
  const { chime } = useSound()
  const [round, setRound] = useState(0)
  const [choice, setChoice] = useState(null)
  const [history, setHistory] = useState({})
  const [done, setDone] = useState(false)

  const current = ROUNDS[round]
  const option = current.options.find((o) => o.key === choice)
  const level = levelFrom(history)
  const isLast = round === ROUNDS.length - 1

  const choose = (key) => {
    setChoice(key)
    setHistory((h) => ({ ...h, [round]: key }))
  }

  const next = () => {
    setRound((r) => r + 1)
    setChoice(null)
  }

  const finish = () => {
    setDone(true)
    chime()
  }

  const restart = () => {
    setRound(0)
    setChoice(null)
    setHistory({})
    setDone(false)
  }

  const summaryText =
    level < 30 ? overthinking.summary.low : level < 70 ? overthinking.summary.mid : overthinking.summary.high

  return (
    <Chapter
      id="overthinking"
      num="03"
      label="The Overthinking Simulator"
      title={overthinking.heading}
      subtitle={overthinking.intro}
    >
      <div className="sim">
        <div className="sim__meter panel">
          <div className="status__row">
            <span className="mono">{overthinking.meterLabel}</span>
            <strong className="mono">{level}%</strong>
          </div>
          <div
            className={`bar bar--meter ${level >= 70 ? 'is-high' : ''}`}
            role="meter"
            aria-label={overthinking.meterLabel}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={level}
          >
            <i style={{ transform: `scaleX(${level / 100})` }} />
          </div>
        </div>

        {done ? (
          <div className="sim__summary panel">
            <p className="eyebrow">{overthinking.summaryTitle}</p>
            <p className="sim__summary-text">{summaryText}</p>
            <ul className="sim__history">
              {ROUNDS.map((r, index) => {
                const picked = r.options.find((o) => o.key === history[index])
                return (
                  <li key={r.message}>
                    <span className="mono">“{r.message}”</span>
                    <span>{picked ? picked.label : 'Skipped'}</span>
                  </li>
                )
              })}
            </ul>
            <p className="moral">{overthinking.moral}</p>
            <Button variant="secondary" onClick={restart}>
              <Icon name="restart" />
              {overthinking.restart}
            </Button>
          </div>
        ) : (
          <div className="sim__grid">
            <div className={`phone ${choice === 'D' && round === 0 ? 'is-flicker' : ''}`}>
              <div className="phone__bar">
                <span className="mono">{overthinking.phoneTitle}</span>
                <span className="mono">{overthinking.roundLabel(round + 1, ROUNDS.length)}</span>
              </div>
              <div className="phone__chat" key={round}>
                <div className="msg msg--in">
                  <p>{current.message}</p>
                  <span className="mono">{current.time}</span>
                </div>
                {option?.stage.type === 'calm' && (
                  <div className="msg msg--out" key={`${round}-calm`}>
                    <p>{option.stage.text}</p>
                    <span className="mono">{overthinking.delivered}</span>
                  </div>
                )}
                {option && option.stage.type === 'document' && (
                  <div className="msg msg--typing" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </div>
                )}
              </div>
            </div>

            <div className="sim__side">
              <p className="sim__prompt">{overthinking.prompt}</p>
              <div className="options" role="group" aria-label={overthinking.prompt}>
                {current.options.map((o) => (
                  <Button
                    key={`${round}-${o.key}`}
                    variant="option"
                    className={choice === o.key ? 'is-selected' : ''}
                    aria-pressed={choice === o.key}
                    onClick={() => choose(o.key)}
                  >
                    <span className="option__key mono">{o.key}</span>
                    <span>{o.label}</span>
                  </Button>
                ))}
              </div>

              <div className="brain panel">
                <p className="brain__label mono">{overthinking.stageLabel}</p>
                {option ? <Stage key={`${round}-${choice}`} stage={option.stage} /> : <p className="muted">{overthinking.stageIdle}</p>}
              </div>

              <div aria-live="polite">
                {option && (
                  <div className="sim__result" key={`${round}-${choice}-result`}>
                    <p className="sim__response">{option.response}</p>
                    <p className="moral">{overthinking.moral}</p>
                    <div className="sim__actions">
                      <Button variant="ghost" onClick={() => setChoice(null)}>
                        {overthinking.retry}
                      </Button>
                      {isLast ? (
                        <Button onClick={finish}>
                          {overthinking.finish}
                          <Icon name="arrow" />
                        </Button>
                      ) : (
                        <Button onClick={next}>
                          {overthinking.next}
                          <Icon name="arrow" />
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Chapter>
  )
}
