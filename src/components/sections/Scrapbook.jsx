import { useEffect, useState } from 'react'
import { scrapbook } from '../../content/text'
import Section from '../ui/Section'
import Button from '../ui/Button'
import ScrapDoodle from '../illustrations/ScrapDoodle'

function ScrapCard({ card, index, caption, onCaptionChange }) {
  const [editing, setEditing] = useState(false)
  const [photo, setPhoto] = useState(null)
  const textareaId = `caption-${card.id}`

  // Object URLs live only in this browser tab; revoke when replaced or unmounted.
  useEffect(() => () => photo && URL.revokeObjectURL(photo), [photo])

  const onFile = (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file || !file.type.startsWith('image/')) return
    setPhoto(URL.createObjectURL(file))
  }

  return (
    <article className="polaroid" style={{ '--i': index }}>
      <span className={`polaroid__tape polaroid__tape--${card.tape}`} aria-hidden="true" />
      <div className="polaroid__photo">
        {photo ? <img src={photo} alt="Photo you added (stays on this device)" /> : <ScrapDoodle kind={card.doodle} />}
      </div>

      {editing ? (
        <>
          <label className="sr-only" htmlFor={textareaId}>
            Edit memory card text
          </label>
          <textarea
            id={textareaId}
            className="polaroid__textarea"
            value={caption}
            onChange={(event) => onCaptionChange(card.id, event.target.value)}
            rows={3}
          />
        </>
      ) : (
        <p className="polaroid__caption">{caption}</p>
      )}

      <div className="polaroid__actions">
        <Button variant="ghost" size="sm" onClick={() => setEditing((e) => !e)} aria-pressed={editing}>
          {editing ? `${scrapbook.doneLabel} ✅` : `${scrapbook.editLabel} ✏️`}
        </Button>
        <label className="btn btn--ghost btn--sm file-btn">
          <input type="file" accept="image/*" className="sr-only" onChange={onFile} />
          {scrapbook.photoLabel} 📷
        </label>
        {photo && (
          <Button variant="ghost" size="sm" onClick={() => setPhoto(null)}>
            {scrapbook.removePhotoLabel} 🗑️
          </Button>
        )}
      </div>
    </article>
  )
}

export default function Scrapbook() {
  const [captions, setCaptions] = useState(() =>
    Object.fromEntries(scrapbook.cards.map((card) => [card.id, card.caption])),
  )
  const updateCaption = (id, value) => setCaptions((prev) => ({ ...prev, [id]: value }))

  return (
    <Section
      id="scrapbook"
      tone="mint"
      eyebrow="Section 7 · Memory scrapbook"
      title={scrapbook.heading}
      subtitle={scrapbook.intro}
    >
      <div className="scrap-grid">
        {scrapbook.cards.map((card, index) => (
          <ScrapCard
            key={card.id}
            card={card}
            index={index}
            caption={captions[card.id]}
            onCaptionChange={updateCaption}
          />
        ))}
      </div>
      <p className="scrap-note">{scrapbook.localNote}</p>
    </Section>
  )
}
