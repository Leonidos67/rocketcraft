import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack';
import ServiceFeatureCard from '@/components/ServiceFeatureCard';
import { serviceStackCards, type ServiceStackCard } from '@/data/serviceCards';
import { cn } from '@/lib/utils';

const CARD_SHELL = cn(
  'relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-0',
);

const SECTION_SHELL = cn(
  'relative z-[2] bg-background',
  'w-full max-w-site mx-auto px-4 md:px-8 lg:px-12 xl:px-16',
  'pt-4 sm:pt-8 pb-10 sm:pb-20',
  'max-[47.99em]:px-3',
  '[&_.scroll-stack-inner]:bg-background',
  '[&_.scroll-stack-inner]:!px-2',
  '[&_.scroll-stack-inner]:max-[740px]:!px-0',
);

interface ServiceStackSectionProps {
  cards?: ServiceStackCard[];
  className?: string;
  useWindowScroll?: boolean;
}

const ServiceStackSection = ({
  cards = serviceStackCards,
  className = '',
  useWindowScroll = true,
}: ServiceStackSectionProps) => (
  <div className={cn(SECTION_SHELL, className)}>
    <ScrollStack useWindowScroll={useWindowScroll}>
      {cards.map((card) => (
        <ScrollStackItem
          key={card.id}
          id={`service-${card.id}`}
          itemClassName={CARD_SHELL}
        >
          <ServiceFeatureCard card={card} />
        </ScrollStackItem>
      ))}
    </ScrollStack>
  </div>
);

export default ServiceStackSection;
