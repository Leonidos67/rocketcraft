import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, Pencil, Search, Sparkles, X } from 'lucide-react';
import GradualBlur from '@/components/ui/GradualBlur';
import Grainient from '@/components/ui/Grainient';
import PreviewAiAdvisor from '@/components/PreviewAiAdvisor';
import { SaasPreviewCard } from '@/components/SaasPreviewCard';
import {
  saasPreviewCatalog,
  previewSections,
  type PreviewSectionId,
  type SaasPreviewItem,
} from '@/data/saasPreviewCatalog';
import {
  readProductPreviewCompany,
  saveProductPreviewCompany,
  type ProductPreviewCompany,
} from '@/lib/productPreviewCompany';
import {
  formatProductPreviewLeadMessage,
  sendTelegramLead,
} from '@/lib/telegramLead';
import { cn } from '@/lib/utils';

type CatalogSectionFilter = 'all' | PreviewSectionId;

/** Временно скрыто — вернуть true, чтобы снова показать launch-видео. */
const SHOW_CATALOG_VIDEO = false;

const catalogFilters: { id: CatalogSectionFilter; label: string; description: string }[] = [
  {
    id: 'all',
    label: 'Все',
    description: 'SaaS, боты, сайты — и кастом под ваш процесс',
  },
  ...previewSections,
];

const shuffleItems = <T,>(items: T[]): T[] => {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const current = next[i];
    next[i] = next[j]!;
    next[j] = current!;
  }
  return next;
};

const itemSearchText = (item: SaasPreviewItem) =>
  [
    item.id,
    item.title,
    item.category,
    item.description,
    item.longDescription,
    item.solves,
    item.audience,
    item.appLabel,
    item.priceFrom,
    item.priceFromTilda,
    item.priceNote,
    item.priceNoteTilda,
    item.section,
    item.mvpTitle,
    ...item.tags,
    ...item.whatsInside,
    ...(item.howItWorks ?? []),
    ...(item.mvpIncludes ?? []),
    ...(item.extras ?? []),
    ...item.demoPages.map((page) => `${page.label} ${page.caption ?? ''}`),
  ]
    .join(' ')
    .toLowerCase();

const matchesCatalogSearch = (item: SaasPreviewItem, query: string) => {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;
  return itemSearchText(item).includes(normalized);
};

const nonCustomCatalog = saasPreviewCatalog.filter((item) => !item.isCustom);

const emptyCompany: ProductPreviewCompany = {
  companyName: '',
  productName: '',
  userName: '',
};

const fieldClass = cn(
  'h-12 w-full rounded-2xl border-0 bg-white px-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:h-14',
  'text-base text-foreground placeholder:text-black/35',
  'outline-none transition-[box-shadow] duration-200',
  'focus:shadow-[0_0_0_4px_rgba(0,0,0,0.06)]',
);

const CatalogLaunchVideo = ({ className }: { className?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const play = () => {
      void video.play().catch(() => undefined);
    };
    play();
  }, []);

  return (
    <video
      ref={videoRef}
      className={cn('h-full w-full object-cover', className)}
      src="/saas-launch.mp4"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden
    />
  );
};

