import { useEffect, useReducer, useRef, useState } from 'react'
import { room } from '../../content/content'
import { useSound } from '../../audio/soundContextObject'
import Chapter from '../ui/Chapter'
import Button from '../ui/Button'
import Confetti from '../ui/Confetti'
import Icon from '../ui/Icon'
import TypeLines from '../ui/TypeLines'
import RoomScene from '../room/RoomScene'

const OBJ = room.objects
const CLUE_KEYS = ['clock', 'computer', 'book']
const OBJECT_COUNT = 6

/* Hotspot boxes in SVG units (x, y, width, height), converted to % for HTML buttons. */
const HOTSPOTS = [
  { id: 'bookshelf', box: [24, 64, 112, 236] },
  { id: 'clock', box: [244, 44, 112, 56] },
  { id: 'note', box: [166, 92, 58, 52], needsLight: true },
  { id: 'lamp', box: [172, 144, 80, 88] },
  { id: 'computer', box: [254, 144, 112, 86] },
  { id: 'door', box: [460, 70, 108, 232] },
]

const toPct = ([x, y, w, h]) => ({
  left: `${(x / 600) * 100}%`,
  top: `${(y / 400) * 100}%`,
  width: `${(w / 600) * 100}%`,
  height: `${(h / 400) * 100}%`,
})

const initialState = {
  lampOn: false,
  found: { clock: false, computer: false, book: false },
  active: null,
  bookId: null,
  inspected: [],
  doorOpen: false,
  visits: 0,
}

function reducer(state, action) {
  switch (action.type) {
    case 'inspect': {
      const id = action.id
      const inspected = state.inspected.includes(id) ? state.inspected : [...state.inspected, id]
      const visits = state.visits + 1
      if (id === 'lamp') return { ...state, lampOn: !state.lampOn, active: 'lamp', inspected, visits }
      if (!state.lampOn) return { ...state, active: 'dark', visits }
      if (id === 'clock') return { ...state, active: 'clock', found: { ...state.found, clock: true }, inspected, visits }
      if (id === 'computer')
        return { ...state, active: 'computer', found: { ...state.found, computer: true }, inspected, visits }
      if (id === 'bookshelf') return { ...state, active: 'bookshelf', bookId: null, inspected, visits }
      if (id === 'door' && state.doorOpen) return { ...state, active: 'exit', inspected, visits }
      return { ...state, active: id, inspected, visits }
    }
    case 'book': {
      const book = OBJ.bookshelf.books.find((b) => b.id === action.id)
      return {
        ...state,
        bookId: action.id,
        found: book?.clue ? { ...state.found, book: true } : state.found,
      }
    }
    case 'open':
      return { ...state, doorOpen: true, active: 'exit' }
    case 'restart':
      return initialState
    default:
      return state
  }
}

function ClueTag() {
  return (
    <span className="tag tag--found">
      <Icon name="check" /> {room.clueFound}
    </span>
  )
}

function Inspector({ state, unlocked, foundCount, dispatch }) {
  const { active, lampOn, bookId, visits } = state
  const book = OBJ.bookshelf.books.find((b) => b.id === bookId)

  let title = null
  let body = null

  switch (active) {
    case null:
      body = (
        <>
          <p>{room.howTo}</p>
          <p className="muted">{room.startHint}</p>
        </>
      )
      break
    case 'dark':
      body = <p>{room.dark}</p>
      break
    case 'lamp':
      title = OBJ.lamp.name
      body = <p>{lampOn ? OBJ.lamp.on : OBJ.lamp.off}</p>
      break
    case 'note':
      title = OBJ.note.name
      body = <p className="inspector__handwritten">{OBJ.note.text}</p>
      break
    case 'clock':
      title = OBJ.clock.name
      body = (
        <>
          <p className="inspector__digits mono" aria-hidden="true">
            {OBJ.clock.time}
          </p>
          <p className="muted">{OBJ.clock.caption}</p>
          <blockquote className="clue">{OBJ.clock.clue}</blockquote>
          <ClueTag />
        </>
      )
      break
    case 'computer':
      title = OBJ.computer.name
      body = (
        <>
          <TypeLines key={visits} lines={OBJ.computer.lines} title="diagnostics.log" />
          <ClueTag />
        </>
      )
      break
    case 'bookshelf':
      title = OBJ.bookshelf.name
      body = (
        <>
          <p className="muted">{OBJ.bookshelf.prompt}</p>
          <div className="books" role="group" aria-label="Books on the shelf">
            {OBJ.bookshelf.books.map((b) => (
              <Button
                key={b.id}
                variant="secondary"
                size="sm"
                className={`book ${b.clue ? 'book--blue' : ''}`}
                aria-pressed={bookId === b.id}
                onClick={() => dispatch({ type: 'book', id: b.id })}
              >
                {b.title}
              </Button>
            ))}
          </div>
          {book && (
            <div className="inspector__result" key={book.id}>
              {book.clue ? (
                <>
                  <blockquote className="clue">{book.response}</blockquote>
                  <ClueTag />
                </>
              ) : (
                <p>{book.response}</p>
              )}
            </div>
          )}
        </>
      )
      break
    case 'door':
      title = OBJ.door.name
      body = unlocked ? (
        <>
          <p>{OBJ.door.unlocked}</p>
          <Button onClick={() => dispatch({ type: 'open' })}>
            {room.openDoor}
            <Icon name="arrow" />
          </Button>
        </>
      ) : (
        <p>{OBJ.door.locked(foundCount)}</p>
      )
      break
    case 'exit':
      title = room.unlocked
      body = (
        <>
          <p className="inspector__success">{room.success}</p>
          <Button variant="secondary" onClick={() => dispatch({ type: 'restart' })}>
            <Icon name="restart" />
            {room.restart}
          </Button>
        </>
      )
      break
    default:
      break
  }

  return (
    <div className={`inspector panel ${active === 'exit' ? 'is-success' : ''}`} aria-live="polite">
      {title && <p className="inspector__title mono">{title}</p>}
      <div className="inspector__body" key={`${active}-${visits}`}>
        {body}
      </div>
    </div>
  )
}

