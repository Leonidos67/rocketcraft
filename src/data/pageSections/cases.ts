import type { PageSectionNavItem } from '@/components/PageSectionNav';
import { withFooterPageSections } from '@/data/pageSections/footer';

export const casesPageSections: PageSectionNavItem[] = withFooterPageSections([
  { id: 'cases-intro', label: 'Обзор' },
  { id: 'cases-grid', label: 'Работы' },
  { id: 'cases-cta', label: 'Заявка' },
]);
