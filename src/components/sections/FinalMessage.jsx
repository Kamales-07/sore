import { finalMessage } from '../../content/content'
import Chapter from '../ui/Chapter'

/* The emotional centre. Restrained: darker background, one slow light, readable type. */
export default function FinalMessage() {
  return (
    <Chapter
      id="message"
      num="07"
      label="Before You Leave"
      title={finalMessage.heading}
      subtitle={finalMessage.subheading}
      tone="night"
      className="letter-chapter"
    >
      <span className="letter__light" aria-hidden="true" />
      <article className="letter">
        <p className="letter__salutation">{finalMessage.salutation}</p>
        {finalMessage.paragraphs.map((p, index) => (
          <p key={p} className="letter__p" style={{ '--i': index }}>
            {p}
          </p>
        ))}
        <p className="letter__signature">{finalMessage.signature}</p>
      </article>
    </Chapter>
  )
}
