import { agreement } from '../../content/text'
import Section from '../ui/Section'
import Stamp from '../ui/Stamp'
import Bracelets from '../illustrations/Bracelets'

export default function Agreement() {
  return (
    <Section
      id="agreement"
      tone="paper"
      eyebrow="Section 5 · Official document"
      title={agreement.heading}
      subtitle={agreement.subtitle}
    >
      <article className="contract" aria-label="Bestie agreement">
        <span className="contract__corner contract__corner--tl" aria-hidden="true" />
        <span className="contract__corner contract__corner--tr" aria-hidden="true" />
        <span className="contract__corner contract__corner--bl" aria-hidden="true" />
        <span className="contract__corner contract__corner--br" aria-hidden="true" />

        <ol className="contract__rules">
          {agreement.rules.map((rule, index) => (
            <li key={rule} className="rule">
              <span className="rule__num">RULE {index + 1}</span>
              <p className="rule__text">“{rule}”</p>
            </li>
          ))}
        </ol>

        <div className="contract__stamp">
          <Stamp tone="lavender" rotate={-6}>
            {agreement.stamp}
          </Stamp>
        </div>

        <div className="contract__witness">
          <Bracelets />
          <span>Witnesses: two matching bracelets 🤝</span>
        </div>

        <p className="contract__foot">{agreement.footnote}</p>
      </article>
    </Section>
  )
}
