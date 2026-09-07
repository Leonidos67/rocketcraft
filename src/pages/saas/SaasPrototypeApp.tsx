import { useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  BarChart3,
  Inbox,
  LayoutDashboard,
  MessageSquare,
  Search,
  Send,
} from 'lucide-react';
import {
  getSaasPreviewItem,
  saasAccentOptions,
  type SaasAccentId,
  type SaasThemeMode,
} from '@/data/saasPreviewCatalog';
import { readProductPreviewCompany } from '@/lib/productPreviewCompany';
import { cn } from '@/lib/utils';
import CrmDashboardPrototype from '@/pages/saas/CrmDashboardPrototype';
import CrmSalesPrototype from '@/pages/saas/CrmSalesPrototype';
import SalonBookingPrototype from '@/pages/saas/SalonBookingPrototype';
import SupportPrototype from '@/pages/saas/SupportPrototype';
import TelegramBotPrototype from '@/pages/bots/TelegramBotPrototype';
import { isTelegramBotDemoId } from '@/data/telegramBotDemos';

const tickets = [
  {
    id: 't1',
    subject: 'Не приходит уведомление',
    client: 'Елена К.',
    status: 'open',
    preview: 'Здравствуйте! После обновления не приходят письма…',
  },
  {
    id: 't2',
    subject: 'Вопрос по тарифу',
    client: 'Максим Р.',
    status: 'pending',
    preview: 'Можно ли перейти на годовой план со скидкой?',
  },
  {
    id: 't3',
    subject: 'Интеграция с CRM',
    client: 'Studio X',
    status: 'open',
    preview: 'Нужен webhook при смене статуса сделки.',
  },
];

const metrics = [
  { label: 'Лиды', value: '128', delta: '+12%' },
  { label: 'Сделки', value: '34', delta: '+8%' },
  { label: 'Конверсия', value: '18%', delta: '+2%' },
  { label: 'Выручка', value: '1.2 млн', delta: '+15%' },
];

