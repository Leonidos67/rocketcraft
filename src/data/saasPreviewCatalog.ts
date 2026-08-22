export type SaasThemeMode = 'light' | 'dark';

export type SaasAccentId = 'blue' | 'violet' | 'orange' | 'mint';

export interface SaasAccentOption {
  id: SaasAccentId;
  label: string;
  color: string;
}

export const saasAccentOptions: SaasAccentOption[] = [
  { id: 'blue', label: 'Синий', color: '#3b82f6' },
  { id: 'violet', label: 'Фиолетовый', color: '#8b5cf6' },
  { id: 'orange', label: 'Оранжевый', color: '#ff643c' },
  { id: 'mint', label: 'Мятный', color: '#14b8a6' },
];

export interface SaasDemoPage {
  id: string;
  label: string;
  /** Query `page=` value for `/saas/:id` */
  page: string;
  /** Short caption under the demo preview for this tab */
  caption?: string;
}

export const saasHowItWorks = [
  'Вы вводите бренд и данные — они появляются в интерфейсе',
  'Смотрите демо: навигация, экраны, сценарии',
  'Оставляете заявку — адаптируем под ваш бизнес за 2–4 недели',
] as const;

export const saasMvpIncludes = [
  '3–5 основных экранов',
  'Адаптация под ваш бренд',
  'Базовая логика (запись / сделки / чаты)',
  'Развёртывание на вашем домене',
  '1 мес. поддержки после запуска',
] as const;

export interface SaasPreviewItem {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  audience: string;
  whatsInside: string[];
  howItWorks?: string[];
  mvpIncludes?: string[];
  mvpTitle?: string;
  extras?: string[];
  appLabel: string;
  previewBg: string;
  theme: SaasThemeMode;
  tags: string[];
  priceFrom: string;
  priceNote: string;
  livePath: string;
  /** Screens available in the interactive demo */
  demoPages: SaasDemoPage[];
}

