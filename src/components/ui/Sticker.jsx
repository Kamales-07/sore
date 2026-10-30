/** Round emoji sticker with a slight tilt. Decorative by default. */
export default function Sticker({ emoji, label, rotate = 0, size = 'md', tone = 'paper', className = '' }) {
  return (
    <span
      className={`sticker sticker--${size} sticker--${tone} ${className}`}
      style={{ '--sticker-rotate': `${rotate}deg` }}
      role={label ? 'img' : 'presentation'}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {emoji}
    </span>
  )
}
