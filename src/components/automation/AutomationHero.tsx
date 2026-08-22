import { motion, useReducedMotion } from 'motion/react';
import { TextAnimate } from '@/components/ui/text-animate';
import {
  automationHeroCards,
  automationPageMeta,
} from '@/data/automationPage';
import { cn } from '@/lib/utils';

interface AutomationHeroProps {
  onCta: () => void;
  ctaAnchorRef: React.RefObject<HTMLDivElement | null>;
}

export function AutomationHero({ onCta, ctaAnchorRef }: AutomationHeroProps) {
  const reducedMotion = useReducedMotion();
  const center = (automationHeroCards.length - 1) / 2;

  return (
    <section
      id="automation-hero"
      className="relative scroll-mt-24 overflow-hidden bg-background"
    >
      <div className="relative mx-auto flex max-w-site flex-col items-center px-6 pb-10 pt-10 text-center md:px-10 md:pt-14 lg:px-16 xl:px-20">
        <TextAnimate
          animation="blurInUp"
          by="word"
          once
          as="h1"
          className="m-0 max-w-[18ch] text-[clamp(1.85rem,4.5vw,3.25rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-foreground"
        >
          {automationPageMeta.heroTitle}
        </TextAnimate>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-muted-foreground sm:text-base">
          {automationPageMeta.heroTags.map((tag, index) => (
            <span key={tag} className="inline-flex items-center gap-2">
              {index > 0 && (
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FF5A45]" aria-hidden />
              )}
              {tag}
            </span>
          ))}
        </div>

        <div className="relative mt-8 w-full sm:mt-10">
          <div
            className={cn(
              'relative mx-auto flex h-[280px] w-full items-end justify-center sm:h-[340px] md:h-[400px]',
              '[mask-image:linear-gradient(to_bottom,black_0%,black_58%,transparent_100%)]',
            )}
          >
            {automationHeroCards.map((card, index) => {
              const offset = index - center;
              const rotate = offset * 6.5;
              const x = offset * 96;
              const y = Math.abs(offset) * 12;
              const scale = 1 - Math.abs(offset) * 0.045;
              const zIndex = 20 - Math.abs(offset);

              return (
                <motion.div
                  key={card.id}
                  className="absolute bottom-8 origin-bottom"
                  style={{ zIndex }}
                  initial={
                    reducedMotion
                      ? false
                      : { opacity: 0, y: 40, rotate: rotate * 1.4, scale: 0.9 }
                  }
                  animate={{
                    opacity: 1,
                    y,
                    x,
                    rotate,
                    scale,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15 + Math.abs(offset) * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={
                    reducedMotion
                      ? undefined
                      : { y: y - 12, scale: scale + 0.04, transition: { duration: 0.25 } }
                  }
                >
                  <div
                    className={cn(
                      'relative h-[210px] w-[132px] overflow-hidden rounded-[1.25rem] shadow-[0_18px_40px_rgba(0,0,0,0.18)] sm:h-[250px] sm:w-[158px] md:h-[280px] md:w-[172px]',
                      'bg-gradient-to-br',
                      card.gradient,
                    )}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.28),transparent_45%)]" />
                    <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                      <p className="m-0 text-lg font-semibold tracking-tight text-white drop-shadow-sm">
                        {card.title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div
            ref={ctaAnchorRef}
            className="relative z-30 -mt-6 flex justify-center sm:-mt-8"
          >
            <button
              type="button"
              onClick={onCta}
              className={cn(
                'inline-flex h-12 cursor-pointer items-center justify-center rounded-full border-none px-7',
                'bg-[#FF5A45] text-sm font-semibold text-white shadow-[0_10px_28px_rgba(255,90,69,0.35)]',
                'transition-[transform,opacity] duration-200 hover:opacity-95 active:scale-[0.98]',
              )}
            >
              {automationPageMeta.ctaPrimary}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
