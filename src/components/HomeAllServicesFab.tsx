import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const fabShellClass = cn(
  '[--home-fab-size:clamp(5.5rem,11vw,8.5rem)]',
  'max-md:[--home-fab-size:clamp(2.75rem,10vw,3.25rem)]',
  'flex justify-center relative z-30 pointer-events-none',
  '-mt-[calc(var(--home-fab-size)*1.2)] pb-[clamp(1.25rem,3vw,2.5rem)]',
  'max-md:-mt-[calc(var(--home-fab-size)*0.9)] max-md:pb-3',
);

const fabLinkClass = cn(
  '[--home-fab-size:clamp(5.5rem,11vw,8.5rem)]',
  'max-md:[--home-fab-size:clamp(2.75rem,10vw,3.25rem)]',
  'flex items-center justify-center h-[var(--home-fab-size)] rounded-full',
  'bg-primary text-primary-foreground no-underline text-center',
  'px-20 max-md:px-5',
  'shadow-[0_16px_48px_hsl(0_0%_0%/0.18)] max-md:shadow-[0_8px_24px_hsl(0_0%_0%/0.14)]',
  'pointer-events-auto transition-[opacity,transform] duration-[250ms] ease-[ease]',
  'hover:opacity-[0.92] hover:scale-[1.04]',
);

const fabTextClass = cn(
  'text-[clamp(0.875rem,1.6vw,1.35rem)] font-semibold leading-[1.12] tracking-[-0.02em]',
  'max-md:text-[0.8125rem] max-md:leading-none',
);

const HomeAllServicesFab = () => (
  <div className={fabShellClass}>
    <Link to="/services" className={fabLinkClass}>
      <span className={fabTextClass}>Все работы</span>
    </Link>
  </div>
);

export default HomeAllServicesFab;
