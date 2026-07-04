import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice, getDiscountPercent } from '@/data/servicesCatalog';
import type { DirectionService } from '@/data/servicesByDirection';
import type { ServiceStackCard } from '@/data/serviceCards';

const accentClass: Record<ServiceStackCard['accent'], string> = {
  green: 'service-product-card--green',
  blue: 'service-product-card--blue',
  orange: 'service-product-card--orange',
  pink: 'service-product-card--pink',
  violet: 'service-product-card--violet',
};

interface ServiceProductCardProps {
  service: DirectionService;
  directionId: string;
  accent: ServiceStackCard['accent'];
  icon: LucideIcon;
  directionTitle?: string;
  layout?: 'grid' | 'list';
}

const ServiceProductCard = ({
  service,
  directionId,
  accent,
  icon: Icon,
  directionTitle,
  layout = 'grid',
}: ServiceProductCardProps) => {
  const discount = getDiscountPercent(service.priceFrom, service.priceOld);
  const isList = layout === 'list';

  const priceBlock = (
    <div className="service-product-card__price-row">
      <p className="service-product-card__price">{formatPrice(service.priceFrom)}</p>
      {service.priceOld && (
        <p className="service-product-card__price-old">{formatPrice(service.priceOld)}</p>
      )}
      {discount && <span className="service-product-card__discount">−{discount}%</span>}
    </div>
  );

  const orderButton = (
    <span className="btn-sm-primary-wrap btn-sm-primary-wrap--compact service-product-card__cta" aria-hidden="true">
      <span className="btn-sm-primary-icon btn-sm-primary-icon--left">
        <ArrowRight className="w-4 h-4" />
      </span>
      <span className="btn-sm-primary__label">Заказать</span>
      <span className="btn-sm-primary-icon btn-sm-primary-icon--right">
        <ArrowRight className="w-4 h-4" />
      </span>
    </span>
  );

  return (
    <Link
      to={`/contacts?service=${directionId}&item=${service.id}`}
      id={`service-${service.id}`}
      className={cn(
        'service-product-card',
        accentClass[accent],
        isList && 'service-product-card--list'
      )}
      aria-label={`Заказать: ${service.title}`}
    >
      {/* <div className="service-product-card__media">
        <Icon className="service-product-card__icon" aria-hidden="true" />
      </div> */}

      {isList ? (
        <>
          <div className="service-product-card__list-main">
            {directionTitle && (
              <p className="service-product-card__direction">#{directionTitle}</p>
            )}
            <h3 className="service-product-card__title">{service.title}</h3>
            <p className="service-product-card__desc">{service.description}</p>
          </div>

          <div className="service-product-card__list-aside">
            {priceBlock}
            {orderButton}
          </div>
        </>
      ) : (
        <div className="service-product-card__body">
          {directionTitle && (
            <p className="service-product-card__direction">#{directionTitle}</p>
          )}
          <h3 className="service-product-card__title">{service.title}</h3>
          <p className="service-product-card__desc">{service.description}</p>

          <div className="service-product-card__footer">
            {priceBlock}
            {orderButton}
          </div>
        </div>
      )}
    </Link>
  );
};

export default ServiceProductCard;
