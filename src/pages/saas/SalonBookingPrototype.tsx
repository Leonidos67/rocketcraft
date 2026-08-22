import { useEffect, useMemo, useState } from 'react';
import {
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Moon,
  Plus,
  Search,
  Sun,
  Users,
  X,
} from 'lucide-react';

interface SalonBookingPrototypeProps {
  brand: string;
  userName: string;
  companyName: string;
  accent: string;
  isDark: boolean;
}

interface Master {
  id: string;
  name: string;
  role: string;
  color: string;
}

interface Appointment {
  id: string;
  masterId: string;
  client: string;
  service: string;
  startHour: number;
  duration: number;
  phone: string;
}

const masters: Master[] = [
  { id: 'm1', name: 'Алина', role: 'Маникюр', color: '#f472b6' },
  { id: 'm2', name: 'Катя', role: 'Брови / ресницы', color: '#a78bfa' },
  { id: 'm3', name: 'Мария', role: 'SPA / уход', color: '#34d399' },
  { id: 'm4', name: 'Софья', role: 'Парикмахер', color: '#60a5fa' },
];

const hours = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

const services = [
  { id: 's1', name: 'Маникюр + покрытие', duration: 1.5, price: '2 800 ₽' },
  { id: 's2', name: 'Педикюр', duration: 1.5, price: '3 200 ₽' },
  { id: 's3', name: 'Окрашивание бровей', duration: 1, price: '1 500 ₽' },
  { id: 's4', name: 'SPA-уход для лица', duration: 2, price: '4 500 ₽' },
  { id: 's5', name: 'Стрижка женская', duration: 1, price: '2 400 ₽' },
];

const initialAppointments: Appointment[] = [
  {
    id: 'a1',
    masterId: 'm1',
    client: 'Анна В.',
    service: 'Маникюр + покрытие',
    startHour: 11,
    duration: 1.5,
    phone: '+7 900 111-22-33',
  },
  {
    id: 'a2',
    masterId: 'm2',
    client: 'Ирина Л.',
    service: 'Окрашивание бровей',
    startHour: 12,
    duration: 1,
    phone: '+7 900 222-33-44',
  },
  {
    id: 'a3',
    masterId: 'm3',
    client: 'Ольга С.',
    service: 'SPA-уход для лица',
    startHour: 14,
    duration: 2,
    phone: '+7 900 333-44-55',
  },
  {
    id: 'a4',
    masterId: 'm4',
    client: 'Дарья М.',
    service: 'Стрижка женская',
    startHour: 16,
    duration: 1,
    phone: '+7 900 444-55-66',
  },
  {
    id: 'a5',
    masterId: 'm1',
    client: 'Елена К.',
    service: 'Педикюр',
    startHour: 15,
    duration: 1.5,
    phone: '+7 900 555-66-77',
  },
];

const ROW_HEIGHT = 64;

