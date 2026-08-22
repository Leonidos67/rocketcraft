import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice, getDiscountPercent } from '@/data/servicesCatalog';
import type { DirectionService } from '@/data/servicesByDirection';
import type { ServiceStackCard } from '@/data/serviceCards';

const accentMediaClass: Record<ServiceStackCard['accent'], string> = {
  green: 'bg-[hsl(142_35%_92%)]',
  blue: 'bg-[color-mix(in_srgb,#bad6ff_72%,white)]',
  orange: 'bg-[color-mix(in_srgb,#ff643c_78%,white)]',
  pink: 'bg-[color-mix(in_srgb,#ffb1eb_72%,white)]',
  violet: 'bg-[color-mix(in_srgb,#cdb7f1_72%,white)]',
};

const accentIconClass: Record<ServiceStackCard['accent'], string> = {
  green: 'text-foreground',
  blue: 'text-foreground',
  orange: 'text-[#ff643c]',
  pink: 'text-foreground',
  violet: 'text-foreground',
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
    <div className={cn('flex flex-wrap items-baseline gap-x-[0.55rem] gap-y-[0.3rem]', isList && 'justify-end')}>
      <p className="m-0 text-[1.0625rem] font-bold leading-[1.2] tracking-[-0.03em] lg:text-[0.9375rem]">
        {formatPrice(service.priceFrom)}
      </p>
      {service.priceOld && (
        <p className="m-0 text-xs leading-[1.2] text-muted-foreground line-through">
          {formatPrice(service.priceOld)}
        </p>
      )}
      {discount && (
        <span className="rounded-full bg-[hsl(263_67%_83%_/_0.45)] px-[0.4rem] py-[0.12rem] text-[0.625rem] font-bold uppercase tracking-[0.04em] text-foreground">
          −{discount}%
        </span>
      )}
    </div>
  );

  const orderButton = (
    <span
      className={cn(
        'inline-flex items-center relative no-underline pointer-events-none',
        'mr-[var(--btn-icon-size)] transition-[margin] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
        'group-hover:mr-0 group-hover:ml-[var(--btn-icon-size)]',
      )}
      style={{ '--btn-icon-size': '2.75rem' } as React.CSSProperties}
      aria-hidden="true"
    >
      <span
        className={cn(
          'absolute top-1/2 -mt-[calc(var(--btn-icon-size)/2)]',
          'w-[var(--btn-icon-size)] h-[var(--btn-icon-size)]',
          'flex items-center justify-center shrink-0 rounded-full',
          'bg-[hsl(var(--btn-circle-bg))] text-[hsl(var(--btn-circle-fg))]',
          'text-[1.1em] leading-none',
          'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
          'right-full origin-center scale-0 z-[2] group-hover:scale-100',
        )}
      >
        <ArrowRight className="w-4 h-4 shrink-0" strokeWidth={2} />
      </span>
      <span
        className={cn(
          'relative z-[1] inline-flex items-center justify-center shrink-0',
          'h-[var(--btn-icon-size)] px-5',
          'bg-primary text-primary-foreground rounded-full',
          'text-sm font-semibold leading-none',
        )}
      >
        Заказать
      </span>
      <span
        className={cn(
          'absolute top-1/2 -mt-[calc(var(--btn-icon-size)/2)]',
          'w-[var(--btn-icon-size)] h-[var(--btn-icon-size)]',
          'flex items-center justify-center shrink-0 rounded-full',
          'bg-[hsl(var(--btn-circle-bg))] text-[hsl(var(--btn-circle-fg))]',
          'text-[1.1em] leading-none',
          'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
          'left-full origin-center scale-100 z-[1] group-hover:scale-0',
        )}
      >
        <ArrowRight className="w-4 h-4 shrink-0" strokeWidth={2} />
      </span>
    </span>
  );

  const directionBadge = directionTitle ? (
    <p className="m-0 inline-flex self-start rounded-full bg-black/[0.05] px-[0.55rem] py-[0.2rem] text-[0.5rem] font-bold uppercase tracking-[0.07em] text-muted-foreground">
      #{directionTitle}
    </p>
  ) : null;

  const mediaBlock = (
    <div
      className={cn(
        'relative flex shrink-0 items-center justify-center overflow-hidden',
        isList
          ? cn(
              'h-[4.75rem] w-[4.75rem] rounded-[1rem] [grid-area:media]',
              'max-[47.99em]:h-[3.75rem] max-[47.99em]:w-[3.75rem]',
              accentMediaClass[accent]
            )
          : cn(
              'min-h-[5.5rem] w-full p-[1.1rem]',
              accentMediaClass[accent],
              'lg:ml-4 lg:mt-4 lg:h-11 lg:min-h-0 lg:w-11 lg:self-start lg:rounded-[0.85rem] lg:bg-background lg:p-0 lg:shadow-[inset_0_0_0_1px_hsl(0_0%_0%_/_0.08)]'
            )
      )}
    >
      <Icon
        className={cn(
          'relative z-[1]',
          accentIconClass[accent],
          isList ? 'h-[1.65rem] w-[1.65rem]' : 'h-8 w-8 lg:h-[1.35rem] lg:w-[1.35rem]'
        )}
        aria-hidden="true"
      />
    </div>
  );

  return (
    <Link
      to={`/contacts?service=${directionId}&item=${service.id}`}
      id={`service-${service.id}`}
      className={cn(
        'group relative flex h-full cursor-pointer overflow-hidden text-inherit no-underline outline-none transition-[transform,box-shadow,border-color,background-color] duration-[280ms]',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(217_100%_55%)]',
        'hover:text-inherit hover:no-underline',
        isList
          ? cn(
              'grid min-h-[6.75rem] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-5 gap-y-0 rounded-[1.35rem] bg-[hsl(0_0%_98%)] py-[0.35rem] pl-[0.35rem] pr-[1.15rem] shadow-[inset_0_0_0_1px_hsl(0_0%_0%_/_0.07)] [grid-template-areas:"media_main_aside"]',
              'hover:translate-x-1 hover:bg-[hsl(217_100%_86%)] hover:shadow-[inset_0_0_0_1px_hsl(217_100%_70%_/_0.45)]',
              'max-[47.99em]:grid-cols-[auto_1fr] max-[47.99em]:gap-x-[0.9rem] max-[47.99em]:gap-y-0 max-[47.99em]:p-3 max-[47.99em]:[grid-template-areas:"media_main"_"aside_aside"]'
            )
          : cn(
              'flex-col rounded-[1.25rem] border border-black/[0.08] bg-background',
              'hover:border-[hsl(217_100%_75%_/_0.5)] hover:bg-[hsl(217_100%_86%)] hover:shadow-[0_14px_36px_hsl(0_0%_0%_/_0.07)]',
              'lg:rounded-[1.35rem] lg:border-none lg:bg-[hsl(0_0%_98%)] lg:shadow-[inset_0_0_0_1px_hsl(0_0%_0%_/_0.07)]',
              'lg:hover:bg-[hsl(217_100%_86%)] lg:hover:shadow-[inset_0_0_0_1px_hsl(217_100%_70%_/_0.45),0_16px_34px_hsl(217_80%_60%_/_0.12)]'
            )
      )}
      aria-label={`Заказать: ${service.title}`}
    >
      {isList ? (
        <>
          {mediaBlock}
          <div className="flex min-w-0 flex-col gap-[0.35rem] py-[0.85rem] [grid-area:main] max-[47.99em]:p-0">
            {directionBadge}
            <h3 className="m-0 font-sans text-[0.9375rem] font-bold normal-case leading-[1.28] tracking-[-0.02em]">
              {service.title}
            </h3>
            <p className="m-0 line-clamp-2 text-[0.8125rem] leading-normal text-muted-foreground">
              {service.description}
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-end justify-center gap-[0.7rem] py-[0.85rem] [grid-area:aside] max-[47.99em]:w-full max-[47.99em]:flex-row max-[47.99em]:items-center max-[47.99em]:justify-between max-[47.99em]:border-t max-[47.99em]:border-black/[0.07] max-[47.99em]:px-0 max-[47.99em]:pb-0 max-[47.99em]:pt-[0.65rem]">
            {priceBlock}
            {orderButton}
          </div>
        </>
      ) : (
        <>
          {mediaBlock}
          <div className="flex flex-1 flex-col gap-[0.65rem] p-[1.1rem_1.15rem_1.2rem] lg:gap-2 lg:p-4 lg:pb-4 lg:pt-[0.85rem]">
          {directionBadge}
          <h3 className="m-0 font-sans text-[0.9375rem] font-bold normal-case leading-[1.28] tracking-[-0.02em] lg:line-clamp-2 lg:text-sm lg:leading-[1.25]">
            {service.title}
          </h3>
          <p className="m-0 line-clamp-3 flex-1 text-[0.8125rem] leading-normal text-muted-foreground lg:line-clamp-2 lg:text-xs">
            {service.description}
          </p>

          <div className="mt-auto flex flex-col items-stretch gap-[0.7rem] border-t border-black/[0.07] pt-[0.85rem] lg:gap-[0.55rem] lg:pt-[0.7rem]">
            {priceBlock}
            {orderButton}
          </div>
          </div>
        </>
      )}
    </Link>
  );
};

export default ServiceProductCard;
