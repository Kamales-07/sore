import useCopyToClipboard from '../../hooks/useCopyToClipboard'
import Button from './Button'

/** Button that copies `text` and shows a short confirmation. */
export default function CopyButton({
  text,
  label = 'Copy 📋',
  copiedLabel = 'Copied! ✅',
  failedLabel = 'Copy aagala 😅 select panni copy pannu',
  variant = 'secondary',
  size = 'md',
  onEmpty,
  className = '',
}) {
  const [copy, status] = useCopyToClipboard()

  const handleClick = () => {
    if (!text || !text.trim()) {
      onEmpty?.()
      return
    }
    copy(text)
  }

  let content = label
  if (status === 'copied') content = copiedLabel
  if (status === 'failed') content = failedLabel

  return (
    <Button
      variant={status === 'copied' ? 'mint' : variant}
      size={size}
      onClick={handleClick}
      aria-live="polite"
      className={`copy-btn ${className}`}
    >
      {content}
    </Button>
  )
}
