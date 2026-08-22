import { motion } from 'framer-motion';
import ImageTrail from '@/components/ui/ImageTrail';
import PixelBlast from '@/components/ui/PixelBlast';
import { heroStripImages } from '@/data/heroStripImages';
import { siteContainerClass } from '@/lib/layoutStyles';
import { pageReveal } from '@/lib/pageMotion';
import { cn } from '@/lib/utils';

export interface StudioPageHeroTile {
  image: string;
  label: string;
}

interface StudioPageHeroProps {
  title: string;
  heroId: string;
  reducedMotion?: boolean;
  images?: string[];
  tiles?: StudioPageHeroTile[];
}

const heroTitleClass = cn(
  "font-['Oi',serif] font-normal italic uppercase tracking-[0.01em]",
  'm-0 mb-[clamp(1.25rem,3vw,2.5rem)] text-[clamp(1.75rem,3.333vw,4rem)] leading-[1.1] text-foreground'
);

const StudioPageHero = ({
  title,
  heroId,
  reducedMotion = false,
  images = heroStripImages,
  tiles,
}: StudioPageHeroProps) => {
  const trailImages = tiles?.map((tile) => tile.image) ?? [];

  return (
    <div
      className="shrink-0 h-[var(--services-viewport-fold-height)] overflow-hidden scroll-mt-0"
      id={heroId}
    >
      <motion.section
        className="relative m-0 h-full w-full overflow-hidden p-0"
        initial="hidden"
        animate="visible"
        variants={pageReveal(0, reducedMotion)}
      >
        <div
          className={cn(
            siteContainerClass,
            'pointer-events-none absolute inset-x-0 top-0 z-[2] flex min-h-0 flex-col justify-end pb-0 text-left',
            tiles && tiles.length > 0 ? 'h-full' : 'h-1/2'
          )}
        >
          <h1 className={cn(heroTitleClass, 'max-w-6xl')}>{title}</h1>
        </div>

        {tiles && tiles.length > 0 ? (
          <>
            <div className="absolute inset-0 z-0">
              <PixelBlast
                variant="square"
                color="#a3c5ff"
                liquid
                enableRipples
                disabled={reducedMotion}
              />
            </div>
            <div className="absolute inset-0 z-[1]">
              <ImageTrail items={trailImages} variant={1} disabled={reducedMotion} />
            </div>
          </>
        ) : (
          <div
            className="absolute inset-x-0 bottom-0 z-0 grid h-1/2 grid-cols-4 gap-0 overflow-hidden leading-none"
            aria-hidden="true"
          >
            {images.map((src, index) => (
              <div key={src} className="relative m-0 h-full min-h-0 overflow-hidden p-0">
                <img
                  src={src}
                  alt=""
                  className="absolute inset-0 block h-full w-full object-cover object-center"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </div>
            ))}
          </div>
        )}
      </motion.section>
    </div>
  );
};

export default StudioPageHero;
