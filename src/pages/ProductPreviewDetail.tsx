import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { ArrowUpRight, ChevronRight, CircleHelp, Moon, Phone, QrCode, Sun, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { SaasPreviewCard } from '@/components/SaasPreviewCard';
import {
  NfcConfigurator,
  NfcPhysicalCard,
  nfcActionLabel,
  nfcColorLabel,
  nfcShapeLabel,
  type NfcCardColor,
  type NfcCardShape,
  type NfcTapAction,
} from '@/components/NfcCardPreview';
import { TextWithSamopisInfo } from '@/components/SamopisInfo';
import LineSidebar from '@/components/ui/LineSidebar';
import LeadRequestPopover from '@/components/LeadRequestPopover';
import {
  getSaasPreviewItem,
  hasPreviewInteractiveDemo,
  saasAccentOptions,
  botHowItWorks,
  botMvpIncludes,
  saasHowItWorks,
  saasMvpIncludes,
  siteHowItWorks,
  siteMvpIncludes,
  nfcHowItWorks,
  nfcMvpIncludes,
  saasPreviewCatalog,
  type SaasAccentId,
  type SaasPreviewItem,
  type SaasThemeMode,
} from '@/data/saasPreviewCatalog';
import { readProductPreviewCompany } from '@/lib/productPreviewCompany';
import { cn } from '@/lib/utils';

const DESKTOP_FRAME_W = 1280;
const DESKTOP_FRAME_H = 800;

type SectionDef = {
  id: string;
  label: string;
};

const SaasDemoPreview = ({
  src,
  title,
  phone = false,
}: {
  src: string;
  title: string;
  phone?: boolean;
}) => {
  const shellRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const frameW = DESKTOP_FRAME_W;
  const frameH = DESKTOP_FRAME_H;

  useEffect(() => {
    if (phone) return;
    const shell = shellRef.current;
    if (!shell) return;

    const update = () => {
      const width = shell.clientWidth;
      if (width > 0) setScale(width / frameW);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(shell);
    return () => observer.disconnect();
  }, [frameW, phone]);

  if (phone) {
    return (
      <div className="mx-auto aspect-[433/882] w-full max-w-[22.5rem] overflow-hidden bg-transparent">
        <iframe
          key={src}
          title={title}
          src={src}
          className="h-full w-full border-0 bg-transparent"
        />
      </div>
    );
  }

  return (
    <div
      ref={shellRef}
      className="w-full overflow-hidden rounded-[1.25rem] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:rounded-[1.5rem]"
    >
      <div className="relative w-full" style={{ height: frameH * scale }}>
        <iframe
          key={src}
          title={title}
          src={src}
          className="absolute left-0 top-0 border-0"
          style={{
            width: frameW,
            height: frameH,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        />
      </div>
    </div>
  );
};

const ProductPreviewDetail = () => {
  const { saasId = '' } = useParams();
  const item = getSaasPreviewItem(saasId);
  const company = readProductPreviewCompany();
  const brand = company?.productName || 'Your Product';
  const companyName = company?.companyName || '';
  const userName = company?.userName || '';

  const [theme, setTheme] = useState<SaasThemeMode>(item?.theme ?? 'light');
  const [accent, setAccent] = useState<SaasAccentId>('blue');
  const [leadOpen, setLeadOpen] = useState(false);
  const [demoPage, setDemoPage] = useState(item?.demoPages[0]?.page ?? '');
  const [demoHelpOpen, setDemoHelpOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [siteBuild, setSiteBuild] = useState<'custom' | 'tilda'>('custom');
  const [nfcColor, setNfcColor] = useState<NfcCardColor>('black');
  const [nfcShape, setNfcShape] = useState<NfcCardShape>('rect');
  const [nfcAction, setNfcAction] = useState<NfcTapAction>('whatsapp');
  const mainRef = useRef<HTMLElement>(null);
  const scrollingFromClick = useRef(false);

  const sections = useMemo((): SectionDef[] => {
    if (!item) return [];
    const interactive = hasPreviewInteractiveDemo(item);
    const list: SectionDef[] = [
      { id: 'overview', label: 'Обзор' },
      { id: 'description', label: 'Описание' },
      { id: 'solves', label: 'Что делает' },
    ];
    if (interactive) list.push({ id: 'demo', label: 'Персонализация' });
    else if (item.section === 'nfc') list.push({ id: 'demo', label: 'Персонализация' });
    list.push(
      { id: 'audience', label: 'Для кого' },
      { id: 'inside', label: 'Что внутри' },
      { id: 'how', label: 'Как это работает' },
      { id: 'mvp', label: item.mvpTitle ? 'MVP' : 'Что в MVP' },
    );
    if (item.extras?.length) list.push({ id: 'extras', label: 'Дополнительно' });
    if (item.demoPages.some((page) => page.caption)) {
      list.push({ id: 'screens', label: 'Экраны демо' });
    }
    return list;
  }, [item]);

  const sidebarItems = useMemo(() => sections.map((section) => section.label), [sections]);

  useEffect(() => {
    if (item) {
      document.title = `${brand} ${item.title} — Agyra`;
      setTheme(item.theme);
      setDemoPage(item.demoPages[0]?.page ?? '');
      setActiveSection(0);
      setSiteBuild('custom');
      setNfcColor('black');
      setNfcShape('rect');
      setNfcAction('whatsapp');
    }
  }, [item, brand]);

  useEffect(() => {
    const root = mainRef.current;
    if (!root) return;
    const onScroll = () => setHeaderScrolled(root.scrollTop > 8);
    onScroll();
    root.addEventListener('scroll', onScroll, { passive: true });
    return () => root.removeEventListener('scroll', onScroll);
  }, [item?.id]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, []);

  useEffect(() => {
    const root = mainRef.current;
    if (!root || sections.length === 0) return;

    const nodes = sections
      .map((section) => root.querySelector<HTMLElement>(`#${section.id}`))
      .filter((node): node is HTMLElement => Boolean(node));

    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollingFromClick.current) return;
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        if (!top?.target.id) return;
        const index = sections.findIndex((section) => section.id === top.target.id);
        if (index >= 0) setActiveSection(index);
      },
      {
        root,
        rootMargin: '-15% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [sections, item?.id]);

  const buildSaasHref = (page?: string) => {
    if (!item) return '/';
    const params = new URLSearchParams({
      brand,
      user: userName,
      company: companyName,
      theme,
      accent,
    });
    if (page) params.set('page', page);
    return `${item.livePath}?${params.toString()}`;
  };

  const iframeSrc = useMemo(() => {
    if (!item) return '';
    const params = new URLSearchParams({
      brand,
      user: userName,
      company: companyName,
      theme,
      accent,
      embed: '1',
    });
    if (demoPage) params.set('page', demoPage);
    return `${item.livePath}?${params.toString()}`;
  }, [item, brand, userName, companyName, theme, accent, demoPage]);

  const liveHref = useMemo(
    () => buildSaasHref(demoPage),
    [item, brand, userName, companyName, theme, accent, demoPage],
  );

  const scrollToSection = (index: number) => {
    const root = mainRef.current;
    const section = sections[index];
    if (!root || !section) return;
    const el = root.querySelector<HTMLElement>(`#${section.id}`);
    if (!el) return;

    scrollingFromClick.current = true;
    setActiveSection(index);
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => {
      scrollingFromClick.current = false;
    }, 700);
  };

  if (!item) {
    return <Navigate to="/product-preview" replace />;
  }

  const demoTitle = `${brand} ${item.title}`;
  const activeDemoPage = item.demoPages.find((page) => page.page === demoPage);
  const demoCaption = activeDemoPage?.caption;
  const howItWorks =
    item.howItWorks ??
    [
      ...(item.section === 'bots'
        ? botHowItWorks
        : item.section === 'sites'
          ? siteHowItWorks
          : item.section === 'nfc'
            ? nfcHowItWorks
            : saasHowItWorks),
    ];
  const mvpIncludes =
    item.mvpIncludes ??
    [
      ...(item.section === 'bots'
        ? botMvpIncludes
        : item.section === 'sites'
          ? siteMvpIncludes
          : item.section === 'nfc'
            ? nfcMvpIncludes
            : saasMvpIncludes),
    ];
  const mvpTitle =
    item.mvpTitle ??
    (item.section === 'bots'
      ? 'Что включено в MVP бота'
      : item.section === 'sites'
        ? 'Что включено в сайт'
        : item.section === 'nfc'
          ? 'Что включено'
          : 'Что включено в MVP');
  const accentColor = saasAccentOptions.find((option) => option.id === accent)?.color ?? '#111111';
  const isBot = item.section === 'bots';
  const isNfc = item.section === 'nfc';
  const interactiveDemo = hasPreviewInteractiveDemo(item);

  return (
    <div
      className={cn(
        'relative flex h-[100svh] max-h-[100svh] flex-col overflow-hidden bg-[#ebebeb] text-black',
        'supports-[height:100dvh]:h-[100dvh] supports-[height:100dvh]:max-h-[100dvh]',
      )}
    >
      <main
        ref={mainRef}
        className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <header
          className={cn(
            'sticky top-0 z-20 flex shrink-0 items-center justify-between px-5 py-3 sm:px-8 sm:py-4',
            'transition-[background-color,backdrop-filter,border-color] duration-200',
            headerScrolled
              ? 'border-b border-black/[0.04] bg-[#ebebeb]/72 backdrop-blur-xl'
              : 'border-b border-transparent bg-transparent',
          )}
        >
          <Link to="/" className="text-sm font-semibold tracking-tight text-black no-underline">
            Agyra
          </Link>
          <Link
            to="/product-preview"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-black/40 no-underline transition-colors hover:bg-black/[0.05] hover:text-black"
            aria-label="К каталогу"
          >
            <X className="h-4 w-4" strokeWidth={2.25} />
          </Link>
        </header>

        <div className="flex min-h-0 flex-1 flex-col px-4 pb-4 sm:px-6 sm:pb-6 lg:px-10">
        <article className="mx-auto flex w-full max-w-6xl flex-col gap-5 pb-44 sm:gap-6 sm:pb-12">
          <ProductBreadcrumb brand={brand} title={item.title} />

          <div className="flex flex-col gap-4 sm:gap-5">
            <h1 className="m-0 text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
              {brand} {item.title}
            </h1>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-4">
                <div>
                  {item.priceFromTilda ? (
                    <div className="mb-2 inline-flex w-fit items-center rounded-full bg-black/[0.05] p-0.5">
                      <button
                        type="button"
                        aria-pressed={siteBuild === 'custom'}
                        onClick={() => setSiteBuild('custom')}
                        className={cn(
                          'cursor-pointer rounded-full border-none px-3 py-1.5 text-[0.75rem] font-semibold transition-colors',
                          siteBuild === 'custom'
                            ? 'bg-white text-black shadow-[0_1px_2px_rgba(0,0,0,0.06)]'
                            : 'bg-transparent text-black/45 hover:text-black/70',
                        )}
                      >
                        Самопис
                      </button>
                      <button
                        type="button"
                        aria-pressed={siteBuild === 'tilda'}
                        onClick={() => setSiteBuild('tilda')}
                        className={cn(
                          'cursor-pointer rounded-full border-none px-3 py-1.5 text-[0.75rem] font-semibold transition-colors',
                          siteBuild === 'tilda'
                            ? 'bg-white text-black shadow-[0_1px_2px_rgba(0,0,0,0.06)]'
                            : 'bg-transparent text-black/45 hover:text-black/70',
                        )}
                      >
                        Tilda
                      </button>
                    </div>
                  ) : item.id === 'site-marketplace' ? (
                    <TextWithSamopisInfo
                      text="Только самопис · на Tilda недоступно"
                      className="m-0 mb-2 text-sm text-black/40"
                    />
                  ) : null}
                  <p className="m-0 text-xl font-semibold tracking-tight sm:text-2xl">
                    {siteBuild === 'tilda' && item.priceFromTilda
                      ? `Tilda ${item.priceFromTilda}`
                      : item.priceFrom}
                  </p>
                  {siteBuild === 'tilda' && item.priceNoteTilda ? (
                    <p className="m-0 mt-1 text-sm text-black/50">{item.priceNoteTilda}</p>
                  ) : (
                    <TextWithSamopisInfo
                      text={item.priceNote}
                      className="m-0 mt-1 text-sm text-black/50"
                    />
                  )}
                </div>
                <div className="hidden sm:block">
                  <NeedThisButton onLead={() => setLeadOpen(true)} />
                </div>
              </div>
              <div className="hidden sm:block">
                {interactiveDemo ? (
                  <LiveDemoActions liveHref={liveHref} productLabel={`${brand} ${item.title}`} />
                ) : item.section === 'sites' || isNfc ? null : (
                  <Link
                    to={item.livePath}
                    className="inline-flex h-11 items-center gap-1.5 rounded-2xl bg-white px-5 text-sm font-semibold text-black no-underline"
                  >
                    Оставить заявку
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="relative flex gap-6 lg:gap-10">
            <aside className="sticky top-[4.75rem] hidden w-[11.5rem] shrink-0 self-start lg:block xl:w-[13rem]">
              <LineSidebar
                items={sidebarItems}
                accentColor={accentColor}
                textColor="#9ca3af"
                markerColor="#d1d5db"
                showIndex
                showMarker
                proximityRadius={100}
                maxShift={24}
                falloff="smooth"
                markerLength={48}
                markerGap={0}
                tickScale={0.5}
                scaleTick
                itemGap={18}
                fontSize={0.95}
                smoothing={100}
                defaultActive={0}
                active={activeSection}
                onItemClick={(index) => scrollToSection(index)}
              />
            </aside>

            <div className="min-w-0 flex-1 space-y-4">
              <nav className="flex gap-2 overflow-x-auto pb-1 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => scrollToSection(index)}
                    className={cn(
                      'shrink-0 cursor-pointer rounded-full border-none px-3 py-1.5 text-xs font-medium transition-colors',
                      activeSection === index
                        ? 'bg-black text-white'
                        : 'bg-black/[0.05] text-black/55',
                    )}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>

              <section id="overview" className="scroll-mt-24 space-y-3">
                {isNfc ? (
                  <div className="w-full overflow-hidden rounded-[1.25rem] bg-[#ece7df] px-4 py-10 sm:rounded-[1.5rem] sm:px-8 sm:py-14">
                    <div className="flex min-h-[14rem] items-center justify-center sm:min-h-[16rem]">
                      <NfcPhysicalCard
                        color={nfcColor}
                        shape={nfcShape}
                        brand={brand}
                        action={nfcAction}
                      />
                    </div>
                  </div>
                ) : interactiveDemo ? (
                  <div
                    className={cn(
                      'w-full overflow-hidden rounded-[1.25rem] bg-black/[0.04] p-2 sm:rounded-[1.5rem] sm:p-3 lg:p-4',
                      isBot && 'max-w-3xl',
                    )}
                  >
                    <SaasDemoPreview src={iframeSrc} title={demoTitle} phone={isBot} />
                  </div>
                ) : item.isCustom || item.section === 'sites' ? null : (
                  <div className="w-full max-w-3xl overflow-hidden rounded-[1.25rem] bg-black/[0.04] p-2 sm:rounded-[1.5rem] sm:p-3 lg:p-4">
                    <div className="mx-auto max-w-md overflow-hidden rounded-[1rem] bg-white">
                      <SaasPreviewCard
                        item={item}
                        productName={brand}
                        onOpen={() => undefined}
                      />
                    </div>
                  </div>
                )}
                {demoCaption && interactiveDemo ? (
                  <p className="m-0 text-sm leading-relaxed text-black/50">{demoCaption}</p>
                ) : null}
                {!interactiveDemo ? (
                  <p className="m-0 max-w-3xl text-sm leading-relaxed text-black/50">
                    {item.isCustom
                      ? 'Кастомный вариант без готового интерактивного демо — обсудим ТЗ и соберём решение под вас.'
                      : isNfc
                        ? 'Выберите цвет, форму и действие — так будет выглядеть карточка с вашим брендом.'
                      : item.section === 'sites'
                        ? 'Пример формата сайта. Живое демо собираем под ваш бренд после заявки.'
                        : 'Пример формата. Живое демо собираем под ваш бренд после заявки.'}
                  </p>
                ) : null}
              </section>

              <section id="description" className="scroll-mt-24 max-w-3xl space-y-4">
                <h2 className="m-0 text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-black/35">
                  Описание
                </h2>
                <div className="space-y-3">
                  {item.longDescription.split(/\n\n+/).map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 48)}
                      className="m-0 text-[0.975rem] leading-[1.7] text-black/70 sm:text-[1.0625rem]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>

              <section id="solves" className="scroll-mt-24 max-w-3xl space-y-4">
                <h2 className="m-0 text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-black/35">
                  Что делает это решение
                </h2>
                <div className="rounded-[1.25rem] border border-black/[0.05] bg-white/80 px-4 py-4 sm:px-5 sm:py-5">
                  <div className="space-y-3">
                    {item.solves.split(/\n\n+/).map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 48)}
                        className="m-0 text-[0.975rem] leading-[1.7] text-black/75 sm:text-[1.0625rem]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </section>

              {interactiveDemo ? (
                <section id="demo" className="scroll-mt-24 max-w-3xl">
                  <ControlsBlock
                    item={item}
                    demoPage={demoPage}
                    setDemoPage={setDemoPage}
                    demoHelpOpen={demoHelpOpen}
                    setDemoHelpOpen={setDemoHelpOpen}
                    theme={theme}
                    setTheme={setTheme}
                    accent={accent}
                    setAccent={setAccent}
                  />
                </section>
              ) : isNfc ? (
                <section id="demo" className="scroll-mt-24 max-w-3xl space-y-4">
                  <h2 className="m-0 text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-black/35">
                    Персонализация
                  </h2>
                  <NfcConfigurator
                    color={nfcColor}
                    shape={nfcShape}
                    action={nfcAction}
                    onColor={setNfcColor}
                    onShape={setNfcShape}
                    onAction={setNfcAction}
                  />
                </section>
              ) : null}

              <section id="audience" className="scroll-mt-24 max-w-3xl space-y-4">
                <h2 className="m-0 text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-black/35">
                  Для кого
                </h2>
                <p className="m-0 text-[0.975rem] leading-[1.7] text-black/70 sm:text-[1.0625rem]">
                  Это решение рассчитано на {item.audience}. Если узнаёте свой формат
                  бизнеса — {isNfc
                    ? 'ниже можно выбрать цвет, форму и действие карточки под ваш бренд.'
                    : 'демо покажет, как продукт будет выглядеть уже под вашим брендом и сценарием работы с клиентами.'}
                </p>
              </section>

              <section id="inside" className="scroll-mt-24 max-w-3xl space-y-4">
                <h2 className="m-0 text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-black/35">
                  Что внутри
                </h2>
                <p className="m-0 text-[0.975rem] leading-[1.7] text-black/65 sm:text-[1.0625rem]">
                  {isNfc
                    ? 'В карточке собраны форма, цвет и действие при касании — всё, что нужно согласовать перед печатью.'
                    : 'В демо собраны ключевые экраны и сценарии, из которых складывается рабочий продукт. Ниже — что именно вы увидите и сможете адаптировать под себя.'}
                </p>
                <ul className="m-0 list-none space-y-2 p-0">
                  {item.whatsInside.map((entry) => (
                    <li
                      key={entry}
                      className="flex gap-2.5 rounded-xl bg-white/60 px-3.5 py-2.5 text-sm leading-snug text-black/65"
                    >
                      <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-black/30" aria-hidden />
                      <span>{entry}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section id="how" className="scroll-mt-24 max-w-3xl space-y-4">
                <h2 className="m-0 text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-black/35">
                  Как это работает
                </h2>
                <p className="m-0 text-[0.975rem] leading-[1.7] text-black/65 sm:text-[1.0625rem]">
                  {isNfc
                    ? 'От выбора макета до готового тиража — короткий цикл: согласовали карточку, напечатали, запрограммировали чипы.'
                    : 'Путь от знакомства с демо до запуска на вашем домене — короткий и понятный. Вы смотрите сценарий, фиксируете требования, мы адаптируем продукт и передаём готовое решение.'}
                </p>
                <div className="rounded-2xl bg-[#eff6ff] px-3.5 py-3.5 text-sm leading-relaxed text-[#1d4ed8]">
                  <ol className="m-0 list-none space-y-2 p-0 text-[#1e40af]/0.92]">
                    {howItWorks.map((step, index) => (
                      <li key={step} className="flex gap-2.5">
                        <span className="shrink-0 font-semibold tabular-nums">{index + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </section>

              <section id="mvp" className="scroll-mt-24 max-w-3xl space-y-4">
                <h2 className="m-0 text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-black/35">
                  {mvpTitle}
                </h2>
                <p className="m-0 text-[0.975rem] leading-[1.7] text-black/65 sm:text-[1.0625rem]">
                  {isNfc
                    ? 'В стартовый комплект входит тираж, печать бренда, одно действие при касании и страница перехода.'
                    : 'В базовый запуск входит всё необходимое, чтобы начать пользоваться решением на реальных клиентах: экраны, логика, бренд и поддержка на старте.'}
                </p>
                <ul className="m-0 list-none space-y-2 p-0">
                  {mvpIncludes.map((entry) => (
                    <li
                      key={entry}
                      className="flex gap-2.5 rounded-xl bg-white/60 px-3.5 py-2.5 text-sm leading-snug text-black/65"
                    >
                      <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-black/30" aria-hidden />
                      <span>{entry}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {item.extras && item.extras.length > 0 && (
                <section id="extras" className="scroll-mt-24 max-w-3xl space-y-4">
                  <h2 className="m-0 text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-black/35">
                    Дополнительно
                  </h2>
                  <p className="m-0 text-[0.975rem] leading-[1.7] text-black/65 sm:text-[1.0625rem]">
                    Если нужны расширения сверх MVP — их можно подключить отдельно, когда
                    станет ясно, какие сценарии дают наибольший эффект.
                  </p>
                  <ul className="m-0 list-none space-y-2 p-0">
                    {item.extras.map((entry) => (
                      <li
                        key={entry}
                        className="flex gap-2.5 rounded-xl bg-white/60 px-3.5 py-2.5 text-sm leading-snug text-black/65"
                      >
                        <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-black/30" aria-hidden />
                        <span>{entry}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {item.demoPages.some((page) => page.caption) && (
                <section id="screens" className="scroll-mt-24 max-w-3xl space-y-4">
                  <h2 className="m-0 text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-black/35">
                    Экраны демо
                  </h2>
                  <p className="m-0 text-[0.975rem] leading-[1.7] text-black/65 sm:text-[1.0625rem]">
                    Каждый экран в демо отвечает за свой кусок процесса. Переключайте вкладки
                    выше и смотрите, как выглядит работа в продукте.
                  </p>
                  <ul className="m-0 list-none space-y-2.5 p-0">
                    {item.demoPages.map((page) => (
                      <li
                        key={page.id}
                        className="rounded-xl bg-white/60 px-3.5 py-2.5 text-sm leading-snug text-black/60"
                      >
                        <span className="font-semibold text-black/80">{page.label}</span>
                        {page.caption ? (
                          <span className="mt-0.5 block text-black/55">{page.caption}</span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>

          <RelatedSaasSection currentId={item.id} brand={brand} sectionId={item.section} />
        </article>
        </div>
      </main>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 sm:hidden">
        <div className="pointer-events-auto bg-gradient-to-t from-[#ebebeb] via-[#ebebeb]/95 to-transparent pt-10">
          <div className="flex flex-col gap-2">
            {interactiveDemo ? (
              <div className="px-4">
                <LiveDemoActions
                  liveHref={liveHref}
                  productLabel={`${brand} ${item.title}`}
                  qrPlacement="top"
                  showPhone
                />
              </div>
            ) : item.section === 'sites' || isNfc ? null : (
              <div className="px-4">
                <Link
                  to={item.livePath}
                  className="inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-2xl bg-white px-5 text-sm font-semibold text-black no-underline shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                >
                  Оставить заявку
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            )}
            <NeedThisButton
              onLead={() => setLeadOpen(true)}
              className="mt-0 h-auto min-h-12 w-full justify-center rounded-none rounded-t-2xl pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-none"
            />
          </div>
        </div>
      </div>

      <LeadRequestPopover
        open={leadOpen}
        onOpenChange={setLeadOpen}
        mode="dialog"
        saasExample={{
          id: item.id,
          title: item.title,
          brand,
          note: isNfc
            ? `${nfcColorLabel(nfcColor)} · ${nfcShapeLabel(nfcShape)} · ${nfcActionLabel(nfcAction)}`
            : undefined,
        }}
      />
    </div>
  );
};

function ProductBreadcrumb({ brand, title }: { brand: string; title: string }) {
  return (
    <nav
      aria-label="Путь"
      className="flex flex-wrap items-center gap-1 text-[0.75rem] font-medium text-black/40"
    >
      <Link
        to="/product-preview"
        className="text-black/45 no-underline transition-colors hover:text-black"
      >
        Каталог
      </Link>
      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-black/25" strokeWidth={2.25} />
      <span className="truncate text-black/70">
        {brand} {title}
      </span>
    </nav>
  );
}

function ControlsBlock({
  item,
  demoPage,
  setDemoPage,
  demoHelpOpen,
  setDemoHelpOpen,
  theme,
  setTheme,
  accent,
  setAccent,
}: {
  item: SaasPreviewItem;
  demoPage: string;
  setDemoPage: (page: string) => void;
  demoHelpOpen: boolean;
  setDemoHelpOpen: (open: boolean) => void;
  theme: SaasThemeMode;
  setTheme: (theme: SaasThemeMode) => void;
  accent: SaasAccentId;
  setAccent: (accent: SaasAccentId) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <div className="relative mb-2 flex items-center gap-1.5">
          <p className="m-0 text-xs font-semibold uppercase tracking-[0.06em] text-black/40">
            Страницы демо-версии
          </p>
          <button
            type="button"
            className="relative inline-flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border-none bg-transparent p-0 text-black/35 transition-colors hover:text-black/70"
            aria-label="Что доступно в демо"
            onMouseEnter={() => setDemoHelpOpen(true)}
            onMouseLeave={() => setDemoHelpOpen(false)}
            onFocus={() => setDemoHelpOpen(true)}
            onBlur={() => setDemoHelpOpen(false)}
          >
            <CircleHelp className="h-3.5 w-3.5" strokeWidth={2} />
            {demoHelpOpen && (
              <span
                role="tooltip"
                className="absolute left-1/2 top-[calc(100%+0.45rem)] z-20 w-[min(17.5rem,calc(100vw-3rem))] -translate-x-1/2 rounded-xl bg-[#111827] px-3 py-2.5 text-left text-[0.75rem] font-normal normal-case leading-relaxed tracking-normal text-white shadow-[0_12px_30px_rgba(0,0,0,0.22)]"
              >
                В демо-версии доступны не все экраны продукта, а только базовые страницы.
                Их достаточно, чтобы познакомиться с основным сценарием: как выглядит кабинет,
                как устроена навигация и что клиент увидит после запуска. Полный набор разделов,
                ролей и интеграций подключается уже в рабочей версии под ваш бизнес.
                <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-[#111827]" />
              </span>
            )}
          </button>
        </div>
        <div className="flex flex-wrap rounded-3xl bg-black/[0.05] p-1" role="tablist" aria-label="Страницы демо">
          {item.demoPages.map((page) => {
            const active = demoPage === page.page;
            return (
              <button
                key={page.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setDemoPage(page.page)}
                className={cn(
                  'inline-flex h-8 cursor-pointer items-center justify-center rounded-3xl border-none px-3.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-black/[0.08] text-black'
                    : 'bg-transparent text-black/60 hover:text-black',
                )}
              >
                {page.label}
              </button>
            );
          })}
        </div>
      </div>

      {item.section === 'saas' ? (
        <>
          <div>
            <p className="m-0 mb-2 text-xs font-semibold uppercase tracking-[0.06em] text-black/40">
              Тема
            </p>
            <div className="flex flex-wrap rounded-3xl bg-black/[0.05] p-1">
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={cn(
                  'inline-flex h-8 cursor-pointer items-center justify-center gap-1 rounded-3xl border-none px-3.5 text-sm font-medium transition-colors',
                  theme === 'light'
                    ? 'bg-black/[0.08] text-black'
                    : 'bg-transparent text-black/60 hover:text-black',
                )}
              >
                <Sun className="h-4 w-4" />
                Светлая
              </button>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={cn(
                  'inline-flex h-8 cursor-pointer items-center justify-center gap-1 rounded-3xl border-none px-3.5 text-sm font-medium transition-colors',
                  theme === 'dark'
                    ? 'bg-black/[0.08] text-black'
                    : 'bg-transparent text-black/60 hover:text-black',
                )}
              >
                <Moon className="h-4 w-4" />
                Тёмная
              </button>
            </div>
          </div>

          <div>
            <p className="m-0 mb-2 text-xs font-semibold uppercase tracking-[0.06em] text-black/40">
              Цвет акцента
            </p>
            <div className="flex flex-wrap gap-1 rounded-3xl bg-black/[0.05] p-1">
              {saasAccentOptions.map((option) => {
                const active = accent === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setAccent(option.id)}
                    aria-label={option.label}
                    aria-pressed={active}
                    className={cn(
                      'inline-flex h-8 cursor-pointer items-center justify-center rounded-3xl border-none px-3.5 transition-colors',
                      active ? 'bg-black/[0.08]' : 'bg-transparent hover:bg-black/[0.04]',
                    )}
                  >
                    <span className="h-5 w-5 rounded-full" style={{ backgroundColor: option.color }} />
                  </button>
                );
              })}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

const PHONE_HREF = 'tel:89303811111';

function NeedThisButton({ onLead, className }: { onLead: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onLead}
      className={cn(
        'relative z-0 inline-flex h-11 w-fit cursor-pointer items-center gap-3 mt-4 overflow-visible rounded-2xl border-none bg-black py-0 pr-5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,0.16)] transition-opacity hover:opacity-90 sm:h-12 sm:gap-3.5 sm:pr-6 sm:shadow-none',
        className,
      )}
    >
      <img
        src="/need-this-mascot.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 z-[1] h-[4.75rem] w-auto max-w-none select-none object-contain object-left-bottom sm:h-[5.5rem]"
      />
      <span className="relative hidden w-[4.25rem] shrink-0 self-stretch sm:block sm:w-[4.75rem]" aria-hidden />
      <span className="relative z-[1] whitespace-nowrap">Мне нужен такой</span>
    </button>
  );
}

function LiveDemoActions({
  liveHref,
  productLabel,
  qrPlacement = 'bottom',
  showPhone = false,
}: {
  liveHref: string;
  productLabel: string;
  qrPlacement?: 'top' | 'bottom';
  showPhone?: boolean;
}) {
  const [qrOpen, setQrOpen] = useState(false);
  const [absoluteUrl, setAbsoluteUrl] = useState(liveHref);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      setAbsoluteUrl(new URL(liveHref, window.location.origin).toString());
    } catch {
      setAbsoluteUrl(liveHref);
    }
  }, [liveHref]);

  const openQr = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setQrOpen(true);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setQrOpen(false), 120);
  };

  const closeQr = () => setQrOpen(false);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  useEffect(() => {
    if (!showPhone || !qrOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeQr();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [showPhone, qrOpen]);

  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=12&data=${encodeURIComponent(absoluteUrl)}`;
  const qrPopoverSrc = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=8&data=${encodeURIComponent(absoluteUrl)}`;

  return (
    <div
      className={cn(
        'flex min-w-0 items-stretch rounded-2xl bg-black/[0.05] sm:flex-initial sm:items-end',
        showPhone ? 'w-full' : 'w-fit',
      )}
    >
      <a
        href={liveHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Посмотреть в лайв"
        className="inline-flex h-11 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-2xl bg-white px-4 text-sm font-semibold text-black no-underline shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-colors hover:bg-black/[0.04] sm:h-12 sm:w-fit sm:flex-initial sm:px-6 sm:shadow-none"
      >
        <span className="truncate whitespace-nowrap">Посмотреть в лайв</span>
        <ArrowUpRight className="h-4 w-4 shrink-0" />
      </a>

      <div
        className="relative w-11 shrink-0 sm:w-12"
        onMouseEnter={showPhone ? undefined : openQr}
        onMouseLeave={showPhone ? undefined : scheduleClose}
      >
        <button
          type="button"
          aria-label="QR-код демо"
          aria-expanded={qrOpen}
          onClick={showPhone ? () => setQrOpen(true) : undefined}
          onFocus={showPhone ? undefined : openQr}
          onBlur={showPhone ? undefined : scheduleClose}
          className={cn(
            'inline-flex h-11 w-full cursor-pointer items-center justify-center rounded-2xl border-none bg-transparent text-black transition-colors hover:bg-black/[0.04] sm:h-12',
            qrOpen && 'bg-black/[0.06]',
          )}
        >
          <QrCode className="h-5 w-5" strokeWidth={2} />
        </button>

        {!showPhone && (
          <AnimatePresence>
            {qrOpen && (
              <motion.div
                role="dialog"
                aria-label={`QR-код для ${productLabel}`}
                initial={{ opacity: 0, y: qrPlacement === 'top' ? 6 : -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: qrPlacement === 'top' ? 4 : -4, scale: 0.98 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  'absolute right-0 z-30 w-[13.5rem] rounded-2xl border border-black/10 bg-white p-3 shadow-[0_16px_40px_rgba(0,0,0,0.14)]',
                  qrPlacement === 'top'
                    ? 'bottom-[calc(100%+0.5rem)]'
                    : 'top-[calc(100%+0.5rem)]',
                )}
                onMouseEnter={openQr}
                onMouseLeave={scheduleClose}
              >
                <img
                  src={qrPopoverSrc}
                  alt={`QR-код: ${productLabel}`}
                  width={200}
                  height={200}
                  className="h-auto w-full rounded-xl bg-white"
                />
                <p className="m-0 mt-2 text-center cursor-default text-[0.7rem] leading-snug text-black/50">
                  Наведите камеру — откроется лайв
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {showPhone && (
        <a
          href={PHONE_HREF}
          aria-label="Позвонить"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-black no-underline transition-colors hover:bg-black/[0.04]"
        >
          <Phone className="h-5 w-5" strokeWidth={2} />
        </a>
      )}

      {showPhone &&
        typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {qrOpen && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={`QR-код для ${productLabel}`}
                initial={{ opacity: 0, y: '12%' }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: '8%' }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-0 z-[120] flex flex-col bg-[#f5f5f5]"
              >
                <div className="flex shrink-0 items-center justify-end px-4 pb-2 pt-[max(0.75rem,env(safe-area-inset-top))]">
                  <button
                    type="button"
                    onClick={closeQr}
                    aria-label="Закрыть"
                    className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-none bg-black/[0.06] p-0 text-black transition-colors hover:bg-black/[0.1]"
                  >
                    <X className="h-5 w-5" strokeWidth={2.25} />
                  </button>
                </div>

                <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-8 pb-[max(2rem,env(safe-area-inset-bottom))]">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.28, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full max-w-[17.5rem] rounded-[1.5rem] bg-white p-5 shadow-[0_16px_48px_rgba(0,0,0,0.1)]"
                  >
                    <img
                      src={qrSrc}
                      alt={`QR-код: ${productLabel}`}
                      width={280}
                      height={280}
                      className="h-auto w-full rounded-2xl bg-white"
                    />
                  </motion.div>
                  <p className="m-0 mt-5 max-w-[17.5rem] cursor-default text-center text-sm leading-snug text-black/50">
                    Наведите камеру — откроется лайв
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}

function RelatedSaasSection({
  currentId,
  brand,
  sectionId,
}: {
  currentId: string;
  brand: string;
  sectionId: SaasPreviewItem['section'];
}) {
  const navigate = useNavigate();
  const related = saasPreviewCatalog
    .filter((entry) => entry.id !== currentId && entry.section === sectionId && !entry.isCustom)
    .slice(0, 3);
  if (related.length === 0) return null;

  return (
    <section className="mt-4 border-t border-black/[0.06] pt-10 sm:mt-6 sm:pt-12">
      <Link
        to="/product-preview"
        className="group mb-5 inline-flex w-fit items-center gap-1.5 no-underline"
      >
        <span
          className={cn(
            'border-0 border-b border-transparent pb-0.5',
            'text-[clamp(1.25rem,2.5vw,1.75rem)] font-semibold tracking-[-0.03em] text-black',
            'transition-[border-color] duration-200 group-hover:border-dashed group-hover:border-black/45',
          )}
        >
          Смотрите еще
        </span>
        <ChevronRight className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" strokeWidth={2.25} />
      </Link>
      <div className="grid gap-3 sm:grid-cols-3 sm:gap-4 lg:gap-5">
        {related.map((entry) => (
          <SaasPreviewCard
            key={entry.id}
            item={entry}
            productName={brand}
            onOpen={() => navigate(`/product-preview/${entry.id}`)}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductPreviewDetail;
