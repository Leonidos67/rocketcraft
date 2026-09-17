import { Link, useNavigate } from 'react-router-dom';
import { LayoutGrid } from 'lucide-react';
import { SaasPreviewCard } from '@/components/SaasPreviewCard';
import { getSaasPreviewItem } from '@/data/saasPreviewCatalog';
import { cn } from '@/lib/utils';

const ACCENT = '#c8f000';

const AiDemoSidePanel = ({
  productId,
  productIds,
  brand,
  className,
  onActiveProductChange,
}: {
  productId: string;
  /** Пакет решений — карточки стопкой. */
  productIds?: string[];
  brand: string;
  className?: string;
  onActiveProductChange?: (productId: string) => void;
}) => {
  const navigate = useNavigate();
  const ids =
    productIds && productIds.length > 0
      ? productIds.filter((id) => Boolean(getSaasPreviewItem(id)))
      : productId
        ? [productId]
        : [];

  if (!ids.length) return null;

  const items = ids
    .map((id) => getSaasPreviewItem(id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  if (!items.length) return null;

  const isPackage = items.length > 1;
  const lead = items[0]!;

  return (
    <aside
      className={cn(
        'relative flex h-full min-h-0 w-full flex-col overflow-hidden',
        'rounded-[1.5rem] border border-black/[0.07] bg-white/90 backdrop-blur-2xl',
        'shadow-[0_16px_48px_rgba(0,0,0,0.08)]',
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-80"
        style={{
          background: `radial-gradient(90% 80% at 20% 0%, ${lead.previewBg}88 0%, transparent 70%)`,
        }}
      />

      <div className="relative shrink-0 px-3.5 pb-2 pt-3.5 sm:px-4 sm:pt-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <span
            className="inline-flex items-center rounded-full px-2 py-0.5 text-[0.625rem] font-bold uppercase tracking-[0.06em] text-black"
            style={{ backgroundColor: ACCENT }}
          >
            Демо
          </span>
          {isPackage ? (
            <span className="inline-flex items-center rounded-full bg-black/[0.05] px-2 py-0.5 text-[0.625rem] font-semibold text-black/50">
              Пакет · {items.length}
            </span>
          ) : null}
        </div>
        <p className="m-0 mt-2 text-[0.8125rem] font-medium leading-snug text-black/45">
          {isPackage
            ? 'Рекомендованные решения — нажмите карточку для превью'
            : 'Нажмите карточку, чтобы открыть превью'}
        </p>
      </div>

      <div className="relative min-h-0 flex-1 overflow-y-auto px-3 pb-2 [scrollbar-width:none] sm:px-3.5 [&::-webkit-scrollbar]:hidden">
        <div className="flex flex-col gap-2.5">
          {items.map((item) => (
            <div
              key={item.id}
              className={cn(
                'overflow-hidden rounded-[1.15rem]',
                'ring-1 ring-black/[0.06]',
                'shadow-[0_8px_24px_rgba(0,0,0,0.06)]',
              )}
            >
              <SaasPreviewCard
                item={item}
                productName={brand}
                compact
                onOpen={() => {
                  onActiveProductChange?.(item.id);
                  navigate(`/product-preview/${item.id}`);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="relative shrink-0 border-t border-black/[0.05] bg-[#fafafa]/90 px-3 py-3 backdrop-blur-sm sm:px-3.5 sm:py-3.5">
        <Link
          to="/product-preview"
          className={cn(
            'inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-[0.9rem]',
            'border border-black/[0.07] bg-white text-[0.75rem] font-semibold text-black/60 no-underline',
            'transition-colors hover:border-black/12 hover:bg-[#f5f5f7] hover:text-black',
          )}
        >
          <LayoutGrid className="h-3.5 w-3.5" strokeWidth={2.25} />
          Смотреть весь каталог
        </Link>
      </div>
    </aside>
  );
};

export default AiDemoSidePanel;
