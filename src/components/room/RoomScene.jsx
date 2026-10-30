/*
 * The Blue Room, drawn as one inline SVG (viewBox 600 x 400).
 * Interactive hotspots are separate HTML buttons layered on top (see BlueRoomGame).
 */
const BOOK_COLORS = ['#173B66', '#1E3A5F', '#24507F', '#16304F', '#2B4C73', '#1B436E']

const shelfRows = [
  { base: 128, books: [10, 14, 9, 12, 11, 8, 13] },
  { base: 186, books: [12, 9, 'blue', 11, 14, 10] },
  { base: 244, books: [9, 13, 10, 12, 9, 15] },
]

function Books() {
  return shelfRows.map((row, r) => {
    let x = 37
    return row.books.map((w, i) => {
      const isBlue = w === 'blue'
      const width = isBlue ? 13 : w
      const height = isBlue ? 50 : 34 + ((i * 7 + r * 5) % 16)
      const y = row.base - height - (isBlue ? 0 : 0)
      const node = isBlue ? (
        <g key={`${r}-${i}`} className="room-bluebook">
          <rect x={x - 1} y={y - 3} width={width + 2} height={height + 3} rx="1.5" fill="#3B82F6" />
          <rect x={x + 2} y={y + 6} width={width - 4} height="2" fill="#DBEAFE" opacity=".8" />
          <rect x={x + 2} y={y + height - 10} width={width - 4} height="2" fill="#DBEAFE" opacity=".8" />
        </g>
      ) : (
        <rect
          key={`${r}-${i}`}
          x={x}
          y={y}
          width={width}
          height={height}
          rx="1.5"
          fill={BOOK_COLORS[(i + r * 2) % BOOK_COLORS.length]}
          stroke="rgba(96,165,250,.18)"
          strokeWidth="0.8"
        />
      )
      x += width + 1.5
      return node
    })
  })
}

