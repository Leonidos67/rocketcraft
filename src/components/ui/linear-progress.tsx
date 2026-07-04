import { cn } from '@/lib/utils';

interface LinearProgressProps {
  className?: string;
  'aria-label'?: string;
}

export const LinearProgress = ({
  className,
  'aria-label': ariaLabel = 'Loading…',
}: LinearProgressProps) => {
  return (
    <div
      className={cn('page-linear-progress', className)}
      role="progressbar"
      aria-label={ariaLabel}
      aria-busy="true"
    >
      <span className="page-linear-progress__bar page-linear-progress__bar--primary" />
      <span className="page-linear-progress__bar page-linear-progress__bar--secondary" />
    </div>
  );
};

export default LinearProgress;
