import { intro } from '../../content/content'
import Button from '../ui/Button'
import SoundToggle from '../ui/SoundToggle'
import Waves from '../ui/Waves'
import Kamal from '../game/Kamal'

export default function IntroScene({ onStart }) {
  return (
    <main className="screen intro">
      <div className="screen__top">
        <span className="brand">{intro.brand}</span>
        <SoundToggle />
      </div>

      <div className="intro__body">
        <div className="speech">
          <h1 className="speech__line">{intro.bubble}</h1>
          <p className="speech__sub">{intro.sub}</p>
        </div>
        <Kamal mood="sheepish" item="flag" className="intro__kamal" />
        <Button size="lg" onClick={onStart} className="intro__start">
          {intro.start}
        </Button>
      </div>

      <p className="intro__credit">{intro.credit}</p>
      <Waves />
    </main>
  )
}
