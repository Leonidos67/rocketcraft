import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PlusIcon, type PlusIconHandle } from '@/components/ui/plus';
import { XIcon, type XIconHandle } from '@/components/ui/x-icon';
import { cn } from '@/lib/utils';

interface IndicatorRect {
  left: number;
  width: number;
  top: number;
  height: number;
  opacity: number;
}

const emptyIndicator: IndicatorRect = {
  left: 0,
  width: 0,
  top: 0,
  height: 0,
  opacity: 0,
};

interface HeaderDesktopNavProps {
  isInverse: boolean;
  isStuck: boolean;
  isServicesOpen: boolean;
  servicesAnchorRef?: MutableRefObject<HTMLButtonElement | null>;
  onOpenSolutions: () => void;
  onOpenRoi: () => void;
  onToggleServices: () => void;
  onCloseMobileMenu: () => void;
}

type NavItem =
  | { id: string; label: string; kind: 'action'; onClick: () => void }
  | { id: string; label: string; kind: 'link'; to: string }
  | { id: string; label: string; kind: 'services' }
  | { id: string; label: string; kind: 'external'; href: string };

const SERVICES_INDEX = 0;
const CASES_INDEX = 1;
const PROCESS_INDEX = 2;
const READY_INDEX = 3;
const ROI_INDEX = 4;

const iconWrapClass = (isInverse: boolean) =>
  cn(
    'inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-colors duration-200',
    isInverse ? 'bg-primary-foreground/12' : 'bg-foreground/[0.06]',
    'group-hover/services-btn:bg-white'
  );

const plusColorClass = (isOpen: boolean) =>
  cn('group-hover/services-btn:text-foreground', isOpen && 'text-foreground');

const submenuOpenBorderClass =
  'border border-[hsl(var(--accent-bg-button))] bg-transparent shadow-none';

