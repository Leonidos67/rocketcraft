import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface PrimaryButtonProps {
  to?: string;
  children: React.ReactNode;
  className?: string;
  compact?: boolean;
  onClick?: () => void;
  external?: boolean;
}

const iconSizeStyle = (compact?: boolean): React.CSSProperties =>
  ({
    '--btn-icon-size': compact ? '2.75rem' : 'var(--btn-height)',
  }) as React.CSSProperties;

const PrimaryButton = ({
  to,
  children,
  className,
  compact,
  onClick,
  external,
}: PrimaryButtonProps) => {
  const wrapClass = cn(
    'group relative inline-flex items-center no-underline cursor-pointer',
    'mr-[var(--btn-icon-size)] transition-[margin] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
    'hover:mr-0 hover:ml-[var(--btn-icon-size)]',
    className
  );

  const iconClass = cn(
    'absolute top-1/2 -mt-[calc(var(--btn-icon-size)/2)]',
    'w-[var(--btn-icon-size)] h-[var(--btn-icon-size)]',
    'flex items-center justify-center shrink-0 rounded-full',
    'bg-[hsl(var(--btn-circle-bg))] text-[hsl(var(--btn-circle-fg))]',
    'text-[1.1em] leading-none',
    'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
    'origin-center'
  );

  const content = (
    <>
      <span
        className={cn(
          iconClass,
          'right-full scale-0 z-[2] group-hover:scale-100'
        )}
        aria-hidden="true"
      >
        <ArrowRight className="w-4 h-4 shrink-0" strokeWidth={2} />
      </span>
      <span
        className={cn(
          'relative z-[1] inline-flex items-center justify-center shrink-0',
          'h-[var(--btn-icon-size)] px-[1.875rem]',
          'bg-primary text-primary-foreground rounded-full',
          'text-[clamp(0.9375rem,1vw,1.125rem)] font-semibold leading-none',
          compact && 'px-5 text-sm'
        )}
      >
        {children}
      </span>
      <span
        className={cn(
          iconClass,
          'left-full scale-100 z-[1] group-hover:scale-0'
        )}
        aria-hidden="true"
      >
        <ArrowRight className="w-4 h-4 shrink-0" strokeWidth={2} />
      </span>
    </>
  );

  if (external && to) {
    return (
      <a
        href={to}
        className={wrapClass}
        style={iconSizeStyle(compact)}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  if (to) {
    return (
      <Link
        to={to}
        className={wrapClass}
        style={iconSizeStyle(compact)}
        onClick={onClick}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={wrapClass}
      style={iconSizeStyle(compact)}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default PrimaryButton;
