import { useEffect, useState } from 'react'
import { nav, site } from '../../content/text'

/** Sticky section navigation with a scroll-progress bar. */
export default function TopBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <header className="topbar">
      <div className="topbar__progress" style={{ width: `${progress}%` }} aria-hidden="true" />
      <div className="container topbar__inner">
        <a href="#top" className="topbar__brand hand">
          {site.shortName} 😂🫂
        </a>
        <nav className="topbar__nav" aria-label="Website sections">
          {nav.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="chip">
              <span aria-hidden="true">{item.emoji}</span> {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
