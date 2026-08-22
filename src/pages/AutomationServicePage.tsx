import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageLoader from '@/components/PageLoader';
import PageSectionNav from '@/components/PageSectionNav';
import LeadRequestPopover from '@/components/LeadRequestPopover';
import { AutomationHero } from '@/components/automation/AutomationHero';
import { AutomationOrbitSection } from '@/components/automation/AutomationOrbitSection';
import { BlurFade } from '@/components/ui/blur-fade';
import { BorderBeam } from '@/components/ui/border-beam';
import { Button } from '@/components/ui/button';
import { MagicCard } from '@/components/ui/magic-card';
import {
  automationPageMeta,
  automationPageSections,
  automationSteps,
} from '@/data/automationPage';
import {
  pageSectionClass,
  siteCanvasServicesClass,
  siteContainerClass,
  siteSectionClass,
} from '@/lib/layoutStyles';
import { cn } from '@/lib/utils';

const AutomationServicePage = () => {
  const reducedMotion = useReducedMotion();
  const [leadOpen, setLeadOpen] = useState(false);
  const leadAnchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = automationPageMeta.documentTitle;
  }, []);

  const openLead = () => setLeadOpen(true);

  return (
    <div className={cn(siteCanvasServicesClass, 'min-h-screen')}>
      <div className={siteSectionClass}>
        <Header />
        <PageLoader />

        <AutomationHero onCta={openLead} ctaAnchorRef={leadAnchorRef} />
        <AutomationOrbitSection />

        <main className="m-0 p-0">
          <section
            id="automation-process"
            className={cn(
              siteContainerClass,
              pageSectionClass,
              'mb-[clamp(3rem,6vw,5rem)] pt-[clamp(2rem,4vw,3rem)]',
            )}
          >
            <BlurFade delay={0.05} inView>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                / Процесс
              </p>
              <h2 className="mb-6 text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-[-0.03em]">
                Четыре шага
              </h2>
            </BlurFade>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {automationSteps.map((step, index) => (
                <BlurFade key={step.number} delay={0.08 + index * 0.05} inView>
                  <MagicCard
                    className="h-full rounded-[1.25rem]"
                    gradientSize={240}
                    gradientColor="rgba(0,0,0,0.04)"
                    gradientFrom="#111111"
                    gradientTo="#A3C5FF"
                  >
                    <div className="relative z-40 p-5 sm:p-6">
                      <p className="m-0 text-xs font-semibold tracking-[0.08em] text-muted-foreground">
                        {step.number}
                      </p>
                      <h3 className="m-0 mt-3 text-lg font-semibold tracking-tight">
                        {step.title}
                      </h3>
                      <p className="m-0 mt-1 text-sm text-muted-foreground">{step.text}</p>
                    </div>
                  </MagicCard>
                </BlurFade>
              ))}
            </div>
          </section>

          <section
            id="automation-cta"
            className={cn(siteContainerClass, pageSectionClass, 'pb-20 md:pb-28')}
          >
            <BlurFade delay={0.08} inView>
              <div className="relative overflow-hidden rounded-[1.25rem] bg-primary px-[clamp(1.5rem,4vw,3rem)] py-[clamp(2.5rem,5vw,4rem)] text-primary-foreground">
                <div className="relative z-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="m-0 text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-[-0.03em]">
                      Запросить аудит процессов
                    </h2>
                    <p className="m-0 mt-2 max-w-md text-sm text-primary-foreground/70">
                      {automationPageMeta.heroText}
                    </p>
                  </div>
                  <Button
                    size="lg"
                    onClick={openLead}
                    className="h-12 rounded-2xl bg-primary-foreground px-6 text-sm font-semibold text-primary hover:bg-primary-foreground/90"
                  >
                    {automationPageMeta.ctaPrimary}
                  </Button>
                </div>
                {!reducedMotion && (
                  <>
                    <BorderBeam size={160} duration={9} colorFrom="#fff" colorTo="#A3C5FF" />
                    <BorderBeam
                      size={160}
                      duration={9}
                      delay={4.5}
                      reverse
                      colorFrom="#A3C5FF"
                      colorTo="#fff"
                    />
                  </>
                )}
              </div>
            </BlurFade>
          </section>
        </main>
      </div>

      <Footer />
      <PageSectionNav sections={automationPageSections} reducedMotion={!!reducedMotion} />

      <LeadRequestPopover
        open={leadOpen}
        onOpenChange={setLeadOpen}
        anchorRef={leadAnchorRef}
        mode="dialog"
      />
    </div>
  );
};

export default AutomationServicePage;
