import { cn } from '@/lib/utils';

/** Shared layout shell — use instead of legacy site-* CSS classes */
export const siteContainerClass =
  'w-full max-w-site mx-auto px-6 md:px-10 lg:px-16 xl:px-20';

export const siteSectionClass =
  'overflow-hidden rounded-[var(--site-section-radius)] bg-background text-foreground';

export const siteCanvasClass =
  'flex min-h-screen flex-col gap-[var(--site-frame-gap)] p-[var(--site-frame-gap)]';

export const siteCanvasServicesClass = cn(
  siteCanvasClass,
  'pb-0 min-h-svh supports-[height:100dvh]:min-h-dvh',
);

export const pageSectionClass = 'scroll-mt-24';

export const btnSmSecondaryClass =
  'inline-flex shrink-0 items-center h-[var(--btn-height)] border border-primary bg-transparent px-[1.875rem] py-[1.125rem] text-[clamp(0.9375rem,1vw,1.125rem)] font-semibold leading-none text-primary no-underline transition-[background,color] duration-200 cursor-pointer rounded-[6.25rem] hover:bg-primary hover:text-primary-foreground';

export const btnLinkArrowClass = cn(
  'inline-flex items-center gap-2 text-sm font-semibold transition-opacity duration-200',
  'after:inline-flex after:h-8 after:w-8 after:items-center after:justify-center after:rounded-full',
  'after:border after:border-border after:bg-muted after:text-[0.9em] after:text-foreground',
  'after:transition-[transform,background,color,border-color] after:duration-200 after:content-["→"]',
  'hover:text-primary hover:after:rotate-45 hover:after:border-primary hover:after:bg-primary hover:after:text-primary-foreground',
);

export const textSectionTitleClass = 'text-display-lg mb-4 text-foreground';

export const textSectionSubtitleClass = 'text-body-lg text-muted-foreground';

export const textCtaTitleClass = textSectionTitleClass;

export const textCtaDescriptionClass =
  'text-body-lg mx-auto mb-8 max-w-2xl text-muted-foreground';
