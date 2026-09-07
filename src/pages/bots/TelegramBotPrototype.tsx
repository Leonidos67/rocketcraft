import { useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, MoreVertical, Paperclip, Smile, Mic } from 'lucide-react';
import { Iphone } from '@/components/ui/iphone';
import {
  getTelegramBotDemo,
  type TelegramBotDemo,
  type TelegramKeyboardButton,
} from '@/data/telegramBotDemos';
import { readProductPreviewCompany } from '@/lib/productPreviewCompany';
import { cn } from '@/lib/utils';

type ChatLine =
  | { id: string; kind: 'bot'; texts: string[] }
  | { id: string; kind: 'user'; text: string };

const formatClock = (date: Date) =>
  date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

const useLiveClock = () => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const tick = () => setNow(new Date());

    const alignToNextMinute = () => {
      const current = new Date();
      const ms =
        (60 - current.getSeconds()) * 1000 - current.getMilliseconds() + 20;
      return window.setTimeout(() => {
        tick();
        intervalId = window.setInterval(tick, 60_000);
      }, ms);
    };

    let intervalId = 0;
    const timeoutId = alignToNextMinute();
    tick();

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, []);

  return formatClock(now);
};

const TelegramBotPrototype = () => {
  const { saasId = '' } = useParams();
  const [searchParams] = useSearchParams();
  const demo = getTelegramBotDemo(saasId);

  const brand =
    searchParams.get('brand')?.trim() ||
    readProductPreviewCompany()?.productName ||
    'Your Product';

  if (!demo) {
    return (
      <div className="flex h-[100svh] items-center justify-center bg-[#ebebeb] text-black">
        Бот не найден
      </div>
    );
  }

  return (
    <TelegramChatShell
      demo={demo}
      brand={brand}
      embed={searchParams.get('embed') === '1'}
    />
  );
};

