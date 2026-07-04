import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageLoader from '@/components/PageLoader';
import PrimaryButton from '@/components/PrimaryButton';
import StudioPageHero from '@/components/StudioPageHero';
import PageSectionNav from '@/components/PageSectionNav';
import { teamPageSections } from '@/data/pageSections/team';
import { pageReveal } from '@/lib/pageMotion';

const values = [
  {
    step: '01',
    title: 'Прозрачность',
    text: 'Объясняем каждый шаг, показываем прогресс и не прячем риски за красивыми презентациями.',
  },
  {
    step: '02',
    title: 'Системность',
    text: 'Собираем решения в единую архитектуру, а не набор разрозненных инструментов.',
  },
  {
    step: '03',
    title: 'Результат',
    text: 'Фиксируем KPI до старта и измеряем эффект после запуска — в цифрах, а не в словах.',
  },
];

const Team = () => {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    document.title = 'Команда — Agyra';
  }, []);

  return (
    <div className="site-canvas site-canvas--services min-h-screen">
      <div className="site-section services-page">
        <Header />
        <PageLoader />

        <StudioPageHero
          heroId="team-hero"
          title="Команда, которая собирает системы, которые работают"
          reducedMotion={!!reducedMotion}
        />

        <main className="services-page__main">
          <section
            className="site-container services-product-section page-section"
            id="team-about"
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={pageReveal(0, !!reducedMotion)}
            >
              <p className="services-v2-section-label">
                <span className="services-v2-section-label__slash">/</span>
                <span>О нас</span>
              </p>
              <h2 className="services-v2-section-title">Люди за Agyra</h2>
              <p className="services-v2-hero__intro">
                Мы — команда аналитиков, инженеров и продуктовых специалистов. Строим
                автоматизацию и ИИ-инструменты, которые реально экономят время и масштабируют
                бизнес без хаоса.
              </p>
            </motion.div>
          </section>

          <section
            className="site-container services-v2-process page-section"
            id="team-values"
          >
            <motion.div
              className="services-v2-process__header"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={pageReveal(0, !!reducedMotion)}
            >
              <div>
                <p className="services-v2-section-label">Ценности</p>
                <h2 className="services-v2-section-title">Как мы работаем внутри</h2>
                <p className="services-v2-process__intro">
                  Те же принципы, с которыми мы заходим в проекты клиентов — честность,
                  структура и измеримый результат.
                </p>
              </div>
            </motion.div>

            <div className="services-v2-process__grid">
              {values.map((item, index) => (
                <motion.article
                  key={item.step}
                  className="services-v2-process__card"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={pageReveal(index * 0.06, !!reducedMotion)}
                >
                  <span className="services-v2-process__step">{item.step}</span>
                  <h3 className="services-v2-process__card-title">{item.title}</h3>
                  <p className="services-v2-process__card-text">{item.text}</p>
                </motion.article>
              ))}
            </div>
          </section>

          <section
            className="site-container pb-20 md:pb-28 page-section"
            id="team-cta"
          >
            <motion.div
              className="services-page-cta"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={pageReveal(0, !!reducedMotion)}
            >
              <h2 className="services-page-cta__title">Хотите познакомиться ближе?</h2>
              <p className="services-page-cta__text">
                Расскажем, кто будет вести ваш проект, и подберём команду под задачу на
                бесплатной консультации.
              </p>
              <PrimaryButton to="/contacts">Связаться с нами</PrimaryButton>
            </motion.div>
          </section>
        </main>
      </div>

      <Footer />
      <PageSectionNav sections={teamPageSections} reducedMotion={!!reducedMotion} />
    </div>
  );
};

export default Team;
