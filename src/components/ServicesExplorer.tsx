import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import PrimaryButton from '@/components/PrimaryButton';
import type { ServiceStackCard } from '@/data/serviceCards';
import { cn } from '@/lib/utils';

interface ServicesExplorerProps {
  cards: ServiceStackCard[];
  activeId: string;
  onSelect: (id: string) => void;
  reducedMotion?: boolean;
}

const ServicesExplorer = ({
  cards,
  activeId,
  onSelect,
  reducedMotion = false,
}: ServicesExplorerProps) => {
  const activeCard = cards.find((card) => card.id === activeId) ?? cards[0];

  return (
    <div className="services-explorer">
      <div className="site-container services-explorer__shell">
        <nav className="services-explorer__nav" aria-label="Направления услуг" role="tablist">
          {cards.map((card) => {
            const isActive = card.id === activeId;

            return (
              <button
                key={card.id}
                type="button"
                role="tab"
                id={`service-tab-${card.id}`}
                aria-selected={isActive}
                aria-controls={`service-panel-${card.id}`}
                className={cn(
                  'services-explorer__nav-item',
                  isActive && 'services-explorer__nav-item--active'
                )}
                onClick={() => onSelect(card.id)}
              >
                <span className="services-explorer__nav-copy">
                  <span className="services-explorer__nav-title">{card.title}</span>
                </span>
              </button>
            );
          })}
        </nav>

        <div
          className="services-explorer__stage"
          role="tabpanel"
          id={`service-panel-${activeCard.id}`}
          aria-labelledby={`service-tab-${activeCard.id}`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCard.id}
              className="services-explorer__stage-inner"
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="services-explorer__stage-head">
                <div>
                  <p className="services-explorer__stage-eyebrow">{activeCard.title}</p>
                  <h3 className="services-explorer__stage-title">{activeCard.tagline}</h3>
                </div>
              </div>

              <p className="services-explorer__stage-lead">{activeCard.subtitle}</p>

              <div className="services-explorer__deliverables">
                {activeCard.bullets.map((bullet, bulletIndex) => (
                  <div key={bullet} className="services-explorer__deliverable">
                    <span className="services-explorer__deliverable-num">
                      {String(bulletIndex + 1).padStart(2, '0')}
                    </span>
                    <span className="services-explorer__deliverable-text">{bullet}</span>
                    <Check className="services-explorer__deliverable-check" aria-hidden="true" />
                  </div>
                ))}
              </div>

              <blockquote className="services-explorer__outcome">
                <p className="services-explorer__outcome-label">Итог для бизнеса</p>
                <p className="services-explorer__outcome-text">{activeCard.outcome}</p>
              </blockquote>

              <div className="services-explorer__actions">
                <PrimaryButton to={`/contacts?service=${activeCard.id}`}>
                  {activeCard.ctaLabel}
                </PrimaryButton>
                <Link to="/cases" className="btn-sm-secondary">
                  Кейсы по направлению
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ServicesExplorer;