const HeaderDesktopNav = ({
  isInverse,
  isStuck,
  isServicesOpen,
  servicesAnchorRef,
  onToggleServices,
  onOpenRoi,
  onCloseMobileMenu,
}: HeaderDesktopNavProps) => {
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const servicesPlusRef = useRef<PlusIconHandle>(null);
  const servicesXRef = useRef<XIconHandle>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [indicator, setIndicator] = useState<IndicatorRect>(emptyIndicator);

  const items: NavItem[] = useMemo(
    () => [
      { id: 'services', label: 'Услуги', kind: 'services' },
      { id: 'cases', label: 'Наши работы', kind: 'link', to: '/cases' },
      { id: 'process', label: 'Процесс', kind: 'link', to: '/process' },
      { id: 'ready', label: 'Готовые решения', kind: 'link', to: '/product-preview' },
      { id: 'roi', label: 'Калькулятор ROI', kind: 'action', onClick: onOpenRoi },
    ],
    [onOpenRoi]
  );

  const activeIndex = useMemo(() => {
    const path = location.pathname;
    if (path === '/services' || path.startsWith('/services/')) return SERVICES_INDEX;
    if (path === '/cases' || path.startsWith('/cases/')) return CASES_INDEX;
    if (path === '/process') return PROCESS_INDEX;
    if (path === '/roi-calc') return ROI_INDEX;
    if (path === '/product-preview') return READY_INDEX;
    if (isServicesOpen) return SERVICES_INDEX;
    return -1;
  }, [location.pathname, isServicesOpen]);

  const mainTargetIndex = isServicesOpen
    ? hoveredIndex
    : hoveredIndex ?? (activeIndex >= 0 ? activeIndex : null);

  const measureIndicator = useCallback(
    (container: HTMLElement | null, item: HTMLElement | null) => {
      if (!container || !item) {
        setIndicator(emptyIndicator);
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();

      setIndicator({
        left: itemRect.left - containerRect.left,
        width: itemRect.width,
        top: itemRect.top - containerRect.top,
        height: itemRect.height,
        opacity: 1,
      });
    },
    []
  );

  const moveMainIndicator = useCallback(() => {
    if (isServicesOpen && hoveredIndex === null) {
      setIndicator(emptyIndicator);
      return;
    }

    const item = mainTargetIndex !== null ? itemRefs.current[mainTargetIndex] : null;
    measureIndicator(navRef.current, item);
  }, [mainTargetIndex, measureIndicator, isServicesOpen, hoveredIndex]);

  useLayoutEffect(() => {
    moveMainIndicator();
  }, [moveMainIndicator, location.pathname, isServicesOpen, isStuck]);

  useEffect(() => {
    const handleResize = () => moveMainIndicator();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [moveMainIndicator]);

  useEffect(() => {
    if (isServicesOpen) {
      servicesXRef.current?.startAnimation();
    } else {
      servicesPlusRef.current?.stopAnimation();
    }
  }, [isServicesOpen]);

  const setItemRef = (index: number) => (el: HTMLElement | null) => {
    itemRefs.current[index] = el;
  };

  const setServicesButtonRef = (el: HTMLButtonElement | null) => {
    setItemRef(SERVICES_INDEX)(el);
    if (servicesAnchorRef) servicesAnchorRef.current = el;
  };

  const isHighlighted = (index: number) => {
    if (isServicesOpen && index === SERVICES_INDEX) return false;
    return hoveredIndex === index || (hoveredIndex === null && activeIndex === index);
  };

  const linkClass = (index: number) =>
    cn(
      'relative z-[1] inline-flex items-center bg-transparent px-[1.125rem] py-2.5 text-sm font-semibold leading-none no-underline transition-[color,box-shadow,border-color] duration-200 rounded-full border border-transparent',
      isInverse ? 'text-primary-foreground/82' : 'text-foreground/72',
      isHighlighted(index) && (isInverse ? 'text-primary-foreground' : 'text-foreground')
    );

  const hoverHandlers = (index: number) => ({
    onMouseEnter: () => setHoveredIndex(index),
  });

  return (
    <nav
      ref={navRef}
      className={cn(
        'absolute left-1/2 z-[130] hidden -translate-x-1/2 items-center gap-0.5 xl:flex',
        isStuck &&
          'fixed top-[var(--page-header-top-gap)] z-[130] rounded-full bg-background/80 px-1.5 py-0.5 backdrop-blur-[10px] transition-[background-color,border-color,box-shadow] duration-300',
        isStuck && isInverse && 'border-primary bg-primary shadow-[0_8px_24px_hsl(0_0%_0%/0.12)]'
      )}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-0 rounded-full border-none bg-[hsl(var(--accent-bg-button))] transition-[transform,width,height,opacity] duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[transform,width,height]"
        style={{
          transform: `translate3d(${indicator.left}px, ${indicator.top}px, 0)`,
          width: indicator.width,
          height: indicator.height,
          opacity: indicator.opacity,
        }}
      />

      {items.map((item, index) => {
        if (item.kind === 'action') {
          return (
            <button
              key={item.id}
              ref={setItemRef(index)}
              type="button"
              className={linkClass(index)}
              onClick={item.onClick}
              {...hoverHandlers(index)}
            >
              {item.label}
            </button>
          );
        }

        if (item.kind === 'link') {
          return (
            <Link
              key={item.id}
              ref={setItemRef(index)}
              to={item.to}
              className={linkClass(index)}
              onClick={onCloseMobileMenu}
              {...hoverHandlers(index)}
            >
              {item.label}
            </Link>
          );
        }

        if (item.kind === 'services') {
          return (
            <button
              key={item.id}
              ref={setServicesButtonRef}
              type="button"
              data-services-menu
              className={cn(
                linkClass(index),
                'group/services-btn gap-1.5',
                isServicesOpen && submenuOpenBorderClass
              )}
              onClick={onToggleServices}
              onMouseEnter={() => {
                setHoveredIndex(SERVICES_INDEX);
                if (isServicesOpen) servicesXRef.current?.startAnimation();
                else servicesPlusRef.current?.startAnimation();
              }}
              onMouseLeave={() => {
                if (!isServicesOpen) servicesPlusRef.current?.stopAnimation();
              }}
              aria-expanded={isServicesOpen}
              aria-haspopup="dialog"
            >
              {item.label}
              <span className={iconWrapClass(isInverse)} aria-hidden="true">
                {isServicesOpen ? (
                  <XIcon
                    ref={servicesXRef}
                    size={10}
                    duration={0.45}
                    className={plusColorClass(isServicesOpen)}
                  />
                ) : (
                  <PlusIcon
                    ref={servicesPlusRef}
                    size={10}
                    duration={0.45}
                    className={plusColorClass(isServicesOpen)}
                  />
                )}
              </span>
            </button>
          );
        }

        return (
          <a
            key={item.id}
            ref={setItemRef(index)}
            href={item.href}
            className={linkClass(index)}
            {...hoverHandlers(index)}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
};

export default HeaderDesktopNav;
