/*
 * Tiny Web Audio engine. Everything is synthesised, so there are no audio files.
 * Nothing plays until the visitor switches sound on (a user gesture).
 */

let ctx = null
let master = null
let ambient = null

function ensureContext() {
  if (typeof window === 'undefined') return null
  const AudioCtx = window.AudioContext || window.webkitAudioContext
  if (!AudioCtx) return null
  if (!ctx) {
    ctx = new AudioCtx()
    master = ctx.createGain()
    master.gain.value = 0
    master.connect(ctx.destination)
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {})
  return ctx
}

export function isSupported() {
  return typeof window !== 'undefined' && !!(window.AudioContext || window.webkitAudioContext)
}

export function setEnabled(enabled) {
  const audio = ensureContext()
  if (!audio) return
  const now = audio.currentTime
  master.gain.cancelScheduledValues(now)
  master.gain.setValueAtTime(master.gain.value, now)
  master.gain.linearRampToValueAtTime(enabled ? 1 : 0, now + (enabled ? 0.4 : 0.6))
  if (enabled) startAmbient()
  else stopAmbient()
}

/* A quiet, slowly breathing pad: A2 / E3 / A3 / C#4 through a soft low-pass filter. */
function startAmbient() {
  if (ambient || !ctx) return
  const now = ctx.currentTime
  const out = ctx.createGain()
  out.gain.setValueAtTime(0, now)
  out.gain.linearRampToValueAtTime(0.045, now + 3)

  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 650
  filter.Q.value = 0.4

  const lfo = ctx.createOscillator()
  const lfoDepth = ctx.createGain()
  lfo.frequency.value = 0.06
  lfoDepth.gain.value = 220
  lfo.connect(lfoDepth).connect(filter.frequency)

  const oscillators = [110, 164.81, 220, 277.18].map((freq, index) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = index % 2 ? 'triangle' : 'sine'
    osc.frequency.value = freq
    osc.detune.value = index * 3 - 4
    gain.gain.value = 0.22
    osc.connect(gain).connect(filter)
    osc.start(now)
    return osc
  })

  filter.connect(out).connect(master)
  lfo.start(now)
  ambient = { out, oscillators, lfo }
}

function stopAmbient() {
  if (!ambient || !ctx) return
  const { out, oscillators, lfo } = ambient
  const now = ctx.currentTime
  out.gain.cancelScheduledValues(now)
  out.gain.setValueAtTime(out.gain.value, now)
  out.gain.linearRampToValueAtTime(0, now + 0.8)
  oscillators.forEach((osc) => osc.stop(now + 0.9))
  lfo.stop(now + 0.9)
  ambient = null
}

function tone(freq, { start = 0, duration = 0.12, volume = 0.05, type = 'sine' } = {}) {
  if (!ctx) return
  const t = ctx.currentTime + start
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = type
  osc.frequency.value = freq
  gain.gain.setValueAtTime(0, t)
  gain.gain.linearRampToValueAtTime(volume, t + 0.012)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration)
  osc.connect(gain).connect(master)
  osc.start(t)
  osc.stop(t + duration + 0.05)
}

/** Soft click for ordinary interactions. */
export function tick() {
  tone(880, { duration: 0.08, volume: 0.03 })
}

/** Gentle three-note chime for completing something. */
export function chime() {
  ;[523.25, 659.25, 783.99].forEach((freq, index) => tone(freq, { start: index * 0.11, duration: 0.6, volume: 0.04 }))
}

/** Pause audio while the tab is hidden; resume when visible. */
export function setPageVisible(visible) {
  if (!ctx) return
  if (visible) ctx.resume().catch(() => {})
  else ctx.suspend().catch(() => {})
}
