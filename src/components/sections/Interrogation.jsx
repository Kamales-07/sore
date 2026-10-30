import { useState } from 'react'
import { interrogation } from '../../content/text'
import Section from '../ui/Section'
import Button from '../ui/Button'
import SpeechBubble from '../ui/SpeechBubble'

const SKIPPED = 'skipped'

function QuestionCard({ question, index, answer, onAnswer, onSkip }) {
  const selected = answer && answer !== SKIPPED ? question.options.find((o) => o.key === answer) : null
  const response = selected ? question.sharedResponse || selected.response : null

  return (
    <div className="question card" style={{ '--i': index }}>
      <p className="question__num hand">Question {index + 1}</p>
      <h3 className="question__text">{question.question}</h3>

      <div className="question__options" role="group" aria-label={question.question}>
        {question.options.map((option) => {
          const isSelected = answer === option.key
          return (
            <button
              key={option.key}
              type="button"
              className={`option ${isSelected ? 'is-selected' : ''}`}
              aria-pressed={isSelected}
              onClick={() => onAnswer(question.id, option.key)}
            >
              <span className="option__key" aria-hidden="true">
                {option.key}
              </span>
              <span>{option.label}</span>
            </button>
          )
        })}
      </div>

      <div className="question__foot">
        <Button variant="ghost" size="sm" onClick={() => onSkip(question.id)} aria-pressed={answer === SKIPPED}>
          {interrogation.skipLabel}
        </Button>
      </div>

      <div aria-live="polite">
        {response && (
          <SpeechBubble side="left" tone="yellow" className="question__response">
            {response}
            {selected?.note && <span className="question__note">{selected.note}</span>}
          </SpeechBubble>
        )}
        {answer === SKIPPED && (
          <SpeechBubble side="left" tone="lavender" className="question__response">
            {interrogation.skippedText}
          </SpeechBubble>
        )}
      </div>
    </div>
  )
}

function Report({ answers, onReset }) {
  const r = interrogation.report
  const labelFor = (id) => {
    const answer = answers[id]
    if (!answer || answer === SKIPPED) return null
    const question = interrogation.questions.find((q) => q.id === id)
    return question?.options.find((o) => o.key === answer)?.label ?? null
  }

  const category = labelFor('category')
  const punishment = labelFor('punishment')
  const important = labelFor('important')
  const lines = []
  if (category) lines.push(r.categoryLine(category))
  if (punishment) lines.push(r.punishmentLine(punishment))
  if (important) lines.push(r.importantLine(important))
  if (Object.values(answers).includes(SKIPPED)) lines.push(r.skippedLine)

  const answered = [category, punishment, important].filter(Boolean).length
  const touched = Object.keys(answers).length > 0

  return (
    <div className="report card card--paper" aria-live="polite">
      <h3 className="report__title">{r.heading}</h3>
      {!touched ? (
        <p>{r.empty}</p>
      ) : (
        <>
          <ul className="report__list">
            {lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className="report__verdict">{answered === 3 ? r.verdictAll : r.verdictSome}</p>
          <Button variant="ghost" size="sm" onClick={onReset}>
            {r.resetLabel}
          </Button>
        </>
      )}
    </div>
  )
}

export default function Interrogation() {
  const [answers, setAnswers] = useState({})

  const answer = (id, key) => setAnswers((prev) => ({ ...prev, [id]: key }))
  const skip = (id) => setAnswers((prev) => ({ ...prev, [id]: SKIPPED }))
  const reset = () => setAnswers({})

  return (
    <Section
      id="interrogation"
      tone="yellow"
      eyebrow="Section 3 · Questions for the Judge"
      title={interrogation.heading}
      subtitle={interrogation.intro}
    >
      <div className="questions">
        {interrogation.questions.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            index={index}
            answer={answers[question.id]}
            onAnswer={answer}
            onSkip={skip}
          />
        ))}
      </div>
      <Report answers={answers} onReset={reset} />
    </Section>
  )
}
