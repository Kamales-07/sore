import { useEffect, useRef, useState } from 'react'
import { chapters, site } from '../../content/content'
import useActiveChapter from '../../hooks/useActiveChapter'
import Icon from '../ui/Icon'
import SoundToggle from '../ui/SoundToggle'

const IDS = chapters.map((c) => c.id)
const TOTAL = String(chapters.length).padStart(2, '0')

export default function Header() {
  const active = useActiveChapter(IDS)
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const menuRef = useRef(null)
  const current = chapters.find((c) => c.id === active)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
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

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuRef.current?.querySelector('.menu__button')?.focus()
      }
    }
    const onPointer = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#top" className="header__mark" aria-label="BLUE, back to the top">
          {site.wordmark}
          <span>.</span>
        </a>

        <p className="header__chapter">
          <span className="mono">{current ? `${current.num} / ${TOTAL}` : 'Prologue'}</span>
          {current && <span className="header__chapter-title">{current.title}</span>}
        </p>

        <div className="header__actions">
          <SoundToggle className="sound-toggle--compact" />
          <div className="menu" ref={menuRef}>
            <button
              type="button"
              className="menu__button"
              aria-label="Chapters"
              aria-expanded={open}
              aria-controls="chapter-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <Icon name={open ? 'close' : 'menu'} />
              <span className="menu__label">Chapters</span>
            </button>
            {open && (
              <nav id="chapter-menu" className="menu__panel" aria-label="Chapters">
                <ol>
                  {chapters.map((chapter) => (
                    <li key={chapter.id}>
                      <a
                        href={`#${chapter.id}`}
                        onClick={() => setOpen(false)}
                        aria-current={chapter.id === active ? 'true' : undefined}
                      >
                        <span className="mono">{chapter.num}</span>
                        {chapter.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
          </div>
        </div>
      </div>
      <div className="header__progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
    </header>
  )
}
