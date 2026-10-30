import { intro } from '../../content/content'
import Button from '../ui/Button'
import Icon from '../ui/Icon'
import ParticleField from '../ui/ParticleField'
import SoundToggle from '../ui/SoundToggle'
import Waves from '../ui/Waves'

/*
 * Opening screen. The staged reveal (line, title, text, button) is pure CSS,
 * so with reduced motion everything simply appears in its final state.
 */
export default function IntroScreen({ onEnter, leaving }) {
  const word = intro.title.replace(/\.$/, '')

  return (
    <div className={`intro ${leaving ? 'is-leaving' : ''}`}>
      <ParticleField className="intro__particles" />
      <div className="intro__glow" aria-hidden="true" />

      <div className="intro__top">
        <SoundToggle />
      </div>

      <main className="intro__center" id="intro">
        <span className="intro__line" aria-hidden="true" />
        <h1 className="intro__title">
          {word}
          <span className="intro__dot">.</span>
        </h1>
        <p className="intro__subtitle">{intro.subtitle}</p>
        <p className="intro__lede">{intro.lede}</p>
        <div className="intro__cta">
          <Button size="lg" onClick={onEnter} disabled={leaving}>
            {intro.enter}
            <Icon name="arrow" />
          </Button>
        </div>
      </main>

      <p className="intro__credit">{intro.credit}</p>
      <Waves className="intro__waves" />
    </div>
  )
}
