import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CasePortfolioItem } from '@/data/caseCards';

const accentSurface: Record<CasePortfolioItem['accent'], string> = {
  blue: 'bg-[#e8eef8]',
  pink: 'bg-[#f6eaf3]',
  orange: 'bg-[#f3ebe6]',
  purple: 'bg-[#eeeaf6]',
  yellow: 'bg-[#f4f0e4]',
};

interface CasePortfolioCardProps {
  item: CasePortfolioItem;
}

const CasePortfolioCard = ({ item }: CasePortfolioCardProps) => {
  const href = `/cases/${item.id}`;

  return (
    <article>
      <Link
        to={href}
        className={cn(
          'group block text-inherit no-underline outline-none',
          'transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
          'focus-visible:rounded-[2rem] focus-visible:ring-2 focus-visible:ring-black/15 focus-visible:ring-offset-4',
        )}
      >
        <div
          className={cn(
            'relative overflow-hidden rounded-[1.75rem] sm:rounded-[2rem]',
            accentSurface[item.accent],
          )}
        >
          <div className="aspect-[16/10] overflow-hidden sm:aspect-[16/11]">
            <img
              src={item.imageUrl}
              alt=""
              loading="lazy"
              className={cn(
                'h-full w-full object-cover object-top',
                'transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                'motion-safe:group-hover:scale-[1.03]',
              )}
            />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </div>

        <div className="flex flex-col items-center px-2 pt-7 text-center sm:pt-8">
          <p className="m-0 text-[0.8125rem] font-medium tracking-[0.04em] text-black/40">
            {item.industry}
          </p>
          <h2
            className={cn(
              'm-0 mt-2 max-w-[18ch] text-[clamp(1.5rem,2.4vw,2.125rem)] font-semibold',
              'leading-[1.12] tracking-[-0.03em] text-foreground',
            )}
          >
            {item.title}
          </h2>
          <p className="m-0 mt-3 max-w-[32ch] text-[0.9375rem] leading-relaxed text-black/45">
            {item.serviceTags.join(' · ')}
          </p>
          <span
            className={cn(
              'mt-5 inline-flex items-center gap-1 text-[0.9375rem] font-medium text-[#0066cc]',
              'transition-colors duration-300 group-hover:text-[#004499]',
            )}
          >
            Смотреть
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2.25}
            />
          </span>
        </div>
      </Link>
    </article>
  );
};

export default CasePortfolioCard;
