export type CaseFilterId = 'all' | 'automation' | 'bots' | 'integrations' | 'ai';

export interface CaseFilter {
  id: CaseFilterId;
  label: string;
}

export interface CasePortfolioItem {
  id: string;
  title: string;
  industry: string;
  imageUrl: string;
  categories: Exclude<CaseFilterId, 'all'>[];
  serviceTags: string[];
  accent: 'blue' | 'pink' | 'orange' | 'purple' | 'yellow';
}

export interface CaseTestimonial {
  quote: string;
  author: string;
  company: string;
}

export const caseFilters: CaseFilter[] = [
  { id: 'all', label: 'Все услуги' },
  { id: 'automation', label: 'Автоматизация' },
  { id: 'bots', label: 'Боты' },
  { id: 'integrations', label: 'Интеграции' },
  { id: 'ai', label: 'AI и аналитика' },
];

export const casePortfolioItems: CasePortfolioItem[] = [
  {
    id: '1',
    title: 'Кофейня «Бодрый день»',
    industry: 'HoReCa',
    imageUrl: 'https://placehold.co/900x1100/22c55e/ffffff?text=Бодрый+день',
    categories: ['bots', 'integrations'],
    serviceTags: ['Telegram-бот', 'CRM-интеграция', 'Уведомления'],
    accent: 'blue',
  },
  {
    id: '2',
    title: 'Барбершоп «Стиль»',
    industry: 'Услуги',
    imageUrl: 'https://placehold.co/900x1100/3b82f6/ffffff?text=Стиль',
    categories: ['bots', 'integrations'],
    serviceTags: ['Онлайн-запись', 'CRM', 'Рассылки'],
    accent: 'pink',
  },
  {
    id: '3',
    title: 'Фитнес-клуб «Энергия»',
    industry: 'Фитнес',
    imageUrl: 'https://placehold.co/900x1100/f97316/ffffff?text=Энергия',
    categories: ['automation', 'ai'],
    serviceTags: ['Абонементы', 'Напоминания', 'Аналитика'],
    accent: 'orange',
  },
  {
    id: '4',
    title: 'Сеть магазинов «Маркет+»',
    industry: 'Ритейл',
    imageUrl: 'https://placehold.co/900x1100/ec4899/ffffff?text=Маркет%2B',
    categories: ['integrations', 'automation'],
    serviceTags: ['Интеграции', 'CRM', 'Склад'],
    accent: 'purple',
  },
  {
    id: '5',
    title: 'Онлайн-школа «Прогресс»',
    industry: 'Образование',
    imageUrl: 'https://placehold.co/900x1100/cdb7f1/0b1311?text=Прогресс',
    categories: ['automation', 'bots'],
    serviceTags: ['Автоматизация заявок', 'Бот поддержки', 'Отчёты'],
    accent: 'purple',
  },
  {
    id: '6',
    title: 'Логистика «Быстрый путь»',
    industry: 'Логистика',
    imageUrl: 'https://placehold.co/900x1100/f9e283/0b1311?text=Быстрый+путь',
    categories: ['ai', 'integrations'],
    serviceTags: ['AI-аналитика', 'Маршруты', 'Интеграции'],
    accent: 'yellow',
  },
];

export const caseTestimonials: CaseTestimonial[] = [
  {
    quote:
      'За три недели запустили бота для записи — клиенты перестали теряться, администратор наконец дышит. Цифры по новым визитам видим каждый день.',
    author: 'Анна К.',
    company: 'Кофейня «Бодрый день»',
  },
  {
    quote:
      'Раньше мастера сами отвечали в мессенджерах. Сейчас запись идёт автоматически, повторные визиты выросли — и это не маркетинговая фраза, а CRM.',
    author: 'Дмитрий Л.',
    company: 'Барбершоп «Стиль»',
  },
  {
    quote:
      'Напоминания и аналитика посещаемости — то, чего не хватало годами. Руководство наконец видит картину в цифрах, а не в Excel.',
    author: 'Елена М.',
    company: 'Фитнес-клуб «Энергия»',
  },
  {
    quote:
      'Связали склад, CRM и мессенджеры в одну цепочку. Ошибки в заказах почти исчезли, клиенты получают статус без звонков менеджеру.',
    author: 'Игорь В.',
    company: 'Сеть «Маркет+»',
  },
];

export const filterCases = (filter: CaseFilterId) =>
  filter === 'all'
    ? casePortfolioItems
    : casePortfolioItems.filter((item) => item.categories.includes(filter));
