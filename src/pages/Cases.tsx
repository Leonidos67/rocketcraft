import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageLoader from '@/components/PageLoader';
import PrimaryButton from '@/components/PrimaryButton';
import CasePortfolioCard from '@/components/CasePortfolioCard';
import { cn } from '@/lib/utils';
import {
  caseFilters,
  caseTestimonials,
  filterCases,
  type CaseFilterId,
} from '@/data/caseCards';

const EASE = [0.22, 1, 0.36, 1] as const;

const siteContainerClass =
  'w-full max-w-site mx-auto px-6 md:px-10 lg:px-16 xl:px-20';

const btnLinkArrowClass = cn(
  'group inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200',
  'hover:text-primary',
);

const btnLinkArrowIconClass = cn(
  'inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-muted text-[0.9em] text-foreground',
  'transition-all duration-200',
  'group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground',
);

const reveal = (delay = 0, reduced = false) => ({
  hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: reduced ? 0 : 0.65, delay, ease: EASE },
  },
});

const Cases = () => {
  const reducedMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<CaseFilterId>('all');
  const filteredCases = filterCases(activeFilter);

  useEffect(() => {
    document.title = 'Кейсы — Agyra';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageLoader />

      <main>
        <motion.section
          className={cn(siteContainerClass, 'mt-20 text-center mb-[clamp(3rem,6vw,5rem)]')}
          initial="hidden"
          animate="visible"
          variants={reveal(0, !!reducedMotion)}
        >
          <p className="text-label uppercase text-foreground">Кейсы</p>
          <h1 className="text-display-lg text-foreground mt-4 max-w-4xl mx-auto">
            Это наша работа
          </h1>
          <p className="text-body-lg text-muted-foreground mx-auto mt-6 max-w-2xl">
            Реальные проекты автоматизации — где каждое решение, каждая интеграция и каждый
            бот решают конкретную бизнес-задачу с измеримым результатом.
          </p>
        </motion.section>

        <section className={cn(siteContainerClass, 'mb-[clamp(5rem,10vw,9rem)]')}>
          <motion.div
            className="mb-[clamp(2rem,4vw,3.5rem)]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={reveal(0, !!reducedMotion)}
          >
            <p className="text-[clamp(0.875rem,1vw,1rem)] font-semibold uppercase tracking-[0.06em] text-muted-foreground mb-4">
              Фильтр по типу кейса
            </p>
            <ul className="flex flex-wrap gap-2 list-none p-0 m-0" role="list">
              {caseFilters.map((filter) => (
                <li key={filter.id}>
                  <button
                    type="button"
                    className={cn(
                      'px-[1.125rem] py-2.5 rounded-full border-0 bg-transparent text-sm font-semibold cursor-pointer',
                      'transition-[color,background-color] duration-200',
                      activeFilter === filter.id
                        ? 'text-foreground bg-[hsl(var(--accent-orange)/0.18)]'
                        : 'text-foreground/72 hover:text-foreground hover:bg-[hsl(var(--accent-orange)/0.12)]',
                    )}
                    onClick={() => setActiveFilter(filter.id)}
                  >
                    {filter.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            key={activeFilter}
            className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(1.25rem,2.5vw,2rem)]"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: reducedMotion ? 0 : 0.08 },
              },
            }}
          >
            {filteredCases.map((item) => (
              <motion.div
                key={item.id}
                variants={{
                  hidden: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                }}
              >
                <CasePortfolioCard item={item} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className={cn(siteContainerClass, 'mb-[clamp(5rem,10vw,9rem)]')}>
          <motion.h2
            className="text-[clamp(1.5rem,2.8vw,3rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-foreground max-w-3xl mb-[clamp(2rem,4vw,3.5rem)]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={reveal(0, !!reducedMotion)}
          >
            Мы можем много рассказать о подходе, но клиенты говорят сами
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(1.25rem,2.5vw,2rem)]">
            {caseTestimonials.map((item, index) => (
              <motion.blockquote
                key={item.company}
                className="m-0 p-[clamp(1.5rem,3vw,2rem)] rounded-[1.25rem] bg-muted/50 border border-border/40"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={reveal(index * 0.06, !!reducedMotion)}
              >
                <p className="text-[clamp(1rem,1.2vw,1.125rem)] leading-[1.65] text-foreground mb-5">
                  «{item.quote}»
                </p>
                <footer className="flex flex-col gap-1 not-italic">
                  <cite className="text-[0.9375rem] font-semibold not-italic text-foreground">
                    {item.author}
                  </cite>
                  <span className="text-[0.8125rem] text-muted-foreground">{item.company}</span>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </section>

        <section className={siteContainerClass}>
          <motion.div
            className="group grid grid-cols-1 lg:grid-cols-2 items-center gap-[clamp(2rem,4vw,4rem)] mb-[clamp(5rem,8vw,9rem)]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={reveal(0, !!reducedMotion)}
          >
            <motion.div
              className={cn(
                'relative aspect-[4/3] overflow-hidden rounded-[1.25rem]',
                'bg-gradient-to-br from-muted via-card to-primary/15',
                'transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.02]',
                'after:content-[""] after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_30%_70%,hsl(var(--primary)/0.25),transparent_60%)]',
              )}
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
            />

            <div>
              <p className="text-label uppercase text-foreground mb-6">Подход</p>
              <h2 className="text-display-lg text-foreground mb-6">Как мы работаем</h2>
              <p className="text-body-lg text-muted-foreground mb-8 max-w-lg">
                Мы не работаем за вас, а вместе с вами. Проектируем решение, показываем
                логику и объясняем каждый шаг. Не «кнопка здесь, поле там» — а система,
                которая складывается в целое.
              </p>
              <Link to="/process" className={cn(btnLinkArrowClass, 'text-foreground')}>
                Узнать о процессе
                <span className={btnLinkArrowIconClass} aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </motion.div>
        </section>

        <section className={cn(siteContainerClass, 'pb-20 md:pb-28')}>
          <motion.div
            className="relative overflow-hidden rounded-[1.25rem] bg-primary text-[#f5f0e8] text-center px-[clamp(1.5rem,4vw,4rem)] py-[clamp(3rem,6vw,6rem)]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={reveal(0, !!reducedMotion)}
          >
            <h2 className="text-display-lg leading-[1.1] mb-5 max-w-[40rem] mx-auto">
              Готовы к такому же результату?
            </h2>
            <p className="text-[clamp(1rem,1.2vw,1.25rem)] leading-relaxed opacity-90 max-w-[32rem] mx-auto mb-10">
              Расскажите о задаче — на бесплатной консультации разберём, что подойдёт
              именно вам, и назовём сроки.
            </p>
            <PrimaryButton to="/contacts">Оставить заявку</PrimaryButton>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Cases;
