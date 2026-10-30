/** Cartoon Kamal, nervous, standing in the accused box. */
export default function AccusedKamal({ className = '' }) {
  return (
    <svg
      className={`illo ${className}`}
      viewBox="0 0 240 200"
      role="img"
      aria-label="Cartoon Kamal looking nervous inside the accused box"
    >
      <path d="M70 132q0-50 50-50t50 50z" fill="#ff8a76" />

      <rect x="40" y="128" width="160" height="64" rx="10" fill="#a9d3f5" stroke="#2d2650" strokeWidth="2.5" />
      <path d="M64 128v64M88 128v64M152 128v64M176 128v64" stroke="#2d2650" strokeWidth="2" opacity=".3" />
      <rect x="82" y="150" width="76" height="22" rx="5" fill="#fff6e3" stroke="#2d2650" strokeWidth="2" />
      <text
        x="120"
        y="166"
        textAnchor="middle"
        fontFamily="Nunito, system-ui, sans-serif"
        fontSize="11"
        fontWeight="800"
        letterSpacing="2"
        fill="#2d2650"
      >
        ACCUSED
      </text>

      <circle cx="72" cy="128" r="9" fill="#f3c7a6" stroke="#2d2650" strokeWidth="2" />
      <circle cx="168" cy="128" r="9" fill="#f3c7a6" stroke="#2d2650" strokeWidth="2" />

      <circle cx="120" cy="62" r="32" fill="#f6d3b6" />
      <path d="M88 62q0-42 32-42t32 42q-8-18-32-18t-32 18z" fill="#2d2650" />
      <path d="M100 30l6-18 6 16zM116 26l4-20 6 18zM132 30l7-16 3 16z" fill="#2d2650" />
      <circle cx="109" cy="66" r="8" fill="#fff" stroke="#2d2650" strokeWidth="2.5" />
      <circle cx="131" cy="66" r="8" fill="#fff" stroke="#2d2650" strokeWidth="2.5" />
      <path d="M117 66h6" stroke="#2d2650" strokeWidth="2.5" />
      <circle cx="110" cy="67" r="3" fill="#2d2650" />
      <circle cx="132" cy="67" r="3" fill="#2d2650" />
      <path d="M100 54l10 3M140 54l-10 3" stroke="#2d2650" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="120" cy="76" r="5" fill="#e9634f" />
      <path d="M110 88q5 5 10 0t10 0" stroke="#2d2650" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M156 42q7 9 0 16-7-7 0-16z" fill="#a9d3f5" />
      <path d="M162 64q6 8 0 14-6-6 0-14z" fill="#a9d3f5" />
    </svg>
  )
}
