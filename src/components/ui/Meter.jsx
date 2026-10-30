import useInView from '../../hooks/useInView'

/**
 * Fun progress meter. `overflow` makes the bar burst past 100%,
 * `busy` shows a striped "still loading" bar.
 */
export default function Meter({ label, value, percent = 0, tone = 'lavender', overflow = false, busy = false }) {
  const [ref, inView] = useInView({ threshold: 0.5 })
  const width = inView ? Math.min(percent, 100) : 0
  return (
    <div ref={ref} className={`meter meter--${tone} ${overflow ? 'meter--overflow' : ''} ${busy ? 'meter--busy' : ''}`}>
      <div className="meter__row">
        <span className="meter__label">{label}</span>
        <span className="meter__value">{value}</span>
      </div>
      <div
        className="meter__track"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.min(percent, 100)}
        aria-valuetext={value}
      >
        <div className="meter__fill" style={{ width: `${width}%` }} />
        {overflow && inView && <span className="meter__spill" aria-hidden="true">💥</span>}
      </div>
    </div>
  )
}
