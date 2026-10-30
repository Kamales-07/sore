import { useCallback, useEffect, useState } from 'react'
import useReducedMotion from './hooks/useReducedMotion'
import { intro } from './content/text'
import IntroScreen from './components/sections/IntroScreen'
import LoadingScreen from './components/sections/LoadingScreen'
import TopBar from './components/sections/TopBar'
import Courtroom from './components/sections/Courtroom'
import Interrogation from './components/sections/Interrogation'
import TechSupport from './components/sections/TechSupport'
import Agreement from './components/sections/Agreement'
import BrainExposed from './components/sections/BrainExposed'
import Scrapbook from './components/sections/Scrapbook'
import ApologyGenerator from './components/sections/ApologyGenerator'
import EmergencyRoom from './components/sections/EmergencyRoom'
import FinalScene from './components/sections/FinalScene'
import FinalInteraction from './components/sections/FinalInteraction'
import SecretGift from './components/sections/SecretGift'
import Footer from './components/sections/Footer'

/*
 * Flow: intro -> leaving (curtain animation) -> loading (funny loader) -> main site.
 */
export default function App() {
  const reduced = useReducedMotion()
  const [stage, setStage] = useState('intro')

  const enter = useCallback(() => setStage('leaving'), [])
  const onLoaded = useCallback(() => setStage('main'), [])

  useEffect(() => {
    if (stage !== 'leaving') return undefined
    const timer = setTimeout(() => setStage('loading'), reduced ? 0 : 700)
    return () => clearTimeout(timer)
  }, [stage, reduced])

  useEffect(() => {
    if (stage !== 'main') return
    window.scrollTo({ top: 0, behavior: 'auto' })
    document.getElementById('court-title')?.focus({ preventScroll: true })
  }, [stage])

  return (
    <>
      {(stage === 'intro' || stage === 'leaving') && (
        <IntroScreen onEnter={enter} leaving={stage === 'leaving'} />
      )}
      {stage === 'loading' && <LoadingScreen lines={intro.loadingLines} onDone={onLoaded} />}
      {stage === 'main' && (
        <div className="app" id="top">
          <a href="#court" className="skip-link">
            Skip to content
          </a>
          <TopBar />
          <main>
            <Courtroom />
            <Interrogation />
            <TechSupport />
            <Agreement />
            <BrainExposed />
            <Scrapbook />
            <ApologyGenerator />
            <EmergencyRoom />
            <FinalScene />
            <FinalInteraction />
          </main>
          <Footer />
          <SecretGift />
        </div>
      )}
    </>
  )
}