export default function RoomScene({ lampOn, unlocked, doorOpen }) {
  const classes = ['room-svg', lampOn ? 'is-lit' : 'is-dark', unlocked ? 'is-unlocked' : '', doorOpen ? 'is-open' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <svg className={classes} viewBox="0 0 600 400" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="room-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14365F" />
          <stop offset="1" stopColor="#0E2747" />
        </linearGradient>
        <linearGradient id="room-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0B1D35" />
          <stop offset="1" stopColor="#081426" />
        </linearGradient>
        <linearGradient id="room-lamp-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#DBEAFE" stopOpacity=".55" />
          <stop offset="1" stopColor="#DBEAFE" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="room-door" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2563EB" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="room-exit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F8FAFC" />
          <stop offset="1" stopColor="#60A5FA" />
        </linearGradient>
        <radialGradient id="room-spill" cx="50%" cy="0%" r="100%">
          <stop offset="0" stopColor="#DBEAFE" stopOpacity=".5" />
          <stop offset="1" stopColor="#DBEAFE" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* wall + floor */}
      <rect width="600" height="300" fill="url(#room-wall)" />
      <g stroke="rgba(96,165,250,.06)" strokeWidth="1">
        <line x1="150" y1="0" x2="150" y2="300" />
        <line x1="450" y1="0" x2="450" y2="300" />
      </g>
      <rect y="300" width="600" height="100" fill="url(#room-floor)" />
      <g stroke="rgba(96,165,250,.07)" strokeWidth="1">
        {[0, 75, 150, 225, 300, 375, 450, 525, 600].map((x) => (
          <line key={x} x1={x} y1="300" x2={300 + (x - 300) * 1.7} y2="400" />
        ))}
      </g>
      <line x1="0" y1="300" x2="600" y2="300" stroke="rgba(96,165,250,.28)" strokeWidth="1.5" />
      <ellipse cx="300" cy="352" rx="150" ry="22" fill="#102A43" stroke="rgba(96,165,250,.18)" />

      {/* poster */}
      <g>
        <rect x="378" y="58" width="62" height="84" rx="3" fill="#0B1D35" stroke="rgba(96,165,250,.3)" />
        <path d="M384 112c8-6 16-6 25 0s17 6 25 0" fill="none" stroke="#2563EB" strokeWidth="2" />
        <path d="M384 122c8-6 16-6 25 0s17 6 25 0" fill="none" stroke="#60A5FA" strokeWidth="2" opacity=".6" />
        <circle cx="420" cy="80" r="7" fill="#DBEAFE" opacity=".8" />
      </g>

      {/* bookshelf */}
      <g>
        <rect x="30" y="70" width="100" height="228" rx="3" fill="#0C223F" stroke="#1E4A7A" strokeWidth="2" />
        <Books />
        {[128, 186, 244].map((y) => (
          <rect key={y} x="31" y={y} width="98" height="4" fill="#1E4A7A" />
        ))}
        <rect x="40" y="262" width="34" height="8" rx="1" fill="#1E3A5F" />
        <rect x="42" y="270" width="30" height="8" rx="1" fill="#24507F" />
        <rect x="38" y="278" width="36" height="8" rx="1" fill="#16304F" />
        <path d="M100 286c0-12 4-18 10-22-2 8 0 14 6 22z" fill="#1E4A7A" />
        <rect x="96" y="284" width="20" height="12" rx="2" fill="#24507F" />
      </g>

      {/* clock */}
      <g>
        <rect x="250" y="50" width="100" height="44" rx="8" fill="#050E1C" stroke="#2563EB" strokeWidth="2" />
        <text x="296" y="81" textAnchor="middle" className="room-clock__digits">
          02<tspan className="room-clock__colon">:</tspan>47
        </text>
        <text x="336" y="64" textAnchor="middle" className="room-clock__ampm">
          AM
        </text>
      </g>

      {/* hidden note */}
      <g className="room-note" transform="rotate(-4 195 118)">
        <rect x="174" y="98" width="42" height="40" rx="2" fill="#DBEAFE" />
        <path d="M180 110h30M180 117h26M180 124h28M180 131h18" stroke="#102A43" strokeWidth="1.6" strokeLinecap="round" opacity=".55" />
        <circle cx="195" cy="101" r="2.5" fill="#2563EB" />
      </g>

      {/* desk */}
      <g>
        <rect x="165" y="228" width="270" height="10" rx="2" fill="#1B3F69" />
        <rect x="178" y="238" width="10" height="62" fill="#132F52" />
        <rect x="412" y="238" width="10" height="62" fill="#132F52" />
        <rect x="335" y="238" width="80" height="38" rx="2" fill="#163759" stroke="#1E4A7A" />
        <rect x="365" y="254" width="20" height="3" rx="1.5" fill="#60A5FA" opacity=".5" />
        <rect x="374" y="212" width="14" height="16" rx="2" fill="#2563EB" />
        <path d="M388 216h3a3 3 0 0 1 0 6h-3" fill="none" stroke="#2563EB" strokeWidth="2" />
      </g>

      {/* computer */}
      <g className="room-computer">
        <rect x="258" y="150" width="104" height="66" rx="5" fill="#0A1A30" stroke="#2B5A8F" strokeWidth="2" />
        <rect className="room-computer__screen" x="264" y="156" width="92" height="54" rx="2" />
        <g className="room-computer__code" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round">
          <path d="M270 166h30M270 174h46M276 182h36M276 190h24M270 198h40" />
        </g>
        <rect x="304" y="216" width="12" height="9" fill="#1E4A7A" />
        <rect x="288" y="224" width="44" height="4" rx="2" fill="#2B5A8F" />
      </g>

      {/* lamp */}
      <g className="room-lamp">
        <polygon className="room-lamp__cone" points="212,170 242,176 300,228 176,228" fill="url(#room-lamp-glow)" />
        <rect x="186" y="222" width="34" height="6" rx="3" fill="#2B5A8F" />
        <path d="M203 222 196 186 220 164" stroke="#2B5A8F" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M212 150 246 160 238 178 206 168Z" fill="#2563EB" stroke="#60A5FA" strokeWidth="1.5" strokeLinejoin="round" />
        <circle className="room-lamp__bulb" cx="224" cy="174" r="4" />
      </g>

      {/* door */}
      <g>
        <rect x="470" y="96" width="92" height="204" fill="#050E1C" />
        <rect className="room-door__light" x="472" y="98" width="88" height="202" fill="url(#room-exit)" />
        <polygon className="room-door__spill" points="472,300 560,300 600,400 420,400" fill="url(#room-spill)" />
        <g className="room-door__panel">
          <rect x="472" y="98" width="88" height="202" fill="url(#room-door)" stroke="rgba(96,165,250,.35)" />
          <rect x="482" y="110" width="68" height="78" rx="3" fill="none" stroke="rgba(219,234,254,.18)" />
          <rect x="482" y="200" width="68" height="88" rx="3" fill="none" stroke="rgba(219,234,254,.18)" />
          <rect x="539" y="170" width="16" height="24" rx="3" fill="#081426" stroke="rgba(96,165,250,.5)" />
          <circle className="room-door__led" cx="547" cy="178" r="3" />
          <circle cx="547" cy="188" r="2" fill="#1E4A7A" />
          <circle cx="548" cy="214" r="4" fill="#DBEAFE" />
        </g>
        <rect x="466" y="92" width="100" height="208" fill="none" stroke="#1E4A7A" strokeWidth="4" />
      </g>

      {/* darkness, then things that still glow in the dark */}
      <rect className="room-dark" width="600" height="400" fill="#020812" />
      <g className="room-glow">
        <text x="296" y="81" textAnchor="middle" className="room-clock__digits">
          02<tspan className="room-clock__colon">:</tspan>47
        </text>
        <circle className="room-lamp-hint" cx="226" cy="166" r="16" />
      </g>
      <g className="room-exit-sign">
        <rect x="492" y="70" width="48" height="16" rx="3" fill="#061024" stroke="#60A5FA" strokeOpacity=".7" />
        <text x="516" y="82" textAnchor="middle">
          EXIT
        </text>
      </g>
    </svg>
  )
}
