/*
 * Kamales, drawn as one inline SVG (viewBox 240 x 300).
 * mood: sheepish | puppy | hopeful | nervous | dizzy | sad | shocked | happy
 * pose: stand | kneel | sit
 * item: none | flag | chocolate | chocolates | biryani | sign
 */
const SKIN = '#F2C6A0'
const SKIN_SHADE = '#E2AC85'
const HAIR = '#141C33'
const HOODIE = '#2563EB'
const HOODIE_DARK = '#1D4ED8'
const JEANS = '#1E3A5F'
const INK = '#0B1324'

const EYE_L = 102
const EYE_R = 138
const EYE_Y = 98

function Eyes({ mood }) {
  if (mood === 'happy') {
    return (
      <g stroke={INK} strokeWidth="3.5" strokeLinecap="round" fill="none">
        <path d={`M${EYE_L - 8} ${EYE_Y + 2} Q${EYE_L} ${EYE_Y - 8} ${EYE_L + 8} ${EYE_Y + 2}`} />
        <path d={`M${EYE_R - 8} ${EYE_Y + 2} Q${EYE_R} ${EYE_Y - 8} ${EYE_R + 8} ${EYE_Y + 2}`} />
      </g>
    )
  }
  if (mood === 'dizzy') {
    return (
      <g stroke={INK} strokeWidth="3.2" strokeLinecap="round">
        {[EYE_L, EYE_R].map((x) => (
          <path key={x} d={`M${x - 6} ${EYE_Y - 6} l12 12 M${x + 6} ${EYE_Y - 6} l-12 12`} />
        ))}
      </g>
    )
  }
  if (mood === 'puppy') {
    return (
      <g className="kamales__eyes">
        {[EYE_L, EYE_R].map((x) => (
          <g key={x}>
            <circle cx={x} cy={EYE_Y + 1} r="12.5" fill="#fff" stroke={INK} strokeWidth="1.5" />
            <circle cx={x} cy={EYE_Y + 3} r="9" fill={INK} />
            <circle cx={x - 3.5} cy={EYE_Y - 1} r="3.4" fill="#fff" />
            <circle cx={x + 3.5} cy={EYE_Y + 6} r="1.7" fill="#fff" />
          </g>
        ))}
      </g>
    )
  }
  if (mood === 'shocked') {
    return (
      <g>
        {[EYE_L, EYE_R].map((x) => (
          <g key={x}>
            <circle cx={x} cy={EYE_Y} r="10" fill="#fff" stroke={INK} strokeWidth="1.5" />
            <circle cx={x} cy={EYE_Y} r="3" fill={INK} />
          </g>
        ))}
      </g>
    )
  }
  const dy = mood === 'sad' ? 3 : 0
  return (
    <g className="kamales__eyes">
      {[EYE_L, EYE_R].map((x) => (
        <g key={x}>
          <circle cx={x} cy={EYE_Y + dy} r="5" fill={INK} />
          <circle cx={x + 1.6} cy={EYE_Y + dy - 1.8} r="1.6" fill="#fff" />
        </g>
      ))}
    </g>
  )
}

function Brows({ mood }) {
  if (mood === 'dizzy') return null
  const raised = mood === 'hopeful' || mood === 'shocked' || mood === 'happy'
  const d = raised
    ? [`M92 80 Q101 71 111 77`, `M148 80 Q139 71 129 77`]
    : mood === 'sad'
      ? [`M92 84 L110 80`, `M148 84 L130 80`]
      : [`M92 87 L111 79`, `M148 87 L129 79`]
  return (
    <g stroke={HAIR} strokeWidth="3.6" strokeLinecap="round" fill="none">
      <path d={d[0]} />
      <path d={d[1]} />
    </g>
  )
}

