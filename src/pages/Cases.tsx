import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageLoader from '@/components/PageLoader';
import PrimaryButton from '@/components/PrimaryButton';
import PageSectionNav from '@/components/PageSectionNav';
import CursorGrid from '@/components/ui/CursorGrid';
import { casesPageSections } from '@/data/pageSections/cases';
import { casePortfolioItems } from '@/data/caseCards';
import CasePortfolioCard from '@/components/CasePortfolioCard';
import { pageReveal } from '@/lib/pageMotion';
import {
  pageCtaClass,
  pageCtaTextClass,
  pageCtaTitleClass,
} from '@/lib/studioPageStyles';
import {
  pageSectionClass,
  siteCanvasServicesClass,
  siteContainerClass,
  siteSectionClass,
} from '@/lib/layoutStyles';
import { cn } from '@/lib/utils';

const Cases = () => {
  const reducedMotion = useReducedMotion();
  const hasCases = casePortfolioItems.length > 0;

  useEffect(() => {
    document.title = 'Наши работы — Agyra';
  }, []);

  return (
    <div className={cn(siteCanvasServicesClass, 'min-h-screen')}>
      <div className={siteSectionClass}>
        <Header />
        <PageLoader />

        <PageSectionNav sections={casesPageSections} />

        <main>
          <section
            id="cases-intro"
            className={cn(
              pageSectionClass,
              'relative scroll-mt-28 overflow-hidden',
              'min-h-[min(42vh,22rem)] sm:min-h-[min(48vh,26rem)]',
            )}
          >
            {!reducedMotion ? (
              <div className="absolute inset-0 z-0 h-full w-full" aria-hidden>
                <CursorGrid
                  cellSize={70}
                  color="#D946EF"
                  radius={160}
                  falloff="smooth"
                  holdTime={400}
                  fadeDuration={800}
                  lineWidth={1.2}
                  maxOpacity={0.9}
                  fillOpacity={0.08}
                  gridOpacity={0.12}
                  cellRadius={0}
                  clickPulse
                  pulseSpeed={600}
                  className="h-full min-h-full w-full"
                />
              </div>
            ) : null}

            <div
              className={cn(
                siteContainerClass,
                'pointer-events-none relative z-10 flex h-full min-h-[inherit] items-center justify-center',
                'pb-8 pt-24 sm:pt-28 md:pt-32',
              )}
            >
              <motion.h1
                className={cn(
                  "m-0 text-center font-['Oi',serif] font-normal italic uppercase tracking-[0.01em]",
                  'text-[clamp(1.75rem,3.333vw,4rem)] leading-[1.1] text-foreground',
                )}
                initial="hidden"
                animate="visible"
                variants={pageReveal(0, !!reducedMotion)}
              >
                Наши работы
              </motion.h1>
            </div>
          </section>

          <section
            id="cases-grid"
            className={cn(
              pageSectionClass,
              siteContainerClass,
              'scroll-mt-28 pt-14 sm:pt-20 md:pt-24',
            )}
          >
            {hasCases ? (
              <motion.div
                className="mx-auto grid max-w-6xl grid-cols-1 gap-y-16 sm:gap-y-20 md:grid-cols-2 md:gap-x-10 md:gap-y-24 lg:gap-x-14"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: reducedMotion ? 0 : 0.12 },
                  },
                }}
              >
                {casePortfolioItems.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={{
                      hidden: {
                        opacity: reducedMotion ? 1 : 0,
                        y: reducedMotion ? 0 : 20,
                      },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                      },
                    }}
                  >
                    <CasePortfolioCard item={item} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                className={cn(
                  'rounded-[1.25rem] border border-border/50 bg-muted/40',
                  'px-[clamp(1.5rem,4vw,3rem)] py-[clamp(3rem,8vw,5rem)] text-center',
                )}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={pageReveal(0.05, !!reducedMotion)}
              >
                <p className="m-0 text-[clamp(1.125rem,1.5vw,1.375rem)] font-semibold tracking-tight text-foreground">
                  Портфолио наполняется
                </p>
                <p className="m-0 mx-auto mt-3 max-w-md text-[0.975rem] leading-relaxed text-muted-foreground">
                  Скоро здесь появятся наши работы. Пока можно оставить заявку — разберём
                  вашу задачу и покажем релевантные примеры.
                </p>
              </motion.div>
            )}
          </section>

          <section
            id="cases-cta"
            className={cn(
              pageSectionClass,
              siteContainerClass,
              'scroll-mt-28 pb-20 md:pb-28',
            )}
          >
            <motion.div
              className={pageCtaClass}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={pageReveal(0, !!reducedMotion)}
            >
              <h2 className={pageCtaTitleClass}>Хотите такой же результат?</h2>
              <p className={pageCtaTextClass}>
                Расскажите о задаче — на консультации подберём подход, сроки и формат
                запуска.
              </p>
              <PrimaryButton to="/contacts">Оставить заявку</PrimaryButton>
            </motion.div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Cases;
