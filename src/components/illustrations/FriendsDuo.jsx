/** Two cartoon best friends giving a high five. Inline SVG, no external assets. */
export default function FriendsDuo({ className = '' }) {
  return (
    <svg
      className={`illo ${className}`}
      viewBox="0 0 360 230"
      role="img"
      aria-label="Two cartoon best friends giving a high five"
    >
      <ellipse cx="180" cy="216" rx="150" ry="9" fill="rgba(45,38,80,.09)" />
      <g fill="#f5c842">
        <path d="M180 26l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" />
        <circle cx="148" cy="52" r="3" />
        <circle cx="214" cy="58" r="3" />
        <path d="M236 34l2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5z" />
        <path d="M120 40l2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5z" />
      </g>

      {/* Gayu (left) */}
      <g>
        <path d="M126 140q24-22 48-48" stroke="#f3c7a6" strokeWidth="14" strokeLinecap="round" fill="none" />
        <circle cx="175" cy="90" r="11" fill="#f3c7a6" />
        <path d="M152 114l8-8" stroke="#7f66d6" strokeWidth="7" strokeLinecap="round" />
        <rect x="64" y="120" width="72" height="84" rx="26" fill="#c9b8f5" />
        <path d="M70 142q-18 14-10 36" stroke="#f3c7a6" strokeWidth="14" strokeLinecap="round" fill="none" />
        <rect x="80" y="192" width="16" height="26" rx="8" fill="#2d2650" />
        <rect x="104" y="192" width="16" height="26" rx="8" fill="#2d2650" />
        <circle cx="100" cy="82" r="36" fill="#f6d3b6" />
        <path d="M64 82q0-46 36-46t36 46q-8-18-36-18t-36 18z" fill="#3b2a3a" />
        <circle cx="134" cy="56" r="12" fill="#3b2a3a" />
        <path d="M84 40l5-14 9 10 2-16 8 16 9-10 3 14z" fill="#f5c842" />
        <circle cx="88" cy="86" r="3.5" fill="#2d2650" />
        <circle cx="112" cy="86" r="3.5" fill="#2d2650" />
        <path d="M90 99q10 9 20 0" stroke="#2d2650" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="78" cy="96" r="5" fill="#ff8a76" opacity=".45" />
        <circle cx="122" cy="96" r="5" fill="#ff8a76" opacity=".45" />
      </g>

      {/* Kamal (right) */}
      <g>
        <path d="M234 140q-24-22-48-48" stroke="#f3c7a6" strokeWidth="14" strokeLinecap="round" fill="none" />
        <circle cx="185" cy="90" r="11" fill="#f3c7a6" />
        <path d="M208 114l-8-8" stroke="#e9634f" strokeWidth="7" strokeLinecap="round" />
        <rect x="224" y="120" width="72" height="84" rx="26" fill="#ff8a76" />
        <path d="M290 142q18 14 10 36" stroke="#f3c7a6" strokeWidth="14" strokeLinecap="round" fill="none" />
        <rect x="240" y="192" width="16" height="26" rx="8" fill="#2d2650" />
        <rect x="264" y="192" width="16" height="26" rx="8" fill="#2d2650" />
        <circle cx="260" cy="82" r="36" fill="#f6d3b6" />
        <path d="M224 82q0-46 36-46t36 46q-8-18-36-18t-36 18z" fill="#2d2650" />
        <path d="M238 48l6-18 7 16zM254 44l4-20 7 18zM270 48l7-16 4 16z" fill="#2d2650" />
        <circle cx="248" cy="86" r="9" fill="none" stroke="#2d2650" strokeWidth="3" />
        <circle cx="272" cy="86" r="9" fill="none" stroke="#2d2650" strokeWidth="3" />
        <path d="M257 86h6" stroke="#2d2650" strokeWidth="3" />
        <circle cx="248" cy="87" r="3" fill="#2d2650" />
        <circle cx="272" cy="87" r="3" fill="#2d2650" />
        <circle cx="260" cy="96" r="5" fill="#e9634f" />
        <path d="M250 106q5 5 10 0t10 0" stroke="#2d2650" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M298 70q7 9 0 16-7-7 0-16z" fill="#a9d3f5" />
      </g>
    </svg>
  )
}
