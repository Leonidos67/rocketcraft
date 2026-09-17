import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ClipboardList, LayoutGrid, RotateCcw, Send } from 'lucide-react';
import { toast } from 'sonner';
import AiDemoSidePanel from '@/components/AiDemoSidePanel';
import AiLeadPanel from '@/components/AiLeadPanel';
import PreviewAiAdvisor from '@/components/PreviewAiAdvisor';
import {
  countAiLeadFieldStats,
  emptyAiLeadDraft,
  mergeAiLeadDraft,
  type AiLeadDraft,
} from '@/lib/previewAi';
import { readProductPreviewCompany } from '@/lib/productPreviewCompany';
import { formatAiAdvisorLeadMessage, sendTelegramLead } from '@/lib/telegramLead';
import { cn } from '@/lib/utils';

type AiLocationState = {
  message?: string;
};

const AiAdvisor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [leadDraft, setLeadDraft] = useState<AiLeadDraft>(() => emptyAiLeadDraft());
  const [aiFilledKeys, setAiFilledKeys] = useState<Set<string>>(() => new Set());
  const [leadOpen, setLeadOpen] = useState(false);
  const [pinnedProductId, setPinnedProductId] = useState('');
  const [pinnedProductIds, setPinnedProductIds] = useState<string[]>([]);
  const [chatKey, setChatKey] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const company = useMemo(() => readProductPreviewCompany(), []);
  const brand = company?.productName?.trim() || 'Agyra';
  const fieldStats = useMemo(
    () => countAiLeadFieldStats(leadDraft, aiFilledKeys),
    [leadDraft, aiFilledKeys],
  );

  const initialMessageRef = useRef('');
  if (!initialMessageRef.current) {
    const state = (location.state as AiLocationState | null) ?? null;
    initialMessageRef.current = state?.message?.trim() ?? '';
  }
  const initialMessage = initialMessageRef.current;

  useEffect(() => {
    document.title = 'Agyra AI — подбор решения';
  }, []);

  useEffect(() => {
    if (!initialMessage) return;
    navigate(location.pathname, { replace: true, state: null });
  }, [initialMessage, location.pathname, navigate]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
  }, []);

  const handleLeadChange = (
    draft: AiLeadDraft,
    meta?: { source: 'ai' | 'choice' | 'user'; changedKeys?: string[] },
  ) => {
    setLeadDraft(draft);
    const ids =
      draft.productIds?.length > 0
        ? draft.productIds
        : draft.productId.trim()
          ? [draft.productId.trim()]
          : [];
    if (ids.length) {
      setPinnedProductIds(ids);
      setPinnedProductId((current) =>
        current && ids.includes(current) ? current : ids[0]!,
      );
    }
    if (!meta?.changedKeys?.length) return;

    setAiFilledKeys((current) => {
      const next = new Set(current);
      if (meta.source === 'ai' || meta.source === 'choice') {
        meta.changedKeys?.forEach((key) => {
          const value = String(draft[key as keyof AiLeadDraft] ?? '').trim();
          if (value) next.add(key);
          else next.delete(key);
        });
        return next;
      }

      meta.changedKeys?.forEach((key) => next.delete(key));
      return next;
    });
  };

  const submitLead = async () => {
    if (submitting || submitted) return;
    setSubmitting(true);
    try {
      await sendTelegramLead(
        formatAiAdvisorLeadMessage({
          brand,
          channel: leadDraft.channel,
          productId: leadDraft.productId,
          productIds: leadDraft.productIds,
          productTitle: leadDraft.productTitle,
          name: leadDraft.name,
          phone: leadDraft.phone,
          notes: leadDraft.notes,
        }),
      );
      setSubmitted(true);
      toast.success('Заявка передана менеджеру');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Не удалось отправить заявку');
    } finally {
      setSubmitting(false);
    }
  };

  const resetChat = () => {
    setLeadDraft(emptyAiLeadDraft());
    setAiFilledKeys(new Set());
    setSubmitted(false);
    setLeadOpen(false);
    setPinnedProductId('');
    setPinnedProductIds([]);
    setChatKey((value) => value + 1);
    initialMessageRef.current = '';
  };

  const headerBtnClass = cn(
    'inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full border-none',
    'bg-black/[0.04] px-3 text-[0.8125rem] font-semibold text-black/70 no-underline',
    'transition-colors hover:bg-black/[0.07] hover:text-black',
  );

  return (
    <div className="fixed inset-0 z-40 flex flex-col overflow-hidden bg-[#f5f5f7] text-black">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_-10%,rgba(255,255,255,0.95)_0%,rgba(245,245,247,0)_55%)]"
      />

      <header
        className={cn(
          'absolute inset-x-0 top-0 z-30 flex w-full items-center justify-between gap-3',
          'px-4 pb-3 pt-[max(0.85rem,env(safe-area-inset-top))] sm:px-6 sm:pb-3.5 sm:pt-4',
          'border-b bg-[#f5f5f7]/70 backdrop-blur-xl backdrop-saturate-150',
          'transition-[background-color,border-color] duration-200',
          headerScrolled ? 'border-black/[0.06]' : 'border-transparent',
        )}
      >
        <Link
          to="/product-preview"
          className={cn(
            'inline-flex h-9 w-9 items-center justify-center rounded-full border-none',
            'bg-black/[0.04] text-black/70 no-underline transition-colors',
            'hover:bg-black/[0.07] hover:text-black',
          )}
          aria-label="К каталогу"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2.25} />
        </Link>

        <div className="absolute left-1/2 top-1/2 flex min-w-0 -translate-x-1/2 -translate-y-1/2 flex-col items-center pt-[max(0.15rem,env(safe-area-inset-top))] sm:pt-0">
          <p className="m-0 text-[0.8125rem] font-semibold tracking-[-0.02em] text-black">
            Agyra AI
          </p>
          <p className="m-0 text-[0.6875rem] font-medium text-black/40">подбор под {brand}</p>
        </div>

        <div className="relative flex items-center gap-1.5 sm:gap-2">
          <button type="button" onClick={() => setLeadOpen(true)} className={headerBtnClass}>
            <ClipboardList className="h-3.5 w-3.5" strokeWidth={2.25} />
            <span className="hidden sm:inline">Заявка</span>
            {!leadOpen ? (
              <span className="inline-flex items-center gap-1">
                {fieldStats.empty > 0 ? (
                  <span
                    className="inline-flex min-w-[1.15rem] items-center justify-center rounded-full bg-black/10 px-1.5 py-0.5 text-[0.625rem] font-bold leading-none text-black/55"
                    title="Незаполненные поля"
                  >
                    {fieldStats.empty}
                  </span>
                ) : null}
                {fieldStats.aiFilled > 0 ? (
                  <span
                    className="inline-flex min-w-[1.15rem] items-center justify-center rounded-full px-1.5 py-0.5 text-[0.625rem] font-bold leading-none text-black"
                    style={{ backgroundColor: '#c8f000' }}
                    title="Поля от AI"
                  >
                    {fieldStats.aiFilled}
                  </span>
                ) : null}
              </span>
            ) : null}
          </button>

          <Link to="/product-preview" className={headerBtnClass}>
            <LayoutGrid className="h-3.5 w-3.5" strokeWidth={2.25} />
            <span className="hidden sm:inline">Каталог</span>
          </Link>

          <button type="button" onClick={resetChat} className={headerBtnClass} title="Новый чат">
            <RotateCcw className="h-3.5 w-3.5" strokeWidth={2.25} />
            <span className="hidden md:inline">Новый чат</span>
          </button>

          <a
            href="https://t.me/agyraru_helper"
            target="_blank"
            rel="noopener noreferrer"
            className={headerBtnClass}
            title="Поддержка в Telegram"
            aria-label="Напишите нам в Telegram"
          >
            <Send className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
            <span className="hidden md:inline">Напишите нам</span>
          </a>
        </div>
      </header>

      {pinnedProductIds.length || pinnedProductId ? (
        <div
          className={cn(
            'fixed left-3 z-40 hidden w-[min(20rem,calc(100vw-1.5rem))] lg:block sm:left-6',
            'top-[calc(env(safe-area-inset-top)+4.35rem)] bottom-3',
            'origin-top-left animate-in fade-in zoom-in-95 duration-150',
          )}
        >
          <AiDemoSidePanel
            productId={pinnedProductId || pinnedProductIds[0] || ''}
            productIds={pinnedProductIds.length ? pinnedProductIds : undefined}
            brand={brand}
            onActiveProductChange={setPinnedProductId}
            className="h-full"
          />
        </div>
      ) : null}

      {leadOpen ? (
        <div
          className={cn(
            'fixed right-3 z-50 w-[min(20rem,calc(100vw-1.5rem))] sm:right-6',
            'top-[calc(env(safe-area-inset-top)+4.35rem)] bottom-3',
            'origin-top-right animate-in fade-in zoom-in-95 duration-150',
          )}
        >
          <AiLeadPanel
            draft={leadDraft}
            brand={brand}
            submitting={submitting}
            submitted={submitted}
            onClose={() => setLeadOpen(false)}
            onChange={(patch) =>
              handleLeadChange(mergeAiLeadDraft(leadDraft, patch), {
                source: 'user',
                changedKeys: Object.keys(patch),
              })
            }
            onSubmit={() => void submitLead()}
            className="h-full"
          />
        </div>
      ) : null}

      <main className="relative z-10 mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <PreviewAiAdvisor
          key={chatKey}
          mode="chat"
          brand={brand}
          initialMessage={chatKey === 0 ? initialMessage : ''}
          className="mx-auto h-full min-h-0 w-full"
          onScrollOffsetChange={setHeaderScrolled}
          leadDraft={leadDraft}
          onLeadChange={handleLeadChange}
          sideDemoActive={Boolean(pinnedProductIds.length || pinnedProductId)}
          onRecommendedProducts={(productIds) => {
            if (!productIds.length) return;
            setPinnedProductIds(productIds);
            setPinnedProductId((current) =>
              current && productIds.includes(current) ? current : productIds[0]!,
            );
          }}
        />
      </main>
    </div>
  );
};

export default AiAdvisor;
