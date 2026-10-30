import useInView from '../../hooks/useInView'

/**
 * Rubber-stamp style label that slams in when scrolled into view.
 * tone: 'coral' | 'lavender' | 'blue' | 'ink'
 */
export default function Stamp({ children, tone = 'coral', rotate = -8, className = '', animateOnView = true }) {
  const [ref, inView] = useInView({ threshold: 0.4 })
  const visible = animateOnView ? inView : true
  return (
    <span
      ref={ref}
      className={`stamp stamp--${tone} ${visible ? 'is-stamped' : ''} ${className}`}
      style={{ '--stamp-rotate': `${rotate}deg` }}
    >
      {children}
    </span>
  )
}
