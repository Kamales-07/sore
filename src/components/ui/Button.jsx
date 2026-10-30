/**
 * Shared button. variant: 'primary' | 'secondary' | 'ghost' | 'coral' | 'yellow'
 * size: 'md' | 'lg' | 'sm'
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  const classes = ['btn', `btn--${variant}`, `btn--${size}`, className].filter(Boolean).join(' ')
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  )
}
