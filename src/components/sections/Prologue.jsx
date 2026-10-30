import { chapters, prologue } from '../../content/content'
import useInView from '../../hooks/useInView'

export default function Prologue() {
  const [ref, inView] = useInView({ threshold: 0.1 })
  return (
    <section id="prologue" ref={ref} className={`chapter chapter--deep prologue ${inView ? 'is-visible' : ''}`} aria-labelledby="prologue-title">
      <div className="container prologue__grid">
        <div className="reveal">
          <p className="eyebrow">{prologue.eyebrow}</p>
          <h2 id="prologue-title" className="chapter__title" tabIndex={-1}>
            {prologue.title}
          </h2>
          {prologue.body.map((p) => (
            <p key={p} className="prologue__body">
              {p}
            </p>
          ))}
        </div>
        <nav className="toc reveal reveal--late" aria-label={prologue.listLabel}>
          <p className="toc__label mono">{prologue.listLabel}</p>
          <ol>
            {chapters.map((chapter) => (
              <li key={chapter.id}>
                <a href={`#${chapter.id}`}>
                  <span className="mono">{chapter.num}</span>
                  <span>{chapter.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  )
}
