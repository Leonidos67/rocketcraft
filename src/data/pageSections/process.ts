import type { PageSectionNavItem } from '@/components/PageSectionNav';
import { withFooterPageSections } from './footer';

export const processPageSections: PageSectionNavItem[] = withFooterPageSections([
  { id: 'process-intro', label: 'Процесс' },
  { id: 'process-steps', label: 'Этапы' },
  { id: 'process-cta', label: 'Заявка' },
]);
