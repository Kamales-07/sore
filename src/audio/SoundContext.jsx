import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import * as engine from './engine'
import { SoundContext } from './soundContextObject'

/**
 * Sound is OFF when the page loads. It starts only from a tap: the start button
 * (see content.music.startOnEnter) or the sound toggle. The visible toggle mutes it any time.
 * source: 'off' | 'music' (the song file) | 'ambient' (fallback tone while the song loads or if missing)
 */
export function SoundProvider({ children }) {
  const [enabled, setEnabledState] = useState(false)
  const [source, setSource] = useState('off')
  const request = useRef(0)
  const supported = engine.isSupported()

  const setSound = useCallback((next) => {
    const id = ++request.current
    setEnabledState(next)
    setSource(next ? 'ambient' : 'off')
    engine.setEnabled(next).then((playing) => {
      // Ignore results from an older tap if the visitor toggled again meanwhile.
      if (id === request.current) setSource(playing)
    })
  }, [])

  const toggle = useCallback(() => setSound(!enabled), [enabled, setSound])

  const turnOn = useCallback(() => {
    if (!enabled) setSound(true)
  }, [enabled, setSound])

  useEffect(() => {
    const onVisibility = () => engine.setPageVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  const tick = useCallback(() => {
    if (enabled) engine.tick()
  }, [enabled])

  const chime = useCallback(() => {
    if (enabled) engine.chime()
  }, [enabled])

  const thud = useCallback(() => {
    if (enabled) engine.thud()
  }, [enabled])

  const boing = useCallback(() => {
    if (enabled) engine.boing()
  }, [enabled])

  const value = useMemo(
    () => ({ enabled, source, supported, toggle, turnOn, tick, chime, thud, boing }),
    [enabled, source, supported, toggle, turnOn, tick, chime, thud, boing],
  )

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}
