import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Pencil, X } from 'lucide-react';
import GradualBlur from '@/components/ui/GradualBlur';
import { SaasPreviewCard } from '@/components/SaasPreviewCard';
import { saasPreviewCatalog, previewSections, type PreviewSectionId } from '@/data/saasPreviewCatalog';
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

const catalogFilters: { id: CatalogSectionFilter; label: string; description: string }[] = [
  {
    id: 'all',
    label: 'Все',
  },
  ...previewSections,
];

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

  useEffect(() => {
    document.title = 'Превью вашего продукта — Agyra';
    const stored = readProductPreviewCompany();
    if (stored) {
      setForm(stored);
      setStep('catalog');
    }
  }, []);

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
      <header className="relative z-20 flex shrink-0 items-center justify-between px-5 py-3 sm:px-8 sm:py-4">
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

      <main className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden px-4 pb-4 [scrollbar-width:none] sm:px-6 sm:pb-6 lg:px-10 [&::-webkit-scrollbar]:hidden">
        {step === 'form' ? (
          <section className="mx-auto flex min-h-full w-full max-w-md flex-col justify-center py-8">
            <h1 className="m-0 mb-2 text-[clamp(1.5rem,4.5vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.03em] sm:mb-3">
              Ваш продукт в наших решениях
            </h1>
            <p className="m-0 mb-6 text-sm leading-relaxed text-black/50 sm:mb-8 sm:text-[0.9375rem]">
              Введите название бренда — оно появится в SaaS и Telegram-ботах. Так вы увидите, как будет выглядеть ваш продукт.
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
            <div className="mx-auto h-[min(32vh,16rem)] w-full max-w-3xl shrink-0 overflow-hidden rounded-[1.25rem] bg-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:h-[min(34vh,18rem)] sm:rounded-[1.5rem] lg:h-[min(36vh,20rem)]">
              <CatalogLaunchVideo />
            </div>

            <div className="flex flex-col items-center gap-3 sm:gap-4">
              <div className="inline-flex w-fit flex-wrap justify-center gap-1 rounded-full bg-white p-0 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                {catalogFilters.map((entry) => {
                  const active = section === entry.id;
                  const count =
                    entry.id === 'all'
                      ? saasPreviewCatalog.length
                      : saasPreviewCatalog.filter((item) => item.section === entry.id).length;
                  return (
                    <button
                      key={entry.id}
                      type="button"
                      onClick={() => setSection(entry.id)}
                      className={cn(
                        'inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full border-none px-3 text-xs font-semibold transition-colors',
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
              </div>
              <p className="m-0 text-center text-sm text-black/45">
                {catalogFilters.find((entry) => entry.id === section)?.description}
              </p>
            </div>

            <div
              className={cn(
                'flex items-stretch gap-3 overflow-x-auto',
                'snap-x snap-mandatory sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:overflow-visible lg:gap-5',
                '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
              )}
            >
              {saasPreviewCatalog
                .filter((item) => section === 'all' || item.section === section)
                .map((item) => (
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
