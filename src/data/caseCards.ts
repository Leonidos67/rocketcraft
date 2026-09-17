export type CaseFilterId = 'all' | 'automation' | 'bots' | 'integrations' | 'ai';

export interface CaseFilter {
  id: CaseFilterId;
  label: string;
}

export interface CaseColorSwatch {
  hex: string;
  label?: string;
}

export interface CaseGalleryItem {
  src: string;
  label: string;
  kind?: 'desktop' | 'mobile' | 'hero';
}

export interface CaseScores {
  overall: number;
  design: number;
  usability: number;
  creativity: number;
  content: number;
}

export interface CasePortfolioItem {
  id: string;
  title: string;
  industry: string;
  /** Card / OG preview */
  imageUrl: string;
  /** Full-bleed hero inside dark viewport block */
  heroImage: string;
  categories: Exclude<CaseFilterId, 'all'>[];
  serviceTags: string[];
  accent: 'blue' | 'pink' | 'orange' | 'purple' | 'yellow';
  /** Live demo path or external site */
  liveUrl?: string;
  /** External client site */
  siteUrl?: string;
  description: string;
  colors: CaseColorSwatch[];
  technologies: string[];
  gallery: CaseGalleryItem[];
  scores: CaseScores;
}

export interface CaseTestimonial {
  quote: string;
  author: string;
  company: string;
}

export const caseFilters: CaseFilter[] = [
  { id: 'all', label: 'Все' },
  { id: 'automation', label: 'Автоматизация' },
  { id: 'bots', label: 'Боты' },
  { id: 'integrations', label: 'Интеграции' },
  { id: 'ai', label: 'AI и аналитика' },
];

export const casePortfolioItems: CasePortfolioItem[] = [
  {
    id: 'intelligence-evolve',
    title: 'Intelligence Designed To Evolve',
    industry: 'AI-платформа · лендинг',
    imageUrl: '/works/intelligence-evolve/assets/poster.webp',
    heroImage: '/works/intelligence-evolve/assets/poster.webp',
    categories: ['ai'],
    serviceTags: ['Лендинг', 'Motion', 'AI brand'],
    accent: 'purple',
    liveUrl: '/works/intelligence-evolve/',
    description:
      'Лендинг AI-платформы: video-hero, сильная типографика и спокойная продуктовая подача — как у зрелого SaaS-бренда.',
    colors: [
      { hex: '#0B0B0F', label: 'Чёрный' },
      { hex: '#F4F4F5', label: 'Светлый' },
      { hex: '#CDB7F1', label: 'Сирень' },
    ],
    technologies: ['HTML', 'CSS', 'Motion', 'Брендинг', 'Лендинг'],
    gallery: [
      {
        src: '/works/intelligence-evolve/assets/poster.webp',
        label: 'Обложка · Desktop',
        kind: 'desktop',
      },
      {
        src: '/works/intelligence-evolve/assets/logo.webp',
        label: 'Логотип',
        kind: 'mobile',
      },
    ],
    scores: {
      overall: 8.2,
      design: 8.6,
      usability: 7.8,
      creativity: 8.4,
      content: 7.9,
    },
  },
  {
    id: 'sadu-media',
    title: 'Sadu Media',
    industry: 'Production house · Works',
    imageUrl: '/works/sadu-media/screens/works-02-site.jpg',
    heroImage: '/works/sadu-media/screens/works-01-hero.png',
    categories: [],
    serviceTags: ['Брендинг', 'Motion site', 'Works'],
    accent: 'orange',
    liveUrl: '/works/sadu-media/',
    siteUrl: 'https://www.sadumedia.com/',
    description:
      'Продакшн-хаус из Саудовской Аравии: плотная condensed-типографика, кинематографичные кадры и тёмный canvas страницы Works. Контент, который не только выглядит дорого — в нём есть смысл.',
    colors: [
      { hex: '#161818', label: 'Чёрный' },
      { hex: '#ECEEEE', label: 'Светлый' },
      { hex: '#00a8a0', label: 'Циан' },
    ],
    technologies: ['Сторителлинг', 'Motion', 'Brand film', 'Типографика', 'Web'],
    gallery: [
      {
        src: '/works/sadu-media/screens/works-01-hero.png',
        label: 'Hero',
        kind: 'hero',
      },
      {
        src: '/works/sadu-media/screens/works-02-site.jpg',
        label: 'Сайт · блок 1',
        kind: 'desktop',
      },
      {
        src: '/works/sadu-media/screens/works-03-site.jpg',
        label: 'Сайт · блок 2',
        kind: 'desktop',
      },
      {
        src: '/works/sadu-media/screens/works-04-footer.png',
        label: 'Футер',
        kind: 'desktop',
      },
    ],
    scores: {
      overall: 8.1,
      design: 8.5,
      usability: 7.6,
      creativity: 8.7,
      content: 7.9,
    },
  },
];

export const caseTestimonials: CaseTestimonial[] = [];

export const getCasePortfolioItem = (id: string) =>
  casePortfolioItems.find((item) => item.id === id);

export const filterCases = (filter: CaseFilterId) =>
  filter === 'all'
    ? casePortfolioItems
    : casePortfolioItems.filter((item) => item.categories.includes(filter));
