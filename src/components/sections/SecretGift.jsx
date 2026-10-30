import { useCallback, useState } from 'react'
import { gift } from '../../content/text'
import Button from '../ui/Button'
import Modal from '../ui/Modal'
import Confetti from '../ui/Confetti'
import Sticker from '../ui/Sticker'

const STICKER_TONES = ['lavender', 'yellow', 'blue', 'coral', 'mint', 'paper']

/** Floating gift icon that opens the secret bestie gift. */
export default function SecretGift() {
  const [open, setOpen] = useState(false)
  const [seen, setSeen] = useState(false)
  const [burst, setBurst] = useState(0)

  const openGift = () => {
    setOpen(true)
    setSeen(true)
    setBurst((b) => b + 1)
  }
  const close = useCallback(() => setOpen(false), [])

  return (
    <>
      <div className="gift">
        {!seen && (
          <span className="gift__hint bubble bubble--right bubble--yellow" aria-hidden="true">
            {gift.hint}
          </span>
        )}
        <button type="button" className="gift__btn" onClick={openGift} aria-label={gift.floatingLabel}>
          <span aria-hidden="true">🎁</span>
        </button>
      </div>

      <Confetti burst={burst} emojis={['🎁', '🫂', '🎉', '✨']} />

      <Modal open={open} onClose={close} title={gift.unlocked} closeLabel={gift.closeLabel} tone="yellow">
        <dl className="gift-modal__lines">
          {gift.lines.map((line) => (
            <div className="gift-modal__row" key={line.label}>
              <dt>{line.label}:</dt>
              <dd>{line.value}</dd>
            </div>
          ))}
        </dl>
        <p className="gift-modal__real">{gift.realGift}</p>
        <div className="gift-modal__stickers" aria-hidden="true">
          {gift.stickers.map((emoji, index) => (
            <Sticker
              key={emoji}
              emoji={emoji}
              tone={STICKER_TONES[index % STICKER_TONES.length]}
              rotate={(index % 2 === 0 ? -1 : 1) * (6 + index * 2)}
              className="gift-modal__sticker"
            />
          ))}
        </div>
        <div className="gift-modal__close">
          <Button variant="primary" onClick={close}>
            {gift.closeLabel} 🫂
          </Button>
        </div>
      </Modal>
    </>
  )
}
