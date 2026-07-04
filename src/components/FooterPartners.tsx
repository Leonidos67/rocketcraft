import type { ReactNode } from 'react';

interface PartnerLogo {
  id: string;
  name: string;
  icon: ReactNode;
}

const partnerLogos: PartnerLogo[] = [
  {
    id: 'bitrix24',
    name: 'Bitrix24',
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <rect x="4" y="8" width="10" height="16" rx="2" fill="currentColor" />
        <rect x="18" y="4" width="10" height="10" rx="2" fill="currentColor" opacity="0.55" />
        <rect x="18" y="18" width="10" height="10" rx="2" fill="currentColor" opacity="0.35" />
      </svg>
    ),
  },
  {
    id: 'amocrm',
    name: 'amoCRM',
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="16" cy="16" r="4" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          d="M27 7L4 15.5l7.2 2.4L21 12l-7.8 8.4v5.1l3.4-3.3 6.6 4.9L27 7z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: 'make',
    name: 'Make',
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M6 22V10h5l5 7 5-7h5v12h-4.5V16l-4.5 6.5L7.5 16v6H6z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'n8n',
    name: 'n8n',
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="9" cy="16" r="4" fill="currentColor" />
        <circle cx="23" cy="9" r="4" fill="currentColor" opacity="0.55" />
        <circle cx="23" cy="23" r="4" fill="currentColor" opacity="0.35" />
        <path d="M13 15h6M19 12v6" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'roistat',
    name: 'Roistat',
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M6 24V12h4v12H6zm7-8v8h4V10h-4v6zm7 4v4h4V8h-4v12z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: '1c',
    name: '1С',
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <rect x="5" y="5" width="22" height="22" rx="3" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path d="M11 21V11h4.5c3 0 4.5 1.4 4.5 3.6S18.5 18 15.5 18H14v3h-3z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'tilda',
    name: 'Tilda',
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M8 8h16v4H20v12h-4V12H8V8z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          d="M16 5c-6.1 0-11 4.6-11 10.3 0 3.2 1.7 6.1 4.4 8L8 27l3.8-1.2c1.1.3 2.2.5 3.4.5 6.1 0 11-4.6 11-10.3S22.1 5 16 5zm6.2 14.2c-.3.8-1.5 1.5-2.1 1.6-.5.1-1.2.1-2-.4-.5-.3-1.1-.7-1.9-1.3-3.4-2.8-5.6-6.5-5.8-6.8-.2-.3-1.4-1.8-1.4-3.5s.9-2.5 1.2-2.8c.3-.4.7-.5.9-.5h.7c.2 0 .5-.1.8.6.3.7 1 2.5 1.1 2.7.1.2.1.4 0 .6-.1.2-.1.3-.3.5-.1.1-.3.3-.4.4-.1.1-.3.3-.1.6.2.3.8 1.4 1.8 2.2 1.2 1 2.2 1.3 2.5 1.5.3.1.5.1.7-.1.2-.2.8-1 1-1.3.2-.4.5-.3.8-.2.3.1 2 1 2.3 1.1.3.2.5.3.6.4.1.2.1 1-.2 1.8z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: 'yandex',
    name: 'Яндекс',
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M18.5 6H23v14.5c0 4-2.5 6-6.2 6-3.4 0-5.5-1.4-6.8-3.5l3.2-2.4c.8 1.2 1.9 2 3.5 2 2.1 0 3.3-1.3 3.3-3.8V6zM9 6h4.5v20H9V6z" fill="currentColor" />
      </svg>
    ),
  },
];

type GridSlot = {
  partnerIndex: number | null;
  highlight?: boolean;
};

const gridLayout: GridSlot[] = [
  { partnerIndex: 0, highlight: true },
  { partnerIndex: 1 },
  { partnerIndex: 2 },
  { partnerIndex: null },
  { partnerIndex: 3 },
  { partnerIndex: 4 },
  { partnerIndex: 5 },
  { partnerIndex: 6 },
  { partnerIndex: null },
  { partnerIndex: 7 },
  { partnerIndex: 8 },
  { partnerIndex: 9 },
];

const FooterPartners = () => (
  <section
    className="site-section site-footer-partners"
    aria-labelledby="footer-partners-title"
  >
    <header className="site-footer-partners__header">
      <h2 id="footer-partners-title" className="site-footer-partners__title">
        <span>Нам доверяют</span>
        <span>ведущие компании и партнёры</span>
      </h2>
      <p className="site-footer-partners__lead">
        За годы работы мы выстроили партнёрства с сильными брендами — это даёт
        клиентам надёжный сервис и проверенные решения.
      </p>
    </header>

    <div className="site-footer-partners__grid" role="list">
      {gridLayout.map((slot, index) => {
        const partner =
          slot.partnerIndex !== null ? partnerLogos[slot.partnerIndex] : null;

        return (
          <div
            key={`slot-${index}`}
            role="listitem"
            className={[
              'site-footer-partners__cell',
              slot.highlight && 'site-footer-partners__cell--highlight',
              !partner && 'site-footer-partners__cell--empty',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-hidden={!partner}
          >
            {partner && (
              <div className="site-footer-partners__logo">
                <span className="site-footer-partners__logo-icon">{partner.icon}</span>
                <span className="site-footer-partners__logo-name">{partner.name}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  </section>
);

export default FooterPartners;
