import { useState } from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ProcessStepItem {
  step: string;
  title: string;
  shortTitle: string;
  text: string;
  icon: LucideIcon;
  gradientClass: string;
}

interface ProcessStepsShowcaseProps {
  steps: ProcessStepItem[];
  reducedMotion?: boolean;
  inHero?: boolean;
}

const ProcessStepsShowcase = ({
  steps,
  reducedMotion = false,
}: ProcessStepsShowcaseProps) => {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <div
      className={cn(
        'flex w-full min-h-[clamp(22rem,42vw,26rem)] items-end gap-3 overflow-x-auto overscroll-x-contain pb-1',
        'snap-x snap-proximity [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        'md:overflow-x-visible'
      )}
      role="list"
    >
      {steps.map((step, index) => {
        const isActive = index === activeIndex;
        const Icon = step.icon;

        return (
          <motion.article
            key={step.step}
            role="listitem"
            layout={!reducedMotion}
            transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'relative cursor-pointer overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-[0_8px_28px_hsl(0_0%_0%_/_0.05)] outline-none snap-start',
              'transition-[box-shadow,border-color] duration-300',
              'focus-visible:border-[hsl(160_45%_42%_/_0.45)] focus-visible:shadow-[0_0_0_3px_hsl(160_45%_42%_/_0.15)]',
              'hover:border-black/10 hover:shadow-[0_12px_32px_hsl(0_0%_0%_/_0.08)]',
              isActive
                ? 'flex h-[clamp(22rem,42vw,26rem)] min-w-0 flex-[2.8_1_0] flex-col p-0'
                : 'h-[clamp(18rem,34vw,21rem)] min-w-[5.5rem] flex-[1_1_0] px-4 pb-5 pt-[1.1rem]'
            )}
            onMouseEnter={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
            tabIndex={0}
            aria-expanded={isActive}
          >
            <span
              className={cn(
                'pointer-events-none absolute left-[0.9rem] top-[0.85rem] z-[1] select-none text-[clamp(2.5rem,5vw,3.5rem)] font-light leading-none tracking-[-0.04em]',
                isActive
                  ? 'left-[0.85rem] top-[0.65rem] text-white/35'
                  : 'text-black/[0.07]'
              )}
              aria-hidden="true"
            >
              {step.step}.
            </span>

            {isActive ? (
              <div className="flex h-full flex-col">
                <div
                  className={cn(
                    'relative min-h-[9rem] flex-[1_1_48%] overflow-hidden rounded-t-3xl',
                    step.gradientClass
                  )}
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-[0.65rem] px-[1.15rem] pb-5 pt-4">
                  <div className="inline-flex h-[2.35rem] w-[2.35rem] items-center justify-center rounded-[0.65rem] border border-black/[0.06] bg-[hsl(0_0%_96%)]">
                    <Icon className="h-[1.1rem] w-[1.1rem] text-foreground/75" aria-hidden="true" />
                  </div>
                  <h3 className="m-0 font-sans text-lg font-bold normal-case leading-[1.2] tracking-[-0.02em] text-foreground">
                    {step.title}
                  </h3>
                  <p className="m-0 text-[0.8125rem] leading-[1.55] text-muted-foreground">
                    {step.text}
                  </p>
                </div>
              </div>
            ) : (
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-[0.85rem] p-4">
                <div className="inline-flex h-[2.15rem] w-[2.15rem] items-center justify-center rounded-[0.65rem] border border-black/[0.06] bg-[hsl(0_0%_96%)]">
                  <Icon className="h-[1.1rem] w-[1.1rem] text-foreground/75" aria-hidden="true" />
                </div>
                <h3 className="m-0 font-sans text-[0.9375rem] font-bold normal-case leading-[1.25] tracking-[-0.01em] text-foreground">
                  {step.shortTitle}
                </h3>
              </div>
            )}
          </motion.article>
        );
      })}
    </div>
  );
};

export default ProcessStepsShowcase;
