import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import LinearProgress from '@/components/ui/linear-progress';

const PageLoader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsVisible(true);

    const timer = window.setTimeout(() => {
      setIsVisible(false);
    }, 600);

    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed inset-x-0 top-0 z-[100] w-full',
        'transition-opacity duration-300',
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <LinearProgress aria-label="Loading…" />
    </div>
  );
};

export default PageLoader;
