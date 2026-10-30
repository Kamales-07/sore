import { useCallback, useEffect, useMemo, useState } from 'react'
import * as engine from './engine'
import { SoundContext } from './soundContextObject'

/**
 * Sound is OFF on every visit. It only starts after the visitor presses the toggle.
 * The preference is deliberately not remembered, so nothing can ever autoplay.
 */
export function SoundProvider({ children }) {
  const [enabled, setEnabledState] = useState(false)
  const supported = engine.isSupported()

  const toggle = useCallback(() => {
    const next = !enabled
    engine.setEnabled(next)
    setEnabledState(next)
  }, [enabled])

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

  const value = useMemo(() => ({ enabled, supported, toggle, tick, chime }), [enabled, supported, toggle, tick, chime])

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}
