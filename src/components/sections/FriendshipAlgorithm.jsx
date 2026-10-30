import { useMemo, useState } from 'react'
import { algorithm } from '../../content/content'
import Chapter from '../ui/Chapter'
import Button from '../ui/Button'

const VB = { w: 400, h: 380, cx: 200, cy: 188, r: 128 }
const VARS = algorithm.variables

const NODES = VARS.map((v, index) => {
  const angle = (-90 + index * 72) * (Math.PI / 180)
  const x = VB.cx + VB.r * Math.cos(angle)
  const y = VB.cy + VB.r * Math.sin(angle)
  // Labels sit above nodes in the top half and below nodes in the bottom half, centred,
  // so nothing can spill past the edges of the diagram on narrow screens.
  return { id: v.id, x, y, ly: y < VB.cy - 10 ? y - 30 : y + 40 }
})

const EDGES = []
for (let i = 0; i < NODES.length; i += 1) {
  for (let j = i + 1; j < NODES.length; j += 1) EDGES.push([i, j])
}

const initialValues = () => Object.fromEntries(VARS.map((v) => [v.id, v.initial]))

function readout(values) {
  const list = VARS.map((v) => ({ v, value: values[v.id] }))
  const avg = Math.round(list.reduce((sum, item) => sum + item.value, 0) / list.length)
  const lowest = list.reduce((min, item) => (item.value < min.value ? item : min))
  let text = algorithm.readouts.attention
  if (lowest.value < 25) text = lowest.v.low
  else if (avg >= 85) text = algorithm.readouts.strong
  else if (avg >= 60) text = algorithm.readouts.stable
  return { avg, text }
}

export default function FriendshipAlgorithm() {
  const [values, setValues] = useState(initialValues)
  const [selected, setSelected] = useState(null)
  const { avg, text } = useMemo(() => readout(values), [values])
  const selectedVar = VARS.find((v) => v.id === selected)

  const setValue = (id, value) => {
    setValues((prev) => ({ ...prev, [id]: value }))
    setSelected(id)
  }

  const pickNode = (id) => {
    setSelected(id)
    document.getElementById(`var-${id}`)?.focus({ preventScroll: true })
  }

  return (
    <Chapter
      id="algorithm"
      num="01"
      label="The Friendship Algorithm"
      title={algorithm.heading}
      subtitle={algorithm.subheading}
    >
      <div className="algo">
        <div className="algo__viz panel">
          <p className="algo__hint">{algorithm.instructions}</p>
          <svg className="algo__svg" viewBox={`0 0 ${VB.w} ${VB.h}`} aria-hidden="true" focusable="false">
            <defs>
              <radialGradient id="algo-core" cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="#60A5FA" stopOpacity=".95" />
                <stop offset=".6" stopColor="#2563EB" stopOpacity=".55" />
                <stop offset="1" stopColor="#2563EB" stopOpacity="0" />
              </radialGradient>
            </defs>

            {EDGES.map(([a, b]) => {
              const strength = (values[VARS[a].id] + values[VARS[b].id]) / 200
              const active = selected === VARS[a].id || selected === VARS[b].id
              return (
                <line
                  key={`${a}-${b}`}
                  className={`algo__edge ${active ? 'is-active' : ''}`}
                  x1={NODES[a].x}
                  y1={NODES[a].y}
                  x2={NODES[b].x}
                  y2={NODES[b].y}
                  style={{ strokeOpacity: 0.06 + 0.55 * strength * strength, strokeWidth: 0.6 + 1.4 * strength }}
                />
              )
            })}

            {NODES.map((node) => {
              const value = values[node.id]
              return (
                <line
                  key={`spoke-${node.id}`}
                  className={`algo__spoke ${selected === node.id ? 'is-active' : ''}`}
                  x1={VB.cx}
                  y1={VB.cy}
                  x2={node.x}
                  y2={node.y}
                  style={{ strokeOpacity: 0.1 + 0.75 * (value / 100), animationDuration: `${3.2 - value / 50}s` }}
                />
              )
            })}

            <circle cx={VB.cx} cy={VB.cy} r={34 + avg * 0.34} fill="url(#algo-core)" opacity={0.25 + avg / 160} />
            <circle className="algo__core" cx={VB.cx} cy={VB.cy} r={30} />
            <text className="algo__core-value" x={VB.cx} y={VB.cy + 6} textAnchor="middle">
              {avg}
            </text>
            <text className="algo__core-label" x={VB.cx} y={VB.cy + 20} textAnchor="middle">
              {algorithm.centerLabel.toUpperCase()}
            </text>

            {NODES.map((node, index) => {
              const value = values[node.id]
              const isSelected = selected === node.id
              return (
                <g
                  key={node.id}
                  className={`algo__node ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => pickNode(node.id)}
                >
                  <circle cx={node.x} cy={node.y} r={26} className="algo__node-hit" />
                  {isSelected && <circle cx={node.x} cy={node.y} r={14 + value * 0.1 + 7} className="algo__node-ring" />}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={10 + value * 0.1}
                    className="algo__node-dot"
                    style={{ fillOpacity: 0.3 + 0.7 * (value / 100) }}
                  />
                  <text className="algo__node-label" x={node.x} y={node.ly} textAnchor="middle">
                    {VARS[index].short}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        <div className="algo__side">
          <div className="algo__controls">
            {VARS.map((v) => {
              const value = values[v.id]
              return (
                <div key={v.id} className={`slider ${selected === v.id ? 'is-active' : ''}`}>
                  <div className="slider__row">
                    <label htmlFor={`var-${v.id}`}>{v.label}</label>
                    <output htmlFor={`var-${v.id}`} className="mono">
                      {value}
                    </output>
                  </div>
                  <input
                    id={`var-${v.id}`}
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={value}
                    onChange={(event) => setValue(v.id, Number(event.target.value))}
                    onFocus={() => setSelected(v.id)}
                    style={{ '--fill': `${value}%` }}
                    aria-describedby="algo-note"
                  />
                </div>
              )
            })}
          </div>

          <p id="algo-note" className={`algo__note ${selectedVar ? 'has-note' : ''}`} aria-live="polite">
            {selectedVar ? (
              <>
                <span className="mono">{selectedVar.label}</span>
                {selectedVar.note}
              </>
            ) : (
              algorithm.idleNote
            )}
          </p>
        </div>

        <div className="algo__result">
          <p className="formula" aria-label={`${algorithm.formulaLead} ${VARS.map((v) => v.term).join(' plus ')}`}>
            <span className="formula__lead">{algorithm.formulaLead}</span>
            {VARS.map((v, index) => (
              <span key={v.id} className="formula__part">
                <span
                  className={`formula__term ${selected === v.id ? 'is-active' : ''}`}
                  style={{ '--w': values[v.id] / 100 }}
                >
                  {v.term}
                </span>
                {index < VARS.length - 1 && <span className="formula__plus">+</span>}
              </span>
            ))}
          </p>

          <div className="readout panel">
            <div className="readout__metric">
              <span className="readout__label mono">{algorithm.readoutLabel}</span>
              <span className="readout__value">
                {avg}
                <small>/100</small>
              </span>
            </div>
            <p className="readout__text" aria-live="polite">
              {text}
            </p>
            <div className="readout__effort">
              <span className="mono">{algorithm.effortLabel}</span>
              <strong>{algorithm.effortValue}</strong>
            </div>
          </div>

          <div className="algo__foot">
            <p className="footnote">{algorithm.footnote}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setValues(initialValues())
                setSelected(null)
              }}
            >
              {algorithm.reset}
            </Button>
          </div>
        </div>
      </div>
    </Chapter>
  )
}
