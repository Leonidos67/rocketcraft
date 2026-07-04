import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Instagram,
  Linkedin,
  Send,
} from 'lucide-react';
import FooterPartners from '@/components/FooterPartners';
import FooterFaq from '@/components/FooterFaq';

interface FooterServiceCard {
  label: string;
  to: string;
  iconSvg: 'automation' | 'bots' | 'integrations' | 'analytics' | 'crm';
  bgLetter: string;
}

const serviceCards: FooterServiceCard[] = [
  {
    label: 'Автоматизация',
    to: '/services/automation',
    iconSvg: 'automation',
    bgLetter: 'A',
  },
  {
    label: 'Боты',
    to: '/services/bots',
    iconSvg: 'bots',
    bgLetter: 'G',
  },
  {
    label: 'Интеграции',
    to: '/services/integrations',
    iconSvg: 'integrations',
    bgLetter: 'Y',
  },
  {
    label: 'AI и аналитика',
    to: '/services/ai',
    iconSvg: 'analytics',
    bgLetter: 'R',
  },
  {
    label: 'CRM',
    to: '/services/crm',
    iconSvg: 'crm',
    bgLetter: 'A',
  },
];

const footerSvgIcons = {
  automation: () => (
  <svg
    className="site-footer__card-icon"
    width="492"
    height="512"
    viewBox="0 0 492 512"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <g fill="currentColor" fillOpacity="1">
      <path d="M 126 186 L 246 186 L 246 186 L 246 286 A 100 100 0 0 1 146 386 L 146 386 A 100 100 0 0 1 26 286 L 26 286 A 100 100 0 0 1 126 186 Z" />
      <path d="M 46 266 L 246 266 L 246 266 L 246 466 A 20 20 0 0 1 226 486 L 46 486 A 20 20 0 0 1 26 466 L 26 286 A 20 20 0 0 1 46 266 Z" />
      <path d="M 346 136 L 366 136 A 100 100 0 0 1 466 236 L 466 236 A 100 100 0 0 1 366 336 L 246 336 L 246 336 L 246 236 A 100 100 0 0 1 346 136 Z" />
      <path d="M 266 26 L 446 26 A 20 20 0 0 1 466 46 L 466 226 A 20 20 0 0 1 446 246 L 246 246 L 246 246 L 246 46 A 20 20 0 0 1 266 26 Z" />
      <path d="M 246 456 C 246 366 270 336 366 336 H 246 Z" />
      <path d="M 246 266 C 246 251 250 246 266 246 H 246 Z" />
      <path d="M 246 356 C 246 341 250 336 266 336 H 246 Z" />
      <path d="M 246 66 C 246 156 222 186 126 186 H 246 Z" />
      <path d="M 246 246 C 246 261 242 266 226 266 H 246 Z" />
      <path d="M 246 166 C 246 181 242 186 226 186 H 246 Z" />
    </g>
  </svg>
  ),
  bots: () => (
    <svg
      className="site-footer__card-icon"
      width="952"
      height="602"
      viewBox="0 0 952 602"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g fill="currentColor" fillOpacity="1">
        <path d="M 141 26 L 141 26 A 115 115 0 0 1 256 141 L 256 461 A 115 115 0 0 1 141 576 L 146 576 A 115 115 0 0 1 26 461 L 26 141 A 115 115 0 0 1 141 26 Z" />
        <path d="M 296 446 L 606 446 A 20 20 0 0 1 626 466 L 626 536 A 20 20 0 0 1 606 556 L 296 556 A 20 20 0 0 1 276 536 L 276 466 A 20 20 0 0 1 296 446 Z" />
        <path d="M 146 26 L 806 26 A 120 120 0 0 1 926 146 L 926 156 A 120 120 0 0 1 806 276 L 146 276 A 120 120 0 0 1 26 156 L 26 146 A 120 120 0 0 1 146 26 Z" />
        <path d="M 296 296 L 726 296 A 20 20 0 0 1 746 316 L 746 406 A 20 20 0 0 1 726 426 L 296 426 A 20 20 0 0 1 276 406 L 276 316 A 20 20 0 0 1 296 296 Z" />
      </g>
    </svg>
  ),
  integrations: () => (
    <svg
      className="site-footer__card-icon"
      width="502"
      height="502"
      viewBox="0 0 502 502"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g fill="currentColor" fillOpacity="1">
        <path d="M 136 26 L 136 26 A 110 110 0 0 1 246 136 L 246 136 A 110 110 0 0 1 136 246 L 146 246 A 110 110 0 0 1 26 136 L 26 136 A 110 110 0 0 1 136 26 Z" />
        <path d="M 366 26 L 366 26 A 110 110 0 0 1 476 136 L 476 136 A 110 110 0 0 1 366 246 L 376 246 A 110 110 0 0 1 256 136 L 256 136 A 110 110 0 0 1 366 26 Z" />
        <path d="M 136 256 L 136 256 A 110 110 0 0 1 246 366 L 246 366 A 110 110 0 0 1 136 476 L 146 476 A 110 110 0 0 1 26 366 L 26 366 A 110 110 0 0 1 136 256 Z" />
        <path d="M 366 256 L 366 256 A 110 110 0 0 1 476 366 L 476 366 A 110 110 0 0 1 366 476 L 376 476 A 110 110 0 0 1 256 366 L 256 366 A 110 110 0 0 1 366 256 Z" />
      </g>
    </svg>
  ),
  analytics: () => (
    <svg
      className="site-footer__card-icon"
      width="332"
      height="412"
      viewBox="0 0 332 412"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g fill="currentColor" fillOpacity="1">
        <path d="M 56 146 L 276 146 A 30 30 0 0 1 306 176 L 306 236 A 30 30 0 0 1 276 266 L 56 266 A 30 30 0 0 1 26 236 L 26 176 A 30 30 0 0 1 56 146 Z" />
        <path d="M 136 26 L 196 26 A 30 30 0 0 1 226 56 L 226 146 L 226 146 L 106 146 L 106 146 L 106 56 A 30 30 0 0 1 136 26 Z" />
        <path d="M 106 266 L 226 266 L 226 266 L 226 356 A 30 30 0 0 1 196 386 L 136 386 A 30 30 0 0 1 106 356 L 106 266 L 106 266 Z" />
        <path d="M 106 116 C 106 138.5 100 146 76 146 H 106 Z" />
        <path d="M 226 116 C 226 138.5 232 146 256 146 H 226 Z" />
        <path d="M 106 296 C 106 273.5 100 266 76 266 H 106 Z" />
        <path d="M 226 296 C 226 273.5 232 266 256 266 H 226 Z" />
      </g>
    </svg>
  ),
  crm: () => (
    <svg
      className="site-footer__card-icon"
      width="502"
      height="352"
      viewBox="0 0 502 352"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g fill="currentColor" fillOpacity="1">
        <path d="M 52 26 L 150 26 A 26 26 0 0 1 176 52 L 176 166 L 176 166 L 52 166 A 26 26 0 0 1 26 140 L 26 52 A 26 26 0 0 1 52 26 Z" />
        <path d="M 176 106 L 300 106 A 26 26 0 0 1 326 132 L 326 246 L 326 246 L 202 246 A 26 26 0 0 1 176 220 L 176 106 L 176 106 Z" />
        <path d="M 326 186 L 450 186 A 26 26 0 0 1 476 212 L 476 300 A 26 26 0 0 1 450 326 L 352 326 A 26 26 0 0 1 326 300 L 326 186 L 326 186 Z" />
        <path d="M 176 80 C 176 99.5 181.2 106 202 106 H 176 Z" />
        <path d="M 176 192 C 176 172.5 170.8 166 150 166 H 176 Z" />
        <path d="M 326 160 C 326 179.5 331.2 186 352 186 H 326 Z" />
        <path d="M 326 272 C 326 252.5 320.8 246 300 246 H 326 Z" />
      </g>
    </svg>
  ),
} as const;

