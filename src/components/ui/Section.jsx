import useInView from '../../hooks/useInView'

/**
 * Page section wrapper with a heading and a one-time entrance animation.
 * tone: 'cream' | 'lavender' | 'blue' | 'yellow' | 'coral' | 'mint' | 'paper' | 'dusk'
 */
export default function Section({
  id,
  eyebrow,
  title,
  subtitle,
  tone = 'cream',
  className = '',
  titleClassName = '',
  children,
}) {
  const [ref, inView] = useInView({ threshold: 0.08 })
  const classes = ['section', `section--${tone}`, inView ? 'is-visible' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <section id={id} ref={ref} className={classes} aria-labelledby={`${id}-title`}>
      <div className="container section__inner">
        <header className="section__header">
          {eyebrow && <p className="section__eyebrow hand">{eyebrow}</p>}
          <h2 id={`${id}-title`} className={`section__title ${titleClassName}`} tabIndex={-1}>
            {title}
          </h2>
          {subtitle && <p className="section__subtitle">{subtitle}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}
