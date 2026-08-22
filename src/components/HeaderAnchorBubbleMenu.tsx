import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import type { BubbleMenuItem } from '@/components/ui/BubbleMenu';
import { cn } from '@/lib/utils';

interface ChaoticOffset {
  x: number;
  y: number;
  rotation: number;
}

interface HeaderAnchorBubbleMenuProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: RefObject<HTMLElement | null>;
  fallbackAnchorRef?: RefObject<HTMLElement | null>;
  items: BubbleMenuItem[];
}

const estimatePillWidth = (label: string) => Math.max(112, label.length * 7.4 + 40);

const buildItemOffsets = (labels: string[]): ChaoticOffset[] => {
  const gap = 14;
  const widths = labels.map(estimatePillWidth);
  const totalWidth = widths.reduce((sum, width) => sum + width, 0) + gap * Math.max(labels.length - 1, 0);

  let cursor = -totalWidth / 2;

  return labels.map((_label, index) => {
    const width = widths[index];
    const centerX = cursor + width / 2;
    cursor += width + gap;

    return {
      x: centerX + gsap.utils.random(-5, 5),
      y: 20 + gsap.utils.random(-4, 8),
      rotation: gsap.utils.random(-7, 7),
    };
  });
};

const isBubbleItemActive = (pathname: string, to?: string) => {
  if (!to) return false;
  if (to === '/services') return pathname === '/services';
  return pathname === to;
};

const getBubbleItemColors = (item: BubbleMenuItem, isActive: boolean) => {
  if (isActive && item.hoverStyles) {
    return {
      background: item.hoverStyles.bgColor || '#bad6ff',
      color: item.hoverStyles.textColor || '#0b1311',
    };
  }

  return {
    background: '#ffffff',
    color: '#0b1311',
  };
};

const HeaderAnchorBubbleMenu = ({
  isOpen,
  onClose,
  anchorRef,
  fallbackAnchorRef,
  items,
}: HeaderAnchorBubbleMenuProps) => {
  const location = useLocation();
  const [isMounted, setIsMounted] = useState(false);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const bubbleRefs = useRef<(HTMLElement | null)[]>([]);
  const labelRefs = useRef<(HTMLElement | null)[]>([]);

  const itemLabels = useMemo(() => items.map((item) => item.label), [items]);

  const itemOffsets = useMemo(() => buildItemOffsets(itemLabels), [itemLabels, isOpen]);

  useLayoutEffect(() => {
    if (!isOpen) return;

    const updateAnchor = () => {
      const primary = anchorRef.current?.getBoundingClientRect();
      const fallback = fallbackAnchorRef?.current?.getBoundingClientRect();
      const next =
        primary && primary.width > 0 && primary.height > 0
          ? primary
          : fallback && fallback.width > 0 && fallback.height > 0
            ? fallback
            : null;
      if (next) setAnchorRect(next);
    };

    updateAnchor();
    window.addEventListener('resize', updateAnchor);
    window.addEventListener('scroll', updateAnchor, true);

    return () => {
      window.removeEventListener('resize', updateAnchor);
      window.removeEventListener('scroll', updateAnchor, true);
    };
  }, [isOpen, anchorRef, fallbackAnchorRef]);

  useEffect(() => {
    if (!isOpen) return;
    setIsMounted(true);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isMounted) return;

    const bubbles = bubbleRefs.current.filter(Boolean) as HTMLElement[];
    const labels = labelRefs.current.filter(Boolean) as HTMLElement[];

    if (isOpen) {
      gsap.killTweensOf([...bubbles, ...labels]);
      bubbles.forEach((bubble, index) => {
        const offset = itemOffsets[index];
        gsap.set(bubble, {
          xPercent: -50,
          scale: 0,
          rotation: offset?.rotation ?? 0,
          transformOrigin: '50% 50%',
        });
      });
      gsap.set(labels, { y: 16, autoAlpha: 0 });

      bubbles.forEach((bubble, index) => {
        const delay = index * 0.08 + gsap.utils.random(0, 0.12);
        const tl = gsap.timeline({ delay });
        tl.to(bubble, {
          scale: 1,
          duration: 0.48,
          ease: 'back.out(1.7)',
        });
        if (labels[index]) {
          tl.to(
            labels[index],
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.34,
              ease: 'power3.out',
            },
            '-=0.34'
          );
        }
      });
      return;
    }

    gsap.killTweensOf([...bubbles, ...labels]);
    gsap.to(labels, { y: 16, autoAlpha: 0, duration: 0.16, ease: 'power3.in' });
    gsap.to(bubbles, {
      scale: 0,
      duration: 0.18,
      ease: 'power3.in',
      onComplete: () => setIsMounted(false),
    });
  }, [isMounted, isOpen, itemOffsets]);

  if (!isMounted || !anchorRect) return null;

  const originLeft = anchorRect.left + anchorRect.width / 2;

  const renderBubble = (item: BubbleMenuItem, index: number) => {
    const offset = itemOffsets[index];
    const isActive = isBubbleItemActive(location.pathname, item.to);
    const colors = getBubbleItemColors(item, isActive);
    const pillClassName = cn(
      'pointer-events-auto absolute inline-flex min-h-[2.75rem] items-center justify-center rounded-full px-5 py-2.5',
      'text-sm font-semibold whitespace-nowrap no-underline shadow-[0_8px_24px_hsl(0_0%_0%/0.12)]',
      'transition-[background,color,transform,box-shadow] duration-300 ease-out',
      'hover:scale-[1.05] active:scale-[0.96]',
      isActive && 'shadow-[0_10px_28px_hsl(0_0%_0%/0.16)] ring-1 ring-black/8'
    );

    const style = {
      left: originLeft + offset.x,
      top: anchorRect.bottom + 12 + offset.y,
      background: colors.background,
      color: colors.color,
    };

    const label = (
      <span
        ref={(el) => {
          labelRefs.current[index] = el;
        }}
        className="inline-block leading-none"
      >
        {item.label}
      </span>
    );

    const commonProps = {
      role: 'menuitem' as const,
      'aria-label': item.ariaLabel || item.label,
      className: pillClassName,
      style,
      ref: (el: HTMLElement | null) => {
        bubbleRefs.current[index] = el;
      },
      onClick: onClose,
      onMouseEnter: (event: MouseEvent<HTMLElement>) => {
        event.currentTarget.style.background = item.hoverStyles?.bgColor || '#bad6ff';
        event.currentTarget.style.color = item.hoverStyles?.textColor || '#0b1311';
      },
      onMouseLeave: (event: MouseEvent<HTMLElement>) => {
        const nextColors = getBubbleItemColors(item, isActive);
        event.currentTarget.style.background = nextColors.background;
        event.currentTarget.style.color = nextColors.color;
      },
      ...(isActive ? { 'aria-current': 'page' as const } : {}),
    };

    if (item.to) {
      return (
        <Link key={`${item.label}-${index}`} {...commonProps} to={item.to}>
          {label}
        </Link>
      );
    }

    return (
      <a key={`${item.label}-${index}`} {...commonProps} href={item.href || '#'}>
        {label}
      </a>
    );
  };

  return createPortal(
    <div
      data-bubble-menu
      className="pointer-events-none fixed inset-0 z-[132]"
      role="presentation"
      aria-hidden={!isOpen}
    >
      <div className="pointer-events-none absolute inset-0" role="menu" aria-label="Подменю">
        {items.map((item, index) => renderBubble(item, index))}
      </div>
    </div>,
    document.body
  );
};

export default HeaderAnchorBubbleMenu;
