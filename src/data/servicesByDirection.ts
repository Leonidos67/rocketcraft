import { serviceStackCards, type ServiceStackCard } from '@/data/serviceCards';

export interface DirectionService {
  id: string;
  title: string;
  description: string;
  priceFrom: number;
  priceOld?: number;
}

export interface ServiceDirection extends ServiceStackCard {
  services: DirectionService[];
}

export const servicesByDirection: ServiceDirection[] = [
  {
    ...serviceStackCards[0],
    services: [
      {
        id: 'biz-automation',
        title: 'Автоматизация бизнес-процессов',
        description:
          'Сценарии в Make, n8n или на собственном коде: заявки, отчёты, уведомления, синхронизация данных.',
        priceFrom: 45000,
      },
      {
        id: 'leads-reports',
        title: 'Автоматизация заявок и отчётов',
        description:
          'Сбор заявок из каналов, маршрутизация, статусы и автоматические отчёты для руководителя.',
        priceFrom: 40000,
      },
      {
        id: 'roistat',
        title: 'Внедрение сквозной аналитики Roistat',
        description:
          'Подключение Roistat, настройка целей, коллтрекинг, интеграция с CRM и рекламными кабинетами.',
        priceFrom: 35000,
      },
      {
        id: 'client-automation',
        title: 'Автоматизация взаимодействия с клиентами',
        description:
          'Триггерные цепочки, напоминания, статусы заказов и персональные уведомления без ручного труда.',
        priceFrom: 38000,
      },
      {
        id: 'approvals',
        title: 'Автоматизация согласований',
        description:
          'Маршруты согласования документов, заявок и закупок с уведомлениями и эскалацией.',
        priceFrom: 35000,
      },
      {
        id: 'notifications',
        title: 'Система уведомлений и алертов',
        description:
          'Оповещения в Telegram, email и CRM при ключевых событиях в бизнес-процессах.',
        priceFrom: 30000,
      },
    ],
  },
  {
    ...serviceStackCards[1],
    services: [
      {
        id: 'telegram-bot',
        title: 'Telegram-бот под ключ',
        description:
          'Приём заявок, FAQ, бронирование, интеграция с CRM и оплатой. Запуск за 5–14 дней.',
        priceFrom: 40000,
        priceOld: 55000,
      },
      {
        id: 'whatsapp-bot',
        title: 'WhatsApp-бот для бизнеса',
        description:
          'Автоответы, приём заказов, напоминания и передача диалога менеджеру при необходимости.',
        priceFrom: 45000,
      },
      {
        id: 'booking-bot',
        title: 'Бот для записи и бронирования',
        description:
          'Онлайн-запись на услуги, выбор слота, подтверждение и напоминания клиенту.',
        priceFrom: 42000,
      },
      {
        id: 'support-bot',
        title: 'Бот поддержки и FAQ',
        description:
          'Ответы на типовые вопросы 24/7, база знаний, эскалация сложных обращений.',
        priceFrom: 35000,
      },
      {
        id: 'lead-bot',
        title: 'Бот приёма заявок',
        description:
          'Квалификация лидов, сбор контактов и автоматическая передача в CRM.',
        priceFrom: 38000,
      },
      {
        id: 'bot-broadcast',
        title: 'Рассылки и напоминания через бота',
        description:
          'Сегментированные рассылки, триггерные напоминания и реактивация клиентов.',
        priceFrom: 30000,
      },
      {
        id: 'site-widget-bot',
        title: 'Виджет-бот на сайте',
        description:
          'Чат на сайте с интеграцией в мессенджеры и CRM, сбор заявок без форм.',
        priceFrom: 40000,
      },
    ],
  },
  {
    ...serviceStackCards[2],
    services: [
      {
        id: 'api-integration',
        title: 'API-интеграция между платформами',
        description:
          'Связка CRM, сайта, учёта и внешних сервисов через REST API и вебхуки.',
        priceFrom: 35000,
      },
      {
        id: 'crm-site',
        title: 'Интеграция CRM и сайта',
        description:
          'Заявки с форм и каталога сразу попадают в CRM с нужными полями и источником.',
        priceFrom: 40000,
      },
      {
        id: 'crm-messengers',
        title: 'Интеграция CRM и мессенджеров',
        description:
          'Диалоги из Telegram и WhatsApp в карточке клиента, история и статусы сделок.',
        priceFrom: 38000,
      },
      {
        id: 'payments-sync',
        title: 'Синхронизация оплат и статусов',
        description:
          'Связка платёжных систем с CRM и учётом: оплата → статус заказа → уведомление.',
        priceFrom: 35000,
      },
      {
        id: 'make-n8n',
        title: 'Сценарии Make / n8n',
        description:
          'Настройка и поддержка no-code сценариев обмена данными между сервисами.',
        priceFrom: 32000,
      },
      {
        id: '1c-integration',
        title: 'Интеграция с 1С',
        description:
          'Синхронизация товаров, заказов, остатков и контрагентов между 1С и онлайн-каналами.',
        priceFrom: 55000,
      },
      {
        id: 'marketplace-sync',
        title: 'Интеграция с маркетплейсами',
        description:
          'Обмен заказами и остатками с Ozon, Wildberries, Яндекс Маркет и другими площадками.',
        priceFrom: 48000,
      },
    ],
  },
  {
    ...serviceStackCards[3],
    services: [
      {
        id: 'ai-assistant',
        title: 'AI-ассистент для поддержки',
        description:
          'GPT-бот с вашей базой знаний: ответы клиентам, классификация обращений, черновики ответов.',
        priceFrom: 50000,
        priceOld: 65000,
      },
      {
        id: 'dashboards',
        title: 'Дашборды и BI-отчёты',
        description:
          'Визуализация KPI, воронок и операционных метрик в единой панели для руководителя.',
        priceFrom: 35000,
      },
      {
        id: 'predictive',
        title: 'Прогнозная аналитика',
        description:
          'Прогноз спроса, оттока и выручки на основе исторических данных и ML-моделей.',
        priceFrom: 60000,
      },
      {
        id: 'tech-audit',
        title: 'Технический аудит и анализ',
        description:
          'Разбор сайта и инфраструктуры: производительность, безопасность, SEO, рекомендации.',
        priceFrom: 30000,
        priceOld: 40000,
      },
      {
        id: 'expert-systems',
        title: 'Экспертные системы',
        description:
          'Системы принятия решений на основе правил и ML для специализированных задач.',
        priceFrom: 150000,
      },
      {
        id: 'smart-corp',
        title: 'Умные корпоративные системы',
        description:
          'AI-модули в CRM и ERP: классификация, прогнозы, рекомендации для менеджеров.',
        priceFrom: 200000,
      },
      {
        id: 'process-analytics',
        title: 'Аналитика узких мест в процессах',
        description:
          'Выявление потерь времени и денег в операциях, приоритизация автоматизации.',
        priceFrom: 45000,
      },
    ],
  },
  {
    ...serviceStackCards[4],
    services: [
      {
        id: 'bitrix24',
        title: 'Внедрение Битрикс24',
        description:
          'Настройка воронок, автоматизация, интеграция с сайтом, телефонией и 1С. Обучение команды.',
        priceFrom: 50000,
        priceOld: 65000,
      },
      {
        id: 'amocrm',
        title: 'Внедрение amoCRM',
        description:
          'Воронки продаж, интеграции с каналами, роботы и отчёты под вашу модель продаж.',
        priceFrom: 45000,
      },
      {
        id: 'sales-funnels',
        title: 'Настройка воронок продаж',
        description:
          'Проектирование этапов сделки, автоматические задачи и контроль конверсии.',
        priceFrom: 35000,
      },
      {
        id: 'crm-channels',
        title: 'Интеграция CRM с каналами',
        description:
          'Связка CRM с сайтом, мессенджерами, телефонией и рекламой в единый контур.',
        priceFrom: 40000,
      },
      {
        id: 'crm-training',
        title: 'Обучение команды работе в CRM',
        description:
          'Инструкции, воркшопы и сопровождение на старте — команда уверенно работает в системе.',
        priceFrom: 25000,
      },
      {
        id: 'crm-custom',
        title: 'Разработка CRM на заказ',
        description:
          'Индивидуальная CRM под ваши процессы: лиды, сделки, задачи, отчёты и интеграции.',
        priceFrom: 200000,
      },
      {
        id: 'crm-migration',
        title: 'Миграция данных в CRM',
        description:
          'Перенос клиентов, сделок и истории из таблиц или старой системы без потерь.',
        priceFrom: 30000,
      },
    ],
  },
];

export const getDirectionById = (id: string) =>
  servicesByDirection.find((direction) => direction.id === id);
