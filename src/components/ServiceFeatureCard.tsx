import PrimaryButton from '@/components/PrimaryButton';
import type { ServiceStackCard } from '@/data/serviceCards';

interface ServiceFeatureCardProps {
  card: ServiceStackCard;
}

const ServiceFeatureCard = ({ card }: ServiceFeatureCardProps) => (
  <>
    <div className="mb-4 sm:mb-6">
      <p className="service-feature-card__eyebrow">{card.title}</p>
      <h2 className="service-feature-card__title">{card.tagline}</h2>
    </div>

    <div className="service-feature-card__body">
      <p className="service-feature-card__lead">{card.subtitle}</p>

      <div className="service-feature-card__deliverables">
        {card.bullets.map((bullet, index) => (
          <div key={bullet} className="service-feature-card__deliverable">
            <span className="service-feature-card__deliverable-num">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="service-feature-card__deliverable-text">{bullet}</span>
          </div>
        ))}
      </div>

      <blockquote className="service-feature-card__outcome">
        <p className="service-feature-card__outcome-label">Итог для бизнеса</p>
        <p className="service-feature-card__outcome-text">{card.outcome}</p>
      </blockquote>
    </div>

    <div className="service-feature-card__actions">
      <PrimaryButton to={`/contacts?service=${card.id}`}>{card.ctaLabel}</PrimaryButton>
    </div>
  </>
);

export default ServiceFeatureCard;
