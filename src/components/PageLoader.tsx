import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const PageLoader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Показываем загрузку при каждом изменении маршрута
    setIsVisible(true);

    // Скрываем через небольшую задержку для плавности
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] bg-background flex items-center justify-center',
        'transition-opacity duration-300',
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin" />
        </div>
        
        {/* Text */}
        <p className="text-sm text-muted-foreground animate-pulse">Загрузка...</p>
      </div>
    </div>
  );
};

export default PageLoader;

