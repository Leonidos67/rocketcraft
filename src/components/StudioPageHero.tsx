import { motion } from 'framer-motion';
import { heroStripImages } from '@/data/heroStripImages';
import { pageReveal } from '@/lib/pageMotion';

interface StudioPageHeroProps {
  title: string;
  heroId: string;
  reducedMotion?: boolean;
  images?: string[];
}

const StudioPageHero = ({
  title,
  heroId,
  reducedMotion = false,
  images = heroStripImages,
}: StudioPageHeroProps) => {
  return (
    <div className="services-viewport-fold page-hero-fold" id={heroId}>
      <motion.section
        className="services-hero"
        initial="hidden"
        animate="visible"
        variants={pageReveal(0, reducedMotion)}
      >
        <div className="site-container services-hero__copy text-left">
          <h1 className="services-hero__title max-w-6xl">{title}</h1>
        </div>

        <div className="services-hero-strip" aria-hidden="true">
          {images.map((src, index) => (
            <div key={src} className="services-hero-strip__item">
              <img
                src={src}
                alt=""
                className="services-hero-strip__image"
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default StudioPageHero;
