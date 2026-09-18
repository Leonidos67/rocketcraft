import { cn } from '@/lib/utils';

export type NfcCardColor = 'black' | 'white';
export type NfcCardShape = 'rect' | 'round';
export type NfcTapAction = 'whatsapp' | 'site' | 'vcard' | 'telegram';

export const nfcColorOptions: { id: NfcCardColor; label: string }[] = [
  { id: 'black', label: 'Чёрная' },
  { id: 'white', label: 'Белая' },
];

export const nfcShapeOptions: { id: NfcCardShape; label: string }[] = [
  { id: 'rect', label: 'Прямоугольник' },
  { id: 'round', label: 'Круг' },
];

export const nfcActionOptions: { id: NfcTapAction; label: string; hint: string }[] = [
  { id: 'whatsapp', label: 'WhatsApp', hint: 'Открыть чат' },
  { id: 'site', label: 'Сайт', hint: 'Открыть страницу' },
  { id: 'vcard', label: 'Визитка', hint: 'Сохранить контакт' },
  { id: 'telegram', label: 'Telegram', hint: 'Написать в Telegram' },
];

export const nfcColorLabel = (color: NfcCardColor) =>
  nfcColorOptions.find((option) => option.id === color)?.label ?? color;

export const nfcShapeLabel = (shape: NfcCardShape) =>
  nfcShapeOptions.find((option) => option.id === shape)?.label ?? shape;

export const nfcActionLabel = (action: NfcTapAction) =>
  nfcActionOptions.find((option) => option.id === action)?.label ?? action;

const NfcMark = ({ dark }: { dark: boolean }) => (
  <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
    <circle cx="24" cy="24" r="4.2" fill={dark ? '#111' : '#f4f4f4'} />
    <path
      d="M16 24a8 8 0 0 1 16 0"
      fill="none"
      stroke={dark ? '#111' : '#f4f4f4'}
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    <path
      d="M11 24a13 13 0 0 1 26 0"
      fill="none"
      stroke={dark ? '#111' : '#f4f4f4'}
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    <path
      d="M6 24a18 18 0 0 1 36 0"
      fill="none"
      stroke={dark ? '#111' : '#f4f4f4'}
      strokeWidth="2.4"
      strokeLinecap="round"
    />
  </svg>
);

export const NfcPhysicalCard = ({
  color,
  shape,
  brand,
  action,
  compact = false,
}: {
  color: NfcCardColor;
  shape: NfcCardShape;
  brand: string;
  action: NfcTapAction;
  compact?: boolean;
}) => {
  const isBlack = color === 'black';
  const isRound = shape === 'round';
  const actionMeta = nfcActionOptions.find((option) => option.id === action);

  return (
    <div
      className={cn(
        'relative overflow-hidden shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition-[background-color,color,border-radius,width,height] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]',
        isBlack ? 'bg-[#111] text-white' : 'bg-[#f6f6f6] text-[#111]',
        isRound
          ? compact
            ? 'h-[7.4rem] w-[7.4rem] rounded-full'
            : 'h-[13.5rem] w-[13.5rem] rounded-full sm:h-[15.5rem] sm:w-[15.5rem]'
          : compact
            ? 'h-[6.1rem] w-[9.7rem] rounded-[1.05rem]'
            : 'h-[11.4rem] w-[18.1rem] rounded-[1.65rem] sm:h-[12.6rem] sm:w-[20rem]',
      )}
    >
      <div
        className={cn(
          'pointer-events-none absolute inset-0',
          isBlack
            ? 'bg-[radial-gradient(120%_80%_at_12%_8%,rgba(255,255,255,0.16),transparent_46%)]'
            : 'bg-[radial-gradient(120%_80%_at_12%_8%,rgba(255,255,255,0.9),transparent_48%)]',
        )}
      />
      <div
        className={cn(
          'relative flex h-full flex-col',
          isRound
            ? compact
              ? 'items-center justify-center gap-1.5 px-3'
              : 'items-center justify-center gap-3 px-6'
            : compact
              ? 'justify-between px-3.5 py-3'
              : 'justify-between px-6 py-5',
        )}
      >
        <div
          className={cn(
            isRound ? '' : 'self-start',
            compact ? 'h-8 w-8' : 'h-11 w-11 sm:h-12 sm:w-12',
            isBlack ? 'opacity-90' : 'opacity-80',
          )}
        >
          <NfcMark dark={!isBlack} />
        </div>
        <div className={cn(isRound && 'text-center')}>
          <p
            className={cn(
              'm-0 truncate font-semibold tracking-[-0.03em]',
              compact ? 'max-w-[6.5rem] text-[0.7rem]' : 'max-w-[12rem] text-lg sm:text-xl',
            )}
          >
            {brand}
          </p>
          <p
            className={cn(
              'm-0 mt-0.5 font-medium uppercase tracking-[0.14em]',
              compact ? 'text-[0.42rem]' : 'text-[0.62rem]',
              isBlack ? 'text-white/45' : 'text-black/40',
            )}
          >
            {actionMeta?.hint ?? 'Tap'}
          </p>
        </div>
      </div>
    </div>
  );
};

