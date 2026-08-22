import { ChevronRight } from 'lucide-react';
import type { SaasPreviewItem } from '@/data/saasPreviewCatalog';
import { cn } from '@/lib/utils';

const DeviceMockup = ({
  item,
  productName,
}: {
  item: SaasPreviewItem;
  productName: string;
}) => {
  const isDark = item.theme === 'dark';
  const surface = isDark ? 'bg-white/10' : 'bg-black/[0.06]';
  const surfaceStrong = isDark ? 'bg-white/16' : 'bg-black/[0.09]';
  const textMuted = isDark ? 'text-white/45' : 'text-black/35';

  return (
    <div
      className="relative flex aspect-[4/3] w-full items-end justify-center overflow-hidden px-5 pb-0 pt-6 sm:px-7 sm:pt-8"
      style={{ backgroundColor: item.previewBg }}
    >
      <div
        className={cn(
          'relative flex h-[92%] w-full max-w-[17rem] flex-col overflow-hidden rounded-t-[1.1rem] shadow-[0_-8px_40px_rgba(0,0,0,0.18)]',
          'translate-y-[24%] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform',
          'group-hover:translate-y-[0%] group-focus-within:translate-y-[0%]',
          isDark ? 'bg-[#111]' : 'bg-white',
        )}
      >
        <div
          className={cn(
            'flex shrink-0 items-center gap-2 border-b px-3 py-2.5',
            isDark ? 'border-white/10' : 'border-black/[0.06]',
          )}
        >
          <div className="flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
          </div>
          <div
            className={cn(
              'ml-1 flex min-w-0 flex-1 items-center justify-center rounded-md px-2 py-1',
              isDark ? 'bg-white/10' : 'bg-black/[0.04]',
            )}
          >
            <span
              className={cn(
                'truncate text-[0.625rem] font-semibold tracking-tight',
                isDark ? 'text-white/90' : 'text-black/80',
              )}
            >
              {productName}
            </span>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-2.5 p-3">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'flex h-6 w-6 shrink-0 items-center justify-center rounded-[0.35rem] text-[0.55rem] font-bold uppercase tracking-wide',
                isDark ? 'bg-white text-black' : 'bg-black text-white',
              )}
            >
              {productName.slice(0, 2)}
            </div>
            <span
              className={cn(
                'truncate text-[0.8rem] font-semibold tracking-tight',
                isDark ? 'text-white' : 'text-black',
              )}
            >
              {item.title}
            </span>
          </div>

          {item.id === 'booking' && (
            <div className="grid min-h-0 flex-1 grid-cols-3 gap-1.5">
              {[
                { label: 'Новые', cards: 2 },
                { label: 'В работе', cards: 1 },
                { label: 'Готово', cards: 3 },
              ].map((column) => (
                <div
                  key={column.label}
                  className={cn('flex min-h-0 flex-col gap-1.5 rounded-xl p-1.5', surface)}
                >
                  <span className={cn('truncate text-[0.5rem] font-medium leading-none', textMuted)}>
                    {column.label}
                  </span>
                  <div className="flex flex-col gap-1">
                    {Array.from({ length: column.cards }, (_, index) => (
                      <div
                        key={index}
                        className={cn('h-3.5 rounded-md sm:h-4', surfaceStrong)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {item.id === 'finance' && (
            <div className="flex min-h-0 flex-1 flex-col gap-2">
              <div className="grid grid-cols-3 gap-1.5">
                {[1, 2, 3].map((card) => (
                  <div key={card} className={cn('h-8 rounded-md', surface)} />
                ))}
              </div>
              <div className={cn('flex min-h-0 flex-1 items-end gap-1 rounded-md px-1.5 pb-1.5 pt-2', surface)}>
                {[38, 55, 42, 70, 48, 82, 60, 75].map((height, index) => (
                  <div
                    key={index}
                    className="min-w-0 flex-1 rounded-sm"
                    style={{
                      height: `${height}%`,
                      backgroundColor: isDark ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.18)',
                    }}
                  />
                ))}
              </div>
              <div className="flex items-end gap-0.5 px-0.5">
                <svg viewBox="0 0 80 24" className="h-5 w-full" aria-hidden>
                  <polyline
                    fill="none"
                    stroke={isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.35)'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="0,18 12,14 24,16 36,8 48,11 60,4 72,7 80,2"
                  />
                </svg>
              </div>
            </div>
          )}

          {item.id === 'crm' && (
            <div className="grid min-h-0 flex-1 grid-cols-3 gap-1">
              {[{ cards: 2 }, { cards: 1 }, { cards: 2 }].map((column, columnIndex) => (
                <div
                  key={columnIndex}
                  className={cn('flex min-h-0 flex-col gap-1 rounded-lg p-1', surface)}
                >
                  <div className={cn('h-1 w-8 rounded-full', surfaceStrong)} />
                  {Array.from({ length: column.cards }, (_, index) => (
                    <div
                      key={index}
                      className={cn('rounded-md p-1', isDark ? 'bg-white/10' : 'bg-white')}
                    >
                      <div className={cn('h-1.5 w-full rounded-full', surfaceStrong)} />
                      <div className={cn('mt-1 h-1 w-1/2 rounded-full', surfaceStrong)} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {item.id === 'support' && (
            <div className="flex min-h-0 flex-1 flex-col gap-1.5">
              <div className="flex justify-start">
                <div className={cn('max-w-[78%] rounded-2xl rounded-bl-md px-2 py-1.5', surface)}>
                  <div className={cn('mb-1 h-1.5 w-16 rounded-full', surfaceStrong)} />
                  <div className={cn('h-1.5 w-10 rounded-full', surfaceStrong)} />
                </div>
              </div>
              <div className="flex justify-end">
                <div
                  className={cn(
                    'max-w-[72%] rounded-2xl rounded-br-md px-2 py-1.5',
                    isDark ? 'bg-white/20' : 'bg-black/80',
                  )}
                >
                  <div className="mb-1 h-1.5 w-14 rounded-full bg-white/50" />
                  <div className="h-1.5 w-8 rounded-full bg-white/35" />
                </div>
              </div>
              <div className="flex justify-start">
                <div className={cn('max-w-[70%] rounded-2xl rounded-bl-md px-2 py-1.5', surface)}>
                  <div className={cn('h-1.5 w-12 rounded-full', surfaceStrong)} />
                </div>
              </div>
              <div className="mt-auto flex items-center gap-1.5">
                <div className={cn('h-6 min-w-0 flex-1 rounded-full', surface)} />
                <div
                  className={cn(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
                    isDark ? 'bg-white/25' : 'bg-black',
                  )}
                >
                  <span className="h-1.5 w-1.5 translate-x-[0.5px] rotate-45 border-r border-t border-white" />
                </div>
              </div>
            </div>
          )}

          {!['booking', 'finance', 'crm', 'support'].includes(item.id) && (
            <div className="grid min-h-0 flex-1 grid-cols-2 gap-1.5">
              {[64, 42, 52, 36].map((h, index) => (
                <div
                  key={index}
                  className={cn('rounded-md', surface)}
                  style={{ height: `${h}%`, minHeight: '1.5rem' }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const SaasPreviewCard = ({
  item,
  productName,
  onOpen,
}: {
  item: SaasPreviewItem;
  productName: string;
  onOpen: () => void;
}) => (
  <article
    role="button"
    tabIndex={0}
    onClick={onOpen}
    onKeyDown={(event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onOpen();
      }
    }}
    className="group relative flex cursor-pointer flex-col overflow-hidden rounded-[1.25rem] bg-white sm:rounded-[1.5rem]"
  >
    <DeviceMockup item={item} productName={productName} />

    <div className="relative z-[1] flex flex-col gap-3 bg-white px-4 pb-4 pt-3.5 sm:gap-3.5 sm:px-5 sm:pb-5 sm:pt-4">
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <h3 className="m-0 truncate text-[0.9375rem] font-semibold tracking-[-0.02em] text-black sm:text-base">
          {productName} {item.title}
        </h3>
        {/* <span
          className="inline-flex items-center rounded-md bg-black/[0.06] px-1.5 py-0.5 text-[0.6875rem] font-medium text-black/55"
        >
          #NEW
        </span> */}
        {/* {item.priceNote.map((priceNote) => (
          <span
            key={priceNote}
            className="inline-flex items-center rounded-md bg-black/[0.06] px-1.5 py-0.5 text-[0.6875rem] font-medium text-black/55"
          >
            #NEW
          </span>
        ))} */}
      </div>

      <span className="inline-flex items-center gap-0.5 text-sm font-medium text-black/55 transition-colors group-hover:text-black">
        Смотреть
        <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.25} />
      </span>
    </div>
  </article>
);
