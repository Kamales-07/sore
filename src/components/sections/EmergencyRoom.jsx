import { emergency } from '../../content/text'
import Section from '../ui/Section'

export default function EmergencyRoom() {
  return (
    <Section id="emergency" tone="coral" eyebrow="Section 9 · Fictional hospital" title={emergency.heading}>
      <div className="er">
        <div className="card er__chart">
          <span className="er__ward">{emergency.ward}</span>
          <dl>
            {emergency.chart.map((row) => (
              <div className="er__row" key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
          <svg className="ecg" viewBox="0 0 600 100" aria-hidden="true" focusable="false">
            <path d="M0 50H80l10 0 8-32 10 60 8-28H200l10 0 8-32 10 60 8-28H320l10 0 8-32 10 60 8-28H440l10 0 8-32 10 60 8-28H600" />
          </svg>
          <div className="vitals">
            {emergency.vitals.map((vital) => (
              <div className="vital" key={vital.label}>
                <div className="vital__value">{vital.value}</div>
                <div className="vital__label">{vital.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>{emergency.symptomsTitle} 🤒</h3>
          <ul className="er__list er__list--symptoms">
            {emergency.symptoms.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h3>{emergency.treatmentTitle} 💊</h3>
          <ol className="er__list er__list--treatment">
            {emergency.treatment.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>

        <p className="er__disclaimer">{emergency.disclaimer}</p>
      </div>
    </Section>
  )
}