export const NfcCatalogMockup = ({
  productName,
  compact = false,
}: {
  productName: string;
  compact?: boolean;
}) => (
  <div
    className={cn(
      'relative flex w-full items-center justify-center overflow-hidden',
      compact ? 'aspect-[4/3] px-3' : 'aspect-[4/3] px-4 sm:px-6',
    )}
    style={{ backgroundColor: '#ece7df' }}
  >
    <div className="relative flex h-full w-full items-center justify-center">
      <div
        className={cn(
          'absolute rotate-[-18deg]',
          compact ? '-translate-x-8 translate-y-3' : '-translate-x-12 translate-y-4 sm:-translate-x-16',
        )}
      >
        <NfcPhysicalCard
          color="black"
          shape="rect"
          brand={productName}
          action="whatsapp"
          compact
        />
      </div>
      <div
        className={cn(
          'absolute rotate-[12deg]',
          compact ? 'translate-x-10 -translate-y-2' : 'translate-x-14 -translate-y-3 sm:translate-x-16',
        )}
      >
        <NfcPhysicalCard
          color="white"
          shape="round"
          brand={productName}
          action="site"
          compact
        />
      </div>
    </div>
  </div>
);

export const NfcConfigurator = ({
  color,
  shape,
  action,
  onColor,
  onShape,
  onAction,
}: {
  color: NfcCardColor;
  shape: NfcCardShape;
  action: NfcTapAction;
  onColor: (value: NfcCardColor) => void;
  onShape: (value: NfcCardShape) => void;
  onAction: (value: NfcTapAction) => void;
}) => {
  const groups = [
    { label: 'Цвет', value: color, options: nfcColorOptions },
    { label: 'Форма', value: shape, options: nfcShapeOptions },
    { label: 'Действие', value: action, options: nfcActionOptions },
  ] as const;

  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <div key={group.label}>
          <p className="m-0 mb-2 text-xs font-semibold uppercase tracking-[0.06em] text-black/40">
            {group.label}
          </p>
          <div className="flex flex-wrap rounded-3xl bg-black/[0.05] p-1">
            {group.options.map((option) => {
              const active = group.value === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    if (group.label === 'Цвет') onColor(option.id as NfcCardColor);
                    if (group.label === 'Форма') onShape(option.id as NfcCardShape);
                    if (group.label === 'Действие') onAction(option.id as NfcTapAction);
                  }}
                  className={cn(
                    'inline-flex h-8 cursor-pointer items-center justify-center rounded-3xl border-none px-3.5 text-sm font-medium transition-colors',
                    active
                      ? 'bg-black/[0.08] text-black'
                      : 'bg-transparent text-black/60 hover:text-black',
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
