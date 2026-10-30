import { useEffect, useRef, useState } from 'react'
import { memories } from '../../content/content'
import { useSound } from '../../audio/soundContextObject'
import useMemoryCards from '../../hooks/useMemoryCards'
import useReducedMotion from '../../hooks/useReducedMotion'
import Chapter from '../ui/Chapter'
import Button from '../ui/Button'
import CopyButton from '../ui/CopyButton'
import Icon from '../ui/Icon'

function Editor({ cards }) {
  const { data, updateCard, updateClosing, reset, shareLink, limits } = cards
  const e = memories.editor
  return (
    <section className="editor panel" aria-labelledby="memory-editor-title">
      <h3 id="memory-editor-title" className="editor__title">
        {e.title}
      </h3>
      <p className="muted">{e.note}</p>
      <div className="editor__grid">
        {data.cards.map((card, index) => (
          <fieldset key={card.id} className="editor__card">
            <legend className="mono">{e.cardLabel(index + 1)}</legend>
            <label>
              <span>{e.titleLabel}</span>
              <input
                type="text"
                value={card.title}
                maxLength={limits.MAX_TITLE}
                onChange={(event) => updateCard(index, 'title', event.target.value)}
              />
            </label>
            <label>
              <span>{e.textLabel}</span>
              <textarea
                rows={3}
                value={card.text}
                maxLength={limits.MAX_TEXT}
                onChange={(event) => updateCard(index, 'text', event.target.value)}
              />
            </label>
          </fieldset>
        ))}
      </div>
      <label className="editor__closing">
        <span>{e.closingLabel}</span>
        <textarea rows={2} value={data.closing} maxLength={limits.MAX_CLOSING} onChange={(event) => updateClosing(event.target.value)} />
        <small className="muted">{e.closingHint}</small>
      </label>
      <div className="editor__actions">
        <CopyButton text={shareLink()} label={e.copyLink} copiedLabel={e.copied} variant="primary" />
        <Button variant="ghost" onClick={reset}>
          {e.reset}
        </Button>
      </div>
      <p className="footnote">{e.privacy}</p>
    </section>
  )
}

export default function MemoryDetector() {
  const cards = useMemoryCards()
  const reduced = useReducedMotion()
  const { tick, chime } = useSound()
  const [revealed, setRevealed] = useState([])
  const [scanning, setScanning] = useState(null)
  const backRefs = useRef({})
  const timer = useRef(null)
  const list = cards.display.cards
  const allRevealed = revealed.length === list.length

  useEffect(() => () => clearTimeout(timer.current), [])

  useEffect(() => {
    if (allRevealed) chime()
  }, [allRevealed, chime])

  const reveal = (id) => {
    if (scanning || revealed.includes(id)) return
    tick()
    setScanning(id)
    timer.current = setTimeout(
      () => {
        setScanning(null)
        setRevealed((prev) => (prev.includes(id) ? prev : [...prev, id]))
        requestAnimationFrame(() => backRefs.current[id]?.focus({ preventScroll: true }))
      },
      reduced ? 0 : 700,
    )
  }

  return (
    <Chapter id="memories" num="04" label="The Memory Detector" title={memories.heading} subtitle={memories.intro}>
      {cards.editMode && <Editor cards={cards} />}

      <p className="memgrid__progress mono" aria-live="polite">
        {memories.progress(revealed.length, list.length)}
      </p>

      <div className="memgrid">
        {list.map((card, index) => {
          const isRevealed = revealed.includes(card.id)
          const isScanning = scanning === card.id
          const icon = memories.cards[index]?.icon ?? 'spark'
          return (
            <article
              key={card.id}
              className={`mcard ${isRevealed ? 'is-revealed' : ''} ${isScanning ? 'is-scanning' : ''}`}
              style={{ '--i': index }}
            >
              <div className="mcard__inner">
                <button
                  type="button"
                  className="mcard__face mcard__front"
                  onClick={() => reveal(card.id)}
                  inert={isRevealed}
                  aria-label={`${memories.reveal} ${memories.fileLabel.toLowerCase()} ${index + 1}: ${card.title}`}
                >
                  <span className="mcard__file mono">
                    {memories.fileLabel} 0{index + 1}
                  </span>
                  <Icon name={icon} className="mcard__icon" />
                  <span className="mcard__title">{card.title}</span>
                  <span className="mcard__cta mono">
                    {isScanning ? memories.scanning : memories.reveal}
                    <Icon name="arrow" />
                  </span>
                  <span className="mcard__scan" aria-hidden="true" />
                </button>
                <div
                  className="mcard__face mcard__back"
                  inert={!isRevealed}
                  tabIndex={-1}
                  ref={(node) => {
                    backRefs.current[card.id] = node
                  }}
                >
                  <span className="mcard__file mono">
                    {memories.fileLabel} 0{index + 1} · {card.title}
                  </span>
                  <p className="mcard__text">{card.text}</p>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <div className="memgrid__foot" aria-live="polite">
        {allRevealed && (
          <>
            <p className="memgrid__closing">{cards.display.closing}</p>
            <Button variant="ghost" size="sm" onClick={() => setRevealed([])}>
              {memories.reseal}
            </Button>
          </>
        )}
      </div>
    </Chapter>
  )
}
