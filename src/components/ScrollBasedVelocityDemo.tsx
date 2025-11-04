import { cn } from '@/lib/utils';
import { ReactNode, useEffect, useRef, useState } from 'react';

interface ContainerProps {
  className?: string;
  children: ReactNode;
}

interface RowProps {
  baseVelocity?: number; // px per second baseline
  direction?: 1 | -1;
  className?: string;
  children: ReactNode;
}

// Measures scroll velocity and exposes it via context-like props drilling
function useScrollVelocity() {
  const lastYRef = useRef<number>(typeof window !== 'undefined' ? window.scrollY : 0);
  const lastTRef = useRef<number>(typeof performance !== 'undefined' ? performance.now() : 0);
  const [velocity, setVelocity] = useState(0); // px per second

  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      const now = performance.now();
      const y = window.scrollY;
      const dy = y - lastYRef.current;
      const dt = (now - lastTRef.current) / 1000; // seconds
      if (dt > 0) {
        // clamp to avoid spikes
        const v = Math.max(-2000, Math.min(2000, dy / dt));
        setVelocity(v);
      }
      lastYRef.current = y;
      lastTRef.current = now;
    };
    const loop = () => {
      // decay velocity gradually for smoothness when scroll stops
      setVelocity((v) => v * 0.92);
      rafId = requestAnimationFrame(loop);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    rafId = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return velocity;
}

export function ScrollVelocityContainer({ className, children }: ContainerProps) {
  return (
    <div className={cn('relative w-full overflow-hidden', className)}>{children}</div>
  );
}

export function ScrollVelocityRow({
  baseVelocity = 20,
  direction = 1,
  className,
  children,
}: RowProps) {
  const velocity = useScrollVelocity();
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);

  useEffect(() => {
    let rafId = 0;
    let last = performance.now();
    const step = (now: number) => {
      const dt = (now - last) / 1000; // sec
      last = now;
      const v = baseVelocity + Math.abs(velocity) * 0.35; // stronger influence by scroll
      const dir = direction * (velocity >= 0 ? 1 : -1);
      offsetRef.current += dir * v * dt; // px
      const el = trackRef.current;
      if (el) {
        // wrap every 50% width to create seamless loop
        const width = el.scrollWidth / 2;
        if (width > 0) {
          // keep offset in [-width, 0]
          if (offsetRef.current > 0) offsetRef.current = ((offsetRef.current % width) - width);
          if (offsetRef.current < -width) offsetRef.current = (offsetRef.current % width);
        }
        el.style.transform = `translateX(${offsetRef.current}px)`;
      }
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [baseVelocity, direction, velocity]);

  return (
    <div className={cn('relative w-full overflow-hidden', className)}>
      <div ref={trackRef} className="flex whitespace-nowrap will-change-transform">
        <span className="px-2">
          {children}
        </span>
        <span className="px-2">
          {children}
        </span>
        <span className="px-2">
          {children}
        </span>
        <span className="px-2">
          {children}
        </span>
        <span className="px-2">
          {children}
        </span>
        <span className="px-2">
          {children}
        </span>
        <span className="px-2">
          {children}
        </span>
        <span className="px-2">
          {children}
        </span>
      </div>
    </div>
  );
}

export function ScrollBasedVelocityDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-1">
      <ScrollVelocityContainer className="text-xl font-semibold tracking-[-0.01em] md:text-3xl md:leading-[2.5rem] text-foreground">
        <ScrollVelocityRow baseVelocity={40} direction={1}>
          Telegram&nbsp;&nbsp;WhatsApp&nbsp;&nbsp;Notion&nbsp;&nbsp;Airtable
        </ScrollVelocityRow>
        <ScrollVelocityRow baseVelocity={40} direction={-1}>
          amoCRM&nbsp;&nbsp;Bitrix24&nbsp;&nbsp;Google&nbsp;Sheets&nbsp;&nbsp;Make&nbsp;&nbsp;n8n
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r" />
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l" />
    </div>
  );
}

export default ScrollBasedVelocityDemo;


