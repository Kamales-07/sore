/** Three slow, layered wave bands. Pure CSS animation; static with reduced motion. */
export default function Waves({ className = '' }) {
  return (
    <div className={`waves ${className}`} aria-hidden="true">
      <span className="waves__layer waves__layer--1" />
      <span className="waves__layer waves__layer--2" />
      <span className="waves__layer waves__layer--3" />
    </div>
  )
}
