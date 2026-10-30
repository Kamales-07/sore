import { createContext, useContext } from 'react'

const noop = () => {}

export const SoundContext = createContext({
  enabled: false,
  supported: false,
  toggle: noop,
  tick: noop,
  chime: noop,
  thud: noop,
  boing: noop,
})

export function useSound() {
  return useContext(SoundContext)
}
