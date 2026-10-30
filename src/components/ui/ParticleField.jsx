import { useEffect, useRef } from 'react'
import useReducedMotion from '../../hooks/useReducedMotion'

/**
 * Lightweight canvas field of drifting blue particles.
 * Density scales with area, capped for mid-range phones. Pauses when hidden or off-screen.
 * With reduced motion it draws one still frame.
 */
export default function ParticleField({ className = '', density = 0.00011, max = 130 }) {
  const canvasRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const context = canvas.getContext('2d')
    if (!context) return undefined

    let width = 0
    let height = 0
    let particles = []
    let frame = 0
    let running = false
    let visible = true

    const seed = () => {
      const count = Math.max(24, Math.min(max, Math.round(width * height * density)))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.4 + Math.random() * 1.4,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -0.04 - Math.random() * 0.14,
        a: 0.15 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
      draw(0)
    }

    const draw = (time) => {
      context.clearRect(0, 0, width, height)
      for (const p of particles) {
        const twinkle = reduced ? 1 : 0.65 + 0.35 * Math.sin(time * 0.0012 + p.phase)
        context.beginPath()
        context.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        context.fillStyle = `rgba(96, 165, 250, ${p.a * twinkle})`
        context.fill()
      }
    }

    const step = (time) => {
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.y < -4) {
          p.y = height + 4
          p.x = Math.random() * width
        }
        if (p.x < -4) p.x = width + 4
        if (p.x > width + 4) p.x = -4
      }
      draw(time)
      frame = requestAnimationFrame(step)
    }

    const start = () => {
      if (running || reduced || !visible || document.hidden) return
      running = true
      frame = requestAnimationFrame(step)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(frame)
    }

    resize()
    start()

    const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null
    resizeObserver?.observe(canvas)

    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting
            if (visible) start()
            else stop()
          })
        : null
    io?.observe(canvas)

    const onVisibility = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      resizeObserver?.disconnect()
      io?.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduced, density, max])

  return <canvas ref={canvasRef} className={`particles ${className}`} aria-hidden="true" />
}
