import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageLoader from '@/components/PageLoader';
import PrimaryButton from '@/components/PrimaryButton';
import ServicesCatalog from '@/components/services/ServicesCatalog';
import ServicesSidePlaque from '@/components/services/ServicesSidePlaque';
import StudioPageHero from '@/components/StudioPageHero';
import PageSectionNav from '@/components/PageSectionNav';
import { servicesPageSections } from '@/data/pageSections/services';
import { servicesByDirection } from '@/data/servicesByDirection';
import { pageReveal } from '@/lib/pageMotion';
import {
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
  btnLinkArrowClass,
  pageSectionClass,
  siteCanvasServicesClass,
  siteContainerClass,
  siteSectionClass,
} from '@/lib/layoutStyles';
import { cn } from '@/lib/utils';

const reveal = pageReveal;

const processPoints = [
  {
    step: '01',
    title: 'Диагностика',
    text: 'Разбираем процессы, находим узкие места и формируем план внедрения.',
  },
  {
    step: '02',
    title: 'Проектирование',
    text: 'Собираем архитектуру решения и согласовываем сроки, бюджет и KPI.',
  },
  {
    step: '03',
    title: 'Запуск',
    text: 'Внедряем, тестируем, обучаем команду и сопровождаем после старта.',
  },
];

const Services = () => {
  const { slug: categoryId } = useParams<{ slug?: string }>();
  const reducedMotion = useReducedMotion();
  const catalogRef = useRef<HTMLElement>(null);
  const [isCatalogVisible, setIsCatalogVisible] = useState(false);

  useEffect(() => {
    document.title = 'Услуги — Agyra';
  }, []);

  useEffect(() => {
    const node = catalogRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCatalogVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!categoryId) return;
    const t = window.setTimeout(() => {
      catalogRef.current?.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }, 200);
    return () => window.clearTimeout(t);
  }, [categoryId, reducedMotion]);

  return (
    <div className={cn(siteCanvasServicesClass, 'min-h-screen')}>
      <div className={siteSectionClass}>
        <Header />
        <PageLoader />

        <StudioPageHero
          heroId="services-hero"
          title="Система, которая масштабирует бизнес без хаоса"
          reducedMotion={!!reducedMotion}
        />

        <main className="m-0 p-0">
          <section
            ref={catalogRef}
            className={cn(siteContainerClass, pageSectionClass, productSectionClass)}
            id="services-detail"
          >
            <motion.div
              className="mb-2.5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={reveal(0, !!reducedMotion)}
            >
              <p className={cn(sectionLabelClass, 'mt-[clamp(2rem,4vw,3rem)]')}>
                <span className={sectionLabelSlashClass}>/</span>
                <span>Каталог</span>
              </p>
              <h2 className={cn(sectionTitleClass, 'mb-0')}>Услуги и цены</h2>
            </motion.div>

            <ServicesCatalog
              directions={servicesByDirection}
              initialDirectionId={categoryId}
              reducedMotion={!!reducedMotion}
            />
          </section>

          <section
            className={cn(siteContainerClass, pageSectionClass, processSectionClass)}
            id="services-process"
          >
            <motion.div
              className="mb-[clamp(2rem,4vw,3rem)] flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={reveal(0, !!reducedMotion)}
            >
              <div>
                <p className={sectionLabelClass}>Подход</p>
                <h2 className={sectionTitleClass}>Как мы работаем</h2>
                <p className={processIntroClass}>
                  Проектируем решение вместе с вами: объясняем логику, показываем каждый шаг
                  и собираем систему, а не набор разрозненных инструментов.
                </p>
              </div>
              <Link to="/process" className={cn(btnLinkArrowClass, 'shrink-0 text-foreground')}>
                Полный процесс
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 gap-[clamp(1rem,2vw,1.25rem)] md:grid-cols-3">
              {processPoints.map((point, index) => (
                <motion.article
                  key={point.step}
                  className={processCardClass}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={reveal(index * 0.06, !!reducedMotion)}
                >
                  <span className={processStepClass}>{point.step}</span>
                  <h3 className={processCardTitleClass}>{point.title}</h3>
                  <p className={processCardTextClass}>{point.text}</p>
                </motion.article>
              ))}
            </div>
          </section>

          <section className={cn(siteContainerClass, pageSectionClass, 'pb-20 md:pb-28')} id="services-cta">
            <motion.div
              className={pageCtaClass}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={reveal(0, !!reducedMotion)}
            >
              <h2 className={pageCtaTitleClass}>Готовы собрать систему под ваш бизнес?</h2>
              <p className={pageCtaTextClass}>
                Оставьте заявку — на бесплатной консультации разберём задачу,
                предложим архитектуру и назовём сроки без обязательств.
              </p>
              <PrimaryButton to="/contacts">Обсудить проект</PrimaryButton>
            </motion.div>
          </section>
        </main>
      </div>

      <Footer />
      <PageSectionNav sections={servicesPageSections} reducedMotion={!!reducedMotion} />
      <ServicesSidePlaque isCatalogVisible={isCatalogVisible} />
    </div>
  );
};

export default Services;
