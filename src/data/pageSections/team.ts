import type { PageSectionNavItem } from '@/components/PageSectionNav';
import { withFooterPageSections } from './footer';

export const teamPageSections: PageSectionNavItem[] = withFooterPageSections([
  { id: 'team-about', label: 'О нас' },
  { id: 'team-values', label: 'Ценности' },
  { id: 'team-cta', label: 'Заявка' },
]);
