import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import OrbModal from '@/components/OrbModal';
import SiriOrb from '@/components/ui/SiriOrb';
import { useIsMobile } from '@/hooks/use-mobile';

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
            className="services-side-plaque"
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: 12 }}
            transition={{ duration: reducedMotion ? 0 : 0.35, ease: EASE }}
            aria-label="Помощь с выбором услуг"
          >
            <div className="services-side-plaque__header">
              <p className="services-side-plaque__title">Разбегаются глаза?</p>
              <button
                type="button"
                className="services-side-plaque__close"
                onClick={() => setIsDismissed(true)}
                aria-label="Закрыть подсказку"
              >
                <X className="services-side-plaque__close-icon" aria-hidden="true" />
              </button>
            </div>

            <button
              type="button"
              className="services-side-plaque__ai-card"
              onClick={() => setIsAiOpen(true)}
            >
              <span className="services-side-plaque__ai-orb" aria-hidden="true">
                <SiriOrb
                  size={isMobile ? '2.5rem' : '3rem'}
                  animationDuration={14}
                  colors={{
                    bg: 'hsl(217 100% 86%)',
                    c1: 'hsl(263 67% 83%)',
                    c2: 'hsl(217 100% 86%)',
                    c3: 'hsl(263 67% 83%)',
                  }}
                />
              </span>
              <span className="services-side-plaque__ai-body">
                <span className="services-side-plaque__ai-label">Спросите у ИИ</span>
                <span className="services-side-plaque__ai-text">
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
