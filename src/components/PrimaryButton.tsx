import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface PrimaryButtonProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  compact?: boolean;
  onClick?: () => void;
  external?: boolean;
}

const PrimaryButton = ({
  to,
  children,
  className,
  compact,
  onClick,
  external,
}: PrimaryButtonProps) => {
  const wrapClass = cn(
    'btn-sm-primary-wrap',
    compact && 'btn-sm-primary-wrap--compact',
    className
  );

  const content = (
    <>
      <span className="btn-sm-primary-icon btn-sm-primary-icon--left" aria-hidden="true">
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
      </span>
      <span className="btn-sm-primary__label">{children}</span>
      <span className="btn-sm-primary-icon btn-sm-primary-icon--right" aria-hidden="true">
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={to}
        className={wrapClass}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <Link to={to} className={wrapClass} onClick={onClick}>
      {content}
    </Link>
  );
};

export default PrimaryButton;
