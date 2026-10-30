import { site } from '../../content/content'
import useReducedMotion from '../../hooks/useReducedMotion'
import Button from '../ui/Button'
import Icon from '../ui/Icon'
import Waves from '../ui/Waves'
import EasterEgg from './EasterEgg'

export default function Footer() {
  const reduced = useReducedMotion()
  return (
    <footer className="footer">
      <Waves className="footer__waves" />
      <div className="container footer__inner">
        <p className="footer__mark">
          <span>{site.wordmark}</span>
          <EasterEgg />
        </p>
        <p className="footer__credit">{site.credit}</p>
        <p className="footer__privacy">{site.privacy}</p>
        <Button variant="ghost" size="sm" onClick={() => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })}>
          <Icon name="up" />
          {site.backToTop}
        </Button>
      </div>
    </footer>
  )
}
