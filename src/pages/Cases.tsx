import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageLoader from '@/components/PageLoader';
import PrimaryButton from '@/components/PrimaryButton';
import CasePortfolioCard from '@/components/CasePortfolioCard';
import {
  caseFilters,
  caseTestimonials,
  filterCases,
  type CaseFilterId,
} from '@/data/caseCards';

const EASE = [0.22, 1, 0.36, 1] as const;

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
          className="site-container cases-page-hero text-center mt-20"
          initial="hidden"
          animate="visible"
          variants={reveal(0, !!reducedMotion)}
        >
          <p className="text-hero-section-label">Кейсы</p>
          <h1 className="text-section-title mt-4 max-w-4xl mx-auto">Это наша работа</h1>
          <p className="cases-page-hero__intro mx-auto mt-6">
            Реальные проекты автоматизации — где каждое решение, каждая интеграция и каждый
            бот решают конкретную бизнес-задачу с измеримым результатом.
          </p>
        </motion.section>

        <section className="site-container cases-page-grid-section">
          <motion.div
            className="cases-filter"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={reveal(0, !!reducedMotion)}
          >
            <p className="cases-filter__label">Фильтр по типу кейса</p>
            <ul className="cases-filter__list" role="list">
              {caseFilters.map((filter) => (
                <li key={filter.id}>
                  <button
                    type="button"
                    className={
                      activeFilter === filter.id
                        ? 'cases-filter__btn cases-filter__btn--active'
                        : 'cases-filter__btn'
                    }
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
            className="cases-grid"
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

        <section className="site-container cases-testimonials">
          <motion.h2
            className="cases-testimonials__title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={reveal(0, !!reducedMotion)}
          >
            Мы можем много рассказать о подходе, но клиенты говорят сами
          </motion.h2>

          <div className="cases-testimonials__grid">
            {caseTestimonials.map((item, index) => (
              <motion.blockquote
                key={item.company}
                className="cases-testimonial"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={reveal(index * 0.06, !!reducedMotion)}
              >
                <p className="cases-testimonial__quote">«{item.quote}»</p>
                <footer className="cases-testimonial__author">
                  <cite>{item.author}</cite>
                  <span>{item.company}</span>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </section>

        <section className="site-container">
          <motion.div
            className="services-aanpak"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={reveal(0, !!reducedMotion)}
          >
            <motion.div
              className="services-aanpak__visual"
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
            />

            <div>
              <p className="text-hero-section-label mb-6">Подход</p>
              <h2 className="text-section-title mb-6">Как мы работаем</h2>
              <p className="text-section-subtitle mb-8 max-w-lg">
                Мы не работаем за вас, а вместе с вами. Проектируем решение, показываем
                логику и объясняем каждый шаг. Не «кнопка здесь, поле там» — а система,
                которая складывается в целое.
              </p>
              <Link to="/process" className="btn-link-arrow text-foreground">
                Узнать о процессе
              </Link>
            </div>
          </motion.div>
        </section>

        <section className="site-container pb-20 md:pb-28">
          <motion.div
            className="services-page-cta"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={reveal(0, !!reducedMotion)}
          >
            <h2 className="services-page-cta__title">Готовы к такому же результату?</h2>
            <p className="services-page-cta__text">
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
