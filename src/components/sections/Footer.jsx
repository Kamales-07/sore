import { footer } from '../../content/text'
import useReducedMotion from '../../hooks/useReducedMotion'
import Button from '../ui/Button'

export default function Footer() {
  const reduced = useReducedMotion()
  const toTop = () => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })

  return (
    <footer className="footer">
      <div className="container">
        <p className="footer__line1">{footer.line1}</p>
        <p className="footer__line2">{footer.line2}</p>
        <dl className="footer__stats">
          {footer.stats.map((stat) => (
            <div className="footer__stat" key={stat.label}>
              <dd>
                <strong>{stat.value}</strong>
              </dd>
              <dt>
                <span>{stat.label}</span>
              </dt>
            </div>
          ))}
        </dl>
        <Button variant="ghost" size="sm" onClick={toTop}>
          {footer.backToTop}
        </Button>
      </div>
    </footer>
  )
}
