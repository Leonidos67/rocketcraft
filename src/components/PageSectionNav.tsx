import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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
}

const PageSectionNav = ({
  sections,
  reducedMotion = false,
  showAfterScroll = 120,
  contactHref = '/contacts',
}: PageSectionNavProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '');

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

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          className="page-section-nav"
          aria-label="Навигация по секциям"
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: 12 }}
          transition={{ duration: reducedMotion ? 0 : 0.35, ease: EASE }}
        >
          <div className="page-section-nav__bar rounded-xl">
            <ul className="page-section-nav__list" role="list">
              {sections.map((section) => {
                const isActive = activeId === section.id;

                return (
                  <li key={section.id} className="page-section-nav__item-wrap">
                    <button
                      type="button"
                      className={cn(
                        'page-section-nav__item rounded-xl p-4',
                        isActive && 'page-section-nav__item--active'
                      )}
                      onClick={() => scrollToSection(section.id)}
                      aria-current={isActive ? 'true' : undefined}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="page-section-nav-active"
                          className="page-section-nav__active-bg"
                          transition={{
                            duration: reducedMotion ? 0 : 0.35,
                            ease: EASE,
                          }}
                        />
                      )}
                      <span className="page-section-nav__label">{section.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <span className="page-section-nav__divider" aria-hidden="true" />

            <Link
              to={contactHref}
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-primary p-4 text-sm font-semibold leading-none text-primary-foreground no-underline transition-opacity hover:opacity-90"
            >
              Связаться
            </Link>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default PageSectionNav;
