import { useEffect, useRef, useState } from 'react'
import { result as copy } from '../../content/content'
import Button from '../ui/Button'
import Confetti from '../ui/Confetti'
import CopyButton from '../ui/CopyButton'
import Icon from '../ui/Icon'
import SoundToggle from '../ui/SoundToggle'
import Waves from '../ui/Waves'
import Kamales from '../game/Kamales'
import Stamp from '../game/Stamp'

const formatTime = (ms) => {
  const total = Math.max(1, Math.round(ms / 1000))
  const m = Math.floor(total / 60)
  const s = total % 60
  return m ? `${m}m ${s}s` : `${s}s`
}

function receiptLines(result) {
  const lines = [copy.receiptAlways, ...result.promises.items]
  if (result.promises.waited > 0) lines.push(copy.receiptWait(result.promises.waited))
  return lines
}

function receiptText(result) {
  const rule = '-'.repeat(30)
  return [
    copy.receiptTitle,
    rule,
    ...receiptLines(result).map((line) => `✓ ${line}`),
    rule,
    `${copy.stats.rejected}: ${result.rejections} times`,
    `${copy.stats.attempts}: ${result.attempts}`,
    `${copy.stats.time}: ${formatTime(result.elapsed)}`,
    copy.receiptStatus,
    copy.receiptFoot,
  ].join('\n')
}

export default function ResultScene({ result, onReplay }) {
  const [burst, setBurst] = useState(1)
  const titleRef = useRef(null)
  const variant = copy[result.via] ?? copy.normal
  const sub = typeof variant.sub === 'function' ? variant.sub(result.rejections) : variant.sub

  useEffect(() => {
    titleRef.current?.focus({ preventScroll: true })
    const timer = setTimeout(() => setBurst(2), 1600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="screen result">
      <Confetti burst={burst} count={110} />
      <div className="screen__top">
        <span className="brand">Peace restored.</span>
        <SoundToggle />
      </div>

      <div className="result__hero">
        <Stamp text={copy.stamp} tone="accept" inline />
        <Kamales mood="happy" className="result__kamales" />
        <h1 ref={titleRef} tabIndex={-1} className="result__title">
          {variant.title}
        </h1>
        <p className="result__sub">{sub}</p>
      </div>

      <ul className="result__stats">
        <li>
          <strong>{result.rejections}</strong>
          <span>{copy.stats.rejected}</span>
        </li>
        <li>
          <strong>{result.attempts}</strong>
          <span>{copy.stats.attempts}</span>
        </li>
        <li>
          <strong>{formatTime(result.elapsed)}</strong>
          <span>{copy.stats.time}</span>
        </li>
        <li>
          <strong>0% 🙂</strong>
          <span>{copy.stats.anger}</span>
        </li>
      </ul>

      <article className="receipt" aria-label={copy.receiptTitle}>
        <h2 className="receipt__title">{copy.receiptTitle}</h2>
        <ul className="receipt__list">
          {receiptLines(result).map((line) => (
            <li key={line}>
              <span className="receipt__item">{line}</span>
              <span className="receipt__dots" aria-hidden="true" />
              <span className="receipt__check" aria-hidden="true">
                ✓
              </span>
            </li>
          ))}
        </ul>
        <p className="receipt__status">{copy.receiptStatus}</p>
        <p className="receipt__foot">{copy.receiptFoot}</p>
      </article>

      <div className="result__actions">
        <CopyButton text={receiptText(result)} label={copy.copy} copiedLabel={copy.copied} variant="primary" />
        <Button variant="ghost" onClick={onReplay}>
          <Icon name="restart" />
          {copy.replay}
        </Button>
      </div>

      <div className="note">
        {copy.note.map((line) => (
          <p key={line}>{line}</p>
        ))}
        <p className="note__sig">{copy.signature}</p>
      </div>

      <Waves />
    </main>
  )
}
