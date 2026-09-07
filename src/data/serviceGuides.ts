import type { PageSectionNavItem } from '@/components/PageSectionNav';
import { withFooterPageSections } from '@/data/pageSections/footer';

export type ServiceGuideSlug = 'websites' | 'automation' | 'marketing';

export interface ServiceGuideApproachItem {
  title: string;
  text: string;
}

export interface ServiceGuideOffer {
  number: string;
  title: string;
  text: string;
  priceFrom?: number;
  timeline?: string;
  features?: string[];
}

export interface ServiceGuideProof {
  niche: string;
  title: string;
  text: string;
}

export interface ServiceGuideHeroTile {
  image: string;
  label: string;
}

export interface ServiceGuideFlowingMenuItem {
  link: string;
  text: string;
  image: string;
  brandColor: string;
}

export interface ServiceGuideChannelsGate {
  title: string;
  buttonLabel: string;
}

export interface ServiceGuideData {
  slug: ServiceGuideSlug;
  documentTitle: string;
  heroTitle: string;
  heroTiles?: ServiceGuideHeroTile[];
  flowingMenuItems?: ServiceGuideFlowingMenuItem[];
  channelsGate?: ServiceGuideChannelsGate;
  approachTitle: string;
  approachIntro: string;
  approachItems: ServiceGuideApproachItem[];
  offersTitle: string;
  offers: ServiceGuideOffer[];
  proofsTitle?: string;
  proofsIntro?: string;
  proofs?: ServiceGuideProof[];
  ctaTitle: string;
  ctaText: string;
  ctaPrimaryLabel?: string;
  ctaPrimaryTo?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryTo?: string;
  pageSections: PageSectionNavItem[];
}

const baseSections = (slug: string): PageSectionNavItem[] =>
  withFooterPageSections([
    { id: `${slug}-approach`, label: 'Подход' },
    { id: `${slug}-offers`, label: 'Пакеты' },
    { id: `${slug}-cta`, label: 'Заявка' },
  ]);

const websitesSections: PageSectionNavItem[] = withFooterPageSections([
  { id: 'websites-approach', label: 'Подход' },
  { id: 'websites-offers', label: 'Пакеты' },
  { id: 'websites-proofs', label: 'Примеры' },
  { id: 'websites-cta', label: 'Расчёт' },
]);

