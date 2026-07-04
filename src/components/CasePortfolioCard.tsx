import { Link } from 'react-router-dom';
import type { CasePortfolioItem } from '@/data/caseCards';

interface CasePortfolioCardProps {
  item: CasePortfolioItem;
}

const CasePortfolioCard = ({ item }: CasePortfolioCardProps) => (
  <article className={`case-portfolio-card case-portfolio-card--${item.accent}`}>
    <Link to={`/cases/${item.id}`} className="case-portfolio-card__link">
      <div className="case-portfolio-card__media">
        <img src={item.imageUrl} alt={item.title} loading="lazy" />
      </div>

      <div className="case-portfolio-card__body">
        <h2 className="case-portfolio-card__title">{item.title}</h2>
        <p className="case-portfolio-card__industry">{item.industry}</p>
        <ul className="case-portfolio-card__tags">
          {item.serviceTags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </Link>
  </article>
);

export default CasePortfolioCard;
