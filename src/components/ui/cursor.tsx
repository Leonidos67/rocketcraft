import { Children, useEffect, useRef, useState, type HTMLAttributes, type SVGProps } from 'react';
import { cn } from '@/lib/utils';

export type CursorProps = HTMLAttributes<HTMLSpanElement>;
export const Cursor = ({ className, children, ...props }: CursorProps) => (
  <span
    className={cn('pointer-events-none relative select-none', className)}
    {...props}
  >
    {children}
  </span>
);

export type CursorPointerProps = SVGProps<SVGSVGElement>;
export const CursorPointer = ({ className, ...props }: CursorPointerProps) => (
  <svg
    aria-hidden="true"
    className={cn('size-3.5', className)}
    fill="none"
    focusable="false"
    height="20"
    viewBox="0 0 20 20"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19.438 6.716 1.115.05A.832.832 0 0 0 .05 1.116L6.712 19.45a.834.834 0 0 0 1.557.025l3.198-8 7.995-3.2a.833.833 0 0 0 0-1.559h-.024Z"
      fill="currentColor"
    />
  </svg>
);

export type CursorBodyProps = HTMLAttributes<HTMLSpanElement>;
export const CursorBody = ({
  children,
  className,
  ...props
}: CursorBodyProps) => (
  <span
    className={cn(
      'relative ml-3.5 flex flex-col whitespace-nowrap rounded-xl py-1 pr-3 pl-2.5 text-xs',
      Children.count(children) > 1 && 'rounded-tl [&>:first-child]:opacity-70',
      'bg-secondary text-foreground',
      className
    )}
    {...props}
  >
    {children}
  </span>
);

export type CursorNameProps = HTMLAttributes<HTMLSpanElement>;
export const CursorName = (props: CursorNameProps) => <span {...props} />;

export type CursorMessageProps = HTMLAttributes<HTMLSpanElement>;
export const CursorMessage = (props: CursorMessageProps) => <span {...props} />;

// Компонент для следования за мышью с изменением при наведении
export const SmoothCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const angleRef = useRef(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isOrangeBg, setIsOrangeBg] = useState(false);
  const [forceWhite, setForceWhite] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };

      // Проверяем, наведена ли мышь на кликабельный элемент
      const target = e.target as HTMLElement;
      const isClickable = target.closest('a, button, [role="button"], input, textarea, select') !== null;
      setIsHovering(isClickable);

      // Check if we're over orange background
      const bodyBg = window.getComputedStyle(document.body).backgroundColor;
      const mainDiv = document.querySelector('[class*="min-h-screen"]');
      const divBg = mainDiv ? window.getComputedStyle(mainDiv as HTMLElement).backgroundColor : '';
      const isOrange = bodyBg.includes('255, 152, 0') || bodyBg.includes('rgb(255, 152, 0)') ||
                      divBg.includes('255, 152, 0') || divBg.includes('rgb(255, 152, 0)');
      setIsOrangeBg(isOrange);

      // Принудительно белый курсор при открытом окне услуг
      const isServicesOpen = document.documentElement.classList.contains('services-open');
      setForceWhite(isServicesOpen);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      const dx = targetRef.current.x - positionRef.current.x;
      const dy = targetRef.current.y - positionRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 0.01) {
        positionRef.current.x += dx * 0.15;
        positionRef.current.y += dy * 0.15;

        // Calculate rotation angle based on movement direction for cursor
        if (!isHovering) {
          const speed = Math.sqrt(dx * dx + dy * dy);
          if (speed > 2) {
            angleRef.current = Math.atan2(dy, dx) - Math.PI / 0.311;
          }
        }

        if (cursorRef.current) {
          const rotation = !isHovering ? ` rotate(${angleRef.current}rad)` : '';
          cursorRef.current.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px)${rotation}`;
        }
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isHovering]);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        transform: `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`,
      }}
    >
      {isHovering ? (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: 'translateX(-10px)' }}
        >
          <circle cx="12" cy="12" r="10" className="fill-purple-500" />
          <circle cx="12" cy="12" r="5" className="fill-white" />
        </svg>
      ) : (
          <Cursor>
            <CursorPointer className="text-black" />
        </Cursor>
      )}
    </div>
  );
};



