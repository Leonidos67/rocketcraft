import type { PageSectionNavItem } from '@/components/PageSectionNav';

export const footerPageSections: PageSectionNavItem[] = [
  // { id: 'footer-partners', label: 'Партнёры' },
  { id: 'footer-faq', label: 'FAQ' },
];

export const withFooterPageSections = (sections: PageSectionNavItem[]) => [
  ...sections,
  ...footerPageSections,
];
