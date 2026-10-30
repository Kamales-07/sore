import useCopyToClipboard from '../../hooks/useCopyToClipboard'
import Button from './Button'

/** Copies `text` and confirms briefly. Calls onEmpty instead when there is nothing to copy. */
export default function CopyButton({
  text,
  label = 'Copy',
  copiedLabel = 'Copied',
  failedLabel = 'Copy failed. Select the text and copy it manually.',
  variant = 'secondary',
  size = 'md',
  onEmpty,
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
  if (status === 'copied') content = `${copiedLabel} ✓`
  if (status === 'failed') content = failedLabel

  return (
    <Button variant={variant} size={size} onClick={handleClick} className={`copy-btn ${status === 'copied' ? 'is-copied' : ''}`}>
      <span aria-live="polite">{content}</span>
    </Button>
  )
}
