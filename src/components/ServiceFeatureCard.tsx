import PrimaryButton from '@/components/PrimaryButton';
import { useIsMobile } from '@/hooks/use-mobile';
import type { ServiceStackCard } from '@/data/serviceCards';

interface ServiceFeatureCardProps {
  card: ServiceStackCard;
}

const ServiceFeatureCard = ({ card }: ServiceFeatureCardProps) => {
  const isMobile = useIsMobile();
  const mobileCopy = isMobile ? card.mobile : undefined;

  const tagline = mobileCopy?.tagline ?? card.tagline;
  const subtitle = mobileCopy?.subtitle ?? card.subtitle;
  const bullets = mobileCopy?.bullets ?? card.bullets;

  return (
    <>
      <div className="mb-4 sm:mb-6">
        <p className="service-feature-card__eyebrow">{card.title}</p>
        <h2 className="service-feature-card__title">{tagline}</h2>
      </div>

      <div className="service-feature-card__body">
        <p className="service-feature-card__lead">{subtitle}</p>

        <div className="service-feature-card__deliverables">
          {bullets.map((bullet, index) => (
            <div key={bullet} className="service-feature-card__deliverable">
              <span className="service-feature-card__deliverable-num">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="service-feature-card__deliverable-text">{bullet}</span>
            </div>
          ))}
        </div>

        {!isMobile ? (
          <blockquote className="service-feature-card__outcome">
            <p className="service-feature-card__outcome-label">Итог для бизнеса</p>
            <p className="service-feature-card__outcome-text">{card.outcome}</p>
          </blockquote>
        ) : null}
      </div>

      <div className="service-feature-card__actions">
        <PrimaryButton to={`/contacts?service=${card.id}`}>{card.ctaLabel}</PrimaryButton>
      </div>
    </>
  );
};

export default ServiceFeatureCard;
