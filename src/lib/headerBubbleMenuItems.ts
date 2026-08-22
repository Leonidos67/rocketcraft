import type { BubbleMenuItem } from '@/components/ui/BubbleMenu';
import { servicesDropdownItems } from '@/data/headerServicesMenu';

const serviceHoverStyles = [
  { bgColor: '#bad6ff', textColor: '#0b1311' },
  { bgColor: '#cdb7f1', textColor: '#0b1311' },
  { bgColor: '#ffb1eb', textColor: '#0b1311' },
] as const;

const serviceRotations = [-8, 8, -6] as const;

export const servicesBubbleItems: BubbleMenuItem[] = [
  ...servicesDropdownItems.map((item, index) => ({
    label: item.label,
    to: item.to,
    ariaLabel: item.label,
    rotation: serviceRotations[index] ?? 8,
    hoverStyles: serviceHoverStyles[index] ?? serviceHoverStyles[0],
  })),
  // {
  //   label: 'Все услуги и цены',
  //   to: '/services',
  //   ariaLabel: 'Все услуги и цены',
  //   rotation: 6,
  //   hoverStyles: { bgColor: '#f9e283', textColor: '#0b1311' },
  // },
];

export const learnMoreBubbleItems: BubbleMenuItem[] = [
  {
    label: 'Команда',
    to: '/team',
    ariaLabel: 'Команда',
    rotation: -8,
    hoverStyles: { bgColor: '#bad6ff', textColor: '#0b1311' },
  },
  {
    label: 'Калькулятор ROI',
    to: '/roi-calc',
    ariaLabel: 'Калькулятор ROI',
    rotation: 8,
    hoverStyles: { bgColor: '#f9e283', textColor: '#0b1311' },
  },
];
