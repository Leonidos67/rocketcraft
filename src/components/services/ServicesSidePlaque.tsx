import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import OrbModal from '@/components/OrbModal';
import SiriOrb from '@/components/ui/SiriOrb';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

interface ServicesSidePlaqueProps {
  isCatalogVisible: boolean;
}

const ServicesSidePlaque = ({ isCatalogVisible }: ServicesSidePlaqueProps) => {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const showPlaque = isCatalogVisible && !isDismissed;

  return (
    <>
      <AnimatePresence>
        {showPlaque && (
          <motion.aside
            className={cn(
              'fixed bottom-[max(10px,env(safe-area-inset-bottom,0px))] right-[15px] z-[35] w-auto max-w-none rounded-[1.15rem] border border-black/10 bg-background p-[0.9rem_0.95rem_1rem] shadow-[0_10px_32px_hsl(0_0%_0%_/_0.12)]',
              'max-[47.99em]:bottom-[calc(3.25rem+max(10px,env(safe-area-inset-bottom,0px)))] max-[47.99em]:left-[15px]',
              'min-[48em]:bottom-[10px] min-[48em]:right-[25px] min-[48em]:w-[min(28rem,calc(100vw-20px))] min-[48em]:rounded-[25px] min-[48em]:p-[1.35rem_1.25rem_1.3rem] min-[48em]:shadow-[0_8px_24px_hsl(0_0%_0%_/_0.08)]'
            )}
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: 12 }}
            transition={{ duration: reducedMotion ? 0 : 0.35, ease: EASE }}
            aria-label="Помощь с выбором услуг"
          >
            <div className="mb-[0.6rem] flex items-center justify-between gap-2 min-[48em]:mb-2 min-[48em]:items-start min-[48em]:gap-3">
              <p
                className={cn(
                  "m-0 flex-1 min-w-0 font-['Oi',serif] text-base font-normal italic uppercase leading-[1.15] text-foreground",
                  'min-[48em]:flex-none min-[48em]:text-xl min-[48em]:leading-[1.1]'
                )}
              >
                Разбегаются глаза?
              </p>
              <button
                type="button"
                className={cn(
                  'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-none bg-transparent p-0 text-muted-foreground transition-[background-color,color] duration-200',
                  'hover:bg-black/[0.06] hover:text-foreground',
                  'min-[48em]:-mt-[10px] min-[48em]:h-8 min-[48em]:w-8'
                )}
                onClick={() => setIsDismissed(true)}
                aria-label="Закрыть подсказку"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <button
              type="button"
              className={cn(
                'flex w-full cursor-pointer items-center gap-[0.65rem] rounded-[0.9rem] border border-black/10 bg-[hsl(0_0%_98%)] px-[0.7rem] py-[0.6rem] text-left transition-[border-color,background-color] duration-200',
                'hover:border-black/[0.18] hover:bg-[hsl(0_0%_96%)]',
                'min-[48em]:gap-[0.85rem] min-[48em]:rounded-[25px] min-[48em]:px-[0.85rem] min-[48em]:py-3'
              )}
              onClick={() => setIsAiOpen(true)}
            >
              <span className="inline-flex shrink-0" aria-hidden="true">
                <SiriOrb
                  size={isMobile ? '2.5rem' : '3rem'}
                  animationDuration={14}
                  colors={{
                    bg: 'hsl(217, 100%, 86%)',
                    c1: 'hsl(263, 67%, 83%)',
                    c2: 'hsl(217, 100%, 86%)',
                    c3: 'hsl(39, 100%, 50%)',
                  }}
                />
              </span>
              <span className="flex min-w-0 flex-col gap-[0.2rem]">
                <span className="block text-[0.8125rem] font-semibold text-foreground min-[48em]:text-sm">
                  Спросите у ИИ
                </span>
                <span className="m-0 text-[0.6875rem] leading-[1.35] text-muted-foreground min-[48em]:text-xs min-[48em]:leading-[1.4]">
                  Ответит на все ваши вопросы за секунду.
                </span>
              </span>
            </button>
          </motion.aside>
        )}
      </AnimatePresence>

      <OrbModal isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
    </>
  );
};

export default ServicesSidePlaque;
