import { forwardRef, useRef, type ReactNode } from 'react';
import { Database, MessageSquare, Sheet, Workflow } from 'lucide-react';
import { AnimatedBeam } from '@/components/ui/animated-beam';
import { cn } from '@/lib/utils';

const Node = forwardRef<HTMLDivElement, { className?: string; children?: ReactNode; label: string }>(
  ({ className, children, label }, ref) => (
    <div className="flex flex-col items-center gap-2">
      <div
        ref={ref}
        className={cn(
          'z-10 flex h-12 w-12 items-center justify-center rounded-2xl border border-black/[0.08] bg-white text-black shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:h-14 sm:w-14',
          className,
        )}
      >
        {children}
      </div>
      <span className="text-[0.6875rem] font-medium text-black/45">{label}</span>
    </div>
  ),
);

Node.displayName = 'AutomationFlowNode';

const beamProps = {
  pathColor: 'rgba(0,0,0,0.12)',
  pathWidth: 1.5,
  pathOpacity: 1,
  gradientStartColor: '#111111',
  gradientStopColor: '#9ca3af',
  duration: 4.5,
} as const;

export function AutomationFlowDiagram({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const siteRef = useRef<HTMLDivElement>(null);
  const adsRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const crmRef = useRef<HTMLDivElement>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative flex h-[22rem] w-full items-center justify-center overflow-hidden rounded-[1.25rem] bg-white sm:h-[26rem]',
        className,
      )}
    >
      <div className="flex w-full max-w-xl flex-row items-center justify-between gap-4 px-4 sm:gap-8 sm:px-8">
        <div className="flex flex-col justify-center gap-5 sm:gap-6">
          <Node ref={siteRef} label="Сайт">
            <Sheet className="h-5 w-5" strokeWidth={1.75} />
          </Node>
          <Node ref={adsRef} label="Реклама">
            <Database className="h-5 w-5" strokeWidth={1.75} />
          </Node>
          <Node ref={chatRef} label="Чаты">
            <MessageSquare className="h-5 w-5" strokeWidth={1.75} />
          </Node>
        </div>

        <Node ref={hubRef} label="Автоматизация" className="h-16 w-16 bg-black text-white sm:h-[4.5rem] sm:w-[4.5rem]">
          <Workflow className="h-6 w-6" strokeWidth={1.75} />
        </Node>

        <div className="flex flex-col justify-center gap-8 sm:gap-10">
          <Node ref={crmRef} label="CRM">
            <Database className="h-5 w-5" strokeWidth={1.75} />
          </Node>
          <Node ref={reportRef} label="Отчёты">
            <Sheet className="h-5 w-5" strokeWidth={1.75} />
          </Node>
        </div>
      </div>

      <AnimatedBeam containerRef={containerRef} fromRef={siteRef} toRef={hubRef} {...beamProps} />
      <AnimatedBeam containerRef={containerRef} fromRef={adsRef} toRef={hubRef} {...beamProps} delay={0.3} />
      <AnimatedBeam containerRef={containerRef} fromRef={chatRef} toRef={hubRef} {...beamProps} delay={0.6} />
      <AnimatedBeam containerRef={containerRef} fromRef={hubRef} toRef={crmRef} {...beamProps} delay={0.2} />
      <AnimatedBeam containerRef={containerRef} fromRef={hubRef} toRef={reportRef} {...beamProps} delay={0.5} />
    </div>
  );
}
