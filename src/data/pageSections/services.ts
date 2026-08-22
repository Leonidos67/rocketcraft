import type { PageSectionNavItem } from '@/components/PageSectionNav';
import { withFooterPageSections } from './footer';

export const servicesPageSections: PageSectionNavItem[] = withFooterPageSections([
  { id: 'services-detail', label: 'Каталог' },
  { id: 'services-process', label: 'Подход' },
  { id: 'services-cta', label: 'Заявка' },
]);