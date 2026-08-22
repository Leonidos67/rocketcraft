import {
  Bot,
  Database,
  MessageSquare,
  Sheet,
  Workflow,
} from 'lucide-react';
import { BlurFade } from '@/components/ui/blur-fade';
import { OrbitingCircles } from '@/components/ui/orbiting-circles';
import { TextAnimate } from '@/components/ui/text-animate';
import { cn } from '@/lib/utils';

function OrbitIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex size-full items-center justify-center rounded-full border border-black/10 bg-white text-foreground shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
      {children}
    </div>
  );
}

export function AutomationOrbitSection() {
  return (
    <section
      id="automation-orbit"
      className="scroll-mt-24 border-t border-border/40 px-6 py-14 md:px-10 md:py-20 lg:px-16 xl:px-20"
    >
      <div className="mx-auto flex max-w-site flex-col items-center text-center">
        <BlurFade inView>
          <TextAnimate
            animation="blurInUp"
            by="word"
            once
            as="p"
            className="mb-2 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground"
          >
            Стек в движении
          </TextAnimate>
          <TextAnimate
            animation="blurInUp"
            by="word"
            once
            delay={0.08}
            as="h2"
            className="m-0 max-w-[18ch] text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-[-0.03em]"
          >
            Сервисы крутятся вокруг вашего процесса
          </TextAnimate>
        </BlurFade>

        <BlurFade delay={0.12} inView className="mt-10 w-full">
          <div
            className={cn(
              'relative mx-auto flex h-[360px] w-full max-w-[480px] items-center justify-center sm:h-[440px]',
            )}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground text-background shadow-[0_12px_40px_rgba(0,0,0,0.16)] sm:h-[4.5rem] sm:w-[4.5rem]">
                <Workflow className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.75} />
              </div>
            </div>

            <OrbitingCircles iconSize={46} radius={140} speed={1}>
              <OrbitIcon>
                <MessageSquare className="h-5 w-5" strokeWidth={1.75} />
              </OrbitIcon>
              <OrbitIcon>
                <Database className="h-5 w-5" strokeWidth={1.75} />
              </OrbitIcon>
              <OrbitIcon>
                <Sheet className="h-5 w-5" strokeWidth={1.75} />
              </OrbitIcon>
              <OrbitIcon>
                <Bot className="h-5 w-5" strokeWidth={1.75} />
              </OrbitIcon>
            </OrbitingCircles>

            <OrbitingCircles iconSize={34} radius={82} reverse speed={1.35}>
              <OrbitIcon>
                <Bot className="h-4 w-4" strokeWidth={1.75} />
              </OrbitIcon>
              <OrbitIcon>
                <Sheet className="h-4 w-4" strokeWidth={1.75} />
              </OrbitIcon>
              <OrbitIcon>
                <Database className="h-4 w-4" strokeWidth={1.75} />
              </OrbitIcon>
            </OrbitingCircles>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
