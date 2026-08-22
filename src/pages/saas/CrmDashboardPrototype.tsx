import { useEffect, useMemo, useState } from 'react';
import {
  Bell,
  ChevronDown,
  Crown,
  HelpCircle,
  LayoutDashboard,
  MessageSquare,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Settings,
  Sparkles,
  Sun,
  Moon,
  Users,
  Workflow,
  Filter,
  Download,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CrmDashboardPrototypeProps {
  brand: string;
  userName: string;
  companyName: string;
  accent: string;
  isDark: boolean;
  initialPage?: string;
}

const kpiCards = [
  {
    id: 'revenue',
    label: 'Выручка',
    value: '₽ 8 240 000',
    delta: '+12.4%',
    positive: true,
    spark: [28, 32, 30, 38, 36, 42, 48, 45, 52, 58, 55, 62],
  },
  {
    id: 'deals',
    label: 'Активные сделки',
    value: '146',
    delta: '+8.1%',
    positive: true,
    spark: [18, 22, 20, 26, 24, 30, 28, 34, 32, 38, 40, 44],
  },
  {
    id: 'conversion',
    label: 'Конверсия',
    value: '24.8%',
    delta: '-1.2%',
    positive: false,
    spark: [40, 38, 42, 39, 36, 34, 37, 33, 35, 32, 30, 31],
  },
  {
    id: 'customers',
    label: 'Клиенты',
    value: '2 184',
    delta: '+5.6%',
    positive: true,
    spark: [20, 24, 22, 28, 30, 29, 34, 36, 38, 40, 42, 46],
  },
];

const monthBars = [
  { month: 'Янв', online: 18, offline: 10 },
  { month: 'Фев', online: 22, offline: 12 },
  { month: 'Мар', online: 16, offline: 14 },
  { month: 'Апр', online: 28, offline: 15 },
  { month: 'Май', online: 24, offline: 18 },
  { month: 'Июн', online: 32, offline: 16 },
  { month: 'Июл', online: 26, offline: 20 },
  { month: 'Авг', online: 34, offline: 18 },
  { month: 'Сен', online: 30, offline: 22 },
  { month: 'Окт', online: 36, offline: 20 },
  { month: 'Ноя', online: 29, offline: 17 },
  { month: 'Дек', online: 38, offline: 24 },
];

const deals = [
  {
    id: 'D-1042',
    company: 'ООО Альфа',
    owner: 'Анна К.',
    stage: 'Переговоры',
    amount: '420 000 ₽',
    probability: 'Высокая',
    probabilityTone: 'good' as const,
  },
  {
    id: 'D-1043',
    company: 'Nova Soft',
    owner: 'Игорь М.',
    stage: 'КП отправлено',
    amount: '190 000 ₽',
    probability: 'Средняя',
    probabilityTone: 'mid' as const,
  },
  {
    id: 'D-1044',
    company: 'Orbit Labs',
    owner: 'Мария С.',
    stage: 'Квалификация',
    amount: '85 000 ₽',
    probability: 'Низкая',
    probabilityTone: 'low' as const,
  },
  {
    id: 'D-1045',
    company: 'Beta Retail',
    owner: 'Анна К.',
    stage: 'Успешно',
    amount: '610 000 ₽',
    probability: 'Высокая',
    probabilityTone: 'good' as const,
  },
];

const performance = [
  { label: 'План продаж', value: '₽ 4.9 млн', percent: 90, note: 'Цель почти достигнута', color: '#22c55e' },
  { label: 'KPI команды', value: '71%', percent: 71, note: 'KPI в норме', color: '#3b82f6' },
  { label: 'Удовлетворённость', value: '86%', percent: 86, note: 'Отличный уровень', color: '#f59e0b' },
];

const navGroups = [
  {
    title: 'Main Menu',
    items: [
      { id: 'dashboard', label: 'Главная', icon: LayoutDashboard, active: true },
      { id: 'deals', label: 'Операции', icon: Workflow },
      { id: 'customers', label: 'Клиенты', icon: Users },
      { id: 'messages', label: 'Сообщения', icon: MessageSquare },
    ],
  },
  {
    title: 'Features',
    items: [
      { id: 'automation', label: 'Автоматизация', icon: Sparkles },
      { id: 'settings', label: 'Настройки', icon: Settings },
      { id: 'help', label: 'Помощь', icon: HelpCircle },
    ],
  },
];

const DotBar = ({
  value,
  max = 40,
  accent,
  muted,
}: {
  value: number;
  max?: number;
  accent: string;
  muted: string;
}) => {
  const dots = 10;
  const filled = Math.max(1, Math.round((value / max) * dots));
  return (
    <div className="flex flex-col-reverse items-center gap-[3px]">
      {Array.from({ length: dots }).map((_, index) => (
        <span
          key={index}
          className="h-[5px] w-[5px] rounded-full sm:h-1.5 sm:w-1.5"
          style={{ backgroundColor: index < filled ? accent : muted }}
        />
      ))}
    </div>
  );
};

const Sparkline = ({
  values,
  color,
}: {
  values: number[];
  color: string;
}) => {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 100;
      const y = 100 - ((value - min) / (max - min || 1)) * 100;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg viewBox="0 0 100 100" className="h-10 w-20" preserveAspectRatio="none" aria-hidden="true">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};

const CrmDashboardPrototype = ({
  brand,
  userName,
  companyName,
  accent,
  isDark: initialDark,
  initialPage = 'dashboard',
}: CrmDashboardPrototypeProps) => {
  const [dark, setDark] = useState(initialDark);
  const [activeNav, setActiveNav] = useState(initialPage);
  const [query, setQuery] = useState('');
  const [selectedDeal, setSelectedDeal] = useState(deals[0].id);
  const [hoveredMonth, setHoveredMonth] = useState<string | null>('Апр');

  useEffect(() => {
    setDark(initialDark);
  }, [initialDark]);

  useEffect(() => {
    setActiveNav(initialPage);
  }, [initialPage]);

  const displayName = userName.trim() || 'Пользователь';
  const displayCompany = companyName.trim() || 'Компания';
  const initials = displayName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('') || 'U';

  const theme = useMemo(
    () => ({
      page: dark ? '#0c0c0e' : '#f3f4f6',
      panel: dark ? '#141416' : '#ffffff',
      sidebar: dark ? '#101012' : '#ffffff',
      border: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
      text: dark ? '#f5f5f5' : '#111827',
      muted: dark ? 'rgba(255,255,255,0.55)' : '#6b7280',
      soft: dark ? 'rgba(255,255,255,0.05)' : '#f3f4f6',
      softStrong: dark ? 'rgba(255,255,255,0.08)' : '#e5e7eb',
      danger: '#ef4444',
      success: '#22c55e',
    }),
    [dark],
  );

  const filteredDeals = deals.filter((deal) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      deal.company.toLowerCase().includes(q) ||
      deal.id.toLowerCase().includes(q) ||
      deal.owner.toLowerCase().includes(q)
    );
  });

  const hovered = monthBars.find((bar) => bar.month === hoveredMonth) ?? monthBars[3];
  const activeNavLabel =
    navGroups.flatMap((group) => group.items).find((item) => item.id === activeNav)?.label ??
    'Главная';
  const customers = Array.from(
    new Map(deals.map((deal) => [deal.company, deal])).values(),
  );

  return (
    <div
      className="flex h-[100svh] overflow-hidden supports-[height:100dvh]:h-[100dvh]"
      style={{ backgroundColor: theme.page, color: theme.text }}
    >
      <aside
        className="hidden w-[15.5rem] shrink-0 flex-col border-r p-3 xl:flex"
        style={{ backgroundColor: theme.sidebar, borderColor: theme.border }}
      >
        <div className="mb-4 flex items-center gap-2.5 px-2 pt-1">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold text-white"
            style={{ backgroundColor: accent }}
          >
            {brand.slice(0, 1).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="m-0 truncate text-sm font-semibold tracking-tight">{brand}</p>
            <p className="m-0 text-[0.6875rem]" style={{ color: theme.muted }}>
              Фин. учет
            </p>
          </div>
        </div>

        <div
          className="mb-4 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm"
          style={{ backgroundColor: theme.soft, color: theme.muted }}
        >
          <Search className="h-4 w-4 shrink-0" />
          <span className="flex-1">поиск</span>
          <kbd className="rounded-md px-1.5 py-0.5 text-[0.625rem]" style={{ backgroundColor: theme.softStrong }}>
            ⌘K
          </kbd>
        </div>

        <nav className="flex min-h-0 flex-1 flex-col gap-4 overflow-auto">
          {navGroups.map((group) => (
            <div key={group.title}>
              <p
                className="mb-1.5 px-2 text-[0.625rem] font-semibold uppercase tracking-[0.08em]"
                style={{ color: theme.muted }}
              >
                {group.title}
              </p>
              <div className="flex flex-col gap-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = activeNav === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveNav(item.id)}
                      className="flex cursor-pointer items-center gap-2.5 rounded-xl border-none px-2.5 py-2 text-left text-sm font-medium transition-colors"
                      style={{
                        backgroundColor: active ? theme.soft : 'transparent',
                        color: active ? theme.text : theme.muted,
                        boxShadow: active ? `inset 3px 0 0 ${accent}` : 'none',
                      }}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <button
          type="button"
          className="mt-3 flex cursor-pointer items-center gap-2.5 rounded-2xl border-none p-2 text-left"
          style={{ backgroundColor: theme.soft }}
        >
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: accent }}
          >
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="m-0 truncate text-sm font-semibold">{displayName}</p>
            <p className="m-0 truncate text-[0.6875rem]" style={{ color: theme.muted }}>
              {displayCompany}
            </p>
          </div>
          <ChevronDown className="h-4 w-4" style={{ color: theme.muted }} />
        </button>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header
          className="flex h-14 shrink-0 items-center justify-between gap-3 border-b px-4 sm:px-5"
          style={{ backgroundColor: theme.panel, borderColor: theme.border }}
        >
          <p className="m-0 text-sm" style={{ color: theme.muted }}>
            Main Menu <span className="mx-1">/</span>{' '}
            <span className="font-medium" style={{ color: theme.text }}>
              {activeNavLabel}
            </span>
          </p>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-none"
              style={{ backgroundColor: theme.soft, color: theme.muted }}
              aria-label="Уведомления"
            >
              <Bell className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setDark((current) => !current)}
              className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-none"
              style={{ backgroundColor: theme.soft, color: theme.muted }}
              aria-label={dark ? 'Включить светлую тему' : 'Включить тёмную тему'}
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </header>

        <main className="min-h-0 flex-1 overflow-auto p-3 sm:p-4 lg:p-5">
          <div className="mx-auto flex max-w-[90rem] flex-col gap-3 sm:gap-4">
            {activeNav === 'deals' ? (
              <article
                className="rounded-2xl border p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)] sm:p-5"
                style={{ backgroundColor: theme.panel, borderColor: theme.border }}
              >
                <p className="m-0 text-sm font-semibold">Операции</p>
                <p className="m-0 mt-1 text-xs" style={{ color: theme.muted }}>
                  Базовый список сделок в демо-версии
                </p>
                <div className="mt-4 space-y-2">
                  {filteredDeals.map((deal) => (
                    <button
                      key={deal.id}
                      type="button"
                      onClick={() => setSelectedDeal(deal.id)}
                      className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border-none px-3 py-3 text-left"
                      style={{
                        backgroundColor: selectedDeal === deal.id ? `${accent}14` : theme.soft,
                        color: theme.text,
                      }}
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold">{deal.company}</span>
                        <span className="block text-xs" style={{ color: theme.muted }}>
                          {deal.id} · {deal.owner}
                        </span>
                      </span>
                      <span className="shrink-0 text-sm font-semibold">{deal.amount}</span>
                    </button>
                  ))}
                </div>
              </article>
            ) : activeNav === 'customers' ? (
              <article
                className="rounded-2xl border p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)] sm:p-5"
                style={{ backgroundColor: theme.panel, borderColor: theme.border }}
              >
                <p className="m-0 text-sm font-semibold">Клиенты</p>
                <p className="m-0 mt-1 text-xs" style={{ color: theme.muted }}>
                  Компании из активных сделок
                </p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {customers.map((deal) => (
                    <div
                      key={deal.company}
                      className="rounded-xl px-3 py-3"
                      style={{ backgroundColor: theme.soft }}
                    >
                      <p className="m-0 text-sm font-semibold">{deal.company}</p>
                      <p className="m-0 mt-1 text-xs" style={{ color: theme.muted }}>
                        Ответственный: {deal.owner}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ) : activeNav !== 'dashboard' ? (
              <article
                className="rounded-2xl border p-8 text-center shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                style={{ backgroundColor: theme.panel, borderColor: theme.border }}
              >
                <p className="m-0 text-sm font-semibold">{activeNavLabel}</p>
                <p className="m-0 mt-2 text-sm" style={{ color: theme.muted }}>
                  Раздел доступен в полной версии продукта
                </p>
              </article>
            ) : (
              <>
            <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
              {kpiCards.map((card) => (
                <article
                  key={card.id}
                  className="rounded-2xl border p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                  style={{ backgroundColor: theme.panel, borderColor: theme.border }}
                >
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <p className="m-0 text-sm" style={{ color: theme.muted }}>
                      {card.label}
                    </p>
                    <MoreHorizontal className="h-4 w-4" style={{ color: theme.muted }} />
                  </div>
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p className="m-0 text-[1.35rem] font-semibold tracking-tight sm:text-[1.5rem]">
                        {card.value}
                      </p>
                      <p
                        className="m-0 mt-1 text-xs font-medium"
                        style={{ color: card.positive ? theme.success : theme.danger }}
                      >
                        {card.delta} за неделю
                      </p>
                    </div>
                    <Sparkline
                      values={card.spark}
                      color={card.positive ? accent : theme.danger}
                    />
                  </div>
                </article>
              ))}
            </div>

            <div className="grid gap-3 lg:grid-cols-[minmax(0,1.7fr)_minmax(16rem,1fr)] sm:gap-4">
              <article
                className="rounded-2xl border p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)] sm:p-5"
                style={{ backgroundColor: theme.panel, borderColor: theme.border }}
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="m-0 text-sm font-semibold">Динамика продаж</p>
                    <p className="m-0 mt-1 text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
                      ₽ 2 522 895
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
                      style={{ backgroundColor: theme.soft, color: theme.muted }}
                    >
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
                      Онлайн
                    </span>
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
                      style={{ backgroundColor: theme.soft, color: theme.muted }}
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: `${accent}66` }}
                      />
                      Офлайн
                    </span>
                  </div>
                </div>

                <div className="relative h-44 sm:h-52">
                  {hoveredMonth && (
                    <div
                      className="pointer-events-none absolute left-1/2 top-2 z-[1] -translate-x-1/2 rounded-xl px-3 py-2 text-xs shadow-lg"
                      style={{ backgroundColor: dark ? '#1f1f23' : '#111827', color: '#fff' }}
                    >
                      <p className="m-0 font-semibold">{hovered.month}</p>
                      <p className="m-0 mt-1 opacity-90">Онлайн: ₽ {(hovered.online * 1000).toLocaleString('ru-RU')}</p>
                      <p className="m-0 opacity-90">Офлайн: ₽ {(hovered.offline * 1000).toLocaleString('ru-RU')}</p>
                    </div>
                  )}

                  <div className="flex h-full items-end justify-between gap-1.5 px-1 sm:gap-2">
                    {monthBars.map((bar) => (
                      <button
                        key={bar.month}
                        type="button"
                        onMouseEnter={() => setHoveredMonth(bar.month)}
                        onFocus={() => setHoveredMonth(bar.month)}
                        className="flex h-full flex-1 cursor-pointer flex-col items-center justify-end gap-2 border-none bg-transparent p-0"
                      >
                        <div className="flex items-end gap-1">
                          <DotBar value={bar.online} accent={accent} muted={theme.softStrong} />
                          <DotBar value={bar.offline} accent={`${accent}88`} muted={theme.softStrong} />
                        </div>
                        <span className="text-[0.625rem] font-medium" style={{ color: theme.muted }}>
                          {bar.month}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </article>

              <article
                className="flex flex-col rounded-2xl border p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)] sm:p-5"
                style={{ backgroundColor: theme.panel, borderColor: theme.border }}
              >
                <div className="mb-4 flex items-center justify-between gap-2">
                  <p className="m-0 text-sm font-semibold">Performance</p>
                  <span
                    className="rounded-full px-2.5 py-1 text-xs font-medium"
                    style={{ backgroundColor: theme.soft, color: theme.muted }}
                  >
                    Этот месяц
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-5">
                  {performance.map((item) => (
                    <div key={item.label}>
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <p className="m-0 text-sm font-medium">{item.label}</p>
                        <p className="m-0 text-sm font-semibold">{item.value}</p>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full" style={{ backgroundColor: theme.soft }}>
                        <div
                          className="h-full rounded-full transition-[width] duration-500"
                          style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                        />
                      </div>
                      <p className="m-0 mt-1.5 text-xs" style={{ color: theme.muted }}>
                        {item.note}
                      </p>
                    </div>
                  ))}
                </div>

                <div
                  className="mt-5 rounded-xl px-3 py-2.5 text-xs font-medium"
                  style={{ backgroundColor: `${accent}18`, color: accent }}
                >
                  Показатели в хорошем состоянии. Открыть новые цели →
                </div>
              </article>
            </div>

            <article
              className="overflow-hidden rounded-2xl border shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
              style={{ backgroundColor: theme.panel, borderColor: theme.border }}
            >
              <div
                className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"
                style={{ borderColor: theme.border }}
              >
                <p className="m-0 text-sm font-semibold">Операции</p>
                <div className="flex flex-wrap items-center gap-2">
                  <div
                    className="flex h-9 min-w-[10rem] flex-1 items-center gap-2 rounded-xl px-3 text-sm sm:flex-none"
                    style={{ backgroundColor: theme.soft, color: theme.muted }}
                  >
                    <Search className="h-3.5 w-3.5" />
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Поиск…"
                      className="w-full border-none bg-transparent text-sm outline-none"
                      style={{ color: theme.text }}
                    />
                  </div>
                  <button
                    type="button"
                    className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-xl border-none px-3 text-xs font-semibold"
                    style={{ backgroundColor: theme.soft, color: theme.muted }}
                  >
                    <Filter className="h-3.5 w-3.5" />
                    Фильтры
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-xl border-none px-3 text-xs font-semibold"
                    style={{ backgroundColor: theme.soft, color: theme.muted }}
                  >
                    <Download className="h-3.5 w-3.5" />
                    Экспорт
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-xl border-none px-3 text-xs font-semibold text-white"
                    style={{ backgroundColor: accent }}
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Добавить
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
                  <thead>
                    <tr style={{ color: theme.muted }}>
                      {['Контрагент', 'Код', 'Ответственный', 'Статус', 'Приоритет', 'Сумма', ''].map(
                        (heading) => (
                          <th
                            key={heading || 'action'}
                            className="px-4 py-3 text-xs font-semibold sm:px-5"
                          >
                            {heading}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDeals.map((deal) => {
                      const selected = selectedDeal === deal.id;
                      return (
                        <tr
                          key={deal.id}
                          onClick={() => setSelectedDeal(deal.id)}
                          className="cursor-pointer border-t"
                          style={{
                            borderColor: theme.border,
                            backgroundColor: selected ? `${accent}10` : 'transparent',
                          }}
                        >
                          <td className="px-4 py-3 font-medium sm:px-5">{deal.company}</td>
                          <td className="px-4 py-3 sm:px-5" style={{ color: theme.muted }}>
                            {deal.id}
                          </td>
                          <td className="px-4 py-3 sm:px-5">{deal.owner}</td>
                          <td className="px-4 py-3 sm:px-5">{deal.stage}</td>
                          <td className="px-4 py-3 sm:px-5">
                            <span
                              className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium"
                              style={{
                                backgroundColor:
                                  deal.probabilityTone === 'good'
                                    ? `${theme.success}22`
                                    : deal.probabilityTone === 'mid'
                                      ? '#f59e0b22'
                                      : `${theme.danger}22`,
                                color:
                                  deal.probabilityTone === 'good'
                                    ? theme.success
                                    : deal.probabilityTone === 'mid'
                                      ? '#d97706'
                                      : theme.danger,
                              }}
                            >
                              {deal.probability}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-semibold sm:px-5">{deal.amount}</td>
                          <td className="px-4 py-3 sm:px-5">
                            <span
                              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium"
                              style={{ backgroundColor: theme.soft, color: theme.muted }}
                            >
                              <Pencil className="h-3 w-3" />
                              изм.
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </article>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CrmDashboardPrototype;
