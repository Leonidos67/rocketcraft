import { useNavigate } from 'react-router-dom';
import { SaasPreviewCard } from '@/components/SaasPreviewCard';
import { getSaasPreviewItem } from '@/data/saasPreviewCatalog';
import { cn } from '@/lib/utils';
import {
  extractPreviewOpenIds,
  parsePreviewAiMessage,
  stripInlineBoldMarkers,
  stripPreviewOpenMarkers,
} from '@/lib/previewAi';

const sectionTone = (title: string): string => {
  const key = title.toLowerCase();
  if (key.includes('понял') || key.includes('задач')) return 'bg-[#eceff3] text-black/65';
  if (key.includes('рекоменд')) return 'bg-[#eaf6ee] text-[#1f6b3a]';
  if (key.includes('цена') || key.includes('срок')) return 'bg-[#fff4eb] text-[#9a4b12]';
  if (key.includes('открыть') || key.includes('как открыть')) return 'bg-[#f4f4f5] text-black/60';
  if (key.includes('альтернатив')) return 'bg-[#eef3f8] text-[#35506b]';
  if (key.includes('уточн')) return 'bg-[#f7f3e8] text-[#7a6230]';
  if (key.includes('заявк') || key.includes('дальше')) return 'bg-[#eaf6ee] text-[#1f6b3a]';
  return 'bg-black/[0.05] text-black/55';
};

const renderBody = (body: string) => {
  const lines = body
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const listItems = lines.filter((line) => /^\d+\.\s+/.test(line) || /^[-•]\s+/.test(line));
  const isMostlyList = listItems.length >= 2 && listItems.length >= lines.length - 1;

  if (isMostlyList) {
    return (
      <ol className="m-0 flex list-none flex-col gap-2 p-0">
        {lines.map((line, index) => {
          const content = stripInlineBoldMarkers(
            line.replace(/^\d+\.\s+/, '').replace(/^[-•]\s+/, ''),
          );
          return (
            <li key={`${index}-${content.slice(0, 24)}`} className="flex gap-2.5">
              <span
                className={cn(
                  'mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                  'bg-black/[0.06] text-[0.6875rem] font-semibold text-black/55',
                )}
              >
                {index + 1}
              </span>
              <span className="min-w-0 flex-1 text-[0.9375rem] leading-relaxed text-black/75">
                {content}
              </span>
            </li>
          );
        })}
      </ol>
    );
  }

  return (
    <p className="m-0 whitespace-pre-wrap text-[0.9375rem] leading-relaxed text-black/75 sm:text-[0.975rem]">
      {stripInlineBoldMarkers(body)}
    </p>
  );
};

const ProductCardEmbed = ({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) => {
  const navigate = useNavigate();
  const item = getSaasPreviewItem(productId);
  if (!item) return null;

  return (
    <div className="mt-2.5 w-full max-w-[17.5rem]">
      <p className="m-0 mb-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.04em] text-black/35">
        Демо в каталоге
      </p>
      <SaasPreviewCard
        item={item}
        productName={productName}
        compact
        onOpen={() => navigate(`/product-preview/${item.id}`)}
      />
    </div>
  );
};

const PreviewAiMessageContent = ({
  text,
  rawText,
  productName,
  showProductCards = true,
  mobileOnlyProductCards = false,
  followUp = false,
}: {
  text: string;
  /** Сырой ответ со маркерами [OPEN:…] */
  rawText?: string;
  productName: string;
  /** Карточки в сообщении (на /ai обычно false — демо слева). */
  showProductCards?: boolean;
  /** На узких экранах без левой панели — показать карточку только здесь. */
  mobileOnlyProductCards?: boolean;
  /** Follow-up: скрыть повтор «понял / рекомендация / альтернатива». */
  followUp?: boolean;
}) => {
  const source = rawText ?? text;
  const openIds = extractPreviewOpenIds(source);
  const { preface, sections } = parsePreviewAiMessage(source);
  const displayPreface = stripPreviewOpenMarkers(preface);
  const canEmbed = showProductCards || mobileOnlyProductCards;
  const embedClassName = cn(!showProductCards && mobileOnlyProductCards && 'lg:hidden');

  const embed = (productId: string) =>
    canEmbed ? (
      <div className={embedClassName}>
        <ProductCardEmbed productId={productId} productName={productName} />
      </div>
    ) : null;

  if (sections.length === 0) {
    return (
      <div>
        <p className="m-0 whitespace-pre-wrap text-[0.975rem] leading-[1.65] tracking-[-0.01em] text-black/85 sm:text-[1rem]">
          {stripInlineBoldMarkers(stripPreviewOpenMarkers(preface || text))}
        </p>
        {openIds.length ? (
          <div className="mt-2 flex flex-col gap-2">
            {openIds.map((id) => (
              <div key={id}>{embed(id)}</div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  let recommendationCardIds = openIds.slice(0, Math.max(openIds.length, 1));
  let alternativeCardId = '';

  return (
    <div className="flex flex-col gap-2.5">
      {displayPreface && !followUp ? (
        <p className="m-0 text-[0.9375rem] leading-relaxed text-black/70">
          {stripInlineBoldMarkers(displayPreface)}
        </p>
      ) : null}

      {sections.map((section) => {
        const titleKey = section.title.toLowerCase();
        const isUnderstood = titleKey.includes('понял') || titleKey.includes('задач');
        const isRecommendation = titleKey.includes('рекоменд');
        const isAlternative = titleKey.includes('альтернатив');
        const isHowToOpen = titleKey.includes('открыть');
        const isClarification = titleKey.includes('уточн');
        const sectionIds = extractPreviewOpenIds(section.body);

        if (isRecommendation && sectionIds.length) {
          recommendationCardIds = sectionIds;
        }
        if (isAlternative && sectionIds[0]) {
          alternativeCardId = sectionIds[0];
        }

        if (isHowToOpen) return null;

        if (followUp && (isUnderstood || isRecommendation || isAlternative)) {
          return null;
        }

        return (
          <section
            key={section.title}
            className={cn(
              'rounded-[1.15rem] border border-black/[0.04] bg-white/70 px-3.5 py-3',
              'shadow-[0_1px_2px_rgba(0,0,0,0.03)] sm:rounded-[1.25rem] sm:px-4 sm:py-3.5',
              isClarification && 'rounded-[0.9rem] px-2.5 py-2 sm:rounded-[1rem] sm:px-3 sm:py-2',
            )}
          >
            <div className={cn('mb-2 flex items-center gap-2', isClarification && 'mb-1')}>
              <span
                className={cn(
                  'inline-flex rounded-full px-2 py-0.5 text-[0.6875rem] font-semibold tracking-[-0.01em]',
                  sectionTone(section.title),
                  isClarification && 'px-1.5 py-0 text-[0.625rem]',
                )}
              >
                {section.title}
              </span>
            </div>
            <div
              className={cn(
                isClarification &&
                  '[&_p]:text-[0.8125rem] [&_p]:leading-snug [&_span]:text-[0.8125rem]',
              )}
            >
              {renderBody(stripPreviewOpenMarkers(section.body))}
            </div>
            {isRecommendation && recommendationCardIds.length ? (
              <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                {recommendationCardIds.map((id) => (
                  <div key={id}>{embed(id)}</div>
                ))}
              </div>
            ) : null}
            {isAlternative && alternativeCardId ? embed(alternativeCardId) : null}
          </section>
        );
      })}
    </div>
  );
};

export default PreviewAiMessageContent;