export const saasPreviewCatalog: SaasPreviewItem[] = [
  {
    id: 'booking',
    title: 'Запись',
    category: 'Салон',
    description: 'Онлайн-запись к мастерам для бьюти и SPA.',
    longDescription:
      'Журнал записи для салона, студии или SPA. Клиенты видят свободные слоты, мастера и услуги — записываются сами. Вы управляете расписанием, подтверждаете визиты и видите загрузку в одном интерфейсе. Бренд, цвета и названия услуг — ваши.',
    audience: 'салонов красоты, барбершопов, SPA-студий, маникюрных кабинетов',
    whatsInside: [
      'Календарь дня по мастерам',
      'Карточка записи с подтверждением',
      'Список ближайших визитов',
      'Фильтр по мастерам и услугам',
    ],
    appLabel: 'Booking',
    previewBg: '#f3e9e4',
    theme: 'light',
    tags: ['Beauty'],
    priceFrom: 'от 10k ₽',
    priceNote: 'MVP до 5-7 дней',
    livePath: '/saas/booking',
    demoPages: [{ id: 'calendar', label: 'Журнал записи', page: 'calendar' }],
  },
  {
    id: 'finance',
    title: 'Фин. учет',
    category: 'Финансы',
    description: 'Выручка, показатели и финансовый контроль под вашим брендом.',
    longDescription:
      'Кабинет управления бизнесом: выручка, сделки, конверсия и KPI команды на одном экране. Видите динамику по месяцам, статус каждой сделки и приоритеты. Подходит для ИП, ООО и отделов продаж.',
    audience: 'ИП, ООО и отделов продаж',
    whatsInside: [
      'Дашборд с ключевыми метриками',
      'Динамика продаж онлайн/офлайн',
      'План продаж и KPI команды',
      'Таблица операций с фильтрами',
    ],
    appLabel: 'Finance',
    previewBg: '#1a1a1a',
    theme: 'dark',
    tags: ['Finance'],
    priceFrom: 'от 5k ₽',
    priceNote: 'MVP до 5-7 дней',
    livePath: '/saas/finance',
    demoPages: [
      { id: 'dashboard', label: 'Главная', page: 'dashboard' },
      { id: 'deals', label: 'Операции', page: 'deals' },
      { id: 'customers', label: 'Клиенты', page: 'customers' },
    ],
  },
  {
    id: 'crm',
    title: 'CRM',
    category: 'Продажи',
    description: 'Воронка продаж и управление сделками для менеджеров.',
    longDescription:
      'Воронка продаж и управление сделками в одном интерфейсе. Менеджеры ведут клиентов по этапам, видят задачи и историю коммуникаций. Руководитель контролирует конверсию и загрузку команды. Бренд, этапы воронки и поля карточки — настраиваются под ваш бизнес.',
    audience: 'B2B-компаний, агентств, отделов продаж услуг и товаров с длинным циклом сделки',
    whatsInside: [
      'Канбан-воронка со счётчиками и суммами',
      'Карточка сделки: контакт, таймлайн, задачи',
      'Список сделок с фильтрами и поиском',
      'Аналитика: конверсия, цикл, прогноз',
      'Настройки этапов, полей и прав',
    ],
    howItWorks: [
      'Вы вводите бренд и данные — они появляются в интерфейсе демо',
      'Смотрите, как менеджеры будут вести сделки в вашей CRM',
      'Оставляете заявку — мы настраиваем этапы воронки, поля и права под ваш бизнес',
      'Запуск за 3–4 недели: развёртывание, импорт данных, обучение команды',
    ],
    mvpTitle: 'Что включено в MVP за 20 000 ₽',
    mvpIncludes: [
      '5 основных экранов (воронка, карточка, список, аналитика, настройки)',
      'Настраиваемые этапы воронки и поля карточки',
      'Роли: менеджер и руководитель',
      'Адаптация под ваш бренд (цвета, логотип, название)',
      'Развёртывание на вашем домене',
      'Импорт до 500 существующих сделок',
      '2 недели поддержки после запуска',
    ],
    extras: [
      'Интеграция с почтой: +3 000 ₽',
      'Мобильная версия: +15 000 ₽',
      'Импорт данных из Excel/другой CRM: от 10 000 ₽',
    ],
    appLabel: 'CRM',
    previewBg: '#e7eef8',
    theme: 'light',
    tags: ['Sales'],
    priceFrom: 'от 20 000 ₽',
    priceNote: 'MVP за 3–4 недели',
    livePath: '/saas/crm',
    demoPages: [
      {
        id: 'pipeline',
        label: 'Воронка',
        page: 'pipeline',
        caption:
          'Перетаскивайте сделки между этапами. Видите общую сумму и количество на каждом шаге воронки.',
      },
      {
        id: 'deal',
        label: 'Карточка сделки',
        page: 'deal',
        caption:
          'Вся информация по сделке в одном месте: контакт, история общения, задачи и файлы.',
      },
      {
        id: 'list',
        label: 'Список сделок',
        page: 'list',
        caption: 'Классический список для тех, кто привык к таблицам. Быстрые фильтры и поиск.',
      },
      {
        id: 'analytics',
        label: 'Аналитика',
        page: 'analytics',
        caption:
          'Видите, где застревают сделки, кто из менеджеров эффективен, и сколько денег закроется в этом месяце.',
      },
      {
        id: 'settings',
        label: 'Настройки',
        page: 'settings',
        caption:
          'Адаптируйте воронку и поля под ваш процесс продаж. Управляйте правами доступа.',
      },
    ],
  },
  {
    id: 'support',
    title: 'Чат',
    category: 'Сервис',
    description: 'Виджет на сайте + кабинет всех обращений.',
    longDescription:
      'Чат-виджет для сайта + кабинет поддержки. Клиент пишет с вашего сайта — вы отвечаете из единого окна. Настраиваете приветствие, кнопки и автоответы. Все обращения в одном месте, ничего не теряется.',
    audience: 'интернет-магазинов, сервисов, клиник и локального бизнеса с сайтом',
    whatsInside: [
      'Чат-виджет на сайт',
      'Кабинет всех обращений',
      'Настройка приветствия и кнопок',
      'Автоответы и шаблоны',
    ],
    appLabel: 'Support',
    previewBg: '#e9f7e3',
    theme: 'light',
    tags: ['Widget'],
    priceFrom: 'от 10k ₽',
    priceNote: 'MVP до 5-7 дней',
    livePath: '/saas/support',
    demoPages: [
      { id: 'chats', label: 'Чаты / заявки', page: 'chats' },
      { id: 'widget', label: 'Настройка виджета', page: 'widget' },
      { id: 'ai', label: 'ИИ', page: 'ai' },
    ],
  },
];

export const getSaasPreviewItem = (id: string): SaasPreviewItem | undefined =>
  saasPreviewCatalog.find((item) => item.id === id);

export const isSaasPreviewId = (id: string): boolean =>
  saasPreviewCatalog.some((item) => item.id === id);
