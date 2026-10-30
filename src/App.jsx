import { useEffect, useState } from 'react'
import { SoundProvider } from './audio/SoundContext'
import ParticleField from './components/ui/ParticleField'
import IntroScene from './components/screens/IntroScene'
import SorryGame from './components/screens/SorryGame'
import ResultScene from './components/screens/ResultScene'

/* intro -> game (she keeps saying no) -> result (finally forgiven) */
export default function App() {
  const [screen, setScreen] = useState('intro')
  const [result, setResult] = useState(null)
  const [round, setRound] = useState(0)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [screen, round])

  return (
    <SoundProvider>
      <ParticleField className="bg-particles" />
      <div className="app">
        {screen === 'intro' && <IntroScene onStart={() => setScreen('game')} />}
        {screen === 'game' && (
          <SorryGame
            key={round}
            onAccept={(r) => {
              setResult(r)
              setScreen('done')
            }}
          />
        )}
        {screen === 'done' && result && (
          <ResultScene
            result={result}
            onReplay={() => {
              setRound((n) => n + 1)
              setScreen('game')
            }}
          />
        )}
      </div>
    </SoundProvider>
  )
}
