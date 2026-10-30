import { game, moods } from '../../content/content'

function moodFor(anger) {
  return moods.find((m) => anger >= m.min) ?? moods[moods.length - 1]
}

/** Gayu's anger, from furious (100) down to calm (0). */
export default function AngerMeter({ anger }) {
  const mood = moodFor(anger)
  return (
    <div className="anger">
      <div className="anger__row">
        <span className="anger__label">{game.angerLabel}</span>
        <span className="anger__value">
          <span className="anger__emoji" key={mood.emoji} aria-hidden="true">
            {mood.emoji}
          </span>
          {mood.label} · {anger}%
        </span>
      </div>
      <div
        className="anger__bar"
        role="meter"
        aria-label={game.angerLabel}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={anger}
        aria-valuetext={`${anger}%, ${mood.label}`}
      >
        <i style={{ transform: `scaleX(${anger / 100})` }} />
      </div>
    </div>
  )
}
