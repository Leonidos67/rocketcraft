import type { PageSectionNavItem } from '@/components/PageSectionNav';
import { withFooterPageSections } from './footer';

export const homePageSections: PageSectionNavItem[] = withFooterPageSections([
  { id: 'home-hero', label: 'Старт' },
  { id: 'home-map', label: 'География' },
  { id: 'home-services', label: 'Система' },
  { id: 'home-offers', label: 'Сайты' },
  { id: 'home-cta', label: 'Расчёт' },
]);
