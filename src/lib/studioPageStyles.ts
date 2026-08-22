import { cn } from '@/lib/utils';

export const oiHeadingClass =
  "font-['Oi',serif] font-normal italic uppercase tracking-[0.01em]";

export const sectionLabelClass =
  'mb-3 flex items-center gap-2 text-[clamp(0.875rem,1vw,1rem)] font-semibold uppercase tracking-[0.06em] text-muted-foreground';

export const sectionLabelSlashClass = 'font-semibold text-[hsl(217_100%_86%)]';

export const sectionTitleClass = cn(
  oiHeadingClass,
  'mb-[clamp(1.5rem,3vw,2.5rem)] max-w-[28ch] text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.15]'
);

export const heroIntroClass =
  'text-[clamp(1.125rem,1.35vw,1.625rem)] leading-[1.6] text-muted-foreground max-w-[42rem]';

export const processIntroClass =
  'mt-3 max-w-[36rem] text-[1.0625rem] leading-[1.6] text-muted-foreground';

export const pageCtaClass =
  'relative overflow-hidden rounded-[1.25rem] bg-primary px-[clamp(1.5rem,4vw,4rem)] py-[clamp(3rem,6vw,6rem)] text-center text-[color:var(--sm-beige)]';

export const pageCtaTitleClass = cn(
  oiHeadingClass,
  'mx-auto mb-5 max-w-[40rem] text-white text-[clamp(1.75rem,3.333vw,4rem)] leading-[1.1]'
);

export const pageCtaTextClass =
  'mx-auto mb-10 max-w-[32rem] text-[clamp(1rem,1.2vw,1.25rem)] leading-[1.6] opacity-90';

export const processCardClass =
  'rounded-[1.25rem] border border-border bg-card p-[clamp(1.25rem,2.5vw,1.75rem)]';

export const processStepClass =
  'mb-3 block text-xs font-bold tracking-[0.08em] text-muted-foreground';

export const processCardTitleClass = cn(oiHeadingClass, 'mb-2 text-lg font-bold');

export const processCardTextClass =
  'text-[0.9375rem] leading-[1.55] text-muted-foreground';

export const productSectionClass =
  'mb-[clamp(4rem,8vw,7rem)] scroll-mt-24 max-[47.99em]:pb-[6.5rem]';

export const processSectionClass = 'mb-[clamp(4rem,8vw,7rem)] scroll-mt-24';