const navLinks = [
  { label: 'Кейсы', to: '/cases' },
  { label: 'Услуги', to: '/services' },
  { label: 'Процесс', to: '/process' },
  { label: 'Команда', to: '/team' },
  { label: 'Блог', href: 'https://blog.agyra.ru' },
  { label: 'Контакты', to: '/contacts' },
];

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-container site-footer__panels">
        <FooterPartners />
        <FooterFaq />
      </div>

      <div className="site-footer__core">
        <div className="site-footer__cards-wrap">
          <ul className="site-footer__cards" role="list">
            {serviceCards.map((card) => (
              <li key={card.label}>
                <Link to={card.to} className="site-footer__card">
                  <span className="site-footer__card-bg-letter" aria-hidden="true">
                    {card.bgLetter}
                  </span>
                  {footerSvgIcons[card.iconSvg]()}
                  <span className="site-footer__card-label">{card.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="site-footer__shell">
          <div className="site-footer__main">
            <div className="site-footer__aside">
              <p className="site-footer__aside-label">Agyra is powered by IX.Studio</p>
              <a
                href="https://ixora-studio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="site-footer__aside-link"
              >
                IXORA STUDIO
                <ArrowUpRight className="site-footer__aside-arrow" aria-hidden="true" />
              </a>
            </div>

            <nav className="site-footer__nav" aria-label="Навигация в подвале">
              <ul role="list">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    {'href' in link ? (
                      <a href={link.href} className="site-footer__nav-link">
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.to} className="site-footer__nav-link">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="site-footer__contact">
              {/* <a href="mailto:hello@agyra.ru" className="site-footer__contact-line">
                hello@agyra.ru
              </a> */}
              <a href="tel:+79303811111" className="site-footer__contact-line">
                +7 (930) 381-11-11
              </a>
              <address className="site-footer__address">
                <span>Agyra</span>
                <span>Автоматизация и ИИ для бизнеса</span>
                <span>Россия</span>
              </address>

              <div className="site-footer__socials">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer__social"
                  aria-label="Instagram"
                >
                  <Instagram aria-hidden="true" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer__social"
                  aria-label="LinkedIn"
                >
                  <Linkedin aria-hidden="true" />
                </a>
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer__social"
                  aria-label="Telegram"
                >
                  <Send aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
          <div className="site-footer__bottom">
            <div className="site-footer__legal">
              <Link to="/privacy-policy" className="site-footer__legal-link">
                Политика конфиденциальности
              </Link>
              <Link to="/privacy-policy" className="site-footer__legal-link">
                Условия использования
              </Link>
            </div>

            <div className="site-footer__credits">
              <span>Дизайн: Ixora Studio</span>
              <span>© {new Date().getFullYear()} Agyra</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