const SalonBookingPrototype = ({
  brand,
  userName,
  companyName,
  accent,
  isDark: initialDark,
}: SalonBookingPrototypeProps) => {
  const [dark, setDark] = useState(initialDark);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [selectedMasterId, setSelectedMasterId] = useState<string | 'all'>('all');
  const [selectedId, setSelectedId] = useState(initialAppointments[0].id);
  const [composer, setComposer] = useState<{ masterId: string; startHour: number } | null>(null);
  const [draftClient, setDraftClient] = useState('');
  const [draftServiceId, setDraftServiceId] = useState(services[0].id);
  const [draftPhone, setDraftPhone] = useState('');

  useEffect(() => {
    setDark(initialDark);
  }, [initialDark]);

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
      page: dark ? '#0c0c0e' : '#f6f1ee',
      panel: dark ? '#141416' : '#ffffff',
      sidebar: dark ? '#101012' : '#ffffff',
      border: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
      text: dark ? '#f5f5f5' : '#1c1917',
      muted: dark ? 'rgba(255,255,255,0.55)' : '#78716c',
      soft: dark ? 'rgba(255,255,255,0.05)' : '#f5f5f4',
      softStrong: dark ? 'rgba(255,255,255,0.08)' : '#e7e5e4',
    }),
    [dark],
  );

  const visibleMasters =
    selectedMasterId === 'all' ? masters : masters.filter((master) => master.id === selectedMasterId);

  const selected = appointments.find((item) => item.id === selectedId) ?? appointments[0];
  const selectedMaster = masters.find((master) => master.id === selected?.masterId);

  const todayLabel = new Intl.DateTimeFormat('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date());

  const openComposer = (masterId: string, startHour: number) => {
    const occupied = appointments.some(
      (item) =>
        item.masterId === masterId &&
        startHour >= item.startHour &&
        startHour < item.startHour + item.duration,
    );
    if (occupied) return;
    setComposer({ masterId, startHour });
    setDraftClient('');
    setDraftPhone('');
    setDraftServiceId(services[0].id);
  };

  const createAppointment = () => {
    if (!composer || !draftClient.trim()) return;
    const service = services.find((item) => item.id === draftServiceId) ?? services[0];
    const next: Appointment = {
      id: `a-${Date.now()}`,
      masterId: composer.masterId,
      client: draftClient.trim(),
      service: service.name,
      startHour: composer.startHour,
      duration: service.duration,
      phone: draftPhone.trim() || '—',
    };
    setAppointments((current) => [...current, next]);
    setSelectedId(next.id);
    setComposer(null);
  };

  const hourLabel = (hour: number) => `${String(hour).padStart(2, '0')}:00`;

  return (
    <div
      className="flex h-[100svh] overflow-hidden supports-[height:100dvh]:h-[100dvh]"
      style={{ backgroundColor: theme.page, color: theme.text }}
    >
      <aside
        className="hidden w-[16rem] shrink-0 flex-col border-r p-3 xl:flex"
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
              Запись
            </p>
          </div>
        </div>

        <div
          className="mb-4 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm"
          style={{ backgroundColor: theme.soft, color: theme.muted }}
        >
          <Search className="h-4 w-4 shrink-0" />
          Найти клиента
        </div>

        <div className="mb-3 px-2">
          <p
            className="mb-2 text-[0.625rem] font-semibold uppercase tracking-[0.08em]"
            style={{ color: theme.muted }}
          >
            Мастера
          </p>
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => setSelectedMasterId('all')}
              className="flex cursor-pointer items-center gap-2 rounded-xl border-none px-2.5 py-2 text-left text-sm font-medium"
              style={{
                backgroundColor: selectedMasterId === 'all' ? theme.soft : 'transparent',
                color: selectedMasterId === 'all' ? theme.text : theme.muted,
                boxShadow: selectedMasterId === 'all' ? `inset 3px 0 0 ${accent}` : 'none',
              }}
            >
              <Users className="h-4 w-4" />
              Все мастера
            </button>
            {masters.map((master) => (
              <button
                key={master.id}
                type="button"
                onClick={() => setSelectedMasterId(master.id)}
                className="flex cursor-pointer items-center gap-2.5 rounded-xl border-none px-2.5 py-2 text-left"
                style={{
                  backgroundColor: selectedMasterId === master.id ? theme.soft : 'transparent',
                  boxShadow: selectedMasterId === master.id ? `inset 3px 0 0 ${accent}` : 'none',
                }}
              >
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full text-[0.65rem] font-bold text-white"
                  style={{ backgroundColor: master.color }}
                >
                  {master.name.slice(0, 1)}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">{master.name}</span>
                  <span className="block truncate text-[0.6875rem]" style={{ color: theme.muted }}>
                    {master.role}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <button
            type="button"
            className="flex w-full cursor-pointer items-center gap-2.5 rounded-2xl border-none p-2 text-left"
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
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header
          className="flex h-14 shrink-0 items-center justify-between gap-3 border-b px-4 sm:px-5"
          style={{ backgroundColor: theme.panel, borderColor: theme.border }}
        >
          <div className="min-w-0">
            <p className="m-0 flex items-center gap-2 text-sm font-semibold capitalize">
              <CalendarDays className="h-4 w-4" style={{ color: accent }} />
              {todayLabel}
            </p>
            <p className="m-0 truncate text-xs" style={{ color: theme.muted }}>
              {appointments.length} записей · {visibleMasters.length} мастеров на экране
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div
              className="hidden items-center overflow-hidden rounded-full sm:flex"
              style={{ backgroundColor: theme.soft }}
            >
              <button
                type="button"
                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center border-none bg-transparent"
                style={{ color: theme.muted }}
                aria-label="Предыдущий день"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="px-2 text-xs font-semibold">Сегодня</span>
              <button
                type="button"
                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center border-none bg-transparent"
                style={{ color: theme.muted }}
                aria-label="Следующий день"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => setDark((current) => !current)}
              className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-none"
              style={{ backgroundColor: theme.soft, color: theme.muted }}
              aria-label={dark ? 'Включить светлую тему' : 'Включить тёмную тему'}
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={() => openComposer(visibleMasters[0]?.id ?? 'm1', 11)}
              className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full border-none px-3 text-xs font-semibold text-white"
              style={{ backgroundColor: accent }}
            >
              <Plus className="h-3.5 w-3.5" />
              Новая запись
            </button>
          </div>
        </header>

        <main className="grid min-h-0 flex-1 gap-3 p-3 lg:grid-cols-[minmax(0,1fr)_18rem] lg:p-4">
          <section
            className="min-h-0 overflow-auto rounded-2xl border"
            style={{ backgroundColor: theme.panel, borderColor: theme.border }}
          >
            <div
              className="sticky top-0 z-[2] grid border-b"
              style={{
                gridTemplateColumns: `4.5rem repeat(${visibleMasters.length}, minmax(8.5rem, 1fr))`,
                backgroundColor: theme.panel,
                borderColor: theme.border,
              }}
            >
              <div className="px-3 py-3 text-xs font-semibold" style={{ color: theme.muted }}>
                Время
              </div>
              {visibleMasters.map((master) => (
                <div key={master.id} className="flex items-center gap-2 border-l px-3 py-3" style={{ borderColor: theme.border }}>
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: master.color }}
                  />
                  <div className="min-w-0">
                    <p className="m-0 truncate text-sm font-semibold">{master.name}</p>
                    <p className="m-0 truncate text-[0.6875rem]" style={{ color: theme.muted }}>
                      {master.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="relative grid"
              style={{
                gridTemplateColumns: `4.5rem repeat(${visibleMasters.length}, minmax(8.5rem, 1fr))`,
                minHeight: hours.length * ROW_HEIGHT,
              }}
            >
              <div>
                {hours.map((hour) => (
                  <div
                    key={hour}
                    className="flex items-start justify-end border-b pr-3 pt-2 text-xs font-medium"
                    style={{ height: ROW_HEIGHT, borderColor: theme.border, color: theme.muted }}
                  >
                    {hourLabel(hour)}
                  </div>
                ))}
              </div>

              {visibleMasters.map((master) => (
                <div
                  key={master.id}
                  className="relative border-l"
                  style={{ borderColor: theme.border, minHeight: hours.length * ROW_HEIGHT }}
                >
                  {hours.map((hour) => (
                    <button
                      key={`${master.id}-${hour}`}
                      type="button"
                      onClick={() => openComposer(master.id, hour)}
                      className="absolute left-0 right-0 w-full cursor-pointer border-b border-none bg-transparent transition-colors hover:bg-black/[0.03]"
                      style={{
                        top: (hour - hours[0]) * ROW_HEIGHT,
                        height: ROW_HEIGHT,
                        borderColor: theme.border,
                        borderBottomStyle: 'solid',
                        borderBottomWidth: 1,
                      }}
                      aria-label={`Слот ${master.name} ${hourLabel(hour)}`}
                    />
                  ))}

                  {appointments
                    .filter((item) => item.masterId === master.id)
                    .map((item) => {
                      const top = (item.startHour - hours[0]) * ROW_HEIGHT + 4;
                      const height = item.duration * ROW_HEIGHT - 8;
                      const active = selectedId === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            setSelectedId(item.id);
                          }}
                          className="absolute left-1.5 right-1.5 z-[1] cursor-pointer overflow-hidden rounded-xl border-none p-2.5 text-left shadow-sm transition-transform hover:scale-[1.01]"
                          style={{
                            top,
                            height,
                            backgroundColor: active ? accent : `${master.color}33`,
                            color: active ? '#fff' : theme.text,
                            outline: active ? `2px solid ${accent}` : 'none',
                          }}
                        >
                          <p className="m-0 truncate text-xs font-semibold">{item.client}</p>
                          <p
                            className="m-0 mt-0.5 truncate text-[0.6875rem]"
                            style={{ color: active ? 'rgba(255,255,255,0.85)' : theme.muted }}
                          >
                            {item.service}
                          </p>
                          <p
                            className="m-0 mt-1 flex items-center gap-1 text-[0.625rem] font-medium"
                            style={{ color: active ? 'rgba(255,255,255,0.85)' : theme.muted }}
                          >
                            <Clock3 className="h-3 w-3" />
                            {hourLabel(item.startHour)} · {item.duration}ч
                          </p>
                        </button>
                      );
                    })}
                </div>
              ))}
            </div>
          </section>

          <aside className="flex min-h-0 flex-col gap-3">
            <div
              className="rounded-2xl border p-4"
              style={{ backgroundColor: theme.panel, borderColor: theme.border }}
            >
              <p className="m-0 text-xs font-semibold uppercase tracking-[0.06em]" style={{ color: theme.muted }}>
                Карточка записи
              </p>
              {selected ? (
                <>
                  <h2 className="m-0 mt-2 text-xl font-semibold tracking-tight">{selected.client}</h2>
                  <p className="m-0 mt-1 text-sm" style={{ color: theme.muted }}>
                    {selected.service}
                  </p>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <span style={{ color: theme.muted }}>Мастер</span>
                      <span className="font-medium">{selectedMaster?.name}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span style={{ color: theme.muted }}>Время</span>
                      <span className="font-medium">
                        {hourLabel(selected.startHour)} · {selected.duration}ч
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span style={{ color: theme.muted }}>Телефон</span>
                      <span className="font-medium">{selected.phone}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-4 inline-flex h-10 w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border-none text-sm font-semibold text-white"
                    style={{ backgroundColor: accent }}
                  >
                    <Check className="h-4 w-4" />
                    Подтвердить визит
                  </button>
                </>
              ) : (
                <p className="m-0 mt-3 text-sm" style={{ color: theme.muted }}>
                  Выберите запись в календаре
                </p>
              )}
            </div>

            <div
              className="min-h-0 flex-1 overflow-auto rounded-2xl border p-4"
              style={{ backgroundColor: theme.panel, borderColor: theme.border }}
            >
              <p className="m-0 mb-3 text-sm font-semibold">Ближайшие записи</p>
              <div className="flex flex-col gap-2">
                {[...appointments]
                  .sort((a, b) => a.startHour - b.startHour)
                  .slice(0, 6)
                  .map((item) => {
                    const master = masters.find((entry) => entry.id === item.masterId);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedId(item.id)}
                        className="flex cursor-pointer items-start gap-2.5 rounded-xl border-none p-2.5 text-left"
                        style={{
                          backgroundColor: selectedId === item.id ? `${accent}14` : theme.soft,
                        }}
                      >
                        <span
                          className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: master?.color ?? accent }}
                        />
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold">{item.client}</span>
                          <span className="block truncate text-xs" style={{ color: theme.muted }}>
                            {hourLabel(item.startHour)} · {master?.name} · {item.service}
                          </span>
                        </span>
                      </button>
                    );
                  })}
              </div>
            </div>
          </aside>
        </main>
      </div>

      {composer && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/35 p-4">
          <div
            className="w-full max-w-md rounded-3xl p-5 shadow-2xl"
            style={{ backgroundColor: theme.panel, color: theme.text }}
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="m-0 text-lg font-semibold">Новая запись</p>
                <p className="m-0 mt-1 text-sm" style={{ color: theme.muted }}>
                  {masters.find((master) => master.id === composer.masterId)?.name} ·{' '}
                  {hourLabel(composer.startHour)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setComposer(null)}
                className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none"
                style={{ backgroundColor: theme.soft, color: theme.muted }}
                aria-label="Закрыть"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <input
                value={draftClient}
                onChange={(event) => setDraftClient(event.target.value)}
                placeholder="Имя клиента"
                className="h-11 rounded-xl border-none px-3 text-sm outline-none"
                style={{ backgroundColor: theme.soft, color: theme.text }}
                autoFocus
              />
              <input
                value={draftPhone}
                onChange={(event) => setDraftPhone(event.target.value)}
                placeholder="Телефон"
                className="h-11 rounded-xl border-none px-3 text-sm outline-none"
                style={{ backgroundColor: theme.soft, color: theme.text }}
              />
              <select
                value={draftServiceId}
                onChange={(event) => setDraftServiceId(event.target.value)}
                className="h-11 rounded-xl border-none px-3 text-sm outline-none"
                style={{ backgroundColor: theme.soft, color: theme.text }}
              >
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} · {service.duration}ч · {service.price}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={createAppointment}
                className="mt-1 inline-flex h-11 cursor-pointer items-center justify-center rounded-xl border-none text-sm font-semibold text-white"
                style={{ backgroundColor: accent }}
              >
                Сохранить запись
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalonBookingPrototype;
