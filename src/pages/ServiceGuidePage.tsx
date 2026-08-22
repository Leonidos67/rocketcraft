import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageLoader from '@/components/PageLoader';
import PageSectionNav from '@/components/PageSectionNav';
import PrimaryButton from '@/components/PrimaryButton';
import MarketingChannelsGate from '@/components/MarketingChannelsGate';
import StudioPageHero from '@/components/StudioPageHero';
import { getServiceGuide, type ServiceGuideSlug } from '@/data/serviceGuides';
import { pageReveal } from '@/lib/pageMotion';
import {
  btnLinkArrowClass,
  pageSectionClass,
  siteCanvasServicesClass,
  siteContainerClass,
  siteSectionClass,
} from '@/lib/layoutStyles';
import {
  oiHeadingClass,
  pageCtaClass,
  pageCtaTextClass,
  pageCtaTitleClass,
  processCardClass,
  processCardTextClass,
  processCardTitleClass,
  processIntroClass,
  processSectionClass,
  processStepClass,
  productSectionClass,
  sectionLabelClass,
  sectionLabelSlashClass,
  sectionTitleClass,
} from '@/lib/studioPageStyles';
import { cn } from '@/lib/utils';

const reveal = pageReveal;

interface ServiceGuidePageProps {
  guideSlug: ServiceGuideSlug;
}

const ServiceGuidePage = ({ guideSlug }: ServiceGuidePageProps) => {
  const guide = getServiceGuide(guideSlug);
  const reducedMotion = useReducedMotion();
  const [channelsRevealed, setChannelsRevealed] = useState(false);

  useEffect(() => {
    if (guide) {
      document.title = guide.documentTitle;
    }
  }, [guide]);

  if (!guide) {
    return null;
  }

  const { slug } = guide;
  const hasChannelsGate = Boolean(guide.channelsGate && guide.flowingMenuItems?.length);
  const pageUnlocked = !hasChannelsGate || channelsRevealed;

  return (
    <div className={cn(siteCanvasServicesClass, 'min-h-screen')}>
      <div className={siteSectionClass}>
        <Header />
        <PageLoader />

        <StudioPageHero
          heroId={`${slug}-hero`}
          title={guide.heroTitle}
          reducedMotion={!!reducedMotion}
          tiles={guide.heroTiles}
        />

        {hasChannelsGate && guide.flowingMenuItems && guide.channelsGate && (
          <MarketingChannelsGate
            items={guide.flowingMenuItems}
            sectionId={`${slug}-channels`}
            title={guide.channelsGate.title}
            buttonLabel={guide.channelsGate.buttonLabel}
            revealed={channelsRevealed}
            onReveal={() => setChannelsRevealed(true)}
            reducedMotion={!!reducedMotion}
            reserveBottomNav={channelsRevealed}
          />
        )}

        {pageUnlocked && (
        <main className="m-0 p-0">
          <section
            className={cn(siteContainerClass, pageSectionClass, processSectionClass)}
            id={`${slug}-approach`}
          >
            <motion.div
              className="mb-[clamp(2rem,4vw,3rem)] flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={reveal(0, !!reducedMotion)}
            >
              <div>
                <p className={cn(sectionLabelClass, 'mt-[clamp(2rem,4vw,3rem)]')}>
                  <span className={sectionLabelSlashClass}>/</span>
                  <span>Подход</span>
                </p>
                <h2 className={sectionTitleClass}>{guide.approachTitle}</h2>
                <p className={processIntroClass}>{guide.approachIntro}</p>
              </div>
              <Link to="/process" className={cn(btnLinkArrowClass, 'shrink-0 text-foreground')}>
                Полный процесс
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 gap-[clamp(1rem,2vw,1.25rem)] md:grid-cols-3">
              {guide.approachItems.map((item, index) => (
                <motion.article
                  key={item.title}
                  className={processCardClass}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={reveal(index * 0.06, !!reducedMotion)}
                >
                  <h3 className={processCardTitleClass}>{item.title}</h3>
                  <p className={processCardTextClass}>{item.text}</p>
                </motion.article>
              ))}
            </div>
          </section>

          <section
            className={cn(siteContainerClass, pageSectionClass, productSectionClass)}
            id={`${slug}-offers`}
          >
            <motion.div
              className="mb-2.5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={reveal(0, !!reducedMotion)}
            >
              <p className={sectionLabelClass}>
                <span className={sectionLabelSlashClass}>/</span>
                <span>{guide.offersTitle}</span>
              </p>
            </motion.div>

            <div className="flex flex-col gap-[clamp(2.5rem,5vw,4rem)]">
              {guide.offers.map((offer, index) => (
                <motion.article
                  key={offer.number}
                  className="grid gap-6 border-t border-border pt-[clamp(1.5rem,3vw,2.5rem)] md:grid-cols-[minmax(0,8rem)_1fr]"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={reveal(index * 0.06, !!reducedMotion)}
                >
                  <span className={processStepClass}>( {offer.number} )</span>
                  <div>
                    <h3 className={cn(oiHeadingClass, 'mb-3 text-lg font-bold leading-[1.2]')}>
                      {offer.title}
                    </h3>
                    <p className={processCardTextClass}>{offer.text}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          <section
            className={cn(siteContainerClass, pageSectionClass, 'pb-20 md:pb-28')}
            id={`${slug}-cta`}
          >
            <motion.div
              className={pageCtaClass}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={reveal(0, !!reducedMotion)}
            >
              <h2 className={pageCtaTitleClass}>{guide.ctaTitle}</h2>
              <p className={pageCtaTextClass}>{guide.ctaText}</p>
              <PrimaryButton to="/contacts">Обсудить проект</PrimaryButton>
            </motion.div>
          </section>
        </main>
        )}
      </div>

      {pageUnlocked && <Footer />}
      {pageUnlocked && (
        <PageSectionNav sections={guide.pageSections} reducedMotion={!!reducedMotion} />
      )}
    </div>
  );
};

export default ServiceGuidePage;