const TelegramChatShell = ({
  demo,
  brand,
  embed,
}: {
  demo: TelegramBotDemo;
  brand: string;
  embed: boolean;
}) => {
  const displayName = `${brand} ${demo.botName}`;
  const [stepId, setStepId] = useState(demo.startStepId);
  const [lines, setLines] = useState<ChatLine[]>([]);
  const [keyboard, setKeyboard] = useState<TelegramKeyboardButton[]>([]);
  const [busy, setBusy] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const lineIdRef = useRef(0);
  const clock = useLiveClock();

  const step = demo.steps[stepId];

  const pushBotStep = (nextStepId: string) => {
    const next = demo.steps[nextStepId];
    if (!next) return;
    setBusy(true);
    setKeyboard([]);
    setStepId(nextStepId);

    window.setTimeout(() => {
      lineIdRef.current += 1;
      setLines((prev) => [
        ...prev,
        { id: `b-${lineIdRef.current}`, kind: 'bot', texts: next.botText },
      ]);
      setKeyboard(next.keyboard ?? []);
      setBusy(false);
    }, 380);
  };

  useEffect(() => {
    const start = demo.steps[demo.startStepId];
    if (!start) return;
    lineIdRef.current += 1;
    setLines([{ id: `b-${lineIdRef.current}`, kind: 'bot', texts: start.botText }]);
    setKeyboard(start.keyboard ?? []);
    setStepId(demo.startStepId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demo.id]);

  useEffect(() => {
    const node = scrollerRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [lines, keyboard]);

  const handleButton = (button: TelegramKeyboardButton) => {
    if (busy || !step) return;

    lineIdRef.current += 1;
    setLines((prev) => [
      ...prev,
      { id: `u-${lineIdRef.current}`, kind: 'user', text: button.label },
    ]);
    setKeyboard([]);

    const nextId = step.next?.[button.id];
    if (nextId) {
      pushBotStep(nextId);
      return;
    }

    if (step.end) {
      setBusy(false);
    }
  };

  const handleRestart = () => {
    setBusy(false);
    setLines([]);
    setKeyboard([]);
    window.setTimeout(() => {
      const start = demo.steps[demo.startStepId];
      if (!start) return;
      lineIdRef.current += 1;
      setLines([{ id: `b-${lineIdRef.current}`, kind: 'bot', texts: start.botText }]);
      setKeyboard(start.keyboard ?? []);
      setStepId(demo.startStepId);
    }, 120);
  };

  return (
    <div
      className={cn(
        'box-border flex w-full items-center justify-center overflow-hidden bg-[#ebebeb]',
        'h-[100svh] max-h-[100svh] supports-[height:100dvh]:h-[100dvh] supports-[height:100dvh]:max-h-[100dvh]',
        embed ? 'p-0' : 'p-3 sm:p-5',
      )}
    >
      {/* Standalone: phone-width cap. Embed: fill iframe (already phone-sized). */}
      <div
        className={cn(
          'relative mx-auto shrink-0',
          embed ? 'h-full w-full max-w-none' : 'w-full',
        )}
        style={
          embed
            ? { height: '100%', width: '100%' }
            : {
                maxWidth: 'min(22.5rem, calc((100svh - 1.5rem) * 433 / 882))',
                maxHeight: '100%',
                aspectRatio: '433 / 882',
              }
        }
      >
        <Iphone
          className="block h-full w-full drop-shadow-[0_24px_60px_rgba(0,0,0,0.18)]"
          style={
            embed
              ? { aspectRatio: 'auto', height: '100%', width: '100%' }
              : undefined
          }
        >
          <div className="flex h-full w-full flex-col bg-[#0e1621] text-white">
            {/* Status bar: time | Dynamic Island gap | signal + battery */}
            <div
              className="grid shrink-0 grid-cols-[1fr_minmax(5.5rem,32%)_1fr] items-center px-5"
              style={{ height: '6.8%' }}
            >
              <span className="justify-self-start text-[0.7rem] font-semibold tabular-nums leading-none text-white">
                {clock}
              </span>
              <span className="block" aria-hidden />
              <div className="flex items-center justify-end gap-1.5 justify-self-end text-white">
                <SignalBars />
                <BatteryIcon />
              </div>
            </div>

            <header className="flex shrink-0 items-center gap-2 border-b border-white/[0.06] bg-[#17212b] px-1.5 py-1.5">
              <button
                type="button"
                onClick={handleRestart}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-[#6ab3f3]"
                aria-label="Назад / сброс"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm"
                style={{ backgroundColor: demo.accent }}
                aria-hidden
              >
                {demo.avatarEmoji}
              </div>
              <div className="min-w-0 flex-1">
                <p className="m-0 truncate text-[0.8125rem] font-semibold leading-tight text-white">
                  {displayName}
                </p>
                <p className="m-0 text-[0.6875rem] leading-tight text-[#6ab3f3]">бот</p>
              </div>
              <button
                type="button"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-white/70"
                aria-label="Меню"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
            </header>

            <div
              ref={scrollerRef}
              className="relative min-h-0 flex-1 overflow-y-auto px-2 py-2.5"
              style={{
                backgroundImage:
                  'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
                backgroundSize: '16px 16px',
              }}
            >
              <div className="mb-2.5 flex justify-center">
                <span className="rounded-full bg-black/35 px-2 py-0.5 text-[0.625rem] font-medium text-white/70">
                  @{demo.botUsername}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                {lines.map((line) =>
                  line.kind === 'bot' ? (
                    <div key={line.id} className="flex max-w-[88%] flex-col gap-1 self-start">
                      {line.texts.map((text, index) => (
                        <div
                          key={`${line.id}-${index}`}
                          className="relative rounded-2xl rounded-bl-md bg-[#182533] px-2.5 py-1.5 text-[0.8125rem] leading-[1.35] text-white"
                        >
                          <p className="m-0 whitespace-pre-wrap">{text}</p>
                          <span className="mt-0.5 block text-right text-[0.5625rem] text-white/35">
                            {clock}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      key={line.id}
                      className="relative max-w-[88%] self-end rounded-2xl rounded-br-md bg-[#2b5278] px-2.5 py-1.5 text-[0.8125rem] leading-[1.35] text-white"
                    >
                      <p className="m-0 whitespace-pre-wrap">{line.text}</p>
                      <span className="mt-0.5 block text-right text-[0.5625rem] text-white/45">
                        {clock} ✓✓
                      </span>
                    </div>
                  ),
                )}
                {busy ? (
                  <div className="flex max-w-[36%] self-start rounded-2xl rounded-bl-md bg-[#182533] px-2.5 py-2">
                    <span className="flex gap-1">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/50" />
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/50 [animation-delay:120ms]" />
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/50 [animation-delay:240ms]" />
                    </span>
                  </div>
                ) : null}
              </div>
            </div>

            {keyboard.length > 0 ? (
              <div className="shrink-0 border-t border-white/[0.06] bg-[#17212b] px-1.5 py-1.5">
                <div
                  className={cn(
                    'grid gap-1',
                    keyboard.length <= 2 ? 'grid-cols-1' : 'grid-cols-2',
                  )}
                >
                  {keyboard.map((button) => (
                    <button
                      key={button.id}
                      type="button"
                      disabled={busy}
                      onClick={() => handleButton(button)}
                      className={cn(
                        'cursor-pointer rounded-lg border-none bg-[#2b3a4a] px-2 py-2',
                        'text-[0.75rem] font-medium text-white transition-colors',
                        'hover:bg-[#354a5e] disabled:cursor-default disabled:opacity-60',
                        button.id === 'any' || keyboard.length % 2 === 1
                          ? undefined
                          : undefined,
                        keyboard.length > 2 &&
                          keyboard.indexOf(button) === keyboard.length - 1 &&
                          keyboard.length % 2 === 1
                          ? 'col-span-2'
                          : undefined,
                      )}
                    >
                      {button.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="flex shrink-0 items-center gap-1 border-t border-white/[0.06] bg-[#17212b] px-1.5 pb-[max(0.85rem,2.2%)] pt-1.5">
              <button
                type="button"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-white/45"
                aria-hidden
              >
                <Smile className="h-4 w-4" />
              </button>
              <div className="flex min-h-8 min-w-0 flex-1 items-center rounded-2xl bg-[#242f3d] px-2.5 text-[0.75rem] text-white/35">
                Сообщение
              </div>
              <button
                type="button"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-white/45"
                aria-hidden
              >
                <Paperclip className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-white/45"
                aria-hidden
              >
                <Mic className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Iphone>
      </div>
    </div>
  );
};

const SignalBars = () => (
  <svg width="15" height="10" viewBox="0 0 15 10" fill="none" aria-hidden>
    <rect x="0" y="6.5" width="2.5" height="3.5" rx="0.5" fill="currentColor" />
    <rect x="4" y="4.5" width="2.5" height="5.5" rx="0.5" fill="currentColor" />
    <rect x="8" y="2.25" width="2.5" height="7.75" rx="0.5" fill="currentColor" />
    <rect x="12" y="0" width="2.5" height="10" rx="0.5" fill="currentColor" />
  </svg>
);

const BatteryIcon = () => (
  <svg width="22" height="10" viewBox="0 0 22 10" fill="none" aria-hidden>
    <rect
      x="0.6"
      y="0.6"
      width="18"
      height="8.8"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.2"
      opacity="0.9"
    />
    <rect x="2.2" y="2.2" width="14" height="5.6" rx="1" fill="currentColor" />
    <path
      d="M19.5 3.2C20.4 3.55 21 4.2 21 5S20.4 6.45 19.5 6.8V3.2Z"
      fill="currentColor"
      opacity="0.45"
    />
  </svg>
);

export default TelegramBotPrototype;
