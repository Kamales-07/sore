import { useSound } from '../../audio/soundContextObject'

/** Visible mute control. Sound is always off until pressed. */
export default function SoundToggle({ className = '' }) {
  const { enabled, supported, toggle } = useSound()
  if (!supported) return null
  return (
    <button
      type="button"
      className={`sound-toggle ${enabled ? 'is-on' : ''} ${className}`}
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? 'Sound on. Press to mute.' : 'Sound off. Press to turn on quiet ambient sound.'}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" />
        {enabled ? (
          <>
            <path d="M15.5 9a4.5 4.5 0 0 1 0 6" />
            <path d="M18 6.5a8 8 0 0 1 0 11" />
          </>
        ) : (
          <path d="M16 9.5l5 5M21 9.5l-5 5" />
        )}
      </svg>
      <span className="sound-toggle__label">{enabled ? 'Sound on' : 'Sound off'}</span>
      {enabled && (
        <span className="sound-toggle__bars" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      )}
    </button>
  )
}
