import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { X, Info } from 'lucide-react'; // или любой другой набор иконок

const EASE = [0.22, 1, 0.36, 1] as const;

export interface PageSectionNavItem {
  id: string;
  label: string;
}

interface PageSectionNavProps {
  sections: PageSectionNavItem[];
  reducedMotion?: boolean;
  showAfterScroll?: number;
  contactHref?: string;
  topBlockText?: string;
  topBlockIcon?: React.ReactNode;
  onTopBlockClose?: () => void;
}

const PAGE_SECTION_NAV_HINT_KEY = 'rc-page-section-nav-hint-dismissed';

const PageSectionNav = ({
  sections,
  reducedMotion = false,
  showAfterScroll = 120,
  contactHref = '/contacts',
  topBlockText = 'Навигация по странице',
  topBlockIcon,
  onTopBlockClose,
}: PageSectionNavProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '');
  const [isTopBlockVisible, setIsTopBlockVisible] = useState(
    () => localStorage.getItem(PAGE_SECTION_NAV_HINT_KEY) !== '1'
  );

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > showAfterScroll);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [showAfterScroll]);

  useEffect(() => {
    const nodes = sections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => node !== null);

    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        threshold: [0.15, 0.35, 0.55],
        rootMargin: '-20% 0px -55% 0px',
      }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id: string) => {
    const node = document.getElementById(id);
    if (!node) return;

    node.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
    setActiveId(id);
  };

  const handleTopBlockClose = () => {
    setIsTopBlockVisible(false);
    localStorage.setItem(PAGE_SECTION_NAV_HINT_KEY, '1');
    onTopBlockClose?.();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          className="fixed inset-x-0 bottom-[max(14px,env(safe-area-inset-bottom,0px))] z-[36] flex w-full flex-col items-center justify-center px-2.5 pointer-events-none"
          aria-label="Навигация по секциям"
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: 12 }}
          transition={{ duration: reducedMotion ? 0 : 0.35, ease: EASE }}
        >
          <div
            className={cn(
              'pointer-events-auto max-w-[calc(100vw-20px)] flex-col',
              'rounded-xl border border-white/40 bg-white/75',
              'shadow-[0_8px_32px_hsl(0_0%_0%/0.12)] backdrop-blur-xl backdrop-saturate-150',
              'overflow-hidden'
            )}
          >
            <AnimatePresence>
              {isTopBlockVisible && (
                <motion.div
                  className="mx-5 flex items-center gap-3 py-2.5 max-md:py-2"
                  initial={reducedMotion ? false : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={reducedMotion ? undefined : { opacity: 0, height: 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.3, ease: EASE }}
                >
                  <div className="flex min-w-0 flex-1 items-center gap-2 text-sm font-medium text-foreground/80">
                    {topBlockIcon || <Info className="h-4 w-4 shrink-0 text-primary/70" />}
                    <span>{topBlockText}</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleTopBlockClose}
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-black/10 bg-black/5 text-foreground/50 transition-all hover:border-black/20 hover:bg-black/10 hover:text-foreground/80"
                    aria-label="Закрыть"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div
              className={cn(
                'flex items-center gap-[0.35rem]',
                'p-[0.25rem_0.25rem_0.25rem_0.25rem]',
                'max-md:gap-1 max-md:p-[0.3rem_0.3rem_0.3rem_0.35rem]'
              )}
            >
              <ul
                className="m-0 flex list-none items-center gap-[0.2rem] overflow-x-auto p-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                role="list"
              >
                {sections.map((section) => {
                  const isActive = activeId === section.id;

                  return (
                    <li key={section.id} className="shrink-0">
                      <button
                        type="button"
                        className={cn(
                          'relative inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-xl border-none bg-transparent px-[0.85rem] p-4 text-[0.8125rem] font-semibold leading-none text-foreground/65 transition-colors duration-[250ms] ease-in-out',
                          'p-4 max-md:text-xs',
                          isActive && 'text-background'
                        )}
                        onClick={() => scrollToSection(section.id)}
                        aria-current={isActive ? 'true' : undefined}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="page-section-nav-active"
                            className="absolute inset-0 z-0 rounded-[inherit] bg-[hsl(217_100%_86%)]"
                            transition={{
                              duration: reducedMotion ? 0 : 0.35,
                              ease: EASE,
                            }}
                          />
                        )}
                        <span className="relative z-[1]">{section.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <span
                className="mx-[0.15rem] h-6 w-px shrink-0 bg-black/20 max-md:h-5"
                aria-hidden="true"
              />

              <Link
                to={contactHref}
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-primary p-4 text-sm font-semibold leading-none text-primary-foreground no-underline transition-opacity hover:opacity-90"
              >
                Связаться
              </Link>
            </div>

          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default PageSectionNav;