import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import type { ServiceStackCard } from '@/data/serviceCards';
import { cn } from '@/lib/utils';

interface ServiceFeatureCardProps {
  card: ServiceStackCard;
}

const ServiceFeatureCard = ({ card }: ServiceFeatureCardProps) => {
  const isMobile = useIsMobile();
  const mobileCopy = isMobile ? card.mobile : undefined;

  const tagline = mobileCopy?.tagline ?? card.tagline;
  const bullets = mobileCopy?.bullets ?? card.bullets;

  return (
    <Link
      to={`/services/${card.id}`}
      aria-label={`${card.title}: подробнее`}
      className={cn(
        'group relative flex cursor-pointer gap-4 no-underline sm:gap-8',
        'p-6 pb-8 sm:p-12 sm:px-14 sm:pb-16',
        'max-[47.99em]:p-5 max-[47.99em]:pb-7',
        'outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      )}
    >
      <div className="min-w-0 flex-1 pr-12 sm:pr-16">
        <h2 className="mb-5 max-w-[34ch] text-[clamp(1.5rem,2.8vw,2.35rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-[hsl(0_0%_8%)] max-[47.99em]:mb-4 max-[47.99em]:text-[clamp(1.25rem,5.5vw,1.5rem)]">
          {tagline}
        </h2>

        <div className="flex flex-wrap gap-2">
          {bullets.map((bullet) => (
            <span
              key={bullet}
              className={cn(
                'inline-flex items-center rounded-full',
                'border border-black/[0.08] bg-neutral-50 px-3.5 py-1.5',
                'text-sm font-medium leading-none text-[hsl(0_0%_15%)]',
                'max-[47.99em]:text-[0.8125rem]',
              )}
            >
              {bullet}
            </span>
          ))}
        </div>

        {!isMobile ? (
          <p className="mt-5 max-w-[48ch] text-sm leading-[1.55] text-[hsl(0_0%_40%)]">
            {card.outcome}
          </p>
        ) : null}
      </div>

      <span
        className={cn(
          'absolute right-5 top-5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full sm:right-12 sm:top-12 sm:h-12 sm:w-12',
          'max-[47.99em]:right-5 max-[47.99em]:top-5',
          'border border-black/[0.1] bg-neutral-50 text-[hsl(0_0%_12%)]',
          'transition-[transform,background-color,color,border-color] duration-200',
          'group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground',
          'group-focus-visible:border-primary group-focus-visible:bg-primary group-focus-visible:text-primary-foreground',
        )}
        aria-hidden
      >
        <ArrowRight className="h-5 w-5" strokeWidth={2} />
      </span>
    </Link>
  );
};

export default ServiceFeatureCard;
