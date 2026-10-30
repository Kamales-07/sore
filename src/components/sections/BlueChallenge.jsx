import { useEffect, useRef, useState } from 'react'
import { challenge } from '../../content/content'
import { useSound } from '../../audio/soundContextObject'
import Chapter from '../ui/Chapter'
import Button from '../ui/Button'
import Confetti from '../ui/Confetti'
import Icon from '../ui/Icon'

const QUESTIONS = challenge.questions
const TRAITS = ['calm', 'overthink', 'chaos', 'expect']

function score(answers) {
  const counts = Object.fromEntries(TRAITS.map((t) => [t, 0]))
  answers.forEach((option) => {
    if (option) counts[option.trait] += 1
  })
  return counts
}

function resultFor(counts) {
  const r = challenge.results
  if (counts.calm >= 4) return r.diplomat
  if (counts.calm >= 2 && counts.chaos + counts.overthink >= 2) return r.calmChaos
  const ranked = ['overthink', 'chaos', 'expect', 'calm'].sort((a, b) => counts[b] - counts[a])
  const top = ranked[0]
  if (top === 'overthink') return r.overthinker
  if (top === 'chaos') return r.chaos
  if (top === 'expect') return r.auditor
  return r.calmChaos
}

export default function BlueChallenge() {
  const { chime } = useSound()
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [done, setDone] = useState(false)
  const [burst, setBurst] = useState(0)
  const headingRef = useRef(null)
  const mounted = useRef(false)

  const question = QUESTIONS[index]
  const picked = answers[index]
  const isLast = index === QUESTIONS.length - 1
  const progress = done ? 1 : (index + (picked ? 1 : 0)) / QUESTIONS.length

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    headingRef.current?.focus({ preventScroll: true })
  }, [index, done])

  const select = (option) => {
    setAnswers((prev) => {
      const next = [...prev]
      next[index] = option
      return next
    })
  }

  const advance = () => {
    if (!picked) return
    if (isLast) {
      setDone(true)
      setBurst((b) => b + 1)
      chime()
    } else {
      setIndex((i) => i + 1)
    }
  }

  const restart = () => {
    setIndex(0)
    setAnswers([])
    setDone(false)
  }

  const counts = score(answers)
  const result = resultFor(counts)

  return (
    <Chapter id="challenge" num="05" label="The Blue Challenge" title={challenge.heading} subtitle={challenge.intro}>
      <Confetti burst={burst} />
      <div className="quiz panel">
        <div className="quiz__progress">
          <span className="mono">{done ? challenge.resultEyebrow : challenge.progress(index + 1, QUESTIONS.length)}</span>
          <div className="bar" aria-hidden="true">
            <i style={{ transform: `scaleX(${progress})` }} />
          </div>
        </div>

        {done ? (
          <div className="quiz__result" key="result">
            <h3 ref={headingRef} tabIndex={-1} className="quiz__result-title">
              {result.title}
            </h3>
            <p className="quiz__result-text">{result.text}</p>
            <p className="mono quiz__traits-label">{challenge.traitsLabel}</p>
            <ul className="traits">
              {TRAITS.map((t) => (
                <li key={t}>
                  <span>{challenge.traits[t]}</span>
                  <div className="bar" aria-hidden="true">
                    <i style={{ transform: `scaleX(${counts[t] / QUESTIONS.length})` }} />
                  </div>
                  <span className="mono">
                    {counts[t]}/{QUESTIONS.length}
                  </span>
                </li>
              ))}
            </ul>
            <Button variant="secondary" onClick={restart}>
              <Icon name="restart" />
              {challenge.restart}
            </Button>
          </div>
        ) : (
          <div className="quiz__question" key={index}>
            <h3 ref={headingRef} tabIndex={-1} className="quiz__q">
              {question.q}
            </h3>
            <div className="options" role="group" aria-label={question.q}>
              {question.options.map((option) => (
                <Button
                  key={option.key}
                  variant="option"
                  className={picked?.key === option.key ? 'is-selected' : ''}
                  aria-pressed={picked?.key === option.key}
                  onClick={() => select(option)}
                >
                  <span className="option__key mono">{option.key}</span>
                  <span>{option.label}</span>
                </Button>
              ))}
            </div>
            <div className="quiz__feedback" aria-live="polite">
              {picked && (
                <p key={picked.key} className="quiz__reply">
                  {picked.reply}
                </p>
              )}
            </div>
            <div className="quiz__actions">
              <Button onClick={advance} disabled={!picked}>
                {isLast ? challenge.finish : challenge.next}
                <Icon name="arrow" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </Chapter>
  )
}
