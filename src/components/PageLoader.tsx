import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { waitForPageContent } from '@/lib/waitForPageContent';
import { cn } from '@/lib/utils';

export interface PageLoaderProps {
  /**
   * Ждать полной загрузки контента страницы (изображения, видео, шрифты,
   * фоновые картинки и зарегистрированные компонентами ресурсы)
   * перед скрытием оверлея.
   */
  waitForContent?: boolean;
  /** Корневой узел для поиска медиа. По умолчанию — `#root`. */
  contentRoot?: ParentNode | null;
  /** Минимальное время показа, мс. */
  minDuration?: number;
  /** Максимальное ожидание, мс. */
  maxDuration?: number;
}

const PageLoader = ({
  waitForContent = true,
  contentRoot = null,
  minDuration = 350,
  maxDuration = 20000,
}: PageLoaderProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const location = useLocation();
  const runIdRef = useRef(0);

  useEffect(() => {
    const runId = ++runIdRef.current;
    setIsVisible(true);
    setIsFading(false);
    document.documentElement.classList.add('page-loading');

    const hide = () => {
      if (runId !== runIdRef.current) return;
      setIsFading(true);
      window.setTimeout(() => {
        if (runId !== runIdRef.current) return;
        setIsVisible(false);
        document.documentElement.classList.remove('page-loading');
      }, 320);
    };

    const start = async () => {
      if (waitForContent) {
        await waitForPageContent({
          root: contentRoot,
          minDuration,
          maxDuration,
        });
      } else {
        await new Promise<void>((resolve) => {
          window.setTimeout(resolve, minDuration);
        });
      }

      hide();
    };

    void start();

    return () => {
      document.documentElement.classList.remove('page-loading');
    };
  }, [location.pathname, waitForContent, contentRoot, minDuration, maxDuration]);

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        @keyframes page-loader-primary {
          0% { left: -35%; right: 100%; }
          60% { left: 100%; right: -90%; }
          100% { left: 100%; right: -90%; }
        }
        @keyframes page-loader-secondary {
          0% { left: -200%; right: 100%; }
          60% { left: 107%; right: -8%; }
          100% { left: 107%; right: -8%; }
        }
      `}</style>
      <div
        className={cn(
          'fixed inset-0 z-[200] flex items-center justify-center bg-white',
          'transition-opacity duration-300 ease-out',
          isFading ? 'pointer-events-none opacity-0' : 'opacity-100'
        )}
        role="status"
        aria-live="polite"
        aria-busy={!isFading}
        aria-label="Загрузка страницы"
      >
        <div className="w-[min(18rem,72vw)] px-6">
          <div
            className="relative h-1 w-full overflow-hidden rounded-full bg-foreground/10"
            role="progressbar"
          >
            <span
              className="absolute bottom-0 left-0 top-0 w-auto rounded-full bg-foreground will-change-[left,right]"
              style={{
                animation:
                  'page-loader-primary 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite',
              }}
            />
            <span
              className="absolute bottom-0 left-0 top-0 w-auto rounded-full bg-foreground will-change-[left,right]"
              style={{
                animation:
                  'page-loader-secondary 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite',
                animationDelay: '1.15s',
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PageLoader;
