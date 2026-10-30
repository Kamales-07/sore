import { useEffect, useRef, useState } from 'react'
import { game } from '../../content/content'
import { useSound } from '../../audio/soundContextObject'
import useReducedMotion from '../../hooks/useReducedMotion'
import Button from '../ui/Button'
import SoundToggle from '../ui/SoundToggle'
import AngerMeter from '../game/AngerMeter'
import Kamal from '../game/Kamal'
import Stamp from '../game/Stamp'

const STAGES = game.stages
const RUNAWAY_DODGES = 6
const SHRINK_STEPS = 3

const formatWait = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

/** Everything Kamal offered up to (and including) the attempt she accepted on. */
function collectPromises(stage, waited) {
  const byId = new Map()
  STAGES.slice(0, stage + 1).forEach((s) => {
    if (s.promise) byId.set(s.promise.id, s.promise.text)
  })
  return { items: [...byId.values()], waited }
}

export default function SorryGame({ onAccept }) {
  const reduced = useReducedMotion()
  const { thud, boing, chime } = useSound()
  const [startedAt] = useState(() => Date.now())
  const [stage, setStage] = useState(0)
  const [rejections, setRejections] = useState(0)
  const [stamp, setStamp] = useState(null)
  const [busy, setBusy] = useState(false)
  const [noPos, setNoPos] = useState(null)
  const [shrinks, setShrinks] = useState(0)
  const [waited, setWaited] = useState(0)
  const arenaRef = useRef(null)
  const yesRef = useRef(null)
  const noRef = useRef(null)
  const timers = useRef([])
  // Refs guard against double-firing: a mouse hover (pointerenter) and the click that
  // follows can both run before React re-renders, so state alone is not enough here.
  const busyRef = useRef(false)
  const dodgesRef = useRef(0)
  const lastDodgeRef = useRef(0)

  const s = STAGES[stage]
  const mode = s.mode ?? 'normal'
  // Anger drops a little more while she's dragging the shrinking button around.
  const anger = Math.max(0, s.anger - (mode === 'shrink' ? shrinks * 6 : 0))

  useEffect(() => {
    if (!s.timer) return undefined
    const id = setInterval(() => setWaited((w) => w + 1), 1000)
    return () => clearInterval(id)
  }, [s.timer])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const later = (fn, ms) => {
    timers.current.push(setTimeout(fn, ms))
  }

  const slam = (text) => {
    setStamp({ text, key: Date.now() })
    thud()
  }

  /** Stamp the rejection, then move to the next sorry attempt. */
  const advance = (text) => {
    if (busyRef.current) return
    busyRef.current = true
    const target = Math.min(stage + 1, STAGES.length - 1)
    setBusy(true)
    slam(text)
    later(
      () => {
        busyRef.current = false
        setBusy(false)
        setStamp(null)
        setNoPos(null)
        setStage(target)
      },
      reduced ? 350 : 1100,
    )
  }

  const accept = (via) => {
    if (busyRef.current) return
    busyRef.current = true
    chime()
    onAccept({
      via: via ?? (stage <= 2 ? 'early' : 'normal'),
      rejections,
      attempts: stage + 1,
      elapsed: Date.now() - startedAt,
      promises: collectPromises(stage, waited),
    })
  }

  const dodge = () => {
    const now = Date.now()
    if (busyRef.current || now - lastDodgeRef.current < 150) return
    lastDodgeRef.current = now
    boing()
    dodgesRef.current += 1
    if (dodgesRef.current >= RUNAWAY_DODGES) {
      setRejections((r) => r + 1)
      advance(game.runawayStamp)
      return
    }
    const arena = arenaRef.current?.getBoundingClientRect()
    const btn = noRef.current?.getBoundingClientRect()
    const yes = yesRef.current?.getBoundingClientRect()
    if (!arena || !btn || !yes) return
    // Stay inside the part of the arena that is actually on screen.
    const minTop = Math.max(0, -arena.top) + 70
    const maxTop = Math.min(arena.height, window.innerHeight - arena.top) - btn.height - 16
    const maxLeft = arena.width - btn.width - 12
    let left = 12
    let top = minTop
    for (let i = 0; i < 16; i += 1) {
      left = 12 + Math.random() * Math.max(0, maxLeft - 12)
      top = minTop + Math.random() * Math.max(0, maxTop - minTop)
      const l = arena.left + left
      const t = arena.top + top
      const clear = l + btn.width < yes.left - 16 || l > yes.right + 16 || t + btn.height < yes.top - 16 || t > yes.bottom + 16
      if (clear) break
    }
    setNoPos({ left, top })
  }

  const onNo = () => {
    if (busyRef.current) return
    if (mode === 'runaway') {
      dodge()
      return
    }
    if (mode === 'broken') {
      accept('broken')
      return
    }
    setRejections((r) => r + 1)
    if (mode === 'shrink') {
      const next = shrinks + 1
      setShrinks(next)
      if (next >= SHRINK_STEPS) {
        advance(game.shrinkDoneStamp)
      } else {
        boing()
        slam(game.shrinkStamp)
        later(() => setStamp(null), reduced ? 300 : 800)
      }
      return
    }
    advance(s.stamp)
  }

  const noScale = mode === 'shrink' ? 1 - shrinks * 0.22 : mode === 'broken' ? 0.62 : 1
  const yesScale = mode === 'shrink' ? 1 + shrinks * 0.18 : mode === 'broken' ? 1.5 : 1
  const mood = busy ? 'shocked' : s.mood

  return (
    <main className="screen game" ref={arenaRef} style={{ '--heat': anger / 100 }}>
      <div className="game__heat" aria-hidden="true" />

      <div className="screen__top">
        <AngerMeter anger={anger} />
        <SoundToggle className="sound-toggle--compact" />
      </div>

      <p className="game__stats">
        <span>
          {game.attempt} <strong>#{stage + 1}</strong>
        </span>
        <span>
          {game.rejected} <strong>×{rejections}</strong>
        </span>
      </p>

      <div className="game__stage">
        <div className={`speech ${s.glitch ? 'is-glitch' : ''}`} key={stage} aria-live="polite">
          <p className="speech__line" data-text={s.line}>
            {s.line}
          </p>
          {s.sub && <p className="speech__sub">{s.sub}</p>}
        </div>

        <div className="game__kamal">
          <Kamal mood={mood} pose={s.pose} item={s.item} glitch={s.glitch && !busy} signText={formatWait(waited)} />
          {stamp && <Stamp key={stamp.key} text={stamp.text} />}
        </div>
      </div>

      <div className={`game__actions mode-${mode}`}>
        <Button
          ref={yesRef}
          size="lg"
          className={`btn--yes ${stage >= 10 ? 'is-pulsing' : ''}`}
          style={{ transform: `scale(${yesScale})` }}
          onClick={() => accept()}
          disabled={busy}
        >
          {game.forgive}
        </Button>
        <Button
          ref={noRef}
          variant="secondary"
          size="lg"
          className={`btn--no ${noPos ? 'is-loose' : ''}`}
          style={{
            ...(noPos ? { position: 'absolute', left: noPos.left, top: noPos.top } : null),
            transform: `scale(${noScale})`,
          }}
          onPointerEnter={(event) => {
            if (mode === 'runaway' && event.pointerType === 'mouse') dodge()
          }}
          onClick={onNo}
          disabled={busy}
        >
          {s.no}
        </Button>
      </div>
    </main>
  )
}
