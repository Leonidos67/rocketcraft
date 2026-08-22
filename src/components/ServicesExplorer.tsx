import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import PrimaryButton from '@/components/PrimaryButton';
import type { ServiceStackCard } from '@/data/serviceCards';
import { btnSmSecondaryClass, siteContainerClass } from '@/lib/layoutStyles';
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
    <div className="w-full">
      <div className={cn(siteContainerClass, 'relative z-[1]')}>
        <nav
          className={cn(
            'flex flex-row flex-nowrap gap-[0.35rem] overflow-x-auto overscroll-x-contain border-b border-black/10 pb-0',
            '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
            'lg:flex-wrap lg:overflow-x-visible'
          )}
          aria-label="Направления услуг"
          role="tablist"
        >
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
                  'relative mb-[-1px] flex min-w-[clamp(9.5rem,18vw,13rem)] flex-1 flex-col items-start gap-[0.35rem] rounded-t-[0.85rem] border border-black/10 border-b-0 bg-[hsl(0_0%_96%)] px-4 pb-[0.95rem] pt-[0.85rem] text-left transition-[background-color,border-color,color] duration-[250ms]',
                  'md:min-w-0 md:px-[1.1rem] md:pb-[1.05rem] md:pt-4',
                  'hover:border-black/[0.14] hover:bg-[hsl(0_0%_92%)]',
                  isActive &&
                    'z-[1] border-black/[0.12] border-b border-b-white bg-white shadow-none hover:bg-white'
                )}
                onClick={() => onSelect(card.id)}
              >
                <span className="flex w-full min-w-0 flex-col gap-[0.15rem]">
                  <span className="text-sm font-bold leading-[1.2] text-[hsl(0_0%_8%)] md:text-[0.9375rem]">
                    {card.title}
                  </span>
                </span>
              </button>
            );
          })}
        </nav>

        <div
          className="relative min-h-[clamp(28rem,52vw,36rem)] rounded-b-2xl border border-t-0 border-black/10 bg-white p-[clamp(1.75rem,3.5vw,3rem)]"
          role="tabpanel"
          id={`service-panel-${activeCard.id}`}
          aria-labelledby={`service-tab-${activeCard.id}`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCard.id}
              className="relative z-[1] flex h-full flex-col gap-[clamp(1.25rem,2.5vw,1.75rem)]"
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-start gap-4">
                <div>
                  <p className="mb-[0.35rem] text-xs font-bold uppercase tracking-[0.14em] text-[hsl(0_0%_45%)]">
                    {activeCard.title}
                  </p>
                  <h3 className="max-w-[18ch] text-[clamp(1.5rem,2.8vw,2.35rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-[hsl(0_0%_8%)]">
                    {activeCard.tagline}
                  </h3>
                </div>
              </div>

              <p className="max-w-[52ch] text-[clamp(1rem,1.25vw,1.125rem)] leading-[1.65] text-[hsl(0_0%_35%)]">
                {activeCard.subtitle}
              </p>

              <div className="grid gap-[0.65rem] md:grid-cols-3">
                {activeCard.bullets.map((bullet, bulletIndex) => (
                  <div
                    key={bullet}
                    className="relative flex min-h-[7.5rem] flex-col gap-[0.65rem] rounded-xl border border-black/[0.08] bg-[hsl(0_0%_97%)] p-4 pb-[1.1rem]"
                  >
                    <span className="text-[0.6875rem] font-bold tracking-[0.12em] text-[hsl(0_0%_50%)]">
                      {String(bulletIndex + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 text-sm leading-normal text-[hsl(0_0%_15%)]">
                      {bullet}
                    </span>
                    <Check className="h-4 w-4 text-black/25" aria-hidden="true" />
                  </div>
                ))}
              </div>

              <blockquote className="m-0 rounded-xl border border-black/[0.08] bg-[hsl(0_0%_95%)] px-5 py-[1.15rem]">
                <p className="mb-[0.45rem] text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-[hsl(0_0%_45%)]">
                  Итог для бизнеса
                </p>
                <p className="text-[clamp(1rem,1.2vw,1.125rem)] font-medium leading-[1.55] text-[hsl(0_0%_12%)]">
                  {activeCard.outcome}
                </p>
              </blockquote>

              <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
                <PrimaryButton to={`/contacts?service=${activeCard.id}`}>
                  {activeCard.ctaLabel}
                </PrimaryButton>
                <Link to="/cases" className={btnSmSecondaryClass}>
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
