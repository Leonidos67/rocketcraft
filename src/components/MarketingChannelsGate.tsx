import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import FlowingMenu, { type FlowingMenuItem } from '@/components/ui/FlowingMenu';
import { cn } from '@/lib/utils';

interface MarketingChannelsGateProps {
  items: FlowingMenuItem[];
  sectionId: string;
  title: string;
  buttonLabel: string;
  revealed: boolean;
  onReveal: () => void;
  reducedMotion?: boolean;
  reserveBottomNav?: boolean;
}

const gateShellClass = cn(
  'relative h-[var(--marketing-channels-gate-height)] overflow-hidden',
  'rounded-[clamp(1.25rem,3vw,2.5rem)]',
  'bg-[hsl(var(--accent-blue))]',
  'ring-1 ring-black/[0.06]',
);

const gateSafeAreaClass =
  'flex h-full flex-col items-center justify-center px-6 text-center pt-[calc(var(--page-header-top-gap)+0.5rem)]';

const MarketingChannelsGate = ({
  items,
  sectionId,
  title,
  buttonLabel,
  revealed,
  onReveal,
  reducedMotion = false,
  reserveBottomNav = false,
}: MarketingChannelsGateProps) => {
  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

  const bottomInset = reserveBottomNav
    ? 'var(--page-section-nav-reserve)'
    : 'var(--site-frame-gap)';
  const safeAreaStyle = { paddingBottom: bottomInset } as const;

  return (
    <section
      id={sectionId}
      className="relative w-full shrink-0 px-[var(--site-frame-gap)] pb-[var(--site-frame-gap)]"
      aria-label="Рекламные каналы"
    >
      <div className={gateShellClass}>
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div
              key="teaser"
              className={gateSafeAreaClass}
              style={safeAreaStyle}
              initial={false}
              exit={reducedMotion ? undefined : { opacity: 0, y: -20 }}
              transition={transition}
            >
              <p className="m-0 max-w-2xl text-[clamp(1.5rem,3.2vw,2.75rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-foreground">
                {title}
              </p>
              <p className="m-0 mt-6 rotate-6 mb-[clamp(1.5rem,4vw,2.5rem)] max-w-2xl text-[clamp(1.25rem,2vw,1.75rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#888]">
                [кликни!]
              </p>

              <button
                type="button"
                onClick={onReveal}
                aria-label={buttonLabel}
                className="group relative flex h-[clamp(6rem,16vw,7.5rem)] w-[clamp(6rem,16vw,7.5rem)] shrink-0 items-center justify-center border-none bg-transparent p-0 cursor-pointer"
              >
                {!reducedMotion && (
                  <>
                    <span
                      className="absolute inset-0 rounded-full bg-[hsl(var(--btn-circle-bg))] animate-marketing-pulse"
                      aria-hidden="true"
                    />
                    <span
                      className="absolute inset-[-10%] rounded-full border border-[hsl(var(--btn-circle-bg))]/60"
                      aria-hidden="true"
                    />
                  </>
                )}
                <span
                  className={cn(
                    'relative z-[1] flex h-[78%] w-[78%] items-center justify-center rounded-full',
                    'bg-primary text-primary-foreground',
                    'shadow-[0_10px_36px_hsl(0_0%_0%/0.16)]',
                    'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
                    'group-hover:scale-[1.04] group-active:scale-[0.96]',
                  )}
                >
                  <ChevronDown className="h-[clamp(1.25rem,2.8vw,1.75rem)] w-[clamp(1.25rem,2.8vw,1.75rem)]" strokeWidth={2.5} />
                </span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              className="flex h-full flex-col pt-[calc(var(--page-header-top-gap)+0.25rem)]"
              style={safeAreaStyle}
              initial={reducedMotion ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition}
            >
              <div className="min-h-0 flex-1 overflow-hidden">
                <FlowingMenu items={items} speed={15} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MarketingChannelsGate;
