import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BubbleMenuItem {
  label: string;
  href?: string;
  to?: string;
  ariaLabel?: string;
  rotation?: number;
  hoverStyles?: {
    bgColor?: string;
    textColor?: string;
  };
}

export interface BubbleMenuProps {
  logo?: ReactNode;
  onMenuClick?: (open: boolean) => void;
  className?: string;
  style?: CSSProperties;
  menuAriaLabel?: string;
  menuBg?: string;
  menuContentColor?: string;
  useFixedPosition?: boolean;
  items?: BubbleMenuItem[];
  animationEase?: string;
  animationDuration?: number;
  staggerDelay?: number;
  /** Управляемый режим: открыто/закрыто снаружи */
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Скрыть встроенную кнопку-переключатель и шапку меню */
  hideTrigger?: boolean;
  /** Показывать кнопку закрытия в оверлее */
  showCloseButton?: boolean;
  onClose?: () => void;
  overlayClassName?: string;
  onItemClick?: () => void;
}

const BubbleMenu = ({
  logo,
  onMenuClick,
  className,
  style,
  menuAriaLabel = 'Toggle menu',
  menuBg = '#fff',
  menuContentColor = '#111',
  useFixedPosition = false,
  items = [],
  animationEase = 'back.out(1.5)',
  animationDuration = 0.5,
  staggerDelay = 0.12,
  isOpen,
  onOpenChange,
  hideTrigger = false,
  showCloseButton = false,
  onClose,
  overlayClassName,
  onItemClick,
}: BubbleMenuProps) => {
  const isControlled = isOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLButtonElement | null>(null);
  const bubblesRef = useRef<(HTMLElement | null)[]>([]);
  const labelRefs = useRef<(HTMLElement | null)[]>([]);

  const menuOpen = isControlled ? Boolean(isOpen) : internalOpen;
  const menuItems = items.length ? items : [];

  const setMenuOpen = (next: boolean) => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
    onMenuClick?.(next);
    if (!next) onClose?.();
  };

  const handleToggle = () => {
    const next = !menuOpen;
    if (next) setShowOverlay(true);
    setMenuOpen(next);
  };

  const handleClose = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    if (!isControlled) return;
    if (isOpen) setShowOverlay(true);
  }, [isOpen, isControlled]);

  useEffect(() => {
    if (!menuOpen || !hideTrigger) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [menuOpen, hideTrigger]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const backdrop = backdropRef.current;
    const bubbles = bubblesRef.current.filter(Boolean) as HTMLElement[];
    const labels = labelRefs.current.filter(Boolean) as HTMLElement[];
    if (!overlay || !bubbles.length) return;

    if (menuOpen) {
      gsap.set(overlay, { display: 'flex' });
      if (backdrop) gsap.set(backdrop, { autoAlpha: 1 });

      gsap.killTweensOf([...bubbles, ...labels, backdrop].filter(Boolean));
      gsap.set(bubbles, { scale: 0, transformOrigin: '50% 50%' });
      gsap.set(labels, { y: 24, autoAlpha: 0 });

      bubbles.forEach((bubble, i) => {
        const delay = i * staggerDelay + gsap.utils.random(-0.05, 0.05);
        const tl = gsap.timeline({ delay });
        tl.to(bubble, {
          scale: 1,
          duration: animationDuration,
          ease: animationEase,
        });
        if (labels[i]) {
          tl.to(
            labels[i],
            {
              y: 0,
              autoAlpha: 1,
              duration: animationDuration,
              ease: 'power3.out',
            },
            `-=${animationDuration * 0.9}`
          );
        }
      });
    } else if (showOverlay) {
      gsap.killTweensOf([...bubbles, ...labels, backdrop].filter(Boolean));
      gsap.to(labels, {
        y: 24,
        autoAlpha: 0,
        duration: 0.2,
        ease: 'power3.in',
      });
      if (backdrop) {
        gsap.to(backdrop, {
          autoAlpha: 0,
          duration: 0.2,
          ease: 'power3.in',
        });
      }
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.2,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(overlay, { display: 'none' });
          setShowOverlay(false);
        },
      });
    }
  }, [menuOpen, showOverlay, animationEase, animationDuration, staggerDelay]);

  useEffect(() => {
    const handleResize = () => {
      if (!menuOpen) return;
      const bubbles = bubblesRef.current.filter(Boolean) as HTMLElement[];
      const isDesktop = window.innerWidth >= 900;
      bubbles.forEach((bubble, i) => {
        const item = menuItems[i];
        if (bubble && item) {
          const rotation = isDesktop ? (item.rotation ?? 0) : 0;
          gsap.set(bubble, { rotation });
        }
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen, menuItems]);

  const containerClassName = cn(
    'bubble-menu pointer-events-none z-[1001]',
    useFixedPosition ? 'fixed' : 'absolute',
    !hideTrigger && 'left-0 right-0 top-8 flex items-center justify-between gap-4 px-8',
    className
  );

  const renderItem = (item: BubbleMenuItem, idx: number) => {
    const pillStyle = {
      '--item-rot': `${item.rotation ?? 0}deg`,
      '--pill-bg': menuBg,
      '--pill-color': menuContentColor,
      '--hover-bg': item.hoverStyles?.bgColor || '#f3f4f6',
      '--hover-color': item.hoverStyles?.textColor || menuContentColor,
      background: 'var(--pill-bg)',
      color: 'var(--pill-color)',
      minHeight: 'var(--pill-min-h, 160px)',
      padding: 'clamp(1.5rem, 3vw, 8rem) 0',
      fontSize: 'clamp(1.5rem, 4vw, 4rem)',
      fontWeight: 400,
      lineHeight: 0,
      willChange: 'transform',
      height: 10,
    } as CSSProperties;

    const pillClassName = cn(
      'pill-link relative box-border flex w-full items-center justify-center overflow-hidden whitespace-nowrap rounded-[999px]',
      'bg-white text-inherit no-underline shadow-[0_4px_14px_rgba(0,0,0,0.10)]',
      'transition-[background,color] duration-300 ease-in-out'
    );

    const label = (
      <span
        className="pill-label inline-block"
        style={{ willChange: 'transform, opacity', height: '1.2em', lineHeight: 1.2 }}
        ref={(el) => {
          labelRefs.current[idx] = el;
        }}
      >
        {item.label}
      </span>
    );

    const commonProps = {
      role: 'menuitem' as const,
      'aria-label': item.ariaLabel || item.label,
      className: pillClassName,
      style: pillStyle,
      ref: (el: HTMLElement | null) => {
        bubblesRef.current[idx] = el;
      },
      onClick: onItemClick,
    };

    if (item.to) {
      return (
        <Link {...commonProps} to={item.to}>
          {label}
        </Link>
      );
    }

    return (
      <a {...commonProps} href={item.href || '#'}>
        {label}
      </a>
    );
  };

  return (
    <>
      <style>{`
        .bubble-menu .menu-line {
          transition: transform 0.3s ease, opacity 0.3s ease;
          transform-origin: center;
        }
        .bubble-menu-items .pill-list .pill-col:nth-child(4):nth-last-child(2) {
          margin-left: calc(100% / 6);
        }
        .bubble-menu-items .pill-list .pill-col:nth-child(4):last-child {
          margin-left: calc(100% / 3);
        }
        @media (min-width: 900px) {
          .bubble-menu-items .pill-link {
            transform: rotate(var(--item-rot));
          }
          .bubble-menu-items .pill-link:hover {
            transform: rotate(var(--item-rot)) scale(1.06);
            background: var(--hover-bg) !important;
            color: var(--hover-color) !important;
          }
          .bubble-menu-items .pill-link:active {
            transform: rotate(var(--item-rot)) scale(.94);
          }
        }
        @media (max-width: 899px) {
          .bubble-menu-items {
            padding-top: 120px;
            align-items: flex-start;
          }
          .bubble-menu-items .pill-list {
            row-gap: 16px;
          }
          .bubble-menu-items .pill-list .pill-col {
            flex: 0 0 100% !important;
            margin-left: 0 !important;
            overflow: visible;
          }
          .bubble-menu-items .pill-link {
            font-size: clamp(1.2rem, 3vw, 4rem);
            padding: clamp(1rem, 2vw, 2rem) 0;
            min-height: 80px !important;
          }
          .bubble-menu-items .pill-link:hover {
            transform: scale(1.06);
            background: var(--hover-bg);
            color: var(--hover-color);
          }
          .bubble-menu-items .pill-link:active {
            transform: scale(.94);
          }
        }
      `}</style>

      {!hideTrigger && (
        <nav className={containerClassName} style={style} aria-label="Main navigation">
          <div
            className="bubble logo-bubble pointer-events-auto inline-flex h-12 items-center justify-center gap-2 rounded-full px-4 shadow-[0_4px_16px_rgba(0,0,0,0.12)] will-change-transform md:h-14 md:px-8"
            aria-label="Logo"
            style={{ background: menuBg, minHeight: '48px', borderRadius: '9999px' }}
          >
            <span className="logo-content inline-flex h-full w-[120px] items-center justify-center">
              {typeof logo === 'string' ? (
                <img src={logo} alt="Logo" className="bubble-logo block max-h-[60%] max-w-full object-contain" />
              ) : (
                logo
              )}
            </span>
          </div>

          <button
            type="button"
            className={cn(
              'bubble toggle-bubble menu-btn pointer-events-auto inline-flex h-12 w-12 cursor-pointer flex-col items-center justify-center rounded-full border-0 p-0 shadow-[0_4px_16px_rgba(0,0,0,0.12)] will-change-transform md:h-14 md:w-14',
              menuOpen && 'open'
            )}
            onClick={handleToggle}
            aria-label={menuAriaLabel}
            aria-pressed={menuOpen}
            style={{ background: menuBg }}
          >
            <span
              className="menu-line mx-auto block rounded-[2px]"
              style={{
                width: 26,
                height: 2,
                background: menuContentColor,
                transform: menuOpen ? 'translateY(4px) rotate(45deg)' : 'none',
              }}
            />
            <span
              className="menu-line short mx-auto mt-1.5 block rounded-[2px]"
              style={{
                width: 26,
                height: 2,
                background: menuContentColor,
                transform: menuOpen ? 'translateY(-4px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </nav>
      )}

      {showOverlay && (
        <div
          className={cn(
            'fixed inset-0 z-[120]',
            hideTrigger && 'pointer-events-auto'
          )}
        >
          {hideTrigger && (
            <button
              ref={backdropRef}
              type="button"
              className="absolute inset-0 border-0 bg-background/70 backdrop-blur-md"
              aria-label="Закрыть меню"
              onClick={handleClose}
            />
          )}

          {showCloseButton && (
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-[max(1rem,env(safe-area-inset-right,0px))] top-[max(1rem,env(safe-area-inset-top,0px))] z-[2] inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-background text-foreground shadow-[0_8px_24px_hsl(0_0%_0%/0.12)] transition-colors duration-200 hover:bg-muted"
              aria-label="Закрыть"
            >
              <X className="h-5 w-5" strokeWidth={2.25} />
            </button>
          )}

          <div
            ref={overlayRef}
            className={cn(
              'bubble-menu-items flex items-center justify-center',
              useFixedPosition || hideTrigger ? 'fixed inset-0' : 'absolute inset-0',
              'pointer-events-none',
              overlayClassName
            )}
            aria-hidden={!menuOpen}
          >
            {hideTrigger && logo && (
              <div className="pointer-events-none absolute left-1/2 top-[max(1.25rem,env(safe-area-inset-top,0px))] z-[1] -translate-x-1/2">
                <div
                  className="inline-flex min-h-12 items-center justify-center rounded-full px-6 shadow-[0_4px_16px_rgba(0,0,0,0.12)] md:min-h-14 md:px-8"
                  style={{ background: menuBg }}
                >
                  {logo}
                </div>
              </div>
            )}

            <ul
              className="pill-list pointer-events-auto mx-auto flex w-full max-w-[1600px] list-none flex-wrap gap-x-0 gap-y-1 px-6"
              role="menu"
              aria-label="Menu links"
            >
              {menuItems.map((item, idx) => (
                <li
                  key={`${item.label}-${idx}`}
                  role="none"
                  className="pill-col box-border flex flex-[0_0_calc(100%/3)] items-stretch justify-center"
                >
                  {renderItem(item, idx)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default BubbleMenu;