export const serviceGuides: Record<ServiceGuideSlug, ServiceGuideData> = {
  websites: {
    slug: 'websites',
    documentTitle: 'Разработка сайтов для локального бизнеса — Agyra',
    heroTitle: 'Сайты для локального бизнеса',
    approachTitle: 'Канал заявок рядом с вашей точкой',
    approachIntro:
      'Делаем сайты для салонов, клиник, кафе и услуг: поиск, карта, форма или онлайн-запись. Без агентства и «разработки на полгода» — обычно 2–3 недели.',
    approachItems: [
      {
        title: 'Под вашу точку',
        text: 'Услуги, цены, адрес, мессенджер и запись — всё на одной понятной странице. Клиент не теряется в Instagram.',
      },
      {
        title: 'Быстрый запуск',
        text: 'Визитка или лендинг — от 1–2 недель. Сайт с онлайн-записью — обычно 3–4 недели под ключ.',
      },
      {
        title: 'Дальше — рост',
        text: 'После запуска можно подключить бота, CRM и рекламу. Сайт остаётся основой, автоматизация — следующим шагом.',
      },
    ],
    offersTitle: 'Пакеты',
    offers: [
      {
        number: '01',
        title: 'Сайт-визитка',
        text: 'Несколько страниц: услуги, цены, контакты, форма заявки и WhatsApp. Для точек, которым нужен свой канал в поиске и на картах.',
        priceFrom: 25000,
        timeline: '7–14 дней',
        features: ['Адаптив', 'Форма / WhatsApp', 'Базовое SEO'],
      },
      {
        number: '02',
        title: 'Лендинг под лиды',
        text: 'Одна сильная страница под акцию или услугу: оффер, доказательства, заявка. Удобно для запуска рекламы.',
        priceFrom: 40000,
        timeline: '2–3 недели',
        features: ['Фокус на конверсии', 'Аналитика', 'Готов к рекламе'],
      },
      {
        number: '03',
        title: 'Сайт с онлайн-записью',
        text: 'Витрина + запись слотов, напоминания клиентам, заявки в мессенджер или CRM. Для салонов, клиник и студий.',
        priceFrom: 55000,
        timeline: '3–4 недели',
        features: ['Онлайн-запись', 'Напоминания', 'Интеграции'],
      },
    ],
    proofsTitle: 'Примеры',
    proofsIntro: 'Для каких точек',
    proofs: [
      {
        niche: 'Салон / барбер / клиника',
        title: 'Запись без переписки в Direct',
        text: 'Сайт с услугами и онлайн-записью: клиент выбирает слот сам, мастер не теряет заявки в чатах.',
      },
      {
        niche: 'Кафе / ресторан',
        title: 'Меню и бронь вне соцсетей',
        text: 'Актуальное меню, адрес, бронь стола или доставка — канал, который принадлежит вам, а не площадке.',
      },
      {
        niche: 'Услуги / магазин',
        title: 'Заявки из поиска и карт',
        text: 'Визитка с оффером и формой: клиент находит вас в Яндексе и пишет сразу, без лишних шагов.',
      },
    ],
    ctaTitle: 'Получить расчёт по вашей точке',
    ctaText:
      'Напишите нишу и город — предложим пакет, срок и ориентир по цене. Можно сразу посмотреть демо онлайн-записи.',
    ctaPrimaryLabel: 'Получить расчёт',
    ctaPrimaryTo: '/contacts',
    ctaSecondaryLabel: 'Демо онлайн-записи',
    ctaSecondaryTo: '/product-preview',
    pageSections: websitesSections,
  },
  automation: {
    slug: 'automation',
    documentTitle: 'Автоматизация — Agyra',
    heroTitle: 'Автоматизация',
    approachTitle: 'Освобождаем время команды',
    approachIntro:
      'Снимаем рутину с менеджеров и маркетинга: связываем сервисы, автоматизируем процессы и строим системы, которые работают без ручного контроля.',
    approachItems: [
      {
        title: 'Аудит и архитектура',
        text: 'Разбираем текущие процессы, находим узкие места и проектируем автоматизацию так, чтобы она реально экономила ресурсы, а не усложняла жизнь.',
      },
      {
        title: 'Интеграции под ключ',
        text: 'Связываем CRM, мессенджеры, сайт, таблицы и рекламные кабинеты. Данные текут автоматически — без копипаста и потерь лидов.',
      },
      {
        title: 'Боты и сценарии',
        text: 'Telegram- и WhatsApp-боты, автоответы, квалификация лидов, уведомления команды — всё настраиваем под вашу воронку продаж.',
      },
    ],
    offersTitle: 'Что делаем',
    offers: [
      {
        number: '01',
        title: 'CRM и воронки продаж',
        text: 'Настраиваем amoCRM, Bitrix24 и другие системы: этапы, автозадачи, распределение лидов, отчёты и контроль KPI.',
      },
      {
        number: '02',
        title: 'Чат-боты и мессенджеры',
        text: 'Боты для записи, консультаций, поддержки и продаж. Подключаем к CRM, платёжным системам и базам знаний.',
      },
      {
        number: '03',
        title: 'Сквозная аналитика и отчёты',
        text: 'Собираем данные из рекламы, сайта и CRM в единые дашборды. Видите реальную картину по лидам, сделкам и ROI.',
      },
    ],
    ctaTitle: 'Запросить аудит процессов',
    ctaText: 'Покажем, где теряются лиды и какие автоматизации дадут быстрый эффект уже в первый месяц.',
    pageSections: baseSections('automation'),
  },
  marketing: {
    slug: 'marketing',
    documentTitle: 'Маркетинг и продвижение — Agyra',
    heroTitle: 'Маркетинг и продвижение',
    heroTiles: [
      { image: 'https://i.ibb.co/XfykT5Ms/image.png', label: 'Telegram Ads' },
      { image: 'https://i.ibb.co/SDYfwGQZ/image.png', label: 'Яндекс Директ' },
      { image: 'https://i.ibb.co/sJWN0YsS/image.png', label: 'VK Реклама' },
      { image: 'https://i.ibb.co/ZzsZnN3q/image.png', label: 'Яндекс ПромоСтраницы' },
      { image: 'https://i.ibb.co/wh8kW8X1/image.png', label: 'Яндекс Бизнес' },
      { image: 'https://i.ibb.co/G6rb0fY/image.png', label: 'Avito Реклама' },
      { image: 'https://i.ibb.co/whWszfzN/image.png', label: 'Ozon Performance' },
      { image: 'https://i.ibb.co/ynndZXkV/image.png', label: 'Programmatic' },
      { image: 'https://i.ibb.co/mCJSfCwR/image.png', label: 'Influence' },
      { image: 'https://i.ibb.co/mCV3YxjS/image.png', label: 'MyTarget' },
      // { image: 'https://i.ibb.co/8gkjbnn2/image.png', label: 'Google Ads' },
    ],
    flowingMenuItems: [
      {
        link: '#marketing-offers',
        text: 'Telegram Ads',
        image: 'https://i.ibb.co/XfykT5Ms/image.png',
        brandColor: '#2AABEE',
      },
      {
        link: '#marketing-offers',
        text: 'VK Реклама',
        image: 'https://i.ibb.co/sJWN0YsS/image.png',
        brandColor: '#0077FF',
      },
      {
        link: '#marketing-offers',
        text: 'Яндекс Директ/Бизнес',
        image: 'https://i.ibb.co/SDYfwGQZ/image.png',
        brandColor: '#FC3F1D',
      },
      {
        link: '#marketing-offers',
        text: 'Яндекс ПромоСтраницы',
        image: 'https://i.ibb.co/ZzsZnN3q/image.png',
        brandColor: '#FC3F1D',
      },
      {
        link: '#marketing-offers',
        text: 'Avito Реклама',
        image: 'https://i.ibb.co/G6rb0fY/image.png',
        brandColor: '#00AAFF',
      },
      {
        link: '#marketing-offers',
        text: 'Ozon Performance',
        image: 'https://i.ibb.co/whWszfzN/image.png',
        brandColor: '#005BFF',
      },
      {
        link: '#marketing-offers',
        text: 'Programmatic',
        image: 'https://i.ibb.co/ynndZXkV/image.png',
        brandColor: '#4B3CF5',
      },
      {
        link: '#marketing-offers',
        text: 'Influence',
        image: 'https://i.ibb.co/mCJSfCwR/image.png',
        brandColor: '#E1306C',
      },
      {
        link: '#marketing-offers',
        text: 'MyTarget',
        image: 'https://i.ibb.co/mCV3YxjS/image.png',
        brandColor: '#FF6F00',
      },
    ],
    channelsGate: {
      title: 'Хотите узнать, с кем мы работаем?',
      buttonLabel: 'Смотреть площадки',
    },
    approachTitle: 'Превращаем бюджет в измеримый результат',
    approachIntro:
      'Сочетаем брендовую коммуникацию и performance: привлекаем аудиторию, прогреваем и доводим до заявки с прозрачной аналитикой.',
    approachItems: [
      {
        title: 'Стратегия и медиаплан',
        text: 'Определяем каналы, гипотезы и KPI под вашу нишу. Не льём бюджет вслепую — тестируем, масштабируем то, что работает.',
      },
      {
        title: 'Креативы и контент',
        text: 'Делаем визуал, тексты и видео, которые пробивают баннерную слепоту. Единый стиль бренда во всех точках контакта.',
      },
      {
        title: 'Оптимизация и масштаб',
        text: 'Ежедневно следим за метриками, отключаем неэффективное и усиливаем победителей. Прозрачные отчёты и понятный ROI.',
      },
    ],
    offersTitle: 'Что делаем',
    offers: [
      {
        number: '01',
        title: 'Performance-реклама',
        text: 'Яндекс Директ, VK, Telegram Ads и другие площадки. Лиды, продажи, регистрации — работаем на конкретные цифры.',
      },
      {
        number: '02',
        title: 'SMM и контент-маркетинг',
        text: 'Ведение соцсетей, контент-планы, спецпроекты и бренд-медиа. Выстраиваем коммуникацию, которая запоминается.',
      },
      {
        number: '03',
        title: 'Комплексное продвижение',
        text: 'Связываем рекламу, сайт, CRM и аналитику в единую систему. Видите путь клиента от первого клика до сделки.',
      },
    ],
    ctaTitle: 'Получить медиаплан',
    ctaText: 'Бесплатно разберём текущие каналы и предложим стратегию размещения под ваши цели и бюджет.',
    pageSections: baseSections('marketing'),
  },
};

export const serviceGuideSlugs = Object.keys(serviceGuides) as ServiceGuideSlug[];

export const isServiceGuideSlug = (value: string): value is ServiceGuideSlug =>
  serviceGuideSlugs.includes(value as ServiceGuideSlug);

export const getServiceGuide = (slug: string): ServiceGuideData | undefined =>
  isServiceGuideSlug(slug) ? serviceGuides[slug] : undefined;
