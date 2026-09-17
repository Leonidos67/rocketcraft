import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'rc-top-promo-banner-dismissed';
const PREVIEW_PATH = '/product-preview';

const TopPromoBanner = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [roiOpen, setRoiOpen] = useState(false);

  useEffect(() => {
    setVisible(localStorage.getItem(STORAGE_KEY) !== '1');
  }, []);

  useEffect(() => {
    const sync = () => setRoiOpen(document.body.hasAttribute('data-roi-open'));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-roi-open'] });
    return () => observer.disconnect();
  }, []);

  if (
    !visible ||
    roiOpen ||
    location.pathname === '/ai' ||
    location.pathname === PREVIEW_PATH ||
    location.pathname.startsWith(`${PREVIEW_PATH}/`) ||
    location.pathname.startsWith('/saas/')
  ) {
    return null;
  }

  const dismiss = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    localStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  };

  return (
    <div
      role="link"
      tabIndex={0}
      aria-label="Посмотрите, как будет выглядеть Ваш продукт"
      className={cn(
        'relative z-[140] w-full cursor-pointer',
        'bg-[#b8d3ff] text-primary-foreground',
        'transition-opacity duration-200 hover:opacity-95',
      )}
      onClick={() => navigate(PREVIEW_PATH)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          navigate(PREVIEW_PATH);
        }
      }}
    >
      <div className="flex w-full items-center gap-3 px-4 py-2.5 pr-12 sm:justify-center sm:gap-4 sm:px-6 sm:py-2 md:pr-14">
        <p className="m-0 min-w-0 flex-1 text-[0.8125rem] font-medium leading-snug sm:flex-none sm:text-center sm:text-sm md:text-[0.9375rem]">
          Посмотрите, как будет выглядеть Ваш продукт
        </p>
        <span
          className={cn(
            'inline-flex shrink-0 items-center justify-center rounded-full',
            'bg-primary-foreground px-3.5 py-1.5 text-xs font-semibold leading-none text-primary',
            'sm:text-sm',
          )}
        >
          Посмотреть
        </span>
      </div>

      <button
        type="button"
        onClick={dismiss}
        className={cn(
          'absolute right-2 top-1/2 -translate-y-1/2',
          'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl',
          'border-none bg-transparent text-primary-foreground/80 cursor-pointer',
          'transition-[background-color,color] duration-200',
          'hover:bg-primary-foreground/15 hover:text-primary-foreground',
        )}
        aria-label="Закрыть баннер"
      >
        <X className="h-4 w-4" strokeWidth={2.25} />
      </button>
    </div>
  );
};

export default TopPromoBanner;
