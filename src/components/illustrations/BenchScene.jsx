/** Calm evening scene: two best friends side by side on a bench with tea. */
export default function BenchScene({ className = '' }) {
  return (
    <svg
      className={`illo ${className}`}
      viewBox="0 0 420 260"
      role="img"
      aria-label="Two cartoon best friends sitting side by side on a bench with tea, watching the evening sky"
    >
      <defs>
        <linearGradient id="bench-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e9e1ff" />
          <stop offset="1" stopColor="#ffe4c7" />
        </linearGradient>
      </defs>
      <rect width="420" height="260" rx="22" fill="url(#bench-sky)" />
      <circle cx="330" cy="86" r="48" fill="#ffd98a" opacity=".35" />
      <circle cx="330" cy="86" r="32" fill="#ffd98a" />
      <g fill="#fff" opacity=".9">
        <circle cx="60" cy="40" r="2.5" />
        <circle cx="110" cy="24" r="2" />
        <circle cx="250" cy="34" r="2" />
        <circle cx="390" cy="30" r="2.5" />
        <circle cx="200" cy="60" r="1.8" />
      </g>
      <g fill="#fff" opacity=".85">
        <ellipse cx="90" cy="70" rx="30" ry="12" />
        <ellipse cx="112" cy="64" rx="22" ry="12" />
        <ellipse cx="236" cy="52" rx="24" ry="10" />
        <ellipse cx="254" cy="48" rx="18" ry="10" />
      </g>
      <path d="M0 196q90-46 210-20t210 6v58H0z" fill="#cfe8d6" />
      <path d="M0 214q120-30 220-10t200 0v56H0z" fill="#bdebd2" />

      {/* bench back */}
      <rect x="92" y="120" width="236" height="14" rx="7" fill="#8b5e3c" stroke="#2d2650" strokeWidth="2" />
      <rect x="104" y="134" width="10" height="36" fill="#6f4a2e" />
      <rect x="306" y="134" width="10" height="36" fill="#6f4a2e" />

      {/* torsos */}
      <rect x="136" y="130" width="60" height="52" rx="22" fill="#c9b8f5" />
      <rect x="226" y="130" width="60" height="52" rx="22" fill="#ff8a76" />

      {/* arms */}
      <path d="M140 150q-14 6-14 18" stroke="#f3c7a6" strokeWidth="11" strokeLinecap="round" fill="none" />
      <path d="M192 150q10 10 2 22" stroke="#f3c7a6" strokeWidth="11" strokeLinecap="round" fill="none" />
      <path d="M230 150q-10 10-2 22" stroke="#f3c7a6" strokeWidth="11" strokeLinecap="round" fill="none" />
      <path d="M282 150q14 6 14 18" stroke="#f3c7a6" strokeWidth="11" strokeLinecap="round" fill="none" />

      {/* tea cups */}
      <rect x="116" y="160" width="16" height="18" rx="4" fill="#fff6e3" stroke="#2d2650" strokeWidth="2" />
      <path d="M121 154q-4-6 0-10M127 156q-4-6 0-10" stroke="#fff" strokeWidth="2" fill="none" opacity=".95" />
      <rect x="288" y="160" width="16" height="18" rx="4" fill="#fff6e3" stroke="#2d2650" strokeWidth="2" />
      <path d="M293 154q-4-6 0-10M299 156q-4-6 0-10" stroke="#fff" strokeWidth="2" fill="none" opacity=".95" />

      {/* shared snack packet */}
      <rect x="200" y="150" width="22" height="22" rx="4" fill="#ffe27a" stroke="#2d2650" strokeWidth="2" />
      <path d="M204 162q4-4 7 0t7 0" stroke="#e9634f" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* seat */}
      <rect x="84" y="168" width="252" height="16" rx="8" fill="#8b5e3c" stroke="#2d2650" strokeWidth="2" />
      <rect x="100" y="184" width="12" height="40" rx="3" fill="#6f4a2e" />
      <rect x="308" y="184" width="12" height="40" rx="3" fill="#6f4a2e" />

      {/* legs + shoes */}
      <rect x="146" y="178" width="14" height="44" rx="7" fill="#2d2650" />
      <rect x="172" y="178" width="14" height="44" rx="7" fill="#2d2650" />
      <rect x="236" y="178" width="14" height="44" rx="7" fill="#2d2650" />
      <rect x="262" y="178" width="14" height="44" rx="7" fill="#2d2650" />
      <ellipse cx="153" cy="224" rx="10" ry="5" fill="#7f66d6" />
      <ellipse cx="179" cy="224" rx="10" ry="5" fill="#7f66d6" />
      <ellipse cx="243" cy="224" rx="10" ry="5" fill="#e9634f" />
      <ellipse cx="269" cy="224" rx="10" ry="5" fill="#e9634f" />

      {/* Gayu head */}
      <circle cx="166" cy="104" r="28" fill="#f6d3b6" />
      <path d="M138 104q0-38 28-38t28 38q-7-16-28-16t-28 16z" fill="#3b2a3a" />
      <circle cx="192" cy="86" r="10" fill="#3b2a3a" />
      <circle cx="156" cy="106" r="3" fill="#2d2650" />
      <circle cx="176" cy="106" r="3" fill="#2d2650" />
      <path d="M157 117q9 7 18 0" stroke="#2d2650" strokeWidth="2.8" fill="none" strokeLinecap="round" />
      <circle cx="148" cy="114" r="4" fill="#ff8a76" opacity=".45" />
      <circle cx="184" cy="114" r="4" fill="#ff8a76" opacity=".45" />

      {/* Kamal head */}
      <circle cx="256" cy="104" r="28" fill="#f6d3b6" />
      <path d="M228 104q0-38 28-38t28 38q-7-16-28-16t-28 16z" fill="#2d2650" />
      <path d="M238 76l5-14 6 12zM252 72l4-16 5 16zM266 76l6-12 3 12z" fill="#2d2650" />
      <circle cx="246" cy="107" r="7" fill="none" stroke="#2d2650" strokeWidth="2.5" />
      <circle cx="266" cy="107" r="7" fill="none" stroke="#2d2650" strokeWidth="2.5" />
      <path d="M253 107h6" stroke="#2d2650" strokeWidth="2.5" />
      <circle cx="246" cy="108" r="2.5" fill="#2d2650" />
      <circle cx="266" cy="108" r="2.5" fill="#2d2650" />
      <circle cx="256" cy="115" r="4" fill="#e9634f" />
      <path d="M247 122q9 6 18 0" stroke="#2d2650" strokeWidth="2.8" fill="none" strokeLinecap="round" />

      {/* plants */}
      <path d="M40 236q6-20 16-24-2 16-16 24zM380 236q-6-20-16-24 2 16 16 24z" fill="#3ea87a" />
    </svg>
  )
}
