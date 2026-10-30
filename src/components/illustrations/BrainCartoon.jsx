/** A confused cartoon brain with mismatched eyes, sweat and question marks. */
export default function BrainCartoon({ className = '' }) {
  return (
    <svg
      className={`illo ${className}`}
      viewBox="0 0 240 200"
      role="img"
      aria-label="A confused cartoon brain surrounded by question marks"
    >
      <g className="brain-illo__marks" fill="#e9634f" fontFamily="Caveat, cursive" fontWeight="700" fontSize="38">
        <text x="22" y="54">?</text>
        <text x="194" y="46">?</text>
        <text x="206" y="156">!</text>
        <text x="10" y="146">?</text>
      </g>
      <path d="M214 92l-10 16h8l-6 14 14-18h-8l5-12z" fill="#f5c842" stroke="#2d2650" strokeWidth="1.5" strokeLinejoin="round" />

      <path
        d="M120 44C105 26 70 28 62 56 40 60 34 96 54 112 46 138 76 156 98 146c8 12 36 12 44 0 22 10 52-8 44-34 20-16 14-52-8-56-8-28-43-30-58-12z"
        fill="#dccdf9"
        stroke="#7f66d6"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M120 44c-10 30-10 70 0 102" stroke="#7f66d6" strokeWidth="3" fill="none" strokeLinecap="round" />
      <g stroke="#7f66d6" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity=".7">
        <path d="M68 74q10-8 18 2t16-2" />
        <path d="M62 104q12-6 20 4t18-4" />
        <path d="M78 130q10-6 18 2" />
        <path d="M172 74q-10-8-18 2t-16-2" />
        <path d="M178 104q-12-6-20 4t-18-4" />
        <path d="M162 130q-10-6-18 2" />
      </g>

      <circle cx="96" cy="96" r="10" fill="#fff" stroke="#2d2650" strokeWidth="2.5" />
      <circle cx="98" cy="97" r="4" fill="#2d2650" />
      <circle cx="146" cy="92" r="7" fill="#fff" stroke="#2d2650" strokeWidth="2.5" />
      <circle cx="147" cy="93" r="2.6" fill="#2d2650" />
      <path d="M84 80q10-7 22-2M138 76q8-5 16 0" stroke="#2d2650" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M104 120q6 6 12 0t12 0" stroke="#2d2650" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M182 58q8 10 0 18-8-8 0-18z" fill="#a9d3f5" />
    </svg>
  )
}
