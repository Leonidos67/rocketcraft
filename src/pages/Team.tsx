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
import {
  heroIntroClass,
  pageCtaClass,
  pageCtaTextClass,
  pageCtaTitleClass,
  processCardClass,
  processCardTextClass,
  processCardTitleClass,
  processIntroClass,
  processSectionClass,
  processStepClass,
  productSectionClass,
  sectionLabelClass,
  sectionLabelSlashClass,
  sectionTitleClass,
} from '@/lib/studioPageStyles';
import {
  pageSectionClass,
  siteCanvasServicesClass,
  siteContainerClass,
  siteSectionClass,
} from '@/lib/layoutStyles';
import { cn } from '@/lib/utils';

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
    <div className={cn(siteCanvasServicesClass, 'min-h-screen')}>
      <div className={siteSectionClass}>
        <Header />
        <PageLoader />

        <StudioPageHero
          heroId="team-hero"
          title="Команда, которая собирает системы, которые работают"
          reducedMotion={!!reducedMotion}
        />

        <main className="m-0 p-0">
          <section
            className={cn(siteContainerClass, pageSectionClass, productSectionClass)}
            id="team-about"
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={pageReveal(0, !!reducedMotion)}
            >
              <p className={cn(sectionLabelClass, 'mt-[clamp(2rem,4vw,3rem)]')}>
                <span className={sectionLabelSlashClass}>/</span>
                <span>О нас</span>
              </p>
              <h2 className={sectionTitleClass}>Люди за Agyra</h2>
              <p className={heroIntroClass}>
                Мы — команда аналитиков, инженеров и продуктовых специалистов. Строим
                автоматизацию и ИИ-инструменты, которые реально экономят время и масштабируют
                бизнес без хаоса.
              </p>
            </motion.div>
          </section>

          <section
            className={cn(siteContainerClass, pageSectionClass, processSectionClass)}
            id="team-values"
          >
            <motion.div
              className="mb-[clamp(2rem,4vw,3rem)] flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={pageReveal(0, !!reducedMotion)}
            >
              <div>
                <p className={sectionLabelClass}>Ценности</p>
                <h2 className={sectionTitleClass}>Как мы работаем внутри</h2>
                <p className={processIntroClass}>
                  Те же принципы, с которыми мы заходим в проекты клиентов — честность,
                  структура и измеримый результат.
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-[clamp(1rem,2vw,1.25rem)] md:grid-cols-3">
              {values.map((item, index) => (
                <motion.article
                  key={item.step}
                  className={processCardClass}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={pageReveal(index * 0.06, !!reducedMotion)}
                >
                  <span className={processStepClass}>{item.step}</span>
                  <h3 className={processCardTitleClass}>{item.title}</h3>
                  <p className={processCardTextClass}>{item.text}</p>
                </motion.article>
              ))}
            </div>
          </section>

          <section className={cn(siteContainerClass, pageSectionClass, 'pb-20 md:pb-28')} id="team-cta">
            <motion.div
              className={pageCtaClass}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={pageReveal(0, !!reducedMotion)}
            >
              <h2 className={pageCtaTitleClass}>Хотите познакомиться ближе?</h2>
              <p className={pageCtaTextClass}>
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
