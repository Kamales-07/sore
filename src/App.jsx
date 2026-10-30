import { useCallback, useEffect, useState } from 'react'
import { SoundProvider } from './audio/SoundContext'
import useReducedMotion from './hooks/useReducedMotion'
import IntroScreen from './components/sections/IntroScreen'
import Header from './components/sections/Header'
import Prologue from './components/sections/Prologue'
import FriendshipAlgorithm from './components/sections/FriendshipAlgorithm'
import BlueRoomGame from './components/sections/BlueRoomGame'
import OverthinkingSimulator from './components/sections/OverthinkingSimulator'
import MemoryDetector from './components/sections/MemoryDetector'
import BlueChallenge from './components/sections/BlueChallenge'
import FriendshipReflection from './components/sections/FriendshipReflection'
import FinalMessage from './components/sections/FinalMessage'
import FinalInteraction from './components/sections/FinalInteraction'
import Footer from './components/sections/Footer'

/* Flow: intro -> leaving (fade) -> experience. ?edit skips the intro for quicker editing. */
const startStage = () =>
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('edit') ? 'main' : 'intro'

function Experience() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    document.getElementById('prologue-title')?.focus({ preventScroll: true })
  }, [])

  return (
    <div className="experience" id="top">
      <a href="#algorithm" className="skip-link">
        Skip to the first chapter
      </a>
      <Header />
      <main>
        <Prologue />
        <FriendshipAlgorithm />
        <BlueRoomGame />
        <OverthinkingSimulator />
        <MemoryDetector />
        <BlueChallenge />
        <FriendshipReflection />
        <FinalMessage />
        <FinalInteraction />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  const reduced = useReducedMotion()
  const [stage, setStage] = useState(startStage)
  const enter = useCallback(() => setStage('leaving'), [])

  useEffect(() => {
    if (stage !== 'leaving') return undefined
    const timer = setTimeout(() => setStage('main'), reduced ? 0 : 900)
    return () => clearTimeout(timer)
  }, [stage, reduced])

  return (
    <SoundProvider>
      {stage === 'main' ? <Experience /> : <IntroScreen onEnter={enter} leaving={stage === 'leaving'} />}
    </SoundProvider>
  )
}
