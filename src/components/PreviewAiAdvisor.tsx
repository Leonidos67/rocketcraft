import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowUp,
  CornerDownRight,
} from 'lucide-react';
import {
  buildPreviewAiSystemPrompt,
  extractAiChoice,
  extractLeadUpdates,
  extractPreviewOpenIds,
  mergeAiLeadDraft,
  sanitizeLeadNotes,
  stripPreviewOpenMarkers,
  titlesForProductIds,
  type AiLeadDraft,
} from '@/lib/previewAi';
import { Orb, type AgentState } from '@/components/ui/orb';
import PreviewAiMessageContent from '@/components/PreviewAiMessageContent';
import { cn } from '@/lib/utils';

type ChatRole = 'user' | 'assistant';

type ChatMessage = {
  role: ChatRole;
  content: string;
};

const SUGGESTIONS = [
  'Сайт с онлайн-записью',
  'Бот, который собирает заявки',
  'CRM для отдела продаж',
  'Лендинг под рекламу',
] as const;

/** На /product-preview (launcher) показываем только первые три. */
const LAUNCHER_SUGGESTIONS = SUGGESTIONS.slice(0, 3);

const LAUNCHER_PLACEHOLDERS = [
  'Напишите задачу…',
  'Нужен сайт с онлайн-записью…',
  'Хочу бота для заявок…',
  'CRM для отдела продаж…',
  'Лендинг под рекламу…',
] as const;

const CHAT_PLACEHOLDERS = [
  'Спросите что угодно…',
  'Сколько стоит сайт с записью?',
  'Чем CRM отличается от бота?',
  'Можно ли на Tilda?',
  'Соберите пакет под салон…',
] as const;

const STATUS: Record<Exclude<AgentState, null> | 'idle', string> = {
  idle: 'Спросите, что нужно бизнесу — подберу решение и цену',
  listening: 'Слушаю…',
  thinking: 'Думаю над вариантом…',
  talking: 'Вот что рекомендую',
};

const ACCENT = '#c8f000';

export type PreviewAiAdvisorMode = 'launcher' | 'chat';

