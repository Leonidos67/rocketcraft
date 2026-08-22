import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { CasePortfolioItem } from '@/data/caseCards';

const accentMediaBg: Record<CasePortfolioItem['accent'], string> = {
  blue: 'bg-[#bad6ff]',
  pink: 'bg-[#ffb1eb]',
  orange: 'bg-[#ff643c]',
  purple: 'bg-[#cdb7f1]',
  yellow: 'bg-[#f9e283]',
};

interface CasePortfolioCardProps {
  item: CasePortfolioItem;
}

const CasePortfolioCard = ({ item }: CasePortfolioCardProps) => (
  <article
    className={cn(
      'group rounded-[1.25rem] overflow-hidden bg-card',
      'transition-[transform,box-shadow] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
      'motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_24px_48px_hsl(0_0%_0%/0.12)]',
    )}
  >
    <Link to={`/cases/${item.id}`} className="block text-inherit no-underline">
      <div
        className={cn(
          'aspect-[4/5] overflow-hidden bg-muted',
          accentMediaBg[item.accent],
        )}
      >
        <img
          src={item.imageUrl}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.04]"
        />
      </div>

      <div className="p-[clamp(1.25rem,2.5vw,1.75rem)]">
        <h2 className="text-[clamp(1.375rem,2vw,2rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-foreground mb-1.5">
          {item.title}
        </h2>
        <p className="text-sm text-muted-foreground mb-4">{item.industry}</p>
        <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
          {item.serviceTags.map((tag) => (
            <li
              key={tag}
              className="inline-flex items-center px-3 py-1.5 rounded-full text-[0.8125rem] font-medium bg-muted text-foreground/85"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  </article>
);

export default CasePortfolioCard;
