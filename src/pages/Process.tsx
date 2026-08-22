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
import {
  oiHeadingClass,
  pageCtaClass,
  pageCtaTextClass,
  pageCtaTitleClass,
  processIntroClass,
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
    <div className={cn(siteCanvasServicesClass, 'min-h-screen')}>
      <div className={siteSectionClass}>
        <Header />
        <PageLoader />

        <div
          className="shrink-0 h-[var(--services-viewport-fold-height)] overflow-hidden scroll-mt-0"
          id="process-intro"
        >
          <motion.section
            className="relative m-0 h-full w-full overflow-hidden p-0"
            initial="hidden"
            animate="visible"
            variants={pageReveal(0, !!reducedMotion)}
          >
            <div className={cn(siteContainerClass, 'absolute inset-x-0 top-0 z-[1] flex h-1/2 min-h-0 flex-col justify-end pb-0 text-left')}>
              <div className="mb-[clamp(1rem,2.5vw,1.75rem)] flex w-full max-w-[42rem] flex-col items-start gap-[clamp(0.85rem,2vw,1.25rem)]">
                <h1
                  className={cn(
                    oiHeadingClass,
                    'm-0 mb-0 max-w-6xl text-[clamp(1.75rem,3.333vw,4rem)] leading-[1.1] text-foreground'
                  )}
                >
                  Мы выстроили систему автоматизации
                </h1>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 z-0 h-1/2 min-h-0 overflow-hidden">
              <div className="h-full w-full [&_canvas]:block [&_canvas]:!h-full [&_canvas]:!w-full">
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

        <main className="m-0 p-0">
          <section
            className={cn(siteContainerClass, pageSectionClass, 'mb-[clamp(4rem,8vw,7rem)] pt-[clamp(2.5rem,5vw,4rem)]')}
            id="process-steps"
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={pageReveal(0, !!reducedMotion)}
            >
              <p className={sectionLabelClass}>
                <span className={sectionLabelSlashClass}>/</span>
                <span>Этапы</span>
              </p>
              <h2 className={cn(sectionTitleClass, 'mb-0')}>Наш процесс работы</h2>
              <p className={cn(processIntroClass, 'mb-[clamp(1.5rem,3vw,2.5rem)]')}>
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

          <section className={cn(siteContainerClass, pageSectionClass, 'pb-20 md:pb-28')} id="process-cta">
            <motion.div
              className={pageCtaClass}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={pageReveal(0, !!reducedMotion)}
            >
              <h2 className={pageCtaTitleClass}>Готовы автоматизировать свой бизнес?</h2>
              <p className={pageCtaTextClass}>
                Запишитесь на бесплатную демо-сессию. За 15 минут покажем, как автоматизация
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