const PreviewAiAdvisor = ({
  brand,
  className,
  mode = 'launcher',
  initialMessage = '',
  onScrollOffsetChange,
  leadDraft,
  onLeadChange,
  onRecommendedProducts,
  sideDemoActive = false,
}: {
  brand: string;
  className?: string;
  mode?: PreviewAiAdvisorMode;
  initialMessage?: string;
  onScrollOffsetChange?: (scrolled: boolean) => void;
  leadDraft?: AiLeadDraft;
  onLeadChange?: (
    draft: AiLeadDraft,
    meta?: { source: 'ai' | 'choice' | 'user'; changedKeys?: string[] },
  ) => void;
  onRecommendedProducts?: (productIds: string[]) => void;
  /** Демо уже в левой панели — не дублировать карточки в ленте. */
  sideDemoActive?: boolean;
}) => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [focused, setFocused] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [talking, setTalking] = useState(false);
  const [error, setError] = useState('');
  const [answeredChoiceIndex, setAnsweredChoiceIndex] = useState<number | null>(null);
  const [customOpen, setCustomOpen] = useState(false);
  const [customValue, setCustomValue] = useState('');
  const scrollerRef = useRef<HTMLDivElement>(null);
  const talkingTimer = useRef<number>(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const bootstrapRef = useRef(false);
  const messagesRef = useRef<ChatMessage[]>([]);
  const leadRef = useRef<AiLeadDraft | undefined>(leadDraft);
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState(
    () => (mode === 'launcher' ? LAUNCHER_PLACEHOLDERS[0] : CHAT_PLACEHOLDERS[0]),
  );

  messagesRef.current = messages;
  leadRef.current = leadDraft;

  const placeholderPhrases = mode === 'launcher' ? LAUNCHER_PLACEHOLDERS : CHAT_PLACEHOLDERS;
  const pausePlaceholder = Boolean(input.trim());

  useEffect(() => {
    if (pausePlaceholder) {
      setAnimatedPlaceholder(placeholderPhrases[0]);
      return;
    }

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer = 0;

    const schedule = (fn: () => void, ms: number) => {
      timer = window.setTimeout(fn, ms);
    };

    const tick = () => {
      const phrase = placeholderPhrases[phraseIndex];
      if (!deleting) {
        charIndex += 1;
        setAnimatedPlaceholder(phrase.slice(0, charIndex));
        if (charIndex >= phrase.length) {
          deleting = true;
          schedule(tick, 2200);
          return;
        }
        schedule(tick, 42);
        return;
      }

      charIndex -= 1;
      setAnimatedPlaceholder(phrase.slice(0, Math.max(0, charIndex)));
      if (charIndex <= 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % placeholderPhrases.length;
        schedule(tick, 380);
        return;
      }
      schedule(tick, 24);
    };

    schedule(tick, 500);
    return () => window.clearTimeout(timer);
  }, [pausePlaceholder, placeholderPhrases]);

  const agentState: AgentState = loading
    ? 'thinking'
    : talking
      ? 'talking'
      : focused || input.trim()
        ? 'listening'
        : null;

  const statusKey = agentState ?? 'idle';
  const canSend = Boolean(input.trim()) && !loading;

  const applyLeadUpdates = (raw: string) => {
    if (!onLeadChange || !leadRef.current) return;
    const updates = extractLeadUpdates(raw);
    const openIds = extractPreviewOpenIds(raw);
    if (openIds.length && !updates.productIds?.length && !updates.productId) {
      updates.productIds = openIds;
      updates.productId = openIds[0];
      updates.productTitle = titlesForProductIds(openIds);
    } else if (openIds.length > 1 && (!updates.productIds || updates.productIds.length < 2)) {
      const fromLead = updates.productIds?.length
        ? updates.productIds
        : updates.productId
          ? [updates.productId]
          : [];
      const merged = [...openIds];
      fromLead.forEach((id) => {
        if (!merged.includes(id)) merged.push(id);
      });
      updates.productIds = merged;
      if (!updates.productId) updates.productId = merged[0];
      updates.productTitle = titlesForProductIds(merged);
    }
    if (Object.keys(updates).length === 0) return;
    if (updates.notes) {
      const prev = leadRef.current.notes.trim();
      const incoming = updates.notes.trim();
      if (prev && incoming && !prev.includes(incoming)) {
        updates.notes = `${prev}; ${incoming}`;
      }
    }
    const merged = mergeAiLeadDraft(leadRef.current, updates);
    const ids =
      merged.productIds?.length > 0
        ? merged.productIds
        : merged.productId
          ? [merged.productId]
          : [];
    merged.notes = sanitizeLeadNotes(merged.notes || updates.notes || leadRef.current.notes, ids);
    const changedKeys = Object.keys(updates).filter((key) => key !== 'ready');
    if (merged.notes !== leadRef.current.notes && !changedKeys.includes('notes')) {
      changedKeys.push('notes');
    }
    onLeadChange(merged, {
      source: 'ai',
      changedKeys,
    });
  };

  const publishRecommendedProducts = (raw: string) => {
    if (!onRecommendedProducts) return;
    const openIds = extractPreviewOpenIds(raw);
    const leadUpdates = extractLeadUpdates(raw);
    const leadIds =
      leadUpdates.productIds?.length
        ? leadUpdates.productIds
        : leadUpdates.productId?.trim()
          ? [leadUpdates.productId.trim()]
          : [];
    const ids = openIds.length ? openIds : leadIds;
    if (ids.length) onRecommendedProducts(ids);
  };

  useEffect(() => {
    const node = scrollerRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [messages, loading, customOpen]);

  useEffect(() => {
    if (mode !== 'chat') return;
    const el = inputRef.current;
    if (!el) return;

    el.style.height = 'auto';
    const styles = window.getComputedStyle(el);
    const lineHeight = Number.parseFloat(styles.lineHeight) || 24.8;
    const paddingY =
      Number.parseFloat(styles.paddingTop) + Number.parseFloat(styles.paddingBottom);
    const minHeight = lineHeight * 2 + paddingY;
    const maxHeight = lineHeight * 5 + paddingY;
    const next = Math.min(Math.max(el.scrollHeight, minHeight), maxHeight);
    el.style.height = `${next}px`;
    el.style.overflowY = el.scrollHeight > maxHeight + 1 ? 'auto' : 'hidden';
  }, [input, mode]);

  useEffect(() => {
    if (mode !== 'chat' || !onScrollOffsetChange) return;
    const node = scrollerRef.current;
    if (!node) return;
    const onScroll = () => onScrollOffsetChange(node.scrollTop > 8);
    onScroll();
    node.addEventListener('scroll', onScroll, { passive: true });
    return () => node.removeEventListener('scroll', onScroll);
  }, [mode, onScrollOffsetChange, messages.length]);

  useEffect(
    () => () => {
      if (talkingTimer.current) window.clearTimeout(talkingTimer.current);
    },
    [],
  );

  const send = async (text: string, history?: ChatMessage[]) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    if (mode === 'launcher') {
      navigate('/ai', { state: { message: trimmed } });
      return;
    }

    const apiKey = import.meta.env.VITE_PREVIEW_AI_KEY;
    const baseUrl = (
      import.meta.env.VITE_PREVIEW_AI_BASE_URL || 'https://routerai.ru/api/v1'
    ).replace(/\/$/, '');
    const model =
      import.meta.env.VITE_PREVIEW_AI_MODEL || 'deepseek/deepseek-chat-v3.1';

    if (!apiKey) {
      setError(
        'AI не настроен: добавьте VITE_PREVIEW_AI_KEY в .env и перезапустите dev-сервер.',
      );
      return;
    }

    const base = history ?? messagesRef.current;
    const nextMessages: ChatMessage[] = [...base, { role: 'user', content: trimmed }];
    setMessages(nextMessages);
    setInput('');
    setError('');
    setCustomOpen(false);
    setCustomValue('');
    setLoading(true);
    setTalking(false);
    if (talkingTimer.current) window.clearTimeout(talkingTimer.current);

    const leadSnapshot = leadRef.current;
    const packageIds =
      leadSnapshot?.productIds?.length
        ? leadSnapshot.productIds
        : leadSnapshot?.productId
          ? [leadSnapshot.productId]
          : [];
    const leadContext =
      leadSnapshot &&
      [
        leadSnapshot.channel && `канал=${leadSnapshot.channel}`,
        packageIds.length && `productIds=${packageIds.join('|')}`,
        leadSnapshot.productId && `productId=${leadSnapshot.productId}`,
        leadSnapshot.notes && `заметки=${leadSnapshot.notes}`,
      ]
        .filter(Boolean)
        .join('; ');

    try {
      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          temperature: 0.3,
          stream: false,
          messages: [
            {
              role: 'system',
              content:
                buildPreviewAiSystemPrompt(brand) +
                (leadContext ? `\n\nТекущая заявка (уже собрано): ${leadContext}` : '') +
                (packageIds.length
                  ? `\nРекомендация уже дана (пакет: ${packageIds.join(', ')}). Это FOLLOW-UP: не повторяй «Понял задачу» и «Рекомендация», отвечай только на новый вопрос. Не дублируй [OPEN:], если набор решений не меняется.`
                  : ''),
            },
            ...nextMessages.map((message) => ({
              role: message.role,
              content: message.content,
            })),
          ],
        }),
      });

      if (!response.ok) {
        const payload = await response.text();
        if (response.status === 401) {
          throw new Error('Неверный API-ключ RouterAI (401).');
        }
        if (response.status === 402) {
          throw new Error('Недостаточно баланса на RouterAI (402).');
        }
        throw new Error(payload || `Ошибка API (${response.status})`);
      }

      const data = (await response.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const raw =
        data.choices?.[0]?.message?.content?.trim() || 'Не удалось получить ответ.';
      setMessages((prev) => {
        const next = [...prev, { role: 'assistant' as const, content: raw }];
        setAnsweredChoiceIndex(null);
        return next;
      });
      applyLeadUpdates(raw);
      publishRecommendedProducts(raw);
      setTalking(true);
      talkingTimer.current = window.setTimeout(() => setTalking(false), 2800);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось получить рекомендацию');
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Сейчас не удалось ответить. Опишите задачу ещё раз или выберите вариант ниже.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const pickChoice = (field: string, value: string) => {
    if (loading) return;
    const lastIndex = messages.length - 1;
    setAnsweredChoiceIndex(lastIndex);
    if (onLeadChange && leadRef.current) {
      const patch: Partial<AiLeadDraft> = { ready: false };
      if (
        field === 'channel' ||
        field === 'productId' ||
        field === 'productTitle' ||
        field === 'name' ||
        field === 'phone' ||
        field === 'notes'
      ) {
        patch[field] = value;
      } else if (field === 'niche' || field === 'goal' || field === 'timeline' || field === 'price') {
        const label =
          field === 'niche'
            ? 'Ниша'
            : field === 'goal'
              ? 'Цель'
              : field === 'timeline'
                ? 'Срок'
                : 'Цена';
        const prev = leadRef.current.notes.trim();
        patch.notes = prev ? `${prev}; ${label}: ${value}` : `${label}: ${value}`;
      }
      onLeadChange(mergeAiLeadDraft(leadRef.current, patch), {
        source: 'choice',
        changedKeys: Object.keys(patch).filter((key) => key !== 'ready'),
      });
    }
    void send(value);
  };

  useEffect(() => {
    if (mode !== 'chat') return;
    const trimmed = initialMessage.trim();
    if (!trimmed || bootstrapRef.current) return;
    bootstrapRef.current = true;
    void send(trimmed, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- bootstrap once from navigation state
  }, [mode, initialMessage]);

  const suggestionsBlock = (
    <div
      className={cn(
        'mx-auto flex w-[calc(100%-30px)] max-w-none gap-1.5 overflow-x-auto sm:w-[calc(100%-60px)]',
        'rounded-t-none rounded-b-[1.35rem]',
        'border border-t-0 border-black/[0.05] bg-white/60 p-1.5 pt-1.5',
        'shadow-[0_1px_2px_rgba(0,0,0,0.04)]',
        '[scrollbar-width:none] sm:flex-wrap sm:justify-center sm:overflow-visible sm:rounded-b-[1.5rem]',
        '[&::-webkit-scrollbar]:hidden',
      )}
    >
      {LAUNCHER_SUGGESTIONS.map((label) => (
        <button
          key={label}
          type="button"
          disabled={loading}
          onClick={() => void send(label)}
          className={cn(
            'inline-flex min-w-0 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full border-none',
            'bg-white px-2.5 py-1.5 text-[0.6875rem] font-semibold text-black/70',
            'shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-colors',
            'hover:text-black disabled:cursor-default disabled:opacity-50',
            'sm:flex-none sm:px-3 sm:text-[0.75rem]',
          )}
        >
          <CornerDownRight className="h-3.5 w-3.5 shrink-0 text-black/45" strokeWidth={2.25} />
          <span className="truncate sm:whitespace-nowrap">{label}</span>
        </button>
      ))}
    </div>
  );

  const launcherComposer = (
    <div className="flex w-full flex-col">
      <form
        className="relative z-10 w-full rounded-[1.75rem] border border-black/[0.06] bg-white p-3.5 shadow-[0_8px_28px_rgba(0,0,0,0.06)] sm:p-4"
        onSubmit={(event) => {
          event.preventDefault();
          void send(input);
        }}
      >
        <textarea
          ref={inputRef}
          value={input}
          rows={1}
          onChange={(event) => setInput(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              void send(input);
            }
          }}
          placeholder={animatedPlaceholder}
          disabled={loading}
          className={cn(
            'min-h-[2.5rem] w-full resize-none border-none bg-transparent px-1.5 pt-1',
            'text-[0.9375rem] leading-relaxed text-black outline-none',
            'placeholder:text-black/35 disabled:opacity-60',
          )}
        />

        <div className="mt-2 flex items-center justify-end gap-2">
          <button
            type="submit"
            disabled={!canSend}
            aria-label="Отправить"
            className={cn(
              'inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-none transition-opacity',
              'disabled:cursor-default disabled:opacity-40',
            )}
            style={{ backgroundColor: ACCENT }}
          >
            <ArrowUp className="h-4 w-4 text-black" strokeWidth={2.5} />
          </button>
        </div>
      </form>

      {suggestionsBlock}
    </div>
  );

  if (mode === 'launcher') {
    return (
      <div className={cn('flex w-full max-w-3xl flex-col items-center gap-3', className)}>
        <div className="flex w-full flex-col items-center px-2 pt-1">
          <div className="relative h-[6.5rem] w-[6.5rem] rounded-full bg-white/70 p-1 shadow-[inset_0_2px_10px_rgba(0,0,0,0.06)] sm:h-[7.5rem] sm:w-[7.5rem]">
            <div className="h-full w-full overflow-hidden rounded-full bg-[#ebebeb]">
              <Orb
                colors={['#F6E7D8', '#E0CFC2']}
                seed={2401}
                agentState={agentState}
                className="h-full w-full"
              />
            </div>
          </div>
          <p className="m-0 mt-2.5 max-w-sm text-center text-sm font-medium leading-snug text-black/50">
            {STATUS[statusKey]}
          </p>
        </div>
        {launcherComposer}
        {error ? (
          <p className="m-0 w-full px-1 text-xs text-[#ff643c]" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  }

  const showEmptyHero = messages.length === 0 && !loading;

  return (
    <div className={cn('flex h-full min-h-0 w-full flex-col', className)}>
      <div
        ref={scrollerRef}
        className="min-h-0 flex-1 overflow-y-auto px-4 pt-[calc(env(safe-area-inset-top)+4.35rem)] [scrollbar-width:none] sm:px-6 [&::-webkit-scrollbar]:hidden"
      >
        {showEmptyHero ? (
          <div className="flex min-h-full flex-col items-center justify-center gap-5 py-10">
            <div className="relative h-24 w-24 rounded-full bg-white/80 p-1 shadow-[inset_0_1px_8px_rgba(0,0,0,0.04)] sm:h-28 sm:w-28">
              <div className="h-full w-full overflow-hidden rounded-full bg-[#ebebeb]">
                <Orb
                  colors={['#F6E7D8', '#E0CFC2']}
                  seed={2401}
                  agentState={agentState}
                  className="h-full w-full"
                />
              </div>
            </div>
            <div className="max-w-md text-center">
              <h1 className="m-0 text-[1.375rem] font-semibold tracking-[-0.03em] text-black sm:text-[1.5rem]">
                Чем помочь?
              </h1>
              <p className="m-0 mt-2 text-[0.9375rem] leading-relaxed text-black/45">
                {STATUS[statusKey]}
              </p>
            </div>
            <div className="flex w-full max-w-lg flex-wrap justify-center gap-2 pt-1">
              {SUGGESTIONS.map((label) => (
                <button
                  key={label}
                  type="button"
                  disabled={loading}
                  onClick={() => void send(label)}
                  className={cn(
                    'inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-black/[0.06]',
                    'bg-white/80 px-3.5 py-2 text-[0.8125rem] font-medium text-black/65',
                    'shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-colors',
                    'hover:border-black/10 hover:bg-white hover:text-black',
                    'disabled:cursor-default disabled:opacity-50',
                  )}
                >
                  <CornerDownRight className="h-3.5 w-3.5 text-black/35" strokeWidth={2.25} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 pb-6 pt-2 sm:gap-7 sm:pb-8 sm:pt-4">
            {messages.map((message, index) => {
              const choice =
                message.role === 'assistant' ? extractAiChoice(message.content) : null;
              const text =
                message.role === 'assistant'
                  ? stripPreviewOpenMarkers(message.content)
                  : message.content;
              const showChoice =
                Boolean(choice) && index === messages.length - 1 && answeredChoiceIndex !== index;
              const assistantBefore = messages
                .slice(0, index)
                .filter((entry) => entry.role === 'assistant').length;
              const isFollowUp = message.role === 'assistant' && assistantBefore > 0;

              if (message.role === 'user') {
                return (
                  <div key={`user-${index}`} className="flex justify-end">
                    <div className="max-w-[85%] rounded-[1.35rem] rounded-br-md bg-[#e8e8ed] px-4 py-2.5 text-[0.9375rem] leading-relaxed text-black sm:max-w-[75%]">
                      <p className="m-0 whitespace-pre-wrap">{text}</p>
                    </div>
                  </div>
                );
              }

              return (
                <div key={`assistant-${index}`} className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 overflow-hidden rounded-full bg-[#ebebeb]">
                      <Orb
                        colors={['#F6E7D8', '#E0CFC2']}
                        seed={2401}
                        agentState={index === messages.length - 1 ? agentState : null}
                        className="h-full w-full"
                      />
                    </div>
                    <span className="text-[0.75rem] font-semibold tracking-tight text-black/45">
                      Agyra AI
                    </span>
                  </div>
                  <div className="pl-0 tracking-[-0.01em]">
                    <PreviewAiMessageContent
                      text={text}
                      rawText={message.content}
                      productName={brand}
                      showProductCards={!sideDemoActive}
                      mobileOnlyProductCards={sideDemoActive && !isFollowUp}
                      followUp={isFollowUp}
                    />

                    {showChoice && choice ? (
                      <div className="mt-2.5 space-y-1.5">
                        <p className="m-0 text-[0.625rem] font-semibold uppercase tracking-[0.04em] text-black/35">
                          Выберите
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {choice.options.map((option) => {
                            const isOther = /^другое$/i.test(option);
                            return (
                              <button
                                key={option}
                                type="button"
                                disabled={loading}
                                onClick={() => {
                                  if (isOther) {
                                    setCustomOpen(true);
                                    return;
                                  }
                                  pickChoice(choice.field, option);
                                }}
                                className={cn(
                                  'inline-flex cursor-pointer items-center rounded-full border border-black/[0.07]',
                                  'bg-white px-2.5 py-1 text-[0.6875rem] font-semibold text-black/65',
                                  'transition-colors hover:border-black/12 hover:bg-[#f5f5f7] hover:text-black',
                                  'disabled:cursor-default disabled:opacity-50',
                                  isOther && customOpen && 'border-black/20 bg-[#f5f5f7]',
                                )}
                              >
                                {option}
                              </button>
                            );
                          })}
                        </div>
                        {customOpen ? (
                          <form
                            className="flex gap-1.5"
                            onSubmit={(event) => {
                              event.preventDefault();
                              const value = customValue.trim();
                              if (!value) return;
                              pickChoice(choice.field, value);
                            }}
                          >
                            <input
                              value={customValue}
                              onChange={(event) => setCustomValue(event.target.value)}
                              placeholder="Свой вариант…"
                              autoFocus
                              className={cn(
                                'h-8 min-w-0 flex-1 rounded-full border-none bg-[#e8e8ed] px-3',
                                'text-[0.75rem] text-black outline-none placeholder:text-black/35',
                              )}
                            />
                            <button
                              type="submit"
                              disabled={!customValue.trim() || loading}
                              className={cn(
                                'inline-flex h-8 shrink-0 cursor-pointer items-center rounded-full border-none px-3',
                                'text-[0.6875rem] font-semibold text-black disabled:opacity-40',
                              )}
                              style={{ backgroundColor: ACCENT }}
                            >
                              OK
                            </button>
                          </form>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}

            {loading ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 overflow-hidden rounded-full bg-[#ebebeb]">
                    <Orb
                      colors={['#F6E7D8', '#E0CFC2']}
                      seed={2401}
                      agentState="thinking"
                      className="h-full w-full"
                    />
                  </div>
                  <span className="text-[0.75rem] font-semibold tracking-tight text-black/45">
                    Agyra AI
                  </span>
                </div>
                <p className="m-0 animate-pulse text-[0.9375rem] text-black/35">Думаю…</p>
              </div>
            ) : null}
          </div>
        )}
      </div>

      <div className="relative shrink-0 px-4 pb-3 pt-1 sm:px-6 sm:pb-4">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-10 h-10 bg-gradient-to-t from-[#f5f5f7] to-transparent"
        />

        <form
          className={cn(
            'relative mx-auto flex w-full max-w-2xl items-end gap-2.5 rounded-[1.75rem]',
            'border border-black/[0.07] bg-white p-3 pl-4',
            'shadow-[0_10px_36px_rgba(0,0,0,0.07)]',
            'transition-[box-shadow,border-color] duration-200',
            'focus-within:border-black/[0.12] focus-within:shadow-[0_12px_40px_rgba(0,0,0,0.09)]',
            'sm:rounded-[2rem] sm:p-3.5 sm:pl-5',
          )}
          onSubmit={(event) => {
            event.preventDefault();
            void send(input);
          }}
        >
          <textarea
            ref={inputRef}
            value={input}
            rows={2}
            onChange={(event) => setInput(event.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                void send(input);
              }
            }}
            placeholder={animatedPlaceholder}
            disabled={loading}
            className={cn(
              'max-h-[calc(1.55rem*5+0.75rem)] min-h-[calc(1.55rem*2+0.75rem)] flex-1 resize-none',
              'border-none bg-transparent py-1.5',
              'text-[1rem] leading-[1.55] tracking-[-0.01em] text-black outline-none',
              'placeholder:font-medium placeholder:tracking-[-0.01em] placeholder:text-black/30',
              'disabled:opacity-60',
              'overflow-y-hidden [scrollbar-width:thin] [scrollbar-color:rgba(0,0,0,0.22)_transparent]',
              '[&::-webkit-scrollbar]:w-1.5',
              '[&::-webkit-scrollbar-track]:my-1 [&::-webkit-scrollbar-track]:bg-transparent',
              '[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black/20',
              'hover:[&::-webkit-scrollbar-thumb]:bg-black/30',
            )}
          />
          <button
            type="submit"
            disabled={!canSend}
            aria-label="Отправить"
            className={cn(
              'mb-0.5 inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-none transition-opacity',
              'disabled:cursor-default disabled:opacity-35',
            )}
            style={{ backgroundColor: ACCENT }}
          >
            <ArrowUp className="h-4 w-4 text-black" strokeWidth={2.5} />
          </button>
        </form>

        {error ? (
          <p className="m-0 mx-auto mt-2 max-w-2xl px-1 text-center text-xs text-[#ff643c]" role="alert">
            {error}
          </p>
        ) : (
          <p className="m-0 mx-auto mt-2 max-w-2xl text-center text-[0.6875rem] text-black/30">
            Ответы могут быть неточными — уточняйте детали в заявке
          </p>
        )}
      </div>
    </div>
  );
};

export default PreviewAiAdvisor;
