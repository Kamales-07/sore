import { intro, music } from '../../content/content'
import { useSound } from '../../audio/soundContextObject'
import Button from '../ui/Button'
import SoundToggle from '../ui/SoundToggle'
import Waves from '../ui/Waves'
import Kamales from '../game/Kamales'

export default function IntroScene({ onStart }) {
  const { turnOn } = useSound()

  const start = () => {
    // Her tap on the start button is what lets the browser begin the song.
    if (music.startOnEnter) turnOn()
    onStart()
  }

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
        <Kamales mood="sheepish" item="flag" className="intro__kamales" />
        <Button size="lg" onClick={start} className="intro__start">
          {intro.start}
        </Button>
      </div>

      <p className="intro__credit">{intro.credit}</p>
      <Waves />
    </main>
  )
}
