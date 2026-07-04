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
  inHero = false,
}: ProcessStepsShowcaseProps) => {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <div className={cn('process-showcase', inHero && 'process-showcase--hero')} role="list">
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
              'process-showcase__card',
              isActive && 'process-showcase__card--active'
            )}
            onMouseEnter={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
            tabIndex={0}
            aria-expanded={isActive}
          >
            <span className="process-showcase__number" aria-hidden="true">
              {step.step}.
            </span>

            {isActive ? (
              <div className="process-showcase__active">
                <div
                  className={cn('process-showcase__visual', step.gradientClass)}
                  aria-hidden="true"
                />
                <div className="process-showcase__body">
                  <div className="process-showcase__icon-wrap">
                    <Icon className="process-showcase__icon" aria-hidden="true" />
                  </div>
                  <h3 className="process-showcase__title">{step.title}</h3>
                  <p className="process-showcase__text">{step.text}</p>
                </div>
              </div>
            ) : (
              <div className="process-showcase__compact">
                <div className="process-showcase__icon-wrap process-showcase__icon-wrap--sm">
                  <Icon className="process-showcase__icon" aria-hidden="true" />
                </div>
                <h3 className="process-showcase__short-title">{step.shortTitle}</h3>
              </div>
            )}
          </motion.article>
        );
      })}
    </div>
  );
};

export default ProcessStepsShowcase;
