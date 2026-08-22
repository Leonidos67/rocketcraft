import { cn } from '@/lib/utils';

interface LinearProgressProps {
  className?: string;
  'aria-label'?: string;
}

const progressKeyframes = `
@keyframes page-linear-progress-primary {
  0% { left: -35%; right: 100%; }
  60% { left: 100%; right: -90%; }
  100% { left: 100%; right: -90%; }
}
@keyframes page-linear-progress-secondary {
  0% { left: -200%; right: 100%; }
  60% { left: 107%; right: -8%; }
  100% { left: 107%; right: -8%; }
}
`;

export const LinearProgress = ({
  className,
  'aria-label': ariaLabel = 'Loading…',
}: LinearProgressProps) => {
  return (
    <>
      <style>{progressKeyframes}</style>
      <div
        className={cn('relative h-1 w-full overflow-hidden bg-primary/10', className)}
        role="progressbar"
        aria-label={ariaLabel}
        aria-busy="true"
      >
        <span
          className="absolute bottom-0 left-0 top-0 w-auto bg-primary will-change-[left,right]"
          style={{
            animation: 'page-linear-progress-primary 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite',
          }}
        />
        <span
          className="absolute bottom-0 left-0 top-0 w-auto bg-primary will-change-[left,right]"
          style={{
            animation: 'page-linear-progress-secondary 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite',
            animationDelay: '1.15s',
          }}
        />
      </div>
    </>
  );
};

export default LinearProgress;
