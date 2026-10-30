import useInView from '../../hooks/useInView'

/**
 * A numbered chapter of the experience.
 * tone: 'deep' | 'navy' | 'night'
 */
export default function Chapter({ id, num, label, title, subtitle, tone = 'deep', className = '', children }) {
  const [ref, inView] = useInView({ threshold: 0.06 })
  const classes = ['chapter', `chapter--${tone}`, inView ? 'is-visible' : '', className].filter(Boolean).join(' ')

  return (
    <section id={id} ref={ref} className={classes} aria-labelledby={`${id}-title`} data-chapter>
      <div className="container">
        <header className="chapter__head reveal">
          {(num || label) && (
            <p className="eyebrow">
              {num && <span className="eyebrow__num">{num}</span>}
              {label}
            </p>
          )}
          <h2 id={`${id}-title`} className="chapter__title" tabIndex={-1}>
            {title}
          </h2>
          {subtitle && <p className="chapter__subtitle">{subtitle}</p>}
        </header>
        <div className="reveal reveal--late">{children}</div>
      </div>
    </section>
  )
}
