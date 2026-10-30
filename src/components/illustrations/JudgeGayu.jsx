/** Cartoon Gayu as the judge, behind the bench with a gavel. */
export default function JudgeGayu({ className = '' }) {
  return (
    <svg
      className={`illo ${className}`}
      viewBox="0 0 240 200"
      role="img"
      aria-label="Cartoon Gayu as a judge, sitting behind the bench with a gavel"
    >
      <path d="M62 140q0-54 58-54t58 54z" fill="#2d2650" />
      <path d="M108 92l12 22 12-22z" fill="#fff6e3" />

      <rect x="16" y="138" width="208" height="54" rx="10" fill="#8b5e3c" stroke="#2d2650" strokeWidth="2.5" />
      <rect x="16" y="138" width="208" height="12" rx="6" fill="#6f4a2e" />
      <rect x="78" y="158" width="84" height="24" rx="5" fill="#fff6e3" stroke="#2d2650" strokeWidth="2" />
      <text
        x="120"
        y="175"
        textAnchor="middle"
        fontFamily="Nunito, system-ui, sans-serif"
        fontSize="12"
        fontWeight="800"
        letterSpacing="2"
        fill="#2d2650"
      >
        JUDGE
      </text>

      <g transform="rotate(-28 186 116)">
        <rect x="150" y="112" width="64" height="9" rx="4.5" fill="#6f4a2e" stroke="#2d2650" strokeWidth="2" />
        <rect x="190" y="98" width="28" height="38" rx="7" fill="#8b5e3c" stroke="#2d2650" strokeWidth="2" />
      </g>

      <circle cx="120" cy="66" r="32" fill="#f6d3b6" />
      <path d="M88 66q0-42 32-42t32 42q-8-18-32-18t-32 18z" fill="#3b2a3a" />
      <circle cx="150" cy="44" r="11" fill="#3b2a3a" />
      <path d="M104 28l5-14 8 10 3-16 7 16 8-10 4 14z" fill="#f5c842" />
      <circle cx="109" cy="68" r="3.2" fill="#2d2650" />
      <circle cx="131" cy="68" r="3.2" fill="#2d2650" />
      <path d="M103 60l10-3M137 60l-10-3" stroke="#2d2650" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M110 80q10 7 20 0" stroke="#2d2650" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="100" cy="76" r="4.5" fill="#ff8a76" opacity=".45" />
      <circle cx="140" cy="76" r="4.5" fill="#ff8a76" opacity=".45" />
    </svg>
  )
}
