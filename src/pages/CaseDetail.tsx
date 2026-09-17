import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageLoader from '@/components/PageLoader';
import { getCasePortfolioItem } from '@/data/caseCards';
import { pageReveal } from '@/lib/pageMotion';
import {
  pageSectionClass,
  siteCanvasServicesClass,
  siteContainerClass,
  siteSectionClass,
} from '@/lib/layoutStyles';
import { cn } from '@/lib/utils';

const scoreRows = [
  { key: 'design' as const, label: 'Дизайн', weight: '40%' },
  { key: 'usability' as const, label: 'Юзабилити', weight: '30%' },
  { key: 'creativity' as const, label: 'Креатив', weight: '20%' },
  { key: 'content' as const, label: 'Контент', weight: '10%' },
];

const CaseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const reducedMotion = useReducedMotion();
  const item = id ? getCasePortfolioItem(id) : undefined;
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    document.title = item ? `${item.title} — Agyra` : 'Кейс — Agyra';
  }, [item]);

  useEffect(() => {
    setSlide(0);
  }, [item?.id]);

  if (!item) {
    return (
      <div className={cn(siteCanvasServicesClass, 'min-h-screen')}>
        <div className={siteSectionClass}>
          <Header />
          <PageLoader />
          <div
            className={cn(
              siteContainerClass,
              'flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20',
            )}
          >
            <h1 className="m-0 text-2xl font-semibold tracking-tight">Кейс не найден</h1>
            <Link
              to="/cases"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0066cc] no-underline"
            >
              <ArrowLeft className="h-4 w-4" />К работам
            </Link>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  const visitHref = item.siteUrl ?? item.liveUrl;
  const demoHref = item.liveUrl;
  const visitIsExternal = Boolean(visitHref?.startsWith('http'));
  const gallery = item.gallery;
  const current = gallery[slide] ?? gallery[0];
  const goPrev = () => setSlide((i) => (i - 1 + gallery.length) % gallery.length);
  const goNext = () => setSlide((i) => (i + 1) % gallery.length);

  return (
    <div className={cn(siteCanvasServicesClass, 'min-h-screen')}>
      <div className={siteSectionClass}>
        <Header />
        <PageLoader />

        <main>
          <section
            id="case-hero"
            className="relative flex min-h-[calc(100svh-2*var(--site-frame-gap,0.75rem))] flex-col bg-[#0a0a0a] text-white"
          >
            <div
              className={cn(
                siteContainerClass,
                'flex flex-1 flex-col pt-[max(1.25rem,env(safe-area-inset-top))] pb-8 sm:pb-10',
              )}
            >
              <motion.div
                className="flex flex-wrap items-center justify-between gap-3 py-4 sm:py-5"
                initial="hidden"
                animate="visible"
                variants={pageReveal(0, !!reducedMotion)}
              >
                <Link
                  to="/cases"
                  className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-white/55 no-underline transition-colors hover:text-white"
                >
                  <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.25} />
                  Работы
                </Link>

                <div className="flex flex-wrap items-center gap-2">
                  {demoHref ? (
                    <a
                      href={demoHref}
                      className={cn(
                        'inline-flex h-9 items-center gap-1.5 rounded-full border border-white/15',
                        'bg-white/[0.06] px-3.5 text-[0.8125rem] font-semibold text-white no-underline',
                        'transition-colors hover:bg-white/[0.12]',
                      )}
                    >
                      Демо
                      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.25} />
                    </a>
                  ) : null}
                  {visitHref ? (
                    <a
                      href={visitHref}
                      target={visitIsExternal ? '_blank' : undefined}
                      rel={visitIsExternal ? 'noopener noreferrer' : undefined}
                      className={cn(
                        'inline-flex h-9 items-center gap-1.5 rounded-full border-none',
                        'bg-white px-3.5 text-[0.8125rem] font-semibold text-black no-underline',
                        'transition-opacity hover:opacity-90',
                      )}
                    >
                      Сайт
                      <ExternalLink className="h-3.5 w-3.5" strokeWidth={2.25} />
                    </a>
                  ) : null}
                </div>
              </motion.div>

              <motion.div
                className="mb-5 sm:mb-6"
                initial="hidden"
                animate="visible"
                variants={pageReveal(0.04, !!reducedMotion)}
              >
                <p className="m-0 text-[0.75rem] font-medium uppercase tracking-[0.14em] text-white/40">
                  {item.industry}
                </p>
                <h1
                  className={cn(
                    'm-0 mt-2 max-w-[18ch] text-[clamp(1.75rem,4.5vw,3.5rem)] font-semibold',
                    'leading-[1.05] tracking-[-0.035em] text-white',
                  )}
                >
                  {item.title}
                </h1>
              </motion.div>

              <motion.div
                className="relative mt-auto min-h-[52vh] flex-1 overflow-hidden rounded-[1.25rem] sm:min-h-[58vh] sm:rounded-[1.5rem]"
                initial="hidden"
                animate="visible"
                variants={pageReveal(0.08, !!reducedMotion)}
              >
                <img
                  src={item.heroImage}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />
              </motion.div>
            </div>
          </section>

          <section
            className={cn(pageSectionClass, siteContainerClass, 'py-14 sm:py-20 md:py-24')}
          >
            <div className="mx-auto flex max-w-3xl flex-col gap-14 sm:gap-16 md:gap-20">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={pageReveal(0, !!reducedMotion)}
              >
                <h2 className="m-0 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-black/35">
                  Описание
                </h2>
                <p className="m-0 mt-4 text-[clamp(1.125rem,2vw,1.375rem)] leading-[1.6] tracking-[-0.015em] text-foreground">
                  {item.description}
                </p>
                <p className="m-0 mt-5 text-[0.875rem] leading-relaxed text-black/40">
                  {item.serviceTags.join(' · ')}
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={pageReveal(0.04, !!reducedMotion)}
              >
                <h2 className="m-0 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-black/35">
                  Палитра
                </h2>
                <p className="m-0 mt-2 text-[0.9375rem] text-black/50">
                  В проекте {item.colors.length} цвета
                </p>
                <ul className="m-0 mt-5 flex list-none flex-col gap-3 p-0">
                  {item.colors.map((swatch) => (
                    <li key={swatch.hex} className="flex items-center gap-3">
                      <span
                        className="h-11 w-11 shrink-0 rounded-xl border border-black/[0.06]"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <div className="min-w-0">
                        <p className="m-0 font-mono text-[0.8125rem] font-medium tracking-tight text-foreground">
                          HEX {swatch.hex}
                        </p>
                        {swatch.label ? (
                          <p className="m-0 text-[0.75rem] text-black/40">{swatch.label}</p>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={pageReveal(0.06, !!reducedMotion)}
              >
                <h2 className="m-0 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-black/35">
                  Технологии
                </h2>
                <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0">
                  {item.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full bg-black/[0.04] px-3 py-1.5 text-[0.8125rem] font-medium text-black/70"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={pageReveal(0.08, !!reducedMotion)}
              >
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h2 className="m-0 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-black/35">
                      Внутри проекта
                    </h2>
                    <p className="m-0 mt-2 text-[0.9375rem] text-black/50">
                      {current?.label ?? 'Галерея экранов'}
                    </p>
                  </div>
                  <p className="m-0 font-mono text-[0.8125rem] text-black/35">
                    {slide + 1} / {gallery.length}
                  </p>
                </div>

                <div className="relative mt-6 overflow-hidden rounded-[1.25rem] bg-black/[0.04] sm:rounded-[1.5rem]">
                  <div className="relative aspect-[16/10]">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.img
                        key={current?.src ?? slide}
                        src={current?.src}
                        alt={current?.label ?? ''}
                        initial={
                          reducedMotion ? false : { opacity: 0, x: 24 }
                        }
                        animate={{ opacity: 1, x: 0 }}
                        exit={reducedMotion ? undefined : { opacity: 0, x: -24 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 h-full w-full object-cover object-top"
                      />
                    </AnimatePresence>
                  </div>

                  {gallery.length > 1 ? (
                    <>
                      <button
                        type="button"
                        onClick={goPrev}
                        aria-label="Предыдущий кадр"
                        className={cn(
                          'absolute left-3 top-1/2 z-[1] flex h-10 w-10 -translate-y-1/2 cursor-pointer',
                          'items-center justify-center rounded-full border-none bg-white/90 text-black',
                          'shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-opacity hover:bg-white',
                        )}
                      >
                        <ChevronLeft className="h-5 w-5" strokeWidth={2.25} />
                      </button>
                      <button
                        type="button"
                        onClick={goNext}
                        aria-label="Следующий кадр"
                        className={cn(
                          'absolute right-3 top-1/2 z-[1] flex h-10 w-10 -translate-y-1/2 cursor-pointer',
                          'items-center justify-center rounded-full border-none bg-white/90 text-black',
                          'shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-opacity hover:bg-white',
                        )}
                      >
                        <ChevronRight className="h-5 w-5" strokeWidth={2.25} />
                      </button>
                    </>
                  ) : null}
                </div>

                {gallery.length > 1 ? (
                  <div className="mt-4 flex justify-center gap-2">
                    {gallery.map((shot, index) => (
                      <button
                        key={shot.src + shot.label}
                        type="button"
                        aria-label={`Кадр ${index + 1}`}
                        aria-current={index === slide}
                        onClick={() => setSlide(index)}
                        className={cn(
                          'h-1.5 cursor-pointer rounded-full border-none transition-all duration-300',
                          index === slide
                            ? 'w-6 bg-black'
                            : 'w-1.5 bg-black/20 hover:bg-black/40',
                        )}
                      />
                    ))}
                  </div>
                ) : null}
              </motion.div>

              <motion.div
                className="rounded-[1.5rem] border border-black/[0.06] bg-[#fafafa] p-6 sm:p-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={pageReveal(0.1, !!reducedMotion)}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="m-0 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-black/35">
                    Оценка
                  </h2>
                  <p className="m-0 font-mono text-[1.5rem] font-semibold tracking-tight text-foreground">
                    → {item.scores.overall.toFixed(2)}
                    <span className="text-black/30"> / 10</span>
                  </p>
                </div>
                <p className="m-0 mt-2 text-[0.8125rem] text-black/40">Система оценки</p>

                <ul className="m-0 mt-8 flex list-none flex-col gap-5 p-0">
                  {scoreRows.map((row) => {
                    const value = item.scores[row.key];
                    return (
                      <li key={row.key}>
                        <div className="mb-2 flex items-center justify-between gap-3 text-[0.875rem]">
                          <span className="font-medium text-foreground">
                            {row.label}
                            <span className="ml-2 text-black/30">{row.weight}</span>
                          </span>
                          <span className="font-mono text-black/55">
                            {value.toFixed(2)} / 10
                          </span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-black/[0.06]">
                          <div
                            className="h-full rounded-full bg-black"
                            style={{ width: `${(value / 10) * 100}%` }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default CaseDetail;
