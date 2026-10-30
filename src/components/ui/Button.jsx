import { useSound } from '../../audio/soundContextObject'

/**
 * variant: 'primary' | 'secondary' | 'ghost'
 * size: 'md' | 'lg' | 'sm'
 * Plays a soft click when sound is on (pass silent to skip).
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  silent = false,
  onClick,
  children,
  ...rest
}) {
  const { tick } = useSound()
  const classes = ['btn', `btn--${variant}`, `btn--${size}`, className].filter(Boolean).join(' ')
  const handleClick = (event) => {
    if (!silent) tick()
    onClick?.(event)
  }
  return (
    <button type={type} className={classes} onClick={handleClick} {...rest}>
      {children}
    </button>
  )
}