function Mouth({ mood }) {
  const stroke = { stroke: INK, strokeWidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' }
  switch (mood) {
    case 'happy':
      return (
        <g>
          <path d="M103 115 Q120 142 137 115 Z" fill={INK} />
          <path d="M111 127 Q120 135 129 127 Q120 122 111 127 Z" fill="#F87171" />
        </g>
      )
    case 'puppy':
      return <ellipse cx="120" cy="125" rx="4" ry="5" fill={INK} />
    case 'hopeful':
      return <path d="M108 120 Q120 132 132 120" {...stroke} />
    case 'nervous':
      return <path d="M105 124 l5 -4 l5 4 l5 -4 l5 4 l5 -4" {...stroke} strokeWidth={2.6} />
    case 'dizzy':
      return <path d="M106 124 q4 -5 8 0 t8 0 t8 0" {...stroke} />
    case 'shocked':
      return <ellipse cx="120" cy="125" rx="7" ry="9" fill={INK} />
    case 'sad':
      return <path d="M108 129 Q120 119 132 129" {...stroke} />
    default:
      return <path d="M110 124 q5 -4 10 0 t10 0" {...stroke} />
  }
}

function Extras({ mood }) {
  const blush = ['sheepish', 'puppy', 'happy', 'hopeful'].includes(mood)
  return (
    <g>
      {blush && (
        <g fill="#F87171" opacity=".35">
          <ellipse cx="89" cy="113" rx="8" ry="5" />
          <ellipse cx="151" cy="113" rx="8" ry="5" />
        </g>
      )}
      {(mood === 'puppy' || mood === 'sad') && (
        <path className="kamales__tear" d="M151 107 q6 9 0 13 q-6 -4 0 -13z" fill="#93C5FD" />
      )}
      {mood === 'nervous' && <path className="kamales__sweat" d="M168 62 q7 11 0 16 q-7 -5 0 -16z" fill="#93C5FD" />}
      {mood === 'dizzy' && (
        <g className="kamales__stars" fill="#FDE68A">
          <path d="M66 46l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
          <path d="M172 38l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
          <path d="M120 22l2.5 5.5 5.5 2.5-5.5 2.5-2.5 5.5-2.5-5.5-5.5-2.5 5.5-2.5z" />
        </g>
      )}
      {mood === 'happy' && (
        <g fill="#FDE68A">
          <path d="M58 60l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
          <path d="M182 56l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
        </g>
      )}
    </g>
  )
}

function Head({ mood }) {
  return (
    <g>
      <rect x="110" y="132" width="20" height="16" fill={SKIN_SHADE} />
      <circle cx="70" cy="98" r="10" fill={SKIN} />
      <circle cx="170" cy="98" r="10" fill={SKIN} />
      <circle cx="120" cy="92" r="50" fill={SKIN} />
      <path
        d="M68 92 C66 50 96 34 122 36 C152 38 174 58 172 92 C164 72 150 64 132 66 C124 58 108 58 100 66 C88 66 74 76 68 92 Z"
        fill={HAIR}
      />
      <path d="M94 46 L102 22 L113 41 Z M112 39 L124 14 L134 38 Z M131 41 L149 24 L151 48 Z" fill={HAIR} />
      <Brows mood={mood} />
      <Eyes mood={mood} />
      <Mouth mood={mood} />
      <Extras mood={mood} />
    </g>
  )
}

function Torso() {
  return (
    <g>
      <path d="M74 178 Q74 142 106 140 H134 Q166 142 166 178 V236 Q166 244 158 244 H82 Q74 244 74 236 Z" fill={HOODIE} />
      <path d="M96 142 Q120 162 144 142" stroke={HOODIE_DARK} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M112 152 v16 M128 152 v16" stroke="#DBEAFE" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M94 214 H146 V230 Q120 236 94 230 Z" fill={HOODIE_DARK} opacity=".55" />
    </g>
  )
}

function Arms({ item, mood }) {
  const arm = { stroke: HOODIE, strokeWidth: 17, strokeLinecap: 'round', fill: 'none' }
  if (mood === 'happy') {
    return (
      <g>
        <path d="M82 162 Q58 138 52 104" {...arm} />
        <path d="M158 162 Q182 138 188 104" {...arm} />
        <circle cx="52" cy="100" r="10" fill={SKIN} />
        <circle cx="188" cy="100" r="10" fill={SKIN} />
      </g>
    )
  }
  if (item === 'flag') {
    return (
      <g>
        <path d="M82 162 Q70 198 86 222" {...arm} />
        <circle cx="87" cy="225" r="10" fill={SKIN} />
        <path d="M188 120 V34" stroke="#CBD5E1" strokeWidth="3.5" strokeLinecap="round" />
        <path className="kamales__flag" d="M188 36 Q206 30 224 40 Q208 48 224 60 Q206 52 188 58 Z" fill="#F8FAFC" />
        <path d="M158 162 Q182 144 188 108" {...arm} />
        <circle cx="188" cy="106" r="10" fill={SKIN} />
      </g>
    )
  }
  // hands clasped at the chest: the classic sorry pose
  return (
    <g>
      <path d="M82 162 Q72 198 108 196" {...arm} />
      <path d="M158 162 Q168 198 132 196" {...arm} />
      <circle cx="112" cy="195" r="10" fill={SKIN} />
      <circle cx="128" cy="195" r="10" fill={SKIN} />
    </g>
  )
}

function ChocolateBar({ x = 0, y = 0, rotate = 0 }) {
  return (
    <g transform={`translate(${120 + x} ${190 + y}) rotate(${rotate})`}>
      <rect x="-25" y="-14" width="50" height="28" rx="3" fill="#6B3E26" />
      <path d="M-12 -14 V14 M1 -14 V14 M-25 0 H25" stroke="#4A2A1A" strokeWidth="1.5" />
      <rect x="10" y="-14" width="15" height="28" rx="2" fill="#CBD5E1" />
      <rect x="-25" y="-14" width="10" height="28" fill={HOODIE} opacity=".9" />
    </g>
  )
}

function Item({ item }) {
  switch (item) {
    case 'chocolate':
      return <ChocolateBar rotate={-8} />
    case 'chocolates':
      return (
        <g>
          <ChocolateBar x={-10} y={-6} rotate={-16} />
          <ChocolateBar x={10} y={4} rotate={10} />
        </g>
      )
    case 'biryani':
      return (
        <g>
          <g className="kamales__steam" stroke="#DBEAFE" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity=".7">
            <path d="M108 166 q-6 -8 0 -16 q6 -8 0 -16" />
            <path d="M122 164 q-6 -8 0 -16 q6 -8 0 -16" />
            <path d="M136 166 q-6 -8 0 -16 q6 -8 0 -16" />
          </g>
          <path d="M90 186 Q120 168 150 186 Z" fill="#FCD34D" />
          <g fill="#FDE68A">
            <circle cx="106" cy="181" r="2" />
            <circle cx="118" cy="177" r="2" />
            <circle cx="131" cy="180" r="2" />
          </g>
          <path d="M126 176 q6 -6 12 -2 q-6 6 -12 2z" fill="#22C55E" />
          <path d="M86 186 H154 Q150 214 120 214 Q90 214 86 186 Z" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="2" />
          <path d="M96 196 H144" stroke="#2563EB" strokeWidth="2" opacity=".6" />
        </g>
      )
    default:
      return null
  }
}

function Legs({ pose }) {
  if (pose === 'kneel') {
    return (
      <g>
        <rect x="86" y="262" width="30" height="24" rx="11" fill={JEANS} />
        <rect x="124" y="262" width="30" height="24" rx="11" fill={JEANS} />
      </g>
    )
  }
  if (pose === 'sit') {
    return (
      <g>
        <path d="M70 282 Q120 262 168 280" stroke={JEANS} strokeWidth="22" strokeLinecap="round" fill="none" />
        <path d="M76 274 Q124 294 172 282" stroke="#183153" strokeWidth="20" strokeLinecap="round" fill="none" />
        <ellipse cx="62" cy="283" rx="12" ry="8" fill="#F8FAFC" />
        <ellipse cx="180" cy="280" rx="12" ry="8" fill="#F8FAFC" />
      </g>
    )
  }
  return (
    <g>
      <rect x="92" y="236" width="22" height="48" rx="10" fill={JEANS} />
      <rect x="126" y="236" width="22" height="48" rx="10" fill={JEANS} />
      <ellipse cx="101" cy="286" rx="16" ry="7" fill="#F8FAFC" stroke="#93C5FD" />
      <ellipse cx="139" cy="286" rx="16" ry="7" fill="#F8FAFC" stroke="#93C5FD" />
    </g>
  )
}

function Sign({ text }) {
  return (
    <g>
      <path d="M206 196 V290" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
      <rect x="170" y="150" width="68" height="54" rx="6" fill="#F8FAFC" stroke="#93C5FD" strokeWidth="2" />
      <text x="204" y="172" textAnchor="middle" className="kamales__sign-title">
        WAITING…
      </text>
      <text x="204" y="194" textAnchor="middle" className="kamales__sign-time">
        {text}
      </text>
    </g>
  )
}

export default function Kamales({ mood = 'sheepish', pose = 'stand', item = 'none', signText = '', glitch = false, className = '' }) {
  const lift = pose === 'kneel' ? 26 : pose === 'sit' ? 46 : 0
  const classes = ['kamales', `kamales--${mood}`, `kamales--${pose}`, glitch ? 'is-glitch' : '', className].filter(Boolean).join(' ')

  return (
    <svg className={classes} viewBox="0 0 240 300" aria-hidden="true" focusable="false">
      <ellipse cx="120" cy="291" rx="74" ry="8" fill="rgba(0,0,0,.35)" />
      {item === 'sign' && <Sign text={signText} />}
      {pose !== 'sit' && <Legs pose={pose} />}
      <g transform={`translate(0 ${lift})`}>
        <g className="kamales__body">
          <Torso />
          <Head mood={mood} />
          <Arms item={item} mood={mood} />
          {mood !== 'happy' && <Item item={item} />}
        </g>
      </g>
      {pose === 'sit' && <Legs pose={pose} />}
    </svg>
  )
}
