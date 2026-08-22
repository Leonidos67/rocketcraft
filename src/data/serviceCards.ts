import type { LucideIcon } from 'lucide-react';
import { Workflow, MessageSquare, Link2, BarChart3, Users } from 'lucide-react';

export interface ServiceStackCardMobileCopy {
  tagline: string;
  subtitle: string;
  bullets: string[];
}

export interface ServiceStackCard {
  id: string;
  title: string;
  tagline: string;
  subtitle: string;
  bullets: string[];
  outcome: string;
  mobile?: ServiceStackCardMobileCopy;
  icon: LucideIcon;
  accent: 'green' | 'blue' | 'orange' | 'pink' | 'violet';
  bgLetter: string;
  ctaLabel: string;
  priceFrom: number;
}

export const serviceStackCards: ServiceStackCard[] = [
  {
    id: 'automation',
    title: 'Автоматизация',
    tagline: 'Процессы работают сами — команда занимается ростом.',
    subtitle:
      'Снимаем рутину с менеджеров и операторов: заявки, отчёты, уведомления и согласования запускаются без ручного труда.',
    bullets: [
      'Автоматизация заявок и отчётов',
      'Взаимодействие с клиентами',
      'До 90% меньше ручной работы',
    ],
    outcome: 'Бизнес работает быстрее, сотрудники — продуктивнее, клиенты — довольнее.',
    mobile: {
      tagline: 'Процессы работают сами.',
      subtitle: 'Заявки, отчёты и уведомления — без ручного труда.',
      bullets: ['Заявки и отчёты', 'До 90% меньше рутины', 'Без ошибок вручную'],
    },
    icon: Workflow,
    accent: 'green',
    bgLetter: 'A',
    ctaLabel: 'Заказать',
    priceFrom: 45000,
  },
  {
    id: 'bots',
    title: 'Боты',
    tagline: 'Клиенты получают ответ за секунды — даже ночью.',
    subtitle:
      'Telegram и WhatsApp-боты принимают заявки, бронируют слоты и отвечают на типовые вопросы без участия менеджера.',
    bullets: [
      'Заявки и бронирования 24/7',
      'Автоматические напоминания',
      'Мгновенная обработка запросов',
    ],
    outcome: 'Клиенты получают ответы мгновенно, а вы экономите время на рутинных операциях.',
    mobile: {
      tagline: 'Ответ клиенту за секунды — 24/7.',
      subtitle: 'Боты принимают заявки и отвечают без менеджера.',
      bullets: ['Заявки и бронирования', 'Автонапоминания', 'Без ожидания'],
    },
    icon: MessageSquare,
    accent: 'blue',
    bgLetter: 'G',
    ctaLabel: 'Заказать',
    priceFrom: 40000,
  },
  {
    id: 'integrations',
    title: 'Интеграции',
    tagline: 'Данные текут между системами — без копипаста и потерь.',
    subtitle:
      'Связываем CRM, сайт, мессенджеры, оплату и учёт в единый контур: заявка из любого канала сразу попадает туда, где с ней работают.',
    bullets: [
      'API-интеграции платформ',
      'Синхронизация заявок и оплат',
      'Make, n8n и кастомные сценарии',
    ],
    outcome: 'Все инструменты работают вместе — без дублирования и потери информации.',
    mobile: {
      tagline: 'Данные между системами без потерь.',
      subtitle: 'CRM, сайт, мессенджеры и оплата в одном контуре.',
      bullets: ['API между платформами', 'Синхронизация статусов', 'Make и n8n'],
    },
    icon: Link2,
    accent: 'orange',
    bgLetter: 'Y',
    ctaLabel: 'Заказать',
    priceFrom: 35000,
  },
  {
    id: 'ai',
    title: 'AI и аналитика',
    tagline: 'Решения на основе данных, а не догадок.',
    subtitle:
      'Внедряем AI-ассистентов, прогнозную аналитику и дашборды, которые показывают, где бизнес теряет деньги и что масштабировать.',
    bullets: [
      'Анализ данных и закономерностей',
      'Прогноз трендов и спроса',
      'Узкие места в процессах',
    ],
    outcome: 'Данные работают на вас, помогая принимать решения быстрее и точнее.',
    mobile: {
      tagline: 'Решения на данных, не на догадках.',
      subtitle: 'AI-ассистенты и дашборды для точных решений.',
      bullets: ['Прогноз спроса', 'Узкие места', 'AI-ассистенты'],
    },
    icon: BarChart3,
    accent: 'pink',
    bgLetter: 'R',
    ctaLabel: 'Заказать',
    priceFrom: 50000,
  },
  {
    id: 'crm',
    title: 'CRM',
    tagline: 'Каждый лид под контролем — от первого касания до сделки.',
    subtitle:
      'Внедряем и настраиваем CRM под вашу воронку: Битрикс24, amoCRM, автоматизация этапов и интеграция с каналами продаж.',
    bullets: [
      'Битрикс24 и amoCRM под ключ',
      'Воронки и автоматизация',
      'Единая база клиентов',
    ],
    outcome: 'Продажи под контролем: ни один лид не теряется, команда работает в одной системе.',
    mobile: {
      tagline: 'Каждый лид под контролем.',
      subtitle: 'Битрикс24 и amoCRM под вашу воронку продаж.',
      bullets: ['Воронки', 'Автоматизация', 'Единая база'],
    },
    icon: Users,
    accent: 'violet',
    bgLetter: 'A',
    ctaLabel: 'Заказать',
    priceFrom: 50000,
  },
];

export const getServiceCardById = (id: string) =>
  serviceStackCards.find((c) => c.id === id);
