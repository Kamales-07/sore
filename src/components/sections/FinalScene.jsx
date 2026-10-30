import { finalScene } from '../../content/text'
import Section from '../ui/Section'
import BenchScene from '../illustrations/BenchScene'

export default function FinalScene() {
  return (
    <Section
      id="final"
      tone="dusk"
      eyebrow="Section 10 · Serious-ah oru nimisham"
      title={finalScene.heading}
      titleClassName="final-scene__title"
      className="final-scene"
    >
      <div className="final-scene__illo">
        <BenchScene />
      </div>
      <div className="final-scene__message">
        {finalScene.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p className="final-scene__signoff">
          {finalScene.signOff.map((line) => (
            <span key={line} style={{ display: 'block' }}>
              {line}
            </span>
          ))}
        </p>
      </div>
    </Section>
  )
}