const ProductPreview = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'form' | 'catalog'>('form');
  const [form, setForm] = useState<ProductPreviewCompany>(emptyCompany);
  const [error, setError] = useState('');
  const [section, setSection] = useState<CatalogSectionFilter>('all');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [allOrderIds, setAllOrderIds] = useState<string[]>(() =>
    shuffleItems(nonCustomCatalog).map((item) => item.id),
  );
  const prevSectionRef = useRef<CatalogSectionFilter>(section);
  const mainRef = useRef<HTMLElement>(null);
  const [headerScrolled, setHeaderScrolled] = useState(false);

  useEffect(() => {
    document.title = 'Превью вашего продукта — Agyra';
    const stored = readProductPreviewCompany();
    if (stored) {
      setForm(stored);
      setStep('catalog');
    }
  }, []);

  useEffect(() => {
    const prev = prevSectionRef.current;
    prevSectionRef.current = section;
    if (section === 'all' && prev !== 'all') {
      setAllOrderIds(shuffleItems(nonCustomCatalog).map((item) => item.id));
    }
  }, [section]);

  useEffect(() => {
    if (!searchOpen) return;
    searchInputRef.current?.focus();
  }, [searchOpen]);

  const visibleItems = useMemo((): SaasPreviewItem[] => {
    const query = searchQuery.trim();
    const base: SaasPreviewItem[] = query
      ? saasPreviewCatalog
      : section === 'all'
        ? (() => {
            const byId = new Map(nonCustomCatalog.map((item) => [item.id, item]));
            return allOrderIds
              .map((id) => byId.get(id))
              .filter((item): item is SaasPreviewItem => Boolean(item));
          })()
        : saasPreviewCatalog.filter((item) => item.section === section);

    return base.filter((item) => matchesCatalogSearch(item, query));
  }, [section, allOrderIds, searchQuery]);

  const openSmartSearch = () => {
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      searchInputRef.current?.focus();
      return;
    }
    navigate('/ai', { state: { message: trimmed } });
  };

  useEffect(() => {
    const root = mainRef.current;
    if (!root) return;
    const onScroll = () => setHeaderScrolled(root.scrollTop > 8);
    onScroll();
    root.addEventListener('scroll', onScroll, { passive: true });
    return () => root.removeEventListener('scroll', onScroll);
  }, [step]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const companyName = form.companyName.trim();
    const productName = form.productName.trim();
    const userName = form.userName.trim();

    if (!productName) {
      setError('Введите название продукта');
      return;
    }

    if (!userName) {
      setError('Введите имя пользователя');
      return;
    }

    if (!companyName) {
      setError('Введите название компании');
      return;
    }

    const next = { companyName, productName, userName };
    saveProductPreviewCompany(next);
    setForm(next);
    setStep('catalog');

    void sendTelegramLead(formatProductPreviewLeadMessage(next)).catch(() => {
      // Не блокируем переход в каталог, если Telegram недоступен
    });
  };

  return (
    <div
      className={cn(
        'relative flex h-[100svh] max-h-[100svh] flex-col overflow-hidden bg-[#ebebeb] text-black',
        'supports-[height:100dvh]:h-[100dvh] supports-[height:100dvh]:max-h-[100dvh]',
      )}
    >
      <main
        ref={mainRef}
        className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <header
          className={cn(
            'sticky top-0 z-20 flex shrink-0 items-center justify-between px-5 py-3 sm:px-8 sm:py-4',
            'transition-[background-color,backdrop-filter,border-color] duration-200',
            headerScrolled
              ? 'border-b border-black/[0.04] bg-[#ebebeb]/72 backdrop-blur-xl'
              : 'border-b border-transparent bg-transparent',
          )}
        >
          <Link to="/" className="text-sm font-semibold tracking-tight text-black no-underline">
            Agyra
          </Link>
          <div className="flex items-center gap-2">
            {step === 'catalog' && (
              <button
                type="button"
                onClick={() => setStep('form')}
                className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full border-none bg-white/70 px-3 text-sm font-medium text-black/55 transition-colors hover:bg-white hover:text-black"
              >
                <Pencil className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Изменить данные</span>
              </button>
            )}
            <Link
              to="/"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-black/40 no-underline transition-colors hover:bg-black/[0.05] hover:text-black"
              aria-label="Закрыть"
            >
              <X className="h-4 w-4" strokeWidth={2.25} />
            </Link>
          </div>
        </header>

        <div className="flex min-h-0 flex-1 flex-col px-4 pb-4 sm:px-6 sm:pb-6 lg:px-10">
        {step === 'form' ? (
          <section className="mx-auto flex min-h-full w-full max-w-md flex-col justify-center py-8">
            <h1 className="m-0 mb-2 text-[clamp(1.5rem,4.5vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.03em] sm:mb-3">
              Ваш продукт в наших решениях
            </h1>
            <p className="m-0 mb-6 text-sm leading-relaxed text-black/50 sm:mb-8 sm:text-[0.9375rem]">
              Введите название бренда — оно появится в SaaS, ботах и сайтах. AI подскажет, что лучше заказать.
            </p>

            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <input
                type="text"
                value={form.productName}
                onChange={(event) => {
                  setForm((current) => ({ ...current, productName: event.target.value }));
                  if (error) setError('');
                }}
                placeholder="Бренд, напр. BeautyLab"
                className={fieldClass}
                autoFocus
                autoComplete="organization"
              />
              <input
                type="text"
                value={form.companyName}
                onChange={(event) => {
                  setForm((current) => ({ ...current, companyName: event.target.value }));
                  if (error) setError('');
                }}
                placeholder="Компания, напр. ООО «Салон красоты»"
                className={fieldClass}
                autoComplete="organization"
              />
              <input
                type="text"
                value={form.userName}
                onChange={(event) => {
                  setForm((current) => ({ ...current, userName: event.target.value }));
                  if (error) setError('');
                }}
                placeholder="Ваше имя, напр. Анна"
                className={fieldClass}
                autoComplete="name"
              />

              {error && (
                <p className="m-0 px-1 text-sm font-medium text-[#ff643c]" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className={cn(
                  'mt-1 inline-flex h-12 w-full cursor-pointer items-center justify-center gap-1 sm:h-14',
                  'rounded-2xl border-none bg-black text-base font-semibold text-white',
                  'transition-opacity duration-200 hover:opacity-90',
                )}
              >
                Смотреть
                <ChevronRight className="h-4 w-4" />
              </button>
            </form>
          </section>
        ) : (
          <section className="relative mx-auto flex w-full max-w-6xl flex-col gap-3 pb-28 sm:gap-4 sm:pb-32">
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 sm:gap-4">
              {SHOW_CATALOG_VIDEO ? (
                <div className="h-[min(28vh,14rem)] w-full shrink-0 overflow-hidden rounded-[1.25rem] bg-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:h-[min(30vh,16rem)] sm:rounded-[1.5rem]">
                  <CatalogLaunchVideo />
                </div>
              ) : null}
              <PreviewAiAdvisor brand={form.productName} />
            </div>

            <div className="flex flex-col items-stretch gap-y-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-start sm:gap-x-2">
              <div className="flex min-w-0 flex-wrap items-center gap-1.5">
                <div
                  className={cn(
                    'inline-flex h-9 max-w-full items-center overflow-hidden rounded-full bg-white p-0.5',
                    'shadow-[0_1px_2px_rgba(0,0,0,0.04)]',
                    'transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
                    searchOpen ? 'w-full sm:w-[min(100%,22rem)]' : 'w-fit',
                  )}
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (searchOpen) {
                        setSearchOpen(false);
                        setSearchQuery('');
                      } else {
                        setSearchOpen(true);
                      }
                    }}
                    aria-label={searchOpen ? 'Закрыть поиск' : 'Открыть поиск'}
                    className={cn(
                      'inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border-none',
                      'bg-transparent text-black/55',
                      'transition-colors hover:bg-black/[0.06] hover:text-black',
                    )}
                  >
                    {searchOpen ? (
                      <X className="h-3.5 w-3.5" strokeWidth={2.25} />
                    ) : (
                      <Search className="h-3.5 w-3.5" strokeWidth={2.25} />
                    )}
                  </button>

                  <div className="relative flex h-8 min-w-0 flex-1 items-center overflow-hidden">
                    <AnimatePresence mode="wait" initial={false}>
                      {searchOpen ? (
                        <motion.div
                          key="catalog-search"
                          initial={{ opacity: 0, x: -28 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -16 }}
                          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                          className="flex h-8 w-full min-w-0 items-center gap-1"
                        >
                          <input
                            ref={searchInputRef}
                            type="search"
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            onKeyDown={(event) => {
                              if (event.key === 'Escape') {
                                if (searchQuery) setSearchQuery('');
                                else {
                                  setSearchOpen(false);
                                  setSearchQuery('');
                                }
                              }
                              if (event.key === 'Enter') openSmartSearch();
                            }}
                            placeholder="Поиск по каталогу…"
                            className={cn(
                              'min-w-0 flex-1 border-none bg-transparent px-2 text-xs font-medium text-black outline-none',
                              'placeholder:text-black/35',
                            )}
                          />
                          <button
                            type="button"
                            onClick={openSmartSearch}
                            className={cn(
                              'relative inline-flex h-7 shrink-0 cursor-pointer items-center gap-1 overflow-hidden rounded-full border-none',
                              'px-2.5 text-[0.6875rem] font-semibold text-white',
                              'transition-opacity hover:opacity-95',
                            )}
                          >
                            <span className="pointer-events-none absolute inset-0" aria-hidden>
                              <Grainient
                                color1="#FF9FFC"
                                color2="#5227FF"
                                color3="#B497CF"
                                timeSpeed={0.25}
                                colorBalance={0}
                                warpStrength={1}
                                warpFrequency={5}
                                warpSpeed={2}
                                warpAmplitude={50}
                                blendAngle={0}
                                blendSoftness={0.05}
                                rotationAmount={500}
                                noiseScale={2}
                                grainAmount={0.1}
                                grainScale={2}
                                grainAnimated={false}
                                contrast={1.5}
                                gamma={1}
                                saturation={1}
                                centerX={0}
                                centerY={0}
                                zoom={0.9}
                                className="h-full w-full"
                              />
                            </span>
                            <span className="relative z-[1] inline-flex items-center gap-1 drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]">
                              <Sparkles className="h-3 w-3" strokeWidth={2.25} />
                              Умный поиск
                            </span>
                          </button>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="catalog-filters"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 16 }}
                          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          className="flex h-8 w-fit items-center gap-1"
                        >
                          {catalogFilters.map((entry) => {
                            const active = section === entry.id;
                            const count =
                              entry.id === 'all'
                                ? saasPreviewCatalog.filter((item) => !item.isCustom).length
                                : saasPreviewCatalog.filter((item) => item.section === entry.id)
                                    .length;
                            return (
                              <button
                                key={entry.id}
                                type="button"
                                onClick={() => setSection(entry.id)}
                                className={cn(
                                  'inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full border-none px-3 text-xs font-semibold leading-none transition-colors',
                                  active
                                    ? 'bg-black/[0.08] text-black'
                                    : 'bg-transparent text-black/55 hover:text-black',
                                )}
                              >
                                {entry.label}
                                <span
                                  className={cn(
                                    'rounded-full px-1.5 py-0 text-[0.625rem] font-medium leading-4',
                                    active ? 'bg-black/[0.08] text-black/55' : 'text-black/40',
                                  )}
                                >
                                  {count}
                                </span>
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {!searchOpen ? (
                <>
                  <span className="hidden shrink-0 text-sm text-black/30 sm:inline" aria-hidden>
                    —
                  </span>
                  <p className="m-0 text-left text-sm text-black/45 sm:min-w-0 sm:flex-1">
                    {catalogFilters.find((entry) => entry.id === section)?.description}
                  </p>
                </>
              ) : null}
            </div>

            <div
              className={cn(
                'flex items-stretch gap-3 overflow-x-auto',
                'snap-x snap-mandatory sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:overflow-visible lg:gap-5',
                '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
              )}
            >
              {visibleItems.map((item) => (
                  <div
                    key={item.id}
                    className="w-[min(78vw,22rem)] shrink-0 snap-center sm:w-auto sm:min-w-0"
                  >
                    <SaasPreviewCard
                      item={item}
                      productName={form.productName}
                      onOpen={() => navigate(`/product-preview/${item.id}`)}
                    />
                  </div>
                ))}
            </div>
          </section>
        )}
        </div>
      </main>

      <GradualBlur
        target="parent"
        position="bottom"
        height="7rem"
        strength={5}
        divCount={10}
        curve="bezier"
        exponential
        opacity={1}
      />
    </div>
  );
};

export default ProductPreview;
