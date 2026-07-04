import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, ClipboardList, Link2, Rocket, Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageLoader from '@/components/PageLoader';
import PrimaryButton from '@/components/PrimaryButton';
import ProcessStepsShowcase from '@/components/process/ProcessStepsShowcase';
import type { ProcessStepItem } from '@/components/process/ProcessStepsShowcase';
import PageSectionNav from '@/components/PageSectionNav';
import Beams from '@/components/Beams';
import { processPageSections } from '@/data/pageSections/process';
import { pageReveal } from '@/lib/pageMotion';

const steps: ProcessStepItem[] = [
  {
    step: '01',
    shortTitle: 'Диагностика',
    title: 'Глубокая диагностика',
    text: 'Проводим аудит бизнеса, анализируем процессы, выявляем точки роста и автоматизации. На выходе — карта процессов и рекомендации.',
    icon: Search,
    gradientClass: 'bg-gradient-to-r from-[#f59e0b] via-[#fcd34d] to-[#fef9c3]',
  },
  {
    step: '02',
    shortTitle: 'Планирование',
    title: 'Стратегическое планирование',
    text: 'Разрабатываем стратегию автоматизации с учётом специфики вашего бизнеса: сроки, бюджет, KPI и пошаговый план реализации.',
    icon: ClipboardList,
    gradientClass: 'bg-gradient-to-r from-[#fef08a] via-[#84cc16] to-[#16a34a]',
  },
  {
    step: '03',
    shortTitle: 'Интеграция',
    title: 'Интеграция и настройка',
    text: 'Внедряем инструменты, настраиваем интеграции и обучаем команду. Система адаптируется под ваши бизнес-процессы.',
    icon: Link2,
    gradientClass: 'bg-gradient-to-b from-[#db2777] via-[#ef4444] to-[#f97316]',
  },
  {
    step: '04',
    shortTitle: 'Тестирование',
    title: 'Тестирование и отладка',
    text: 'Проверяем систему на реальных сценариях, устраняем ошибки и фиксируем стабильную работу перед запуском.',
    icon: CheckCircle2,
    gradientClass: 'bg-gradient-to-r from-[#d1d5db] via-[#6b7280] to-[#374151]',
  },
  {
    step: '05',
    shortTitle: 'Запуск',
    title: 'Запуск и масштабирование',
    text: 'Плавно запускаем решение, сопровождаем после старта и помогаем масштабировать автоматизацию по мере роста.',
    icon: Rocket,
    gradientClass: 'bg-gradient-to-r from-[#fda4af] to-[#f43f5e]',
  },
];

const Process = () => {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    document.title = 'Процесс работы — Agyra';
  }, []);

  return (
    <div className="site-canvas site-canvas--services min-h-screen">
      <div className="site-section services-page process-page">
        <Header />
        <PageLoader />

        <div
          className="services-viewport-fold process-hero-fold page-hero-fold"
          id="process-intro"
        >
          <motion.section
            className="services-hero process-hero"
            initial="hidden"
            animate="visible"
            variants={pageReveal(0, !!reducedMotion)}
          >
            <div className="site-container services-hero__copy process-hero__copy text-left">
              <div className="process-hero__copy-inner">
                <h1 className="services-hero__title max-w-6xl">
                  Мы выстроили систему автоматизации
                </h1>
                {/* <p className="process-hero__lead">
                  Agyra приносит ясность, а не хаос — объединяем диагностику, проектирование
                  и внедрение в одну адаптивную систему, которая растёт вместе с бизнесом.
                </p> */}
                {/* <PrimaryButton to="/contacts">Обсудить проект</PrimaryButton> */}
              </div>
            </div>

            <div className="process-hero__beams">
              <div className="process-hero__beams-inner">
                <Beams
                  beamWidth={3}
                  beamHeight={30}
                  beamNumber={20}
                  lightColor="#ffffff"
                  speed={2}
                  noiseIntensity={1.75}
                  scale={0.2}
                  rotation={30}
                />
              </div>
            </div>
          </motion.section>
        </div>

        <main className="process-page__main">
          <section
            className="site-container process-steps-section page-section"
            id="process-steps"
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={pageReveal(0, !!reducedMotion)}
            >
              <p className="services-v2-section-label">
                <span className="services-v2-section-label__slash">/</span>
                <span>Этапы</span>
              </p>
              <h2 className="services-v2-section-title">Наш процесс работы</h2>
              <p className="services-v2-process__intro">
                Пять последовательных этапов — от диагностики до масштабирования. Каждый шаг
                прозрачен: вы понимаете, что делаем, зачем и какой результат получите.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={pageReveal(0.08, !!reducedMotion)}
            >
              <ProcessStepsShowcase steps={steps} reducedMotion={!!reducedMotion} />
            </motion.div>
          </section>

          <section
            className="site-container pb-20 md:pb-28 page-section"
            id="process-cta"
          >
            <motion.div
              className="services-page-cta"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={pageReveal(0, !!reducedMotion)}
            >
              <h2 className="services-page-cta__title">Готовы автоматизировать свой бизнес?</h2>
              <p className="services-page-cta__text">
                Запишитесь на бесплатную демо-сессию. За 30 минут покажем, как автоматизация
                решит ваши задачи, и составим индивидуальный план.
              </p>
              <PrimaryButton to="/contacts">Оставить заявку</PrimaryButton>
            </motion.div>
          </section>
        </main>
      </div>

      <Footer />
      <PageSectionNav sections={processPageSections} reducedMotion={!!reducedMotion} />
    </div>
  );
};

export default Process;
