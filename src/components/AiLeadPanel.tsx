import { Check, Send, X } from 'lucide-react';
import { getSaasPreviewItem } from '@/data/saasPreviewCatalog';
import type { AiLeadDraft } from '@/lib/previewAi';
import { aiLeadProgress } from '@/lib/previewAi';
import { cn } from '@/lib/utils';

const ACCENT = '#c8f000';

const fields: { key: keyof AiLeadDraft; label: string; placeholder: string }[] = [
  { key: 'channel', label: 'Канал', placeholder: 'Instagram, Telegram…' },
  { key: 'productTitle', label: 'Решение', placeholder: 'Подберёт AI · можно пакет' },
  { key: 'name', label: 'Имя', placeholder: 'Как к вам обращаться' },
  { key: 'phone', label: 'Телефон', placeholder: '+7…' },
];

const AiLeadPanel = ({
  draft,
  brand,
  submitting,
  submitted,
  onChange,
  onSubmit,
  onClose,
  className,
}: {
  draft: AiLeadDraft;
  brand: string;
  submitting?: boolean;
  submitted?: boolean;
  onChange: (patch: Partial<AiLeadDraft>) => void;
  onSubmit: () => void;
  onClose?: () => void;
  className?: string;
}) => {
  const { filled, total } = aiLeadProgress(draft);
  const canSubmit =
    draft.ready &&
    Boolean(draft.channel.trim()) &&
    Boolean(
      draft.productId.trim() ||
        draft.productTitle.trim() ||
        (draft.productIds?.length ?? 0) > 0,
    ) &&
    Boolean(draft.name.trim() && draft.phone.trim()) &&
    !submitting &&
    !submitted;

  return (
    <aside
      className={cn(
        'flex h-full min-h-0 w-full flex-col overflow-hidden',
        'rounded-[1.35rem] border border-black/[0.08] bg-white/95 backdrop-blur-xl',
        'shadow-[0_12px_40px_rgba(0,0,0,0.1)]',
        className,
      )}
    >
      <div className="shrink-0 border-b border-black/[0.05] bg-[#fafafa] px-3.5 py-3 sm:px-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span
                className="inline-flex h-2 w-2 rounded-full"
                style={{ backgroundColor: ACCENT }}
                aria-hidden
              />
              <p className="m-0 text-[0.8125rem] font-semibold tracking-tight text-black">
                Заявка
              </p>
            </div>
            <p className="m-0 mt-1 text-[0.6875rem] leading-snug text-black/40">
              Собирается из диалога · {brand}
            </p>
          </div>
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрыть заявку"
              className="inline-flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-black/[0.04] text-black/50 transition-colors hover:bg-black/[0.08] hover:text-black"
            >
              <X className="h-3.5 w-3.5" strokeWidth={2.25} />
            </button>
          ) : null}
        </div>
        <div className="mt-2.5 flex items-center gap-2">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-black/[0.06]">
            <div
              className="h-full rounded-full transition-[width] duration-300"
              style={{
                width: `${Math.round((filled / total) * 100)}%`,
                backgroundColor: ACCENT,
              }}
            />
          </div>
          <span className="shrink-0 text-[0.625rem] font-semibold tabular-nums text-black/40">
            {filled}/{total}
          </span>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto px-3.5 py-3 [scrollbar-width:thin] sm:px-4">
        {fields.map((field) => {
          const value = String(draft[field.key] ?? '');
          const filledField = Boolean(value.trim());
          const packageIds = draft.productIds?.filter(Boolean) ?? [];
          return (
            <label key={field.key} className="block shrink-0">
              <span className="mb-1 flex items-center justify-between gap-2">
                <span className="text-[0.625rem] font-semibold uppercase tracking-[0.04em] text-black/35">
                  {field.label}
                  {field.key === 'productTitle' && packageIds.length > 1
                    ? ` · пакет ${packageIds.length}`
                    : ''}
                </span>
                {filledField ? (
                  <span className="text-[0.625rem] font-medium text-black/30">заполнено</span>
                ) : null}
              </span>
              <input
                type={field.key === 'phone' ? 'tel' : 'text'}
                value={value}
                onChange={(event) => onChange({ [field.key]: event.target.value })}
                placeholder={field.placeholder}
                className={cn(
                  'h-9 w-full rounded-[0.85rem] border px-3 text-[0.8125rem] text-black outline-none transition-colors',
                  filledField
                    ? 'border-black/[0.06] bg-[#f5f5f7]'
                    : 'border-dashed border-black/10 bg-white',
                  'placeholder:text-black/28 focus:border-black/15 focus:bg-[#f0f0f2]',
                )}
              />
              {field.key === 'productTitle' && packageIds.length > 1 ? (
                <ul className="m-0 mt-1.5 flex list-none flex-wrap gap-1 p-0">
                  {packageIds.map((id) => (
                    <li
                      key={id}
                      className="inline-flex items-center rounded-full bg-black/[0.05] px-2 py-0.5 text-[0.625rem] font-semibold text-black/55"
                    >
                      {getSaasPreviewItem(id)?.title ?? id}
                    </li>
                  ))}
                </ul>
              ) : null}
            </label>
          );
        })}
        <label className="flex min-h-0 flex-1 flex-col">
          <span className="mb-1 block shrink-0 text-[0.625rem] font-semibold uppercase tracking-[0.04em] text-black/35">
            Заметки
          </span>
          <textarea
            value={draft.notes}
            onChange={(event) => onChange({ notes: event.target.value })}
            placeholder="Ниша / бизнес, цель, срок, цена, детали…"
            className={cn(
              'min-h-[6rem] w-full flex-1 resize-none rounded-[0.85rem] border border-black/[0.06] bg-[#f5f5f7] px-3 py-2',
              'text-[0.8125rem] text-black outline-none placeholder:text-black/28',
              'focus:border-black/15 focus:bg-[#f0f0f2]',
            )}
          />
        </label>
      </div>

      <div className="shrink-0 border-t border-black/[0.05] bg-[#fafafa] p-3 sm:p-3.5">
        {submitted ? (
          <div className="flex items-center justify-center gap-2 rounded-xl bg-white px-3 py-2.5 text-[0.8125rem] font-semibold text-black/70 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
            Передано менеджеру
          </div>
        ) : (
          <button
            type="button"
            disabled={!canSubmit}
            onClick={onSubmit}
            className={cn(
              'inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-none text-[0.8125rem] font-semibold text-black transition-opacity',
              'disabled:cursor-default disabled:opacity-40',
            )}
            style={{ backgroundColor: ACCENT }}
          >
            <Send className="h-3.5 w-3.5" strokeWidth={2.25} />
            {submitting ? 'Отправляем…' : 'Передать менеджеру'}
          </button>
        )}
        {!draft.ready && !submitted ? (
          <p className="m-0 mt-1.5 text-center text-[0.625rem] leading-snug text-black/35">
            Активно после сбора задачи AI и ваших контактов
          </p>
        ) : null}
      </div>
    </aside>
  );
};

export default AiLeadPanel;
