import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
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
  isLearnMoreOpen: boolean;
  onOpenSolutions: () => void;
  onToggleLearnMore: () => void;
  onCloseMobileMenu: () => void;
}

type NavItem =
  | { id: string; label: string; kind: 'action'; onClick: () => void }
  | { id: string; label: string; kind: 'link'; to: string }
  | { id: string; label: string; kind: 'external'; href: string }
  | { id: string; label: string; kind: 'more' };

const MORE_INDEX = 5;

const dropdownItems = [
  { id: 'team', label: 'Команда', to: '/team' },
  { id: 'roi', label: 'Калькулятор ROI', to: '/roi-calc' },
] as const;

const HeaderDesktopNav = ({
  isInverse,
  isStuck,
  isLearnMoreOpen,
  onOpenSolutions,
  onToggleLearnMore,
  onCloseMobileMenu,
}: HeaderDesktopNavProps) => {
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const dropdownItemRefs = useRef<(HTMLElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredDropdownIndex, setHoveredDropdownIndex] = useState<number | null>(null);
  const [indicator, setIndicator] = useState<IndicatorRect>(emptyIndicator);
  const [dropdownIndicator, setDropdownIndicator] = useState<IndicatorRect>(emptyIndicator);

  const items: NavItem[] = useMemo(
    () => [
      { id: 'solutions', label: 'Решения', kind: 'action', onClick: onOpenSolutions },
      { id: 'services', label: 'Услуги', kind: 'link', to: '/services' },
      { id: 'cases', label: 'Кейсы', kind: 'link', to: '/cases' },
      { id: 'process', label: 'Процесс', kind: 'link', to: '/process' },
      { id: 'blog', label: 'Блог', kind: 'external', href: 'https://blog.agyra.ru' },
      { id: 'more', label: 'Ещё', kind: 'more' },
    ],
    [onOpenSolutions]
  );

  const activeIndex = useMemo(() => {
    const path = location.pathname;
    if (path === '/services' || path.startsWith('/services/')) return 1;
    if (path === '/cases' || path.startsWith('/cases/')) return 2;
    if (path === '/process') return 3;
    if (path === '/team' || path === '/roi-calc') return MORE_INDEX;
    if (isLearnMoreOpen) return MORE_INDEX;
    return -1;
  }, [location.pathname, isLearnMoreOpen]);

  const activeDropdownIndex = useMemo(() => {
    if (location.pathname === '/team') return 0;
    if (location.pathname === '/roi-calc') return 1;
    return -1;
  }, [location.pathname]);

  const isDropdownHovered = hoveredDropdownIndex !== null;
  const mainTargetIndex = isDropdownHovered
    ? null
    : hoveredIndex ?? (activeIndex >= 0 ? activeIndex : null);

  const dropdownTargetIndex = isLearnMoreOpen
    ? hoveredDropdownIndex ?? (activeDropdownIndex >= 0 ? activeDropdownIndex : null)
    : null;

  const measureIndicator = useCallback(
    (
      container: HTMLElement | null,
      item: HTMLElement | null,
      setter: (rect: IndicatorRect) => void
    ) => {
      if (!container || !item) {
        setter(emptyIndicator);
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();

      setter({
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
    const item = mainTargetIndex !== null ? itemRefs.current[mainTargetIndex] : null;
    measureIndicator(navRef.current, item, setIndicator);
  }, [mainTargetIndex, measureIndicator]);

  const moveDropdownIndicator = useCallback(() => {
    const item =
      dropdownTargetIndex !== null ? dropdownItemRefs.current[dropdownTargetIndex] : null;
    measureIndicator(dropdownRef.current, item, setDropdownIndicator);
  }, [dropdownTargetIndex, measureIndicator]);

  useLayoutEffect(() => {
    moveMainIndicator();
  }, [moveMainIndicator, location.pathname, isLearnMoreOpen, isStuck]);

  useLayoutEffect(() => {
    moveDropdownIndicator();
  }, [moveDropdownIndicator, location.pathname, isLearnMoreOpen, isStuck]);

  useEffect(() => {
    const handleResize = () => {
      moveMainIndicator();
      moveDropdownIndicator();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [moveMainIndicator, moveDropdownIndicator]);

  const setItemRef = (index: number) => (el: HTMLElement | null) => {
    itemRefs.current[index] = el;
  };

  const setDropdownItemRef = (index: number) => (el: HTMLElement | null) => {
    dropdownItemRefs.current[index] = el;
  };

  const isHighlighted = (index: number) => {
    if (isDropdownHovered) return false;
    return hoveredIndex === index || (hoveredIndex === null && activeIndex === index);
  };

  const isDropdownHighlighted = (index: number) =>
    hoveredDropdownIndex === index ||
    (hoveredDropdownIndex === null && activeDropdownIndex === index);

  const linkClass = (index: number) =>
    cn(
      'nav-link relative z-[1]',
      isInverse && 'nav-link--inverse',
      isHighlighted(index) && 'nav-link--highlighted'
    );

  const hoverHandlers = (index: number) => ({
    onMouseEnter: () => {
      setHoveredDropdownIndex(null);
      setHoveredIndex(index);
    },
  });

  const handleNavMouseLeave = () => {
    setHoveredIndex(null);
    setHoveredDropdownIndex(null);
  };

  return (
    <nav
      ref={navRef}
      className={cn(
        'header-nav hidden xl:flex items-center',
        isStuck && 'header-nav--stuck',
        isStuck && isInverse && 'header-nav--stuck-inverse'
      )}
      onMouseLeave={handleNavMouseLeave}
    >
      <span
        aria-hidden="true"
        className="nav-indicator"
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

        if (item.kind === 'external') {
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
        }

        return (
          <div
            key={item.id}
            className="relative"
            data-learn-more
            onMouseEnter={() => {
              setHoveredDropdownIndex(null);
              setHoveredIndex(MORE_INDEX);
            }}
          >
            <button
              ref={setItemRef(index)}
              type="button"
              className={cn(linkClass(index), 'inline-flex items-center gap-1.5')}
              onClick={onToggleLearnMore}
            >
              {item.label}
              <ChevronDown
                className={cn('w-4 h-4 transition-transform duration-200', isLearnMoreOpen && 'rotate-180')}
              />
            </button>
            {isLearnMoreOpen && (
              <div
                ref={dropdownRef}
                className="nav-dropdown absolute top-full right-0 mt-2 w-52 z-50"
                onMouseLeave={() => setHoveredDropdownIndex(null)}
              >
                <span
                  aria-hidden="true"
                  className="nav-indicator"
                  style={{
                    transform: `translate3d(${dropdownIndicator.left}px, ${dropdownIndicator.top}px, 0)`,
                    width: dropdownIndicator.width,
                    height: dropdownIndicator.height,
                    opacity: dropdownIndicator.opacity,
                  }}
                />
                {dropdownItems.map((dropdownItem, dropdownIndex) => (
                  <Link
                    key={dropdownItem.id}
                    ref={setDropdownItemRef(dropdownIndex)}
                    to={dropdownItem.to}
                    className={cn(
                      'nav-dropdown-item relative z-[1]',
                      isDropdownHighlighted(dropdownIndex) && 'nav-dropdown-item--highlighted'
                    )}
                    onClick={onCloseMobileMenu}
                    onMouseEnter={() => setHoveredDropdownIndex(dropdownIndex)}
                  >
                    {dropdownItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default HeaderDesktopNav;
