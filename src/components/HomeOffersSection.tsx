import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  siteContainerClass,
  siteSectionClass,
} from '@/lib/layoutStyles';
import { PAGE_EASE, pageReveal } from '@/lib/pageMotion';
import {
  sectionLabelClass,
  sectionLabelSlashClass,
} from '@/lib/studioPageStyles';
import { cn } from '@/lib/utils';

const offers = [
  {
    title: 'Сайт-визитка',
    text: 'От 25 000 ₽ · 7–14 дней',
    to: '/services/websites',
  },
  {
    title: 'Лендинг',
    text: 'От 40 000 ₽ · 2–3 недели',
    to: '/services/websites',
  },
  {
    title: 'Сайт с записью',
    text: 'От 55 000 ₽ · 3–4 недели',
    to: '/services/websites',
  },
  {
    title: 'Автоматизация',
    text: 'Боты, CRM и интеграции — после сайта',
    to: '/services/automation',
  },
] as const;

const MotionLink = motion.create(Link);

const HomeOffersSection = () => {
  const reducedMotion = useReducedMotion();
  const reduced = !!reducedMotion;

  return (
    <section
      id="home-offers"
      className={cn(siteSectionClass, 'scroll-mt-24 py-16 sm:py-20')}
    >
      <div className={siteContainerClass}>
        <motion.div
          className="mb-8 flex flex-col gap-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={pageReveal(0, reduced)}
        >
          <header className="max-w-md">
            <p className={sectionLabelClass}>
              <span className={sectionLabelSlashClass}>/</span>
              <span>Оффер</span>
            </p>
            <h2 className="text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-foreground">
              Сайты для вашей точки
            </h2>
          </header>
          <p className="max-w-sm text-[0.9375rem] leading-[1.55] text-muted-foreground sm:text-right sm:text-base">
            Пакеты с ценой и сроком. Автоматизация — следующим шагом, когда сайт уже приводит заявки.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: reduced ? 0 : 0.08,
                delayChildren: reduced ? 0 : 0.06,
              },
            },
          }}
        >
          {offers.map((offer) => (
            <MotionLink
              key={offer.title}
              to={offer.to}
              variants={{
                hidden: {
                  opacity: reduced ? 1 : 0,
                  y: reduced ? 0 : 24,
                  scale: reduced ? 1 : 0.98,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: reduced ? 0 : 0.55, ease: PAGE_EASE },
                },
              }}
              whileHover={
                reduced
                  ? undefined
                  : { y: -4, transition: { duration: 0.22, ease: PAGE_EASE } }
              }
              whileTap={reduced ? undefined : { scale: 0.985 }}
              className={cn(
                'group relative flex min-h-[9.5rem] flex-col justify-between overflow-hidden rounded-[1.25rem]',
                'border border-border bg-white p-6 no-underline sm:min-h-[11rem] sm:p-8',
                'transition-[border-color,background-color] duration-200',
                'hover:border-foreground/20 hover:bg-neutral-50',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-[clamp(1.35rem,2.2vw,1.75rem)] font-semibold tracking-[-0.03em] text-foreground">
                  {offer.title}
                </h3>
                <span
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
                    'border border-transparent text-muted-foreground',
                    'transition-[transform,color,border-color,background-color] duration-200',
                    'group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground',
                  )}
                  aria-hidden
                >
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                </span>
              </div>
              <p className="m-0 text-[0.9375rem] leading-[1.45] text-muted-foreground">
                {offer.text}
              </p>
            </MotionLink>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HomeOffersSection;