export default function BlueRoomGame() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { chime } = useSound()
  const [burst, setBurst] = useState(0)
  const foundCount = CLUE_KEYS.filter((k) => state.found[k]).length
  const unlocked = foundCount === CLUE_KEYS.length
  const prevUnlocked = useRef(false)

  useEffect(() => {
    if (unlocked && !prevUnlocked.current) chime()
    prevUnlocked.current = unlocked
  }, [unlocked, chime])

  const openDoor = () => {
    dispatch({ type: 'open' })
    setBurst((b) => b + 1)
    chime()
  }

  const smartDispatch = (action) => {
    if (action.type === 'open') openDoor()
    else dispatch(action)
  }

  const inspect = (id) => {
    if (id === 'door' && unlocked && state.active === 'door' && !state.doorOpen) {
      openDoor()
      return
    }
    dispatch({ type: 'inspect', id })
  }

  const visibleHotspots = HOTSPOTS.filter((h) => !h.needsLight || state.lampOn)

  const labelFor = (id) => {
    if (id === 'lamp') return `${OBJ.lamp.name}, ${state.lampOn ? 'on' : 'off'}`
    if (id === 'door') return `${OBJ.door.name}, ${state.doorOpen ? 'open' : unlocked ? 'unlocked' : 'locked'}`
    return OBJ[id].name
  }

  return (
    <Chapter id="room" num="02" label="The Blue Room" title={room.heading} subtitle={room.story}>
      <Confetti burst={burst} />
      <div className="roomgame">
        <div className="roomgame__stage">
          <div className={`room ${state.lampOn ? 'is-lit' : 'is-dark'}`}>
            <RoomScene lampOn={state.lampOn} unlocked={unlocked} doorOpen={state.doorOpen} />
            {visibleHotspots.map((h) => (
              <button
                key={h.id}
                type="button"
                className={`hotspot hotspot--${h.id} ${state.active === h.id ? 'is-active' : ''} ${
                  h.id === 'lamp' && !state.lampOn ? 'is-hint' : ''
                }`}
                style={toPct(h.box)}
                aria-label={labelFor(h.id)}
                onClick={() => inspect(h.id)}
              />
            ))}
            {unlocked && !state.doorOpen && (
              <p className="room__toast mono" role="status">
                {room.unlocked}
              </p>
            )}
          </div>

          <div className="room__chips" role="group" aria-label={room.objectsLabel}>
            {visibleHotspots.map((h) => (
              <button key={h.id} type="button" className="chip" onClick={() => inspect(h.id)}>
                {OBJ[h.id].name}
              </button>
            ))}
          </div>

          <Inspector state={state} unlocked={unlocked} foundCount={foundCount} dispatch={smartDispatch} />
        </div>

        <aside className="roomgame__status panel" aria-label="Progress">
          <div className="status__row">
            <span className="mono">{room.cluesLabel}</span>
            <strong className="mono">{foundCount}/3</strong>
          </div>
          <div className="bar" aria-hidden="true">
            <i style={{ transform: `scaleX(${foundCount / 3})` }} />
          </div>
          <ul className="status__clues">
            {CLUE_KEYS.map((key, index) => (
              <li key={key} className={state.found[key] ? 'is-found' : ''}>
                <Icon name={state.found[key] ? 'check' : 'lock'} />
                <span>{state.found[key] ? room.clueNames[key] : `Clue ${index + 1} · ${room.unknownClue}`}</span>
              </li>
            ))}
          </ul>
          <div className="status__row status__row--muted">
            <span className="mono">{room.inspectedLabel}</span>
            <span className="mono">
              {state.inspected.length}/{OBJECT_COUNT}
            </span>
          </div>
          <div className="status__door">
            <Icon name={unlocked ? 'unlock' : 'lock'} />
            <span>{state.doorOpen ? 'Door open' : unlocked ? 'Door unlocked' : 'Door locked'}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => dispatch({ type: 'restart' })}>
            <Icon name="restart" />
            {room.restart}
          </Button>
        </aside>
      </div>
    </Chapter>
  )
}
