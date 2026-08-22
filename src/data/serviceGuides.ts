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
  ctaTitle: string;
  ctaText: string;
  pageSections: PageSectionNavItem[];
}

const baseSections = (slug: string): PageSectionNavItem[] =>
  withFooterPageSections([
    { id: `${slug}-approach`, label: 'Подход' },
    { id: `${slug}-offers`, label: 'Что делаем' },
    { id: `${slug}-cta`, label: 'Заявка' },
  ]);

export const serviceGuides: Record<ServiceGuideSlug, ServiceGuideData> = {
  websites: {
    slug: 'websites',
    documentTitle: 'Разработка сайтов — RocketCraft',
    heroTitle: 'Разработка сайтов',
    approachTitle: 'Сайты, которые работают на бизнес',
    approachIntro:
      'Делаем не просто красивые страницы — проектируем цифровые продукты под задачи: лиды, продажи, имидж и масштабирование.',
    approachItems: [
      {
        title: 'Дизайн со смыслом',
        text: 'Погружаемся в бренд, аудиторию и конкурентов. Строим визуальную систему, которая узнаётся и легко масштабируется на все носители.',
      },
      {
        title: 'Разработка под результат',
        text: 'Верстаем быстро, адаптивно и с учётом SEO. Подключаем аналитику, формы и интеграции — чтобы сайт сразу приносил пользу.',
      },
      {
        title: 'Поддержка и рост',
        text: 'Не бросаем после релиза: дорабатываем, A/B-тестируем, подключаем автоматизацию и помогаем сайту расти вместе с бизнесом.',
      },
    ],
    offersTitle: 'Что делаем',
    offers: [
      {
        number: '01',
        title: 'Лендинги и промо-страницы',
        text: 'Одностраничники под запуск продукта, акцию или лид-магнит. Фокус на конверсии, скорости загрузки и понятном пользовательском пути.',
      },
      {
        number: '02',
        title: 'Корпоративные и многостраничные сайты',
        text: 'Структурируем контент, выстраиваем навигацию и дизайн-систему. Сайт становится центром digital-присутствия компании.',
      },
      {
        number: '03',
        title: 'Интернет-магазины и каталоги',
        text: 'Каталог, корзина, оплата, личный кабинет — полный цикл e-commerce с интеграцией CRM, складов и маркетинговых инструментов.',
      },
    ],
    ctaTitle: 'Обсудить проект',
    ctaText: 'Расскажите о задаче — предложим формат, сроки и состав команды под ваш бюджет.',
    pageSections: baseSections('websites'),
  },
  automation: {
    slug: 'automation',
    documentTitle: 'Автоматизация — RocketCraft',
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
    documentTitle: 'Маркетинг и продвижение — RocketCraft',
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
