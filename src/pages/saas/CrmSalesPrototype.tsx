import { useEffect, useMemo, useState } from 'react';
import {
  BarChart3,
  Calendar,
  CheckSquare,
  ChevronDown,
  Filter,
  Kanban,
  List,
  Mail,
  Moon,
  Phone,
  Plus,
  Search,
  Settings,
  Sun,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CrmSalesPrototypeProps {
  brand: string;
  userName: string;
  companyName: string;
  accent: string;
  isDark: boolean;
  initialPage?: string;
}

type StageId =
  | 'new'
  | 'qualify'
  | 'proposal'
  | 'negotiation'
  | 'won'
  | 'lost';

interface Deal {
  id: string;
  title: string;
  company: string;
  contact: string;
  phone: string;
  email: string;
  owner: string;
  ownerInitials: string;
  stage: StageId;
  amount: number;
  createdAt: string;
}

const STAGES: { id: StageId; label: string }[] = [
  { id: 'new', label: 'Новая' },
  { id: 'qualify', label: 'Квалификация' },
  { id: 'proposal', label: 'КП отправлено' },
  { id: 'negotiation', label: 'Переговоры' },
  { id: 'won', label: 'Успешно' },
  { id: 'lost', label: 'Отказ' },
];

const INITIAL_DEALS: Deal[] = [
  {
    id: 'D-2101',
    title: 'Внедрение CRM',
    company: 'ООО Альфа',
    contact: 'Мария Смирнова',
    phone: '+7 903 112-45-67',
    email: 'm.smirnova@alfa.ru',
    owner: 'Анна К.',
    ownerInitials: 'АК',
    stage: 'negotiation',
    amount: 420_000,
    createdAt: '12.03.2026',
  },
  {
    id: 'D-2102',
    title: 'Годовая подписка',
    company: 'Nova Soft',
    contact: 'Илья Петров',
    phone: '+7 926 441-09-18',
    email: 'ilya@novasoft.io',
    owner: 'Игорь М.',
    ownerInitials: 'ИМ',
    stage: 'proposal',
    amount: 190_000,
    createdAt: '18.03.2026',
  },
  {
    id: 'D-2103',
    title: 'Пилот для отдела продаж',
    company: 'Studio X',
    contact: 'Елена Воронова',
    phone: '+7 916 700-22-11',
    email: 'elena@studiox.ru',
    owner: 'Анна К.',
    ownerInitials: 'АК',
    stage: 'qualify',
    amount: 85_000,
    createdAt: '21.03.2026',
  },
  {
    id: 'D-2104',
    title: 'Апгрейд тарифа',
    company: 'Лайт Трейд',
    contact: 'Сергей Орлов',
    phone: '+7 495 111-22-33',
    email: 's.orlov@lighttrade.ru',
    owner: 'Ольга В.',
    ownerInitials: 'ОВ',
    stage: 'new',
    amount: 64_000,
    createdAt: '24.03.2026',
  },
  {
    id: 'D-2105',
    title: 'Интеграция с сайтом',
    company: 'Green Market',
    contact: 'Дарья Ким',
    phone: '+7 921 555-80-40',
    email: 'daria@green.market',
    owner: 'Игорь М.',
    ownerInitials: 'ИМ',
    stage: 'new',
    amount: 120_000,
    createdAt: '25.03.2026',
  },
  {
    id: 'D-2106',
    title: 'Корпоративный пакет',
    company: 'МегаСервис',
    contact: 'Павел Никитин',
    phone: '+7 903 888-10-20',
    email: 'p.nikitin@megaservice.ru',
    owner: 'Ольга В.',
    ownerInitials: 'ОВ',
    stage: 'won',
    amount: 780_000,
    createdAt: '02.03.2026',
  },
  {
    id: 'D-2107',
    title: 'Лицензии на 20 мест',
    company: 'Форт Групп',
    contact: 'Наталья Белова',
    phone: '+7 812 300-40-50',
    email: 'n.belova@fortgroup.ru',
    owner: 'Анна К.',
    ownerInitials: 'АК',
    stage: 'lost',
    amount: 210_000,
    createdAt: '05.03.2026',
  },
  {
    id: 'D-2108',
    title: 'Онбординг команды',
    company: 'Реклама Pro',
    contact: 'Кирилл Жуков',
    phone: '+7 999 120-30-40',
    email: 'kirill@reklama.pro',
    owner: 'Игорь М.',
    ownerInitials: 'ИМ',
    stage: 'negotiation',
    amount: 145_000,
    createdAt: '15.03.2026',
  },
];

const ACTIVITY = [
  { id: 1, type: 'call', title: 'Звонок 18 мин', meta: 'Сегодня, 11:20', note: 'Обсудили сроки внедрения' },
  { id: 2, type: 'mail', title: 'Письмо: КП v2', meta: 'Вчера, 16:40', note: 'Отправлено обновлённое коммерческое' },
  { id: 3, type: 'meet', title: 'Встреча Zoom', meta: '22.03, 14:00', note: 'Демо для РОПа и двух менеджеров' },
  { id: 4, type: 'note', title: 'Заметка', meta: '20.03, 10:12', note: 'Клиент сравнивает с Pipedrive' },
];

const TASKS = [
  { id: 1, title: 'Отправить договор', due: 'Сегодня', done: false },
  { id: 2, title: 'Созвон с ЛПР', due: 'Завтра', done: false },
  { id: 3, title: 'Подготовить кейс', due: '28.03', done: true },
];

const formatMoney = (value: number) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(value);

const CrmSalesPrototype = ({
  brand,
  userName,
  companyName,
  accent,
  isDark: initialDark,
  initialPage = 'pipeline',
}: CrmSalesPrototypeProps) => {
  const [dark, setDark] = useState(initialDark);
  const [page, setPage] = useState(initialPage);
  const [deals, setDeals] = useState(INITIAL_DEALS);
  const [selectedDealId, setSelectedDealId] = useState(INITIAL_DEALS[0].id);
  const [query, setQuery] = useState('');
  const [stageFilter, setStageFilter] = useState<StageId | 'all'>('all');
  const [dragId, setDragId] = useState<string | null>(null);
  const [stages, setStages] = useState(STAGES.map((s) => s.label));

  useEffect(() => setDark(initialDark), [initialDark]);
  useEffect(() => setPage(initialPage), [initialPage]);

  const displayName = userName.trim() || 'Пользователь';
  const displayCompany = companyName.trim() || 'Компания';
  const initials =
    displayName
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
    }),
    [dark],
  );

  const selectedDeal = deals.find((deal) => deal.id === selectedDealId) ?? deals[0];

  const nav = [
    { id: 'pipeline', label: 'Воронка', icon: Kanban },
    { id: 'deal', label: 'Карточка', icon: Users },
    { id: 'list', label: 'Список', icon: List },
    { id: 'analytics', label: 'Аналитика', icon: BarChart3 },
    { id: 'settings', label: 'Настройки', icon: Settings },
  ] as const;

  const openDeal = (id: string) => {
    setSelectedDealId(id);
    setPage('deal');
  };

  const moveDeal = (dealId: string, stage: StageId) => {
    setDeals((current) =>
      current.map((deal) => (deal.id === dealId ? { ...deal, stage } : deal)),
    );
  };

  const filteredList = deals.filter((deal) => {
    const matchesStage = stageFilter === 'all' || deal.stage === stageFilter;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      deal.title.toLowerCase().includes(q) ||
      deal.company.toLowerCase().includes(q) ||
      deal.owner.toLowerCase().includes(q);
    return matchesStage && matchesQuery;
  });

  return (
    <div
      className="flex h-[100svh] overflow-hidden supports-[height:100dvh]:h-[100dvh]"
      style={{ backgroundColor: theme.page, color: theme.text }}
    >
      <aside
        className="hidden w-[15.5rem] shrink-0 flex-col border-r md:flex"
        style={{ backgroundColor: theme.sidebar, borderColor: theme.border }}
      >
        <div className="flex items-center gap-2.5 border-b px-4 py-4" style={{ borderColor: theme.border }}>
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[0.7rem] font-bold text-white"
            style={{ backgroundColor: accent }}
          >
            {brand.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="m-0 truncate text-sm font-semibold tracking-tight">{brand}</p>
            <p className="m-0 truncate text-[0.7rem]" style={{ color: theme.muted }}>
              CRM · {displayCompany}
            </p>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = page === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setPage(item.id)}
                className={cn(
                  'inline-flex h-10 cursor-pointer items-center gap-2.5 rounded-xl border-none px-3 text-left text-sm font-medium transition-colors',
                  active ? 'text-white' : 'bg-transparent',
                )}
                style={
                  active
                    ? { backgroundColor: accent }
                    : { color: theme.muted }
                }
              >
                <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="border-t p-3" style={{ borderColor: theme.border }}>
          <div className="flex items-center gap-2.5 rounded-xl px-2 py-2" style={{ backgroundColor: theme.soft }}>
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-[0.7rem] font-semibold text-white"
              style={{ backgroundColor: accent }}
            >
              {initials}
            </div>
            <div className="min-w-0">
              <p className="m-0 truncate text-sm font-medium">{displayName}</p>
              <p className="m-0 truncate text-[0.7rem]" style={{ color: theme.muted }}>
                Менеджер
              </p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header
          className="flex h-14 shrink-0 items-center justify-between gap-3 border-b px-4"
          style={{ backgroundColor: theme.panel, borderColor: theme.border }}
        >
          <div className="min-w-0">
            <p className="m-0 text-sm font-semibold tracking-tight">
              {nav.find((item) => item.id === page)?.label ?? 'CRM'}
            </p>
            <p className="m-0 truncate text-[0.7rem]" style={{ color: theme.muted }}>
              Продажи · воронка и сделки
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="hidden items-center gap-2 rounded-xl px-3 py-2 sm:flex"
              style={{ backgroundColor: theme.soft }}
            >
              <Search className="h-3.5 w-3.5" style={{ color: theme.muted }} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Поиск сделок"
                className="w-36 border-none bg-transparent text-sm outline-none md:w-48"
                style={{ color: theme.text }}
              />
            </div>
            <button
              type="button"
              onClick={() => setDark((value) => !value)}
              className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border-none"
              style={{ backgroundColor: theme.soft, color: theme.muted }}
              aria-label="Тема"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              type="button"
              className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-xl border-none px-3 text-sm font-semibold text-white"
              style={{ backgroundColor: accent }}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Новая сделка</span>
            </button>
          </div>
        </header>

        <div className="flex gap-1 overflow-x-auto border-b px-3 py-2 md:hidden" style={{ borderColor: theme.border }}>
          {nav.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setPage(item.id)}
              className={cn(
                'shrink-0 cursor-pointer rounded-full border-none px-3 py-1.5 text-xs font-medium',
                page === item.id ? 'text-white' : '',
              )}
              style={
                page === item.id
                  ? { backgroundColor: accent }
                  : { backgroundColor: theme.soft, color: theme.muted }
              }
            >
              {item.label}
            </button>
          ))}
        </div>

        <main className="min-h-0 flex-1 overflow-auto p-3 sm:p-4">
          {page === 'pipeline' && (
            <div className="flex h-full min-h-[28rem] gap-3 overflow-x-auto pb-2">
              {STAGES.map((stage) => {
                const columnDeals = deals.filter((deal) => deal.stage === stage.id);
                const sum = columnDeals.reduce((acc, deal) => acc + deal.amount, 0);
                return (
                  <div
                    key={stage.id}
                    className="flex w-[16.5rem] shrink-0 flex-col rounded-2xl"
                    style={{ backgroundColor: theme.soft }}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={() => {
                      if (dragId) moveDeal(dragId, stage.id);
                      setDragId(null);
                    }}
                  >
                    <div className="flex items-start justify-between gap-2 px-3 pb-2 pt-3">
                      <div>
                        <p className="m-0 text-sm font-semibold">{stage.label}</p>
                        <p className="m-0 mt-0.5 text-[0.7rem]" style={{ color: theme.muted }}>
                          {columnDeals.length} · {formatMoney(sum)}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border-none"
                        style={{ backgroundColor: theme.panel, color: theme.muted }}
                        aria-label="Добавить"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-2 pb-3">
                      {columnDeals.map((deal) => (
                        <button
                          key={deal.id}
                          type="button"
                          draggable
                          onDragStart={() => setDragId(deal.id)}
                          onDragEnd={() => setDragId(null)}
                          onClick={() => openDeal(deal.id)}
                          className="cursor-grab rounded-xl border-none p-3 text-left shadow-[0_1px_2px_rgba(0,0,0,0.06)] active:cursor-grabbing"
                          style={{ backgroundColor: theme.panel, color: theme.text }}
                        >
                          <p className="m-0 text-sm font-semibold tracking-tight">{deal.title}</p>
                          <p className="m-0 mt-1 text-xs" style={{ color: theme.muted }}>
                            {deal.company}
                          </p>
                          <div className="mt-3 flex items-center justify-between gap-2">
                            <span className="text-sm font-semibold">{formatMoney(deal.amount)}</span>
                            <span
                              className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[0.6rem] font-bold text-white"
                              style={{ backgroundColor: accent }}
                            >
                              {deal.ownerInitials}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {page === 'deal' && selectedDeal && (
            <div className="mx-auto grid max-w-5xl gap-3 lg:grid-cols-[1.2fr_0.8fr]">
              <section
                className="rounded-2xl p-4 sm:p-5"
                style={{ backgroundColor: theme.panel, boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="m-0 text-xs font-medium" style={{ color: theme.muted }}>
                      {selectedDeal.id}
                    </p>
                    <h2 className="m-0 mt-1 text-xl font-semibold tracking-tight">{selectedDeal.title}</h2>
                    <p className="m-0 mt-1 text-sm" style={{ color: theme.muted }}>
                      {selectedDeal.company}
                    </p>
                  </div>
                  <p className="m-0 text-xl font-semibold">{formatMoney(selectedDeal.amount)}</p>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-medium" style={{ color: theme.muted }}>
                      Этап воронки
                    </span>
                    <div
                      className="relative flex h-10 items-center rounded-xl px-3"
                      style={{ backgroundColor: theme.soft }}
                    >
                      <select
                        value={selectedDeal.stage}
                        onChange={(event) =>
                          moveDeal(selectedDeal.id, event.target.value as StageId)
                        }
                        className="h-full w-full appearance-none border-none bg-transparent text-sm outline-none"
                        style={{ color: theme.text }}
                      >
                        {STAGES.map((stage) => (
                          <option key={stage.id} value={stage.id}>
                            {stage.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4" style={{ color: theme.muted }} />
                    </div>
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-medium" style={{ color: theme.muted }}>
                      Ответственный
                    </span>
                    <div
                      className="flex h-10 items-center gap-2 rounded-xl px-3"
                      style={{ backgroundColor: theme.soft }}
                    >
                      <span
                        className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[0.6rem] font-bold text-white"
                        style={{ backgroundColor: accent }}
                      >
                        {selectedDeal.ownerInitials}
                      </span>
                      <span className="text-sm">{selectedDeal.owner}</span>
                    </div>
                  </label>
                </div>

                <div className="mt-5 rounded-2xl p-3.5" style={{ backgroundColor: theme.soft }}>
                  <p className="m-0 text-sm font-semibold">Контакт</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <p className="m-0 text-sm">{selectedDeal.contact}</p>
                    <p className="m-0 text-sm" style={{ color: theme.muted }}>
                      {selectedDeal.company}
                    </p>
                    <p className="m-0 inline-flex items-center gap-1.5 text-sm">
                      <Phone className="h-3.5 w-3.5" style={{ color: accent }} />
                      {selectedDeal.phone}
                    </p>
                    <p className="m-0 inline-flex items-center gap-1.5 text-sm">
                      <Mail className="h-3.5 w-3.5" style={{ color: accent }} />
                      {selectedDeal.email}
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="m-0 mb-3 text-sm font-semibold">История активности</p>
                  <div className="space-y-3">
                    {ACTIVITY.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div
                          className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                          style={{ backgroundColor: theme.soft }}
                        >
                          {item.type === 'call' && <Phone className="h-3.5 w-3.5" style={{ color: accent }} />}
                          {item.type === 'mail' && <Mail className="h-3.5 w-3.5" style={{ color: accent }} />}
                          {item.type === 'meet' && <Calendar className="h-3.5 w-3.5" style={{ color: accent }} />}
                          {item.type === 'note' && <CheckSquare className="h-3.5 w-3.5" style={{ color: accent }} />}
                        </div>
                        <div>
                          <p className="m-0 text-sm font-medium">{item.title}</p>
                          <p className="m-0 text-xs" style={{ color: theme.muted }}>
                            {item.meta}
                          </p>
                          <p className="m-0 mt-1 text-sm" style={{ color: theme.muted }}>
                            {item.note}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <label className="mt-5 block">
                  <span className="mb-1.5 block text-sm font-semibold">Заметки</span>
                  <textarea
                    rows={3}
                    defaultValue="Клиент просит демо с их данными. Важно показать права РОПа."
                    className="w-full resize-none rounded-xl border-none p-3 text-sm outline-none"
                    style={{ backgroundColor: theme.soft, color: theme.text }}
                  />
                </label>
              </section>

              <section
                className="rounded-2xl p-4 sm:p-5"
                style={{ backgroundColor: theme.panel, boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}
              >
                <p className="m-0 text-sm font-semibold">Задачи</p>
                <div className="mt-3 space-y-2">
                  {TASKS.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-start gap-2.5 rounded-xl p-3"
                      style={{ backgroundColor: theme.soft }}
                    >
                      <span
                        className={cn(
                          'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border',
                          task.done && 'border-transparent',
                        )}
                        style={{
                          borderColor: theme.border,
                          backgroundColor: task.done ? accent : 'transparent',
                        }}
                      >
                        {task.done && <CheckSquare className="h-3 w-3 text-white" />}
                      </span>
                      <div className="min-w-0">
                        <p
                          className={cn('m-0 text-sm font-medium', task.done && 'line-through opacity-60')}
                        >
                          {task.title}
                        </p>
                        <p className="m-0 text-xs" style={{ color: theme.muted }}>
                          Дедлайн: {task.due}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="mt-3 inline-flex h-9 w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border-none text-sm font-medium"
                  style={{ backgroundColor: theme.soft, color: theme.text }}
                >
                  <Plus className="h-4 w-4" />
                  Добавить задачу
                </button>
              </section>
            </div>
          )}

          {page === 'list' && (
            <section
              className="overflow-hidden rounded-2xl"
              style={{ backgroundColor: theme.panel, boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}
            >
              <div className="flex flex-wrap items-center gap-2 border-b p-3" style={{ borderColor: theme.border }}>
                <div
                  className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm"
                  style={{ backgroundColor: theme.soft, color: theme.muted }}
                >
                  <Filter className="h-3.5 w-3.5" />
                  Фильтры
                </div>
                <select
                  value={stageFilter}
                  onChange={(event) => setStageFilter(event.target.value as StageId | 'all')}
                  className="h-9 rounded-xl border-none px-3 text-sm outline-none"
                  style={{ backgroundColor: theme.soft, color: theme.text }}
                >
                  <option value="all">Все этапы</option>
                  {STAGES.map((stage) => (
                    <option key={stage.id} value={stage.id}>
                      {stage.label}
                    </option>
                  ))}
                </select>
                <div className="ml-auto text-xs" style={{ color: theme.muted }}>
                  {filteredList.length} сделок
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
                  <thead>
                    <tr style={{ color: theme.muted }}>
                      {['Название', 'Компания', 'Ответственный', 'Этап', 'Сумма', 'Дата'].map((col) => (
                        <th key={col} className="px-4 py-3 text-xs font-medium">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredList.map((deal) => (
                      <tr
                        key={deal.id}
                        className="cursor-pointer border-t"
                        style={{ borderColor: theme.border }}
                        onClick={() => openDeal(deal.id)}
                      >
                        <td className="px-4 py-3 font-medium">{deal.title}</td>
                        <td className="px-4 py-3" style={{ color: theme.muted }}>
                          {deal.company}
                        </td>
                        <td className="px-4 py-3">{deal.owner}</td>
                        <td className="px-4 py-3">
                          <span
                            className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium"
                            style={{ backgroundColor: `${accent}22`, color: accent }}
                          >
                            {STAGES.find((stage) => stage.id === deal.stage)?.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-medium">{formatMoney(deal.amount)}</td>
                        <td className="px-4 py-3" style={{ color: theme.muted }}>
                          {deal.createdAt}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {page === 'analytics' && (
            <div className="mx-auto grid max-w-5xl gap-3 lg:grid-cols-2">
              <section
                className="rounded-2xl p-4 sm:p-5 lg:col-span-2"
                style={{ backgroundColor: theme.panel }}
              >
                <p className="m-0 text-sm font-semibold">Конверсия по этапам</p>
                <div className="mt-4 flex flex-wrap items-end gap-2">
                  {[100, 72, 48, 31, 18].map((width, index) => (
                    <div key={STAGES[index].id} className="min-w-0 flex-1">
                      <div
                        className="mx-auto h-10 rounded-lg"
                        style={{
                          width: `${width}%`,
                          backgroundColor: accent,
                          opacity: 1 - index * 0.12,
                        }}
                      />
                      <p className="m-0 mt-2 text-center text-[0.65rem]" style={{ color: theme.muted }}>
                        {STAGES[index].label}
                      </p>
                      <p className="m-0 text-center text-xs font-semibold">{width}%</p>
                    </div>
                  ))}
                </div>
              </section>

              {[
                { label: 'Средний цикл сделки', value: '18 дней', hint: '−2 дня к прошлому месяцу' },
                { label: 'Прогноз выручки', value: '1.8 млн ₽', hint: 'Закрытие в этом месяце' },
              ].map((card) => (
                <section key={card.label} className="rounded-2xl p-4 sm:p-5" style={{ backgroundColor: theme.panel }}>
                  <p className="m-0 text-xs font-medium" style={{ color: theme.muted }}>
                    {card.label}
                  </p>
                  <p className="m-0 mt-2 text-2xl font-semibold tracking-tight">{card.value}</p>
                  <p className="m-0 mt-1 text-sm" style={{ color: theme.muted }}>
                    {card.hint}
                  </p>
                </section>
              ))}

              <section className="rounded-2xl p-4 sm:p-5" style={{ backgroundColor: theme.panel }}>
                <p className="m-0 text-sm font-semibold">Топ менеджеров</p>
                <div className="mt-3 space-y-2">
                  {[
                    { name: 'Анна К.', deals: 12, amount: '1.2 млн ₽' },
                    { name: 'Игорь М.', deals: 9, amount: '860 тыс ₽' },
                    { name: 'Ольга В.', deals: 7, amount: '640 тыс ₽' },
                  ].map((row, index) => (
                    <div
                      key={row.name}
                      className="flex items-center justify-between rounded-xl px-3 py-2.5"
                      style={{ backgroundColor: theme.soft }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold" style={{ color: theme.muted }}>
                          {index + 1}
                        </span>
                        <span className="text-sm font-medium">{row.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="m-0 text-sm font-semibold">{row.amount}</p>
                        <p className="m-0 text-[0.7rem]" style={{ color: theme.muted }}>
                          {row.deals} сделок
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl p-4 sm:p-5" style={{ backgroundColor: theme.panel }}>
                <p className="m-0 text-sm font-semibold">Создано vs Закрыто</p>
                <div className="mt-4 flex h-36 items-end gap-2">
                  {[
                    [40, 28],
                    [52, 34],
                    [46, 40],
                    [60, 38],
                    [55, 48],
                    [68, 52],
                    [58, 44],
                  ].map(([created, closed], index) => (
                    <div key={index} className="flex min-w-0 flex-1 items-end gap-0.5">
                      <div
                        className="w-full rounded-t-md"
                        style={{ height: `${created}%`, backgroundColor: `${accent}55` }}
                      />
                      <div
                        className="w-full rounded-t-md"
                        style={{ height: `${closed}%`, backgroundColor: accent }}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex gap-4 text-xs" style={{ color: theme.muted }}>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: `${accent}55` }} />
                    Создано
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: accent }} />
                    Закрыто
                  </span>
                </div>
              </section>
            </div>
          )}

          {page === 'settings' && (
            <div className="mx-auto grid max-w-4xl gap-3 lg:grid-cols-2">
              <section className="rounded-2xl p-4 sm:p-5" style={{ backgroundColor: theme.panel }}>
                <p className="m-0 text-sm font-semibold">Этапы воронки</p>
                <p className="m-0 mt-1 text-xs" style={{ color: theme.muted }}>
                  Добавьте, удалите или переименуйте этапы
                </p>
                <div className="mt-3 space-y-2">
                  {stages.map((stage, index) => (
                    <input
                      key={index}
                      value={stage}
                      onChange={(event) => {
                        const next = [...stages];
                        next[index] = event.target.value;
                        setStages(next);
                      }}
                      className="h-10 w-full rounded-xl border-none px-3 text-sm outline-none"
                      style={{ backgroundColor: theme.soft, color: theme.text }}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setStages((current) => [...current, `Этап ${current.length + 1}`])}
                  className="mt-3 inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-xl border-none px-3 text-sm font-medium"
                  style={{ backgroundColor: theme.soft, color: theme.text }}
                >
                  <Plus className="h-4 w-4" />
                  Добавить этап
                </button>
              </section>

              <section className="rounded-2xl p-4 sm:p-5" style={{ backgroundColor: theme.panel }}>
                <p className="m-0 text-sm font-semibold">Поля карточки сделки</p>
                <div className="mt-3 space-y-2">
                  {['Сумма', 'Источник лида', 'Отрасль', 'Следующий шаг'].map((field) => (
                    <label
                      key={field}
                      className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5"
                      style={{ backgroundColor: theme.soft }}
                    >
                      <span className="text-sm">{field}</span>
                      <input type="checkbox" defaultChecked className="h-4 w-4 accent-current" style={{ color: accent }} />
                    </label>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl p-4 sm:p-5" style={{ backgroundColor: theme.panel }}>
                <p className="m-0 text-sm font-semibold">Права доступа</p>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="rounded-xl px-3 py-2.5" style={{ backgroundColor: theme.soft }}>
                    <p className="m-0 font-medium">Менеджер</p>
                    <p className="m-0 mt-0.5 text-xs" style={{ color: theme.muted }}>
                      Видит только свои сделки
                    </p>
                  </div>
                  <div className="rounded-xl px-3 py-2.5" style={{ backgroundColor: theme.soft }}>
                    <p className="m-0 font-medium">РОП / Руководитель</p>
                    <p className="m-0 mt-0.5 text-xs" style={{ color: theme.muted }}>
                      Видит все сделки команды
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl p-4 sm:p-5" style={{ backgroundColor: theme.panel }}>
                <p className="m-0 text-sm font-semibold">Интеграции</p>
                <div className="mt-3 space-y-2">
                  {['Почта', 'Телефония', 'Telegram'].map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-xl px-3 py-2.5"
                      style={{ backgroundColor: theme.soft }}
                    >
                      <span className="text-sm">{item}</span>
                      <span className="text-xs font-medium" style={{ color: accent }}>
                        Подключить
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CrmSalesPrototype;
