import type { LucideIcon } from 'lucide-react';
import { Workflow, MessageSquare, Link2, BarChart3, Users } from 'lucide-react';

export interface ServiceStackCard {
  id: string;
  title: string;
  tagline: string;
  subtitle: string;
  bullets: string[];
  outcome: string;
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
      'Автоматизация взаимодействия с клиентами',
      'Сокращение до 90% ручной работы и исключение ошибок',
    ],
    outcome: 'Бизнес работает быстрее, сотрудники — продуктивнее, клиенты — довольнее.',
    icon: Workflow,
    accent: 'green',
    bgLetter: 'A',
    ctaLabel: 'Заказать автоматизацию',
    priceFrom: 45000,
  },
  {
    id: 'bots',
    title: 'Боты',
    tagline: 'Клиенты получают ответ за секунды — даже ночью.',
    subtitle:
      'Telegram и WhatsApp-боты принимают заявки, бронируют слоты и отвечают на типовые вопросы без участия менеджера.',
    bullets: [
      'Приём заявок и бронирований 24/7',
      'Автоматические напоминания клиентам',
      'Мгновенная обработка запросов без ожидания',
    ],
    outcome: 'Клиенты получают ответы мгновенно, а вы экономите время на рутинных операциях.',
    icon: MessageSquare,
    accent: 'blue',
    bgLetter: 'G',
    ctaLabel: 'Заказать бота',
    priceFrom: 40000,
  },
  {
    id: 'integrations',
    title: 'Интеграции',
    tagline: 'Данные текут между системами — без копипаста и потерь.',
    subtitle:
      'Связываем CRM, сайт, мессенджеры, оплату и учёт в единый контур: заявка из любого канала сразу попадает туда, где с ней работают.',
    bullets: [
      'API-интеграции между платформами',
      'Синхронизация заявок, оплат и статусов',
      'Make, n8n и кастомные сценарии обмена данными',
    ],
    outcome: 'Все инструменты работают вместе — без дублирования и потери информации.',
    icon: Link2,
    accent: 'orange',
    bgLetter: 'Y',
    ctaLabel: 'Заказать интеграцию',
    priceFrom: 35000,
  },
  {
    id: 'ai',
    title: 'AI и аналитика',
    tagline: 'Решения на основе данных, а не догадок.',
    subtitle:
      'Внедряем AI-ассистентов, прогнозную аналитику и дашборды, которые показывают, где бизнес теряет деньги и что масштабировать.',
    bullets: [
      'Анализ больших данных и выявление закономерностей',
      'Прогнозирование трендов и спроса',
      'Автоматическое выявление узких мест в процессах',
    ],
    outcome: 'Данные работают на вас, помогая принимать решения быстрее и точнее.',
    icon: BarChart3,
    accent: 'pink',
    bgLetter: 'R',
    ctaLabel: 'Заказать AI-решение',
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
      'Воронки, автоматизация и интеграции с каналами',
      'Обучение команды и единая база клиентов',
    ],
    outcome: 'Продажи под контролем: ни один лид не теряется, команда работает в одной системе.',
    icon: Users,
    accent: 'violet',
    bgLetter: 'A',
    ctaLabel: 'Заказать внедрение CRM',
    priceFrom: 50000,
  },
];

export const getServiceCardById = (id: string) =>
  serviceStackCards.find((c) => c.id === id);
