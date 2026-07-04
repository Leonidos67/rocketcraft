import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack';
import ServiceFeatureCard from '@/components/ServiceFeatureCard';
import { serviceStackCards, type ServiceStackCard } from '@/data/serviceCards';

const CARD_SHELL =
  'relative rounded-2xl border border-neutral-200 bg-neutral-50 p-4 sm:p-10 pb-10 sm:pb-20';

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
  <ScrollStack useWindowScroll={useWindowScroll} className={className}>
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
);

export default ServiceStackSection;
