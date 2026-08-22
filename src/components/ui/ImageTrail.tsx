import { useEffect, useRef } from 'react';
import { createImageTrail, type ImageTrailVariant } from '@/lib/imageTrailEngine';
import { cn } from '@/lib/utils';

interface ImageTrailProps {
  items?: string[];
  variant?: ImageTrailVariant;
  className?: string;
  disabled?: boolean;
}

const ImageTrail = ({
  items = [],
  variant = 1,
  className,
  disabled = false,
}: ImageTrailProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || disabled || items.length === 0) return;

    const instance = createImageTrail(containerRef.current, variant);
    return () => instance.destroy();
  }, [variant, items, disabled]);

  if (disabled || items.length === 0) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative h-full w-full overflow-hidden bg-transparent',
        className
      )}
      aria-hidden="true"
    >
      {items.map((url, i) => (
        <div
          key={`${url}-${i}`}
          className="content__img absolute left-0 top-0 aspect-[1.1] w-[190px] overflow-hidden rounded-[15px] opacity-0 [will-change:transform,filter]"
        >
          <div
            className="content__img-inner absolute left-[-10px] top-[-10px] h-[calc(100%+20px)] w-[calc(100%+20px)] bg-cover bg-center"
            style={{ backgroundImage: `url(${url})` }}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageTrail;
