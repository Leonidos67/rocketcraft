import type { PageSectionNavItem } from '@/components/PageSectionNav';
import { withFooterPageSections } from './footer';

export const roiPageSections: PageSectionNavItem[] = withFooterPageSections([
  { id: 'roi-calculator', label: 'Расчёт' },
  { id: 'roi-case', label: 'Кейс' },
  { id: 'roi-cta', label: 'Заявка' },
]);
