import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export const SAMOPIS_TOOLTIP =
  'Самопис — разработка с нуля под ваши задачи, без конструкторов вроде Tilda. Больше гибкости, уникальный дизайн и логика.';

export const SamopisInfoButton = ({
  className,
  iconClassName,
}: {
  className?: string;
  iconClassName?: string;
}) => (
  <Tooltip delayDuration={150}>
    <TooltipTrigger asChild>
      <button
        type="button"
        aria-label="Что значит самопис"
        className={cn(
          'inline-flex h-4 w-4 shrink-0 cursor-help items-center justify-center',
          'border-none bg-transparent p-0 text-black/40 transition-colors hover:text-black/60',
          className,
        )}
        onClick={(event) => event.stopPropagation()}
        onPointerDown={(event) => event.stopPropagation()}
        onKeyDown={(event) => event.stopPropagation()}
      >
        <Info className={cn('h-3.5 w-3.5', iconClassName)} strokeWidth={2} />
      </button>
    </TooltipTrigger>
    <TooltipContent
      side="top"
      className={cn(
        'max-w-[16rem] rounded-xl border border-black/10 bg-[#f3f3f3] px-3.5 py-2.5',
        'text-left text-xs leading-snug text-black/70 shadow-[0_8px_24px_rgba(0,0,0,0.08)]',
      )}
    >
      {SAMOPIS_TOOLTIP}
    </TooltipContent>
  </Tooltip>
);

/** Вставляет серую ℹ сразу справа от слова «самопис» / «Самопис». */
export const TextWithSamopisInfo = ({
  text,
  className,
  as: Tag = 'p',
}: {
  text: string;
  className?: string;
  as?: 'p' | 'span';
}) => {
  const parts = text.split(/(самопис)/i);

  if (parts.length === 1) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={cn('inline-flex max-w-full flex-wrap items-center gap-x-1', className)}>
      {parts.map((part, index) =>
        /^самопис$/i.test(part) ? (
          <span key={index} className="inline-flex items-center gap-1">
            {part}
            <SamopisInfoButton />
          </span>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </Tag>
  );
};
