export type TelegramMessageKind = 'bot' | 'user';

export type TelegramKeyboardButton = {
  id: string;
  label: string;
};

export type TelegramBotStep = {
  id: string;
  botText: string[];
  keyboard?: TelegramKeyboardButton[];
  /** Maps button id → next step id */
  next?: Record<string, string>;
  /** If no keyboard, auto-advance after ms (optional) */
  end?: boolean;
};

export type TelegramBotDemo = {
  id: string;
  botName: string;
  botUsername: string;
  avatarEmoji: string;
  accent: string;
  startStepId: string;
  steps: Record<string, TelegramBotStep>;
};

export const telegramBotDemos: Record<string, TelegramBotDemo> = {
  'bot-booking': {
    id: 'bot-booking',
    botName: 'Запись',
    botUsername: 'booking_bot',
    avatarEmoji: '✂️',
    accent: '#2AABEE',
    startStepId: 'welcome',
    steps: {
      welcome: {
        id: 'welcome',
        botText: [
          'Здравствуйте! Я бот онлайн-записи.',
          'Выберите услугу — подберу свободное время.',
        ],
        keyboard: [
          { id: 'haircut', label: 'Стрижка' },
          { id: 'color', label: 'Окрашивание' },
          { id: 'manicure', label: 'Маникюр' },
        ],
        next: {
          haircut: 'master',
          color: 'master',
          manicure: 'master',
        },
      },
      master: {
        id: 'master',
        botText: ['Отличный выбор. К кому хотите записаться?'],
        keyboard: [
          { id: 'anna', label: 'Анна' },
          { id: 'maria', label: 'Мария' },
          { id: 'any', label: 'Любой мастер' },
        ],
        next: {
          anna: 'slot',
          maria: 'slot',
          any: 'slot',
        },
      },
      slot: {
        id: 'slot',
        botText: ['Свободные слоты на завтра:'],
        keyboard: [
          { id: 't1', label: '11:00' },
          { id: 't2', label: '14:30' },
          { id: 't3', label: '18:00' },
        ],
        next: {
          t1: 'confirm',
          t2: 'confirm',
          t3: 'confirm',
        },
      },
      confirm: {
        id: 'confirm',
        botText: [
          'Запись создана.',
          'Пришлём напоминание за 2 часа до визита. Можно перенести или отменить прямо в этом чате.',
        ],
        keyboard: [
          { id: 'again', label: 'Новая запись' },
          { id: 'done', label: 'Готово' },
        ],
        next: {
          again: 'welcome',
          done: 'bye',
        },
      },
      bye: {
        id: 'bye',
        botText: ['Спасибо! Если понадобится — напишите /start.'],
        end: true,
      },
    },
  },
  'bot-faq': {
    id: 'bot-faq',
    botName: 'FAQ',
    botUsername: 'support_faq_bot',
    avatarEmoji: '💬',
    accent: '#34C759',
    startStepId: 'menu',
    steps: {
      menu: {
        id: 'menu',
        botText: [
          'Привет! Я отвечаю на частые вопросы 24/7.',
          'Что вас интересует?',
        ],
        keyboard: [
          { id: 'hours', label: 'Часы работы' },
          { id: 'price', label: 'Цены' },
          { id: 'address', label: 'Адрес' },
          { id: 'human', label: 'Связаться с менеджером' },
        ],
        next: {
          hours: 'hours',
          price: 'price',
          address: 'address',
          human: 'human',
        },
      },
      hours: {
        id: 'hours',
        botText: ['Мы работаем ежедневно с 10:00 до 21:00, без выходных.'],
        keyboard: [
          { id: 'menu', label: '← В меню' },
          { id: 'human', label: 'Менеджер' },
        ],
        next: { menu: 'menu', human: 'human' },
      },
      price: {
        id: 'price',
        botText: [
          'Актуальный прайс:',
          '• Консультация — бесплатно',
          '• Базовый пакет — от 8k ₽',
          '• С записью — от 15k ₽',
        ],
        keyboard: [
          { id: 'menu', label: '← В меню' },
          { id: 'human', label: 'Менеджер' },
        ],
        next: { menu: 'menu', human: 'human' },
      },
      address: {
        id: 'address',
        botText: [
          'Адрес: г. Москва, ул. Примерная, 12',
          'Как добраться: 3 мин от метро. Есть парковка во дворе.',
        ],
        keyboard: [
          { id: 'menu', label: '← В меню' },
          { id: 'human', label: 'Менеджер' },
        ],
        next: { menu: 'menu', human: 'human' },
      },
      human: {
        id: 'human',
        botText: [
          'Передал запрос менеджеру. Обычно отвечаем в течение 10–15 минут в рабочее время.',
          'Можете сразу написать номер телефона — перезвоним.',
        ],
        keyboard: [{ id: 'menu', label: '← В меню' }],
        next: { menu: 'menu' },
      },
    },
  },
  'bot-leads': {
    id: 'bot-leads',
    botName: 'Заявки',
    botUsername: 'leads_quiz_bot',
    avatarEmoji: '📋',
    accent: '#FF643C',
    startStepId: 'intro',
    steps: {
      intro: {
        id: 'intro',
        botText: [
          'Соберём заявку за 30 секунд.',
          'Какая задача сейчас главная?',
        ],
        keyboard: [
          { id: 'site', label: 'Нужен сайт' },
          { id: 'bot', label: 'Нужен бот' },
          { id: 'crm', label: 'CRM / автоматизация' },
        ],
        next: {
          site: 'budget',
          bot: 'budget',
          crm: 'budget',
        },
      },
      budget: {
        id: 'budget',
        botText: ['Ориентир по бюджету?'],
        keyboard: [
          { id: 'b1', label: 'До 40k ₽' },
          { id: 'b2', label: '40–80k ₽' },
          { id: 'b3', label: 'От 80k ₽' },
        ],
        next: {
          b1: 'contact',
          b2: 'contact',
          b3: 'contact',
        },
      },
      contact: {
        id: 'contact',
        botText: [
          'Отлично. Оставьте телефон — менеджер пришлёт расчёт и примеры.',
          'Или нажмите «Перезвоните» — свяжемся сами.',
        ],
        keyboard: [
          { id: 'call', label: 'Перезвоните' },
          { id: 'restart', label: 'Начать заново' },
        ],
        next: {
          call: 'thanks',
          restart: 'intro',
        },
      },
      thanks: {
        id: 'thanks',
        botText: [
          'Заявка принята. Обычно перезваниваем в течение часа в рабочее время.',
          'Спасибо!',
        ],
        end: true,
      },
    },
  },
};

export const getTelegramBotDemo = (id: string): TelegramBotDemo | undefined =>
  telegramBotDemos[id];

export const isTelegramBotDemoId = (id: string): boolean => id in telegramBotDemos;
