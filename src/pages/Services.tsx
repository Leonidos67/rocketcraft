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
  const { categoryId } = useParams();
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
    <div className="site-canvas site-canvas--services min-h-screen">
      <div className="site-section services-page">
        <Header />
        <PageLoader />

        <StudioPageHero
          heroId="services-hero"
          title="Система, которая масштабирует бизнес без хаоса"
          reducedMotion={!!reducedMotion}
        />

        <main className="services-page__main">
          <section
            ref={catalogRef}
            className="site-container services-product-section page-section"
            id="services-detail"
          >
            <motion.div
              className="services-product-section__header"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={reveal(0, !!reducedMotion)}
            >
              <p className="services-v2-section-label">
                <span className="services-v2-section-label__slash">/</span>
                <span>Каталог</span>
              </p>
              <h2 className="services-v2-section-title">Услуги и цены</h2>
            </motion.div>

            <ServicesCatalog
              directions={servicesByDirection}
              initialDirectionId={categoryId}
              reducedMotion={!!reducedMotion}
            />
          </section>

          <section
            className="site-container services-v2-process page-section"
            id="services-process"
          >
            <motion.div
              className="services-v2-process__header"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={reveal(0, !!reducedMotion)}
            >
              <div>
                <p className="services-v2-section-label">Подход</p>
                <h2 className="services-v2-section-title">Как мы работаем</h2>
                <p className="services-v2-process__intro">
                  Проектируем решение вместе с вами: объясняем логику, показываем каждый шаг
                  и собираем систему, а не набор разрозненных инструментов.
                </p>
              </div>
              <Link to="/process" className="btn-link-arrow text-foreground shrink-0">
                Полный процесс
              </Link>
            </motion.div>

            <div className="services-v2-process__grid">
              {processPoints.map((point, index) => (
                <motion.article
                  key={point.step}
                  className="services-v2-process__card"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={reveal(index * 0.06, !!reducedMotion)}
                >
                  <span className="services-v2-process__step">{point.step}</span>
                  <h3 className="services-v2-process__card-title">{point.title}</h3>
                  <p className="services-v2-process__card-text">{point.text}</p>
                </motion.article>
              ))}
            </div>
          </section>

          <section
            className="site-container pb-20 md:pb-28 page-section"
            id="services-cta"
          >
            <motion.div
              className="services-page-cta"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={reveal(0, !!reducedMotion)}
            >
              <h2 className="services-page-cta__title">Готовы собрать систему под ваш бизнес?</h2>
              <p className="services-page-cta__text">
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
