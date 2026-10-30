/** Rubber stamp that slams onto the screen. tone: 'reject' | 'accept' */
export default function Stamp({ text, tone = 'reject', inline = false }) {
  return (
    <p className={`stamp stamp--${tone} ${inline ? 'stamp--inline' : ''}`} role="status">
      {text}
    </p>
  )
}
