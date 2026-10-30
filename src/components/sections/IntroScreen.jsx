import { useEffect, useState } from 'react'
import { intro, site } from '../../content/text'
import useReducedMotion from '../../hooks/useReducedMotion'
import Button from '../ui/Button'
import Stamp from '../ui/Stamp'
import FriendsDuo from '../illustrations/FriendsDuo'

/*
 * Reveal stages: 1-3 announcement lines, 4 ID card, 5 stamp, 6 button.
 */
const STAGE_DELAYS = [500, 650, 650, 650, 550, 600, 400]
const MAX_STAGE = STAGE_DELAYS.length

const DOODLES = [
  { emoji: '😂', top: '8%', left: '6%', delay: '0s' },
  { emoji: '🫂', top: '14%', left: '86%', delay: '.8s' },
  { emoji: '⚖️', top: '46%', left: '4%', delay: '1.6s' },
  { emoji: '🤡', top: '70%', left: '90%', delay: '.4s' },
  { emoji: '📣', top: '86%', left: '10%', delay: '1.2s' },
  { emoji: '✨', top: '30%', left: '92%', delay: '2s' },
]

export default function IntroScreen({ onEnter, leaving }) {
  const reduced = useReducedMotion()
  const [timedStage, setTimedStage] = useState(0)
  // With reduced motion everything is shown at once; otherwise stages tick in.
  const stage = reduced ? MAX_STAGE : timedStage

  useEffect(() => {
    if (reduced || timedStage >= MAX_STAGE) return undefined
    const timer = setTimeout(() => setTimedStage((s) => s + 1), STAGE_DELAYS[timedStage])
    return () => clearTimeout(timer)
  }, [timedStage, reduced])

  const shown = (n) => (stage >= n ? 'is-shown' : '')

  return (
    <div className={`intro ${leaving ? 'intro--leaving' : ''}`} aria-hidden={leaving || undefined}>
      <div className="intro__doodles" aria-hidden="true">
        {DOODLES.map((d) => (
          <span key={d.emoji} style={{ top: d.top, left: d.left, '--d': d.delay }}>
            {d.emoji}
          </span>
        ))}
      </div>

      <div className="intro__inner container">
        <p className="intro__site">{site.name}</p>
        <div className="intro__siren" aria-hidden="true">
          🚨
        </div>
        <h1 className="intro__heading">{intro.heading}</h1>
        <p className="intro__sub">{intro.subheading}</p>
        <p className="intro__tagline hand">{site.tagline}</p>

        <div className="intro__announce" aria-live="polite">
          {intro.announcement.map((line, index) => (
            <p key={line} className={`intro__line ${shown(index + 1)}`}>
              {line}
            </p>
          ))}
        </div>

        <div className={`idcard ${shown(4)}`}>
          <div className="idcard__head">
            <span>{intro.idCardTitle}</span>
            <span className="idcard__chip" aria-hidden="true" />
          </div>
          <div className="idcard__body">
            <div className="idcard__photo">
              <FriendsDuo />
            </div>
            <dl className="idcard__list">
              {intro.idCard.map((row) => (
                <div key={row.label} className="idcard__row">
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="idcard__stamp">
            {stage >= 5 && (
              <Stamp animateOnView={false} rotate={-7}>
                {intro.stamp}
              </Stamp>
            )}
          </div>
        </div>

        <div className={`intro__cta ${shown(6)}`}>
          <Button variant="coral" size="lg" onClick={onEnter} disabled={leaving}>
            {intro.button}
          </Button>
          <p className="intro__subtitle">{site.subtitle}</p>
        </div>
      </div>
    </div>
  )
}