const SaasPrototypeApp = () => {
  const { saasId = 'crm' } = useParams();
  const [searchParams] = useSearchParams();
  const item = getSaasPreviewItem(saasId);

  const brand =
    searchParams.get('brand')?.trim() ||
    readProductPreviewCompany()?.productName ||
    'Your Product';
  const userName =
    searchParams.get('user')?.trim() ||
    readProductPreviewCompany()?.userName ||
    'Пользователь';
  const companyName =
    searchParams.get('company')?.trim() ||
    readProductPreviewCompany()?.companyName ||
    'Компания';

  const theme = (searchParams.get('theme') as SaasThemeMode) || 'light';
  const accentId = (searchParams.get('accent') as SaasAccentId) || 'blue';
  const accent =
    saasAccentOptions.find((option) => option.id === accentId)?.color ?? '#3b82f6';

  const isDark = theme === 'dark';

  const [activeTicketId, setActiveTicketId] = useState(tickets[0].id);
  const [reply, setReply] = useState('');
  const [messages, setMessages] = useState<Record<string, string[]>>({
    t1: ['Здравствуйте! После обновления не приходят письма.', 'Проверяем настройки…'],
    t2: ['Можно ли перейти на годовой план со скидкой?'],
    t3: ['Нужен webhook при смене статуса сделки.'],
  });
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');

  const shell = useMemo(
    () => ({
      bg: isDark ? '#0b0b0c' : '#f4f4f5',
      panel: isDark ? '#141416' : '#ffffff',
      border: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
      text: isDark ? '#f5f5f5' : '#111111',
      muted: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.5)',
      soft: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
    }),
    [isDark],
  );

  const activeTicket = tickets.find((ticket) => ticket.id === activeTicketId) ?? tickets[0];

  if (isTelegramBotDemoId(saasId)) {
    return <TelegramBotPrototype />;
  }

  if (saasId === 'booking') {
    return (
      <SalonBookingPrototype
        brand={brand}
        userName={userName}
        companyName={companyName}
        accent={accent}
        isDark={isDark}
      />
    );
  }

  if (saasId === 'support') {
    const page = searchParams.get('page');
    const initialView =
      page === 'widget' ? 'widget' : page === 'ai' ? 'ai' : 'chats';
    return (
      <SupportPrototype
        brand={brand}
        userName={userName}
        companyName={companyName}
        accent={accent}
        isDark={isDark}
        initialView={initialView}
      />
    );
  }

  if (saasId === 'finance' || saasId === 'crm-finance') {
    const page = searchParams.get('page') || 'dashboard';
    return (
      <CrmDashboardPrototype
        brand={brand}
        userName={userName}
        companyName={companyName}
        accent={accent}
        isDark={isDark}
        initialPage={page}
      />
    );
  }

  if (saasId === 'crm') {
    const page = searchParams.get('page') || 'pipeline';
    return (
      <CrmSalesPrototype
        brand={brand}
        userName={userName}
        companyName={companyName}
        accent={accent}
        isDark={isDark}
        initialPage={page}
      />
    );
  }

  const navItems =
    saasId === 'support'
      ? [
          { id: 'inbox', label: 'Inbox', icon: Inbox },
          { id: 'chats', label: 'Чаты', icon: MessageSquare },
        ]
      : [
          { id: 'overview', label: 'Обзор', icon: LayoutDashboard },
          { id: 'reports', label: 'Отчёты', icon: BarChart3 },
        ];

  const sendReply = () => {
    const text = reply.trim();
    if (!text) return;
    setMessages((current) => ({
      ...current,
      [activeTicketId]: [...(current[activeTicketId] ?? []), text],
    }));
    setReply('');
  };

  return (
    <div
      className="flex h-[100svh] flex-col overflow-hidden supports-[height:100dvh]:h-[100dvh]"
      style={{ backgroundColor: shell.bg, color: shell.text }}
    >
      <header
        className="flex h-12 shrink-0 items-center justify-between gap-3 border-b px-4"
        style={{ borderColor: shell.border, backgroundColor: shell.panel }}
      >
        <div className="flex min-w-0 items-center gap-2">
          <div
            className="flex h-7 items-center rounded-md px-2 text-[0.65rem] font-bold uppercase tracking-wide text-white"
            style={{ backgroundColor: accent }}
          >
            {brand.slice(0, 2)}
          </div>
          <div className="min-w-0">
            <p className="m-0 truncate text-sm font-semibold">{brand}</p>
            <p className="m-0 truncate text-[0.6875rem]" style={{ color: shell.muted }}>
              {item?.appLabel ?? 'SaaS'} · прототип
            </p>
          </div>
        </div>
        <div
          className="hidden items-center gap-2 rounded-full px-3 py-1.5 text-xs sm:flex"
          style={{ backgroundColor: shell.soft, color: shell.muted }}
        >
          <Search className="h-3.5 w-3.5" />
          Поиск
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <aside
          className="hidden w-[12.5rem] shrink-0 flex-col gap-1 border-r p-2 sm:flex"
          style={{ borderColor: shell.border, backgroundColor: shell.panel }}
        >
          {navItems.map((nav, index) => {
            const Icon = nav.icon;
            const active = index === 0;
            return (
              <div
                key={nav.id}
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium"
                style={{
                  backgroundColor: active ? `${accent}22` : 'transparent',
                  color: active ? accent : shell.muted,
                }}
              >
                <Icon className="h-4 w-4" />
                {nav.label}
              </div>
            );
          })}
        </aside>

        <main className="min-h-0 flex-1 overflow-auto p-3 sm:p-4">
          {saasId === 'support' && (
            <div className="flex h-full min-h-[24rem] overflow-hidden rounded-2xl border" style={{ borderColor: shell.border }}>
              <div
                className="w-[40%] max-w-[18rem] shrink-0 overflow-auto border-r"
                style={{ borderColor: shell.border, backgroundColor: shell.panel }}
              >
                {tickets.map((ticket) => (
                  <button
                    key={ticket.id}
                    type="button"
                    onClick={() => setActiveTicketId(ticket.id)}
                    className="block w-full cursor-pointer border-none px-3 py-3 text-left"
                    style={{
                      backgroundColor:
                        activeTicketId === ticket.id ? `${accent}18` : 'transparent',
                      borderBottom: `1px solid ${shell.border}`,
                      color: shell.text,
                    }}
                  >
                    <p className="m-0 text-sm font-semibold">{ticket.subject}</p>
                    <p className="m-0 mt-1 truncate text-xs" style={{ color: shell.muted }}>
                      {ticket.client}: {ticket.preview}
                    </p>
                  </button>
                ))}
              </div>

              <div className="flex min-w-0 flex-1 flex-col" style={{ backgroundColor: shell.bg }}>
                <div
                  className="border-b px-4 py-3"
                  style={{ borderColor: shell.border, backgroundColor: shell.panel }}
                >
                  <p className="m-0 text-sm font-semibold">{activeTicket.subject}</p>
                  <p className="m-0 text-xs" style={{ color: shell.muted }}>
                    {activeTicket.client}
                  </p>
                </div>

                <div className="flex-1 space-y-2 overflow-auto p-4">
                  {(messages[activeTicketId] ?? []).map((message, index) => (
                    <div
                      key={`${activeTicketId}-${index}`}
                      className={cn(
                        'max-w-[85%] rounded-2xl px-3 py-2 text-sm',
                        index % 2 === 1 ? 'ml-auto' : '',
                      )}
                      style={{
                        backgroundColor: index % 2 === 1 ? accent : shell.panel,
                        color: index % 2 === 1 ? '#fff' : shell.text,
                      }}
                    >
                      {message}
                    </div>
                  ))}
                </div>

                <div
                  className="flex gap-2 border-t p-3"
                  style={{ borderColor: shell.border, backgroundColor: shell.panel }}
                >
                  <input
                    value={reply}
                    onChange={(event) => setReply(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') sendReply();
                    }}
                    placeholder="Ответить клиенту…"
                    className="h-10 flex-1 rounded-xl border-none px-3 text-sm outline-none"
                    style={{ backgroundColor: shell.soft, color: shell.text }}
                  />
                  <button
                    type="button"
                    onClick={sendReply}
                    className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border-none text-white"
                    style={{ backgroundColor: accent }}
                    aria-label="Отправить"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {saasId === 'dashboard' && (
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="m-0 text-lg font-semibold">Обзор показателей</h2>
                <div className="flex gap-1 rounded-full p-1" style={{ backgroundColor: shell.soft }}>
                  {(['7d', '30d', '90d'] as const).map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setPeriod(value)}
                      className="cursor-pointer rounded-full border-none px-3 py-1.5 text-xs font-semibold"
                      style={{
                        backgroundColor: period === value ? accent : 'transparent',
                        color: period === value ? '#fff' : shell.muted,
                      }}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
                {metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl border p-4"
                    style={{ borderColor: shell.border, backgroundColor: shell.panel }}
                  >
                    <p className="m-0 text-xs" style={{ color: shell.muted }}>
                      {metric.label}
                    </p>
                    <p className="m-0 mt-2 text-2xl font-semibold tracking-tight">{metric.value}</p>
                    <p className="m-0 mt-1 text-xs font-medium" style={{ color: accent }}>
                      {metric.delta}
                    </p>
                  </div>
                ))}
              </div>

              <div
                className="rounded-2xl border p-4"
                style={{ borderColor: shell.border, backgroundColor: shell.panel }}
              >
                <p className="m-0 mb-4 text-sm font-semibold">Динамика лидов</p>
                <div className="flex h-36 items-end gap-2">
                  {[40, 55, 35, 70, 48, 82, 60, 90, 66, 78, 52, 88].map((height, index) => (
                    <div
                      key={index}
                      className="flex-1 rounded-t-md"
                      style={{
                        height: `${height}%`,
                        backgroundColor: index === 7 ? accent : `${accent}55`,
                      }}
                    />
                  ))}
                </div>
              </div>

              <div
                className="overflow-hidden rounded-2xl border"
                style={{ borderColor: shell.border, backgroundColor: shell.panel }}
              >
                <div
                  className="grid grid-cols-3 gap-2 border-b px-4 py-2 text-xs font-semibold"
                  style={{ borderColor: shell.border, color: shell.muted }}
                >
                  <span>Канал</span>
                  <span>Лиды</span>
                  <span>Конверсия</span>
                </div>
                {[
                  ['Telegram Ads', '42', '21%'],
                  ['Яндекс Директ', '37', '16%'],
                  ['VK Реклама', '29', '12%'],
                ].map((row) => (
                  <div
                    key={row[0]}
                    className="grid grid-cols-3 gap-2 border-b px-4 py-3 text-sm last:border-b-0"
                    style={{ borderColor: shell.border }}
                  >
                    {row.map((cell) => (
                      <span key={cell}>{cell}</span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {!item && (
            <div className="flex h-full items-center justify-center text-sm" style={{ color: shell.muted }}>
              Прототип не найден
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SaasPrototypeApp;
