import { useState } from 'react';
import { servicesFaq } from '@/data/servicesCatalog';

const footerStats = [
  { value: '5+', label: 'Направлений услуг' },
  { value: '>10', label: 'Реализованных кейса' },
  { value: '~7', label: 'Дней до запуска' },
  { value: '100%', label: 'Довольных клиентов' },
];

const FooterFaq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index: number) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  return (
    <section className="site-section site-footer-faq" aria-labelledby="footer-faq-title">
      <div className="site-footer-faq__inner">
        <header className="site-footer-faq__header">
          <p className="site-footer-faq__eyebrow">Узнайте нас лучше</p>
          <h2 id="footer-faq-title" className="site-footer-faq__title">
            FAQ.
          </h2>
        </header>

        <div className="site-footer-faq__grid">
          <div className="site-footer-faq__media">
            <img
              src="https://images.shadcnspace.com/assets/backgrounds/cta-03-img-2.webp"
              alt=""
              className="site-footer-faq__image"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="site-footer-faq__list">
            {servicesFaq.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={item.q}
                  className={[
                    'site-footer-faq__item',
                    isOpen && 'site-footer-faq__item--open',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <button
                    type="button"
                    className="site-footer-faq__question"
                    aria-expanded={isOpen}
                    onClick={() => handleToggle(index)}
                  >
                    <span>{item.q}</span>
                  </button>
                  {isOpen && <p className="site-footer-faq__answer">{item.a}</p>}
                </div>
              );
            })}
          </div>
        </div>

        <div className="site-footer-faq__stats">
          {footerStats.map((stat) => (
            <div key={stat.label} className="site-footer-faq__stat">
              <p className="site-footer-faq__stat-value">{stat.value}</p>
              <p className="site-footer-faq__stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FooterFaq;
