import type { SaasPreviewItem } from '@/data/saasPreviewCatalog';
import { getSaasPreviewItem, saasPreviewCatalog } from '@/data/saasPreviewCatalog';

export type AiLeadDraft = {
  channel: string;
  /** Основное / активное решение (для демо). */
  productId: string;
  /** Все рекомендованные решения (пакет). */
  productIds: string[];
  /** Человекочитаемый список решений. */
  productTitle: string;
  name: string;
  phone: string;
  notes: string;
  ready: boolean;
};

export type AiChoicePrompt = {
  field: keyof Pick<AiLeadDraft, 'channel' | 'productId'> | string;
  options: string[];
  allowCustom: boolean;
};

export const emptyAiLeadDraft = (): AiLeadDraft => ({
  channel: '',
  productId: '',
  productIds: [],
  productTitle: '',
  name: '',
  phone: '',
  notes: '',
  ready: false,
});

const LEAD_KEYS = [
  'channel',
  'productId',
  'productIds',
  'productTitle',
  'name',
  'phone',
  'notes',
] as const;

/** Legacy AI markers → fold into notes (no separate form fields). */
const NOTE_LEAD_ALIASES: Record<string, string> = {
  niche: 'Ниша',
  goal: 'Цель',
  timeline: 'Срок',
  price: 'Цена',
};

type LeadKey = (typeof LEAD_KEYS)[number];

const isLeadKey = (value: string): value is LeadKey =>
  (LEAD_KEYS as readonly string[]).includes(value);

const isCatalogId = (id: string) =>
  saasPreviewCatalog.some((item: SaasPreviewItem) => item.id === id);

export function parseProductIdList(value: string): string[] {
  const ids: string[] = [];
  const seen = new Set<string>();
  for (const part of value.split(/[|,;/]+/)) {
    const id = part.trim();
    if (!id || seen.has(id) || !isCatalogId(id)) continue;
    seen.add(id);
    ids.push(id);
  }
  return ids;
}

export function titlesForProductIds(ids: string[]): string {
  return ids
    .map((id) => getSaasPreviewItem(id)?.title ?? id)
    .filter(Boolean)
    .join(' + ');
}

/** Достаёт мин/макс недель из priceNote каталога. */
export function weekBoundsFromPriceNote(note: string): [number, number] | null {
  const text = note.trim();
  if (!text) return null;

  const dayRange = text.match(/(\d+)\s*[–—-]\s*(\d+)\s*д/i);
  if (dayRange) {
    const min = Math.max(1, Math.ceil(Number(dayRange[1]) / 7));
    const max = Math.max(min, Math.ceil(Number(dayRange[2]) / 7));
    return [min, max];
  }

  const weekRange = text.match(/(\d+)\s*[–—-]\s*(\d+)/);
  if (weekRange) {
    const min = Number(weekRange[1]);
    const max = Number(weekRange[2]);
    if (min > 0 && max >= min) return [min, max];
  }

  const singleWeek = text.match(/(\d+)\s*недел/i);
  if (singleWeek) {
    const n = Number(singleWeek[1]);
    if (n > 0) return [n, n];
  }

  const singleDay = text.match(/(\d+)\s*д/i);
  if (singleDay) {
    const n = Math.max(1, Math.ceil(Number(singleDay[1]) / 7));
    return [n, n];
  }

  return null;
}

/** Компактная строка для заметок: «CRM, Лендинг, Срок: от 2 до 4 недель.» */
export function buildProductsTimelineNote(ids: string[]): string {
  const titles = ids
    .map((id) => getSaasPreviewItem(id)?.title)
    .filter((title): title is string => Boolean(title));
  if (!titles.length) return '';

  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;
  for (const id of ids) {
    const bounds = weekBoundsFromPriceNote(getSaasPreviewItem(id)?.priceNote ?? '');
    if (!bounds) continue;
    min = Math.min(min, bounds[0]);
    max = Math.max(max, bounds[1]);
  }

  const names = titles.join(', ');
  if (!Number.isFinite(min) || !Number.isFinite(max)) return names;
  if (min === max) {
    return `${names}, Срок: ${min} ${min === 1 ? 'неделя' : min < 5 ? 'недели' : 'недель'}.`;
  }
  return `${names}, Срок: от ${min} до ${max} недель.`;
}

/**
 * Чистит notes от цен/дублей сроков по продуктам и добавляет компактный срок пакета.
 * Пример: «пакет: CRM + лендинг; бюджет…; цель…; CRM, Лендинг, Срок: от 2 до 4 недель.»
 */
export function sanitizeLeadNotes(notes: string, productIds: string[] = []): string {
  let text = notes.trim();
  if (!text && !productIds.length) return '';

  const titles = productIds
    .map((id) => getSaasPreviewItem(id)?.title)
    .filter((title): title is string => Boolean(title));

  // Убрать «CRM: от 20k ₽», «Лендинг: от 40k ₽», «Цена: …»
  text = text.replace(/(?:^|;\s*)Цена:\s*[^;]+/gi, '');
  text = text.replace(
    /(?:^|;\s*)(?:от\s*)?\d[\d\s]*(?:[\s ]*000)?\s*(?:₽|руб\.?|k|к)\b[^;]*/gi,
    '',
  );
  for (const title of titles) {
    const escaped = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    text = text.replace(
      new RegExp(`(?:^|;\\s*)${escaped}\\s*:\\s*от\\s*[^;]+`, 'gi'),
      '',
    );
    text = text.replace(
      new RegExp(`(?:^|;\\s*)Срок\\s*\\(\\s*${escaped}\\s*\\)\\s*:\\s*[^;]+`, 'gi'),
      '',
    );
  }
  // Любые «Срок (…): …» и одиночные «Срок: 2–3 недели» / «срок 2–3 недели»
  text = text.replace(/(?:^|;\s*)Срок\s*\([^)]+\)\s*:\s*[^;]+/gi, '');
  text = text.replace(/(?:^|;\s*)Срок\s*:\s*[^;]+/gi, '');
  text = text.replace(/(?:^|;\s*)[^;]+,\s*Срок\s*:\s*[^;]+/gi, '');

  // Склеить разделители
  text = text
    .replace(/\s*;\s*;+/g, '; ')
    .replace(/^(?:;\s*)+|(?:;\s*)+$/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

  const timeline = buildProductsTimelineNote(productIds);
  if (timeline) {
    // Убрать хвостовую точку у предыдущего куска перед склейкой
    text = text.replace(/[.;]\s*$/, '');
    text = text ? `${text}; ${timeline}` : timeline;
  }

  return text.replace(/\s*;\s*/g, '; ').replace(/^(?:;\s*)+|(?:;\s*)+$/g, '').trim();
}

/** Нормализует productId / productIds / productTitle в согласованный пакет. */
export function normalizeLeadProducts(
  draft: Pick<AiLeadDraft, 'productId' | 'productIds' | 'productTitle'>,
): Pick<AiLeadDraft, 'productId' | 'productIds' | 'productTitle'> {
  const ids: string[] = [];
  const seen = new Set<string>();
  const push = (id: string) => {
    const next = id.trim();
    if (!next || seen.has(next) || !isCatalogId(next)) return;
    seen.add(next);
    ids.push(next);
  };

  (draft.productIds ?? []).forEach(push);
  push(draft.productId);

  const productId = ids[0] ?? '';
  const productTitle =
    ids.length > 0 ? titlesForProductIds(ids) : draft.productTitle.trim();

  return { productId, productIds: ids, productTitle };
}

/** Catalog digest for the preview AI recommender (prices + positioning). */
export function buildPreviewAiSystemPrompt(brand?: string): string {
  const lines = saasPreviewCatalog.map((item) => {
    const custom = item.isCustom ? ' | КАСТОМ' : '';
    const tags = item.tags.length ? ` | теги: ${item.tags.join(', ')}` : '';
    const tilda = item.priceFromTilda
      ? ` | Tilda: ${item.priceFromTilda}${item.priceNoteTilda ? ` (${item.priceNoteTilda})` : ''}`
      : item.section === 'sites' && item.id === 'site-marketplace'
        ? ' | Tilda: нет'
        : '';
    return `- id=${item.id} | раздел=${item.section}${custom} | «${item.title}» | ${item.priceFrom} (${item.priceNote})${tilda} | для: ${item.audience} | суть: ${item.description}${tags}`;
  });

  return `Ты — сильный продукт-консультант студии Agyra.
Главная задача: СРАЗУ дать клиенту ясный ориентир по его запросу — что брать, почему, цена и срок.
Сбор заявки — вторичен. Ты не анкета и не квиз: не начинай с выуживания данных.
${brand ? `Бренд клиента: «${brand}». Можно упомянуть, но не спрашивай «в какой нише бренд», если человек уже назвал продукт/задачу.` : ''}

# КАТАЛОГ
${lines.join('\n')}

Дополнительно: автоматизация/интеграции от 40k ₽, 2–6 недель (без [OPEN:]).

# ПОРЯДОК ОТВЕТА (жёстко)
1) Сначала ОТВЕТЬ на запрос: что именно подходит из каталога и зачем.
2) Дай цену и срок из каталога (для пакета — по каждому решению и суммарно ориентир).
3) В конце блока **Рекомендация:** обязательно поставь [OPEN:id] (один или несколько). UI покажет демо слева.
4) Заполни LEAD по тому, что УЖЕ ясно. В [LEAD:notes=...] пиши только смысл: пакет / цель / бюджет клиента / детали.
   НЕ пиши в notes цены продуктов и НЕ дублируй сроки по каждому (нельзя: «CRM: от 20k ₽; Срок (CRM): …; Лендинг: от …»).
   UI сам добавит компактный срок. Формат notes для пакета:
   «пакет: CRM + лендинг; бюджет до 200к; цель: лиды с лендинга в воронку продаж»
   (без цен и без «Срок (…):»).
5) Только ПОТОМ — одно короткое уточнение с [CHOICE:], если оно реально улучшит подбор.
   Нельзя: ответить только «уточните нишу» без рекомендации.
   Нельзя: гадать соцсеть («скорее всего Instagram»). Если канал критичен — CHOICE, но ПОСЛЕ базовой рекомендации.

# ОДНО vs НЕСКОЛЬКО РЕШЕНИЙ
- Если запрос закрывается ОДНИМ продуктом — один [OPEN:id] и [LEAD:productId=id].
- Если клиенту нужно НЕСКОЛЬКО вещей сразу (например FAQ-бот + интернет-магазин, лендинг + бот заявок, CRM + запись):
  это ПАКЕТ (AND), не «альтернатива».
  → В **Рекомендация:** перечисли 2–3 решения с ролью каждого + [OPEN:id1] [OPEN:id2] …
  → В LEAD: [LEAD:productIds=id1|id2] и [LEAD:productId=id1] (главное / первое демо).
  → В **Цена и срок:** цена и срок по каждому + кратко «пакет».
  → НЕ пихай второй продукт в **Альтернатива:** — альтернатива это OR (вместо), пакет это AND (вместе).
- **Альтернатива:** только если есть замена основного варианта, не второе обязательное решение.

# ПРИМЕРЫ ПРАВИЛЬНОГО ПОВЕДЕНИЯ
Запрос: «Лендинг под рекламу»
→ Сразу: вам нужен лендинг под лиды [OPEN:site-landing], от 15k ₽, 2–3 недели; зачем (одна страница под оффер/рекламу); альтернатива визитка/кастом если много страниц.
→ LEAD:productId=site-landing; notes=цель: сбор лидов с рекламы.
→ Уточнение опционально: откуда трафик — [CHOICE:channel|Яндекс/Google|Telegram|Instagram|VK|Другое]
НЕ начинай с «уточните нишу бренда».

Запрос: «Бот для заявок»
→ Сразу bot-leads + цена + [OPEN:bot-leads], затем CHOICE канала если нужно.

Запрос: «Нужен Telegram-бот с FAQ и интернет-магазин»
→ Пакет: FAQ-бот [OPEN:bot-faq] + магазин [OPEN:site-shop].
→ LEAD: [LEAD:productIds=bot-faq|site-shop] [LEAD:productId=bot-faq]
→ notes=пакет: FAQ-бот + интернет-магазин (БЕЗ цен и БЕЗ сроков по каждому).
→ Не клади магазин в «Альтернатива».

Запрос: «CRM и лендинг, бюджет до 200к»
→ Пакет [OPEN:crm] [OPEN:site-landing]
→ notes=пакет: CRM + лендинг; бюджет до 200к; цель: лиды с лендинга в воронку продаж
→ НЕ писать в notes «CRM: от 20k ₽» и «Срок (Лендинг): …».

# ЗАПРЕТ УГАДЫВАНИЯ
- Не приписывай канал/соцсеть, которых клиент не назвал.
- Не выдумывай цены/id вне каталога.
- Не используй [LEAD:niche], [LEAD:goal], [LEAD:timeline], [LEAD:price] — только notes.

# МАРКЕРЫ (клиент не видит)
Выбор (не больше одного за ответ, и только после рекомендации):
[CHOICE:field|Вариант1|Вариант2|Вариант3|Другое]
field: channel (реже productId)

Заявка:
[LEAD:channel=...]
[LEAD:productId=site-landing] [LEAD:productTitle=Лендинг]
[LEAD:productIds=bot-faq|site-shop]  ← для пакета (id через | )
[LEAD:notes=пакет / цель / бюджет клиента / детали — БЕЗ цен продуктов и БЕЗ «Срок (Название): …»]
Когда channel + хотя бы один productId есть — [LEAD_READY] и фраза, что заявку можно передать менеджеру.

Карточки: [OPEN:id] — можно несколько подряд для пакета.

# МАТРИЦА
- лендинг / реклама / лиды с одной страницы → site-landing
- визитка / несколько страниц → site-card
- магазин → site-shop; маркетплейс (самопис, без Tilda) → site-marketplace; запись на сайте → site-booking; корпоратив → site-corporate
- заявки в мессенджере → bot-leads; FAQ → bot-faq; запись в TG → bot-booking
- CRM / сделки → crm; запись в кабинете → booking; чат с сайта → support; финансы → finance
- нестандарт → custom-saas / custom-bot / custom-site

# ФОРМАТ ВИДИМОГО ТЕКСТА (первый ответ)
**Понял задачу:** 1 фраза своими словами (по факту запроса, без выдумок).
**Рекомендация:** чёткий ответ — что брать и почему + в конце [OPEN:id…] (ОБЯЗАТЕЛЬНО; для пакета — все id пакета).
**Цена и срок:** из каталога (по каждому, если пакет).
**Как открыть:** не нужен — демо рисует интерфейс слева; не пиши этот блок.
**Альтернатива:** только OR-замена, не второе обязательное решение пакета.
**Уточнение:** максимум 1 вопрос + [CHOICE:...] — только если без этого нельзя сузить; иначе пропусти блок.

# FOLLOW-UP (второй и далее ответы)
Если продукт/пакет уже рекомендован в этом диалоге:
- НЕ повторяй **Понял задачу:**, **Рекомендация:**, **Альтернатива:**, **Как открыть:**.
- НЕ пересказывай, «что нужно клиенту» и зачем тот же продукт.
- Отвечай только на новый вопрос: срок, цена, канал, следующий шаг.
- Допустимые блоки: **Цена и срок:** / **Уточнение:** / **Что дальше:** — коротко.
- Не ставь повторный [OPEN:id], если набор решений не меняется. Новый [OPEN:] / productIds — только при смене или расширении пакета.

# ЖЁСТКИЕ ПРАВИЛА
1. Если запрос уже понятен (лендинг / бот заявок / CRM / запись / пакет) — рекомендуй сразу, не допрашивай.
2. Не превращай диалог в сбор анкеты. Заявка заполняется из уже сказанного + мягких уточнений.
3. Один [CHOICE:] за ответ, после ценности.
4. Русский, деловой, коротко, без воды.
5. Не дублируй одну и ту же рекомендацию в каждом сообщении.
6. Пакет ≠ альтернатива: вместе → несколько [OPEN:] в Рекомендации; вместо → Альтернатива.`;
}

export function extractPreviewOpenIds(text: string): string[] {
  const ids: string[] = [];
  const seen = new Set<string>();
  const patterns = [
    /\[OPEN:([a-z0-9-]+)\]/gi,
    /\[[^\]]*\]\(OPEN:([a-z0-9-]+)\)/gi,
  ];

  for (const re of patterns) {
    let match: RegExpExecArray | null;
    while ((match = re.exec(text)) !== null) {
      const id = match[1];
      if (!id || seen.has(id)) continue;
      if (isCatalogId(id)) {
        seen.add(id);
        ids.push(id);
      }
    }
  }

  return ids;
}

export function extractAiChoice(text: string): AiChoicePrompt | null {
  const match = text.match(/\[CHOICE:([a-zA-Z0-9_]+)\|([^\]]+)\]/i);
  if (!match) return null;
  const field = match[1]?.trim() ?? '';
  const options = (match[2] ?? '')
    .split('|')
    .map((part) => part.trim())
    .filter(Boolean);
  if (!field || options.length < 2) return null;
  const allowCustom = options.some(
    (option) => /^другое$/i.test(option) || option === '__custom__',
  );
  return {
    field,
    options: options.filter((option) => option !== '__custom__'),
    allowCustom,
  };
}

export function extractLeadUpdates(text: string): Partial<AiLeadDraft> {
  const updates: Partial<AiLeadDraft> = {};
  const noteBits: string[] = [];
  const collectedIds: string[] = [];
  const re = /\[LEAD:([a-zA-Z0-9_]+)=([^\]]*)\]/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    const key = match[1]?.trim() ?? '';
    const value = (match[2] ?? '').trim();
    if (!value) continue;
    const noteLabel = NOTE_LEAD_ALIASES[key];
    if (noteLabel) {
      noteBits.push(`${noteLabel}: ${value}`);
      continue;
    }
    if (key === 'productIds') {
      collectedIds.push(...parseProductIdList(value));
      continue;
    }
    if (!isLeadKey(key)) continue;
    if (key === 'productId') {
      const parsed = parseProductIdList(value);
      collectedIds.push(...(parsed.length ? parsed : []));
      if (parsed[0]) updates.productId = parsed[0];
      else if (isCatalogId(value)) {
        collectedIds.push(value);
        updates.productId = value;
      }
      continue;
    }
    if (key === 'productIds') continue;
    updates[key] = value as never;
  }

  if (collectedIds.length) {
    const unique = parseProductIdList(collectedIds.join('|'));
    updates.productIds = unique;
    if (!updates.productId) updates.productId = unique[0] ?? '';
    updates.productTitle = titlesForProductIds(unique);
  } else if (updates.productId) {
    const item = getSaasPreviewItem(updates.productId);
    if (item && !updates.productTitle) updates.productTitle = item.title;
    updates.productIds = [updates.productId];
  }

  const productIds = updates.productIds ?? [];
  if (noteBits.length) {
    const existing = updates.notes?.trim() ?? '';
    updates.notes = existing
      ? `${existing}; ${noteBits.join('; ')}`
      : noteBits.join('; ');
  }

  if (updates.notes || productIds.length) {
    updates.notes = sanitizeLeadNotes(updates.notes ?? '', productIds);
  }

  if (/\[LEAD_READY\]/i.test(text)) {
    updates.ready = true;
  }
  return updates;
}

export function mergeAiLeadDraft(
  current: AiLeadDraft,
  updates: Partial<AiLeadDraft>,
): AiLeadDraft {
  const merged: AiLeadDraft = {
    ...current,
    ...Object.fromEntries(
      Object.entries(updates).filter(([, value]) => value !== undefined),
    ),
  } as AiLeadDraft;

  if (updates.productIds || updates.productId) {
    const fromUpdate = normalizeLeadProducts({
      productId: updates.productId ?? '',
      productIds: updates.productIds ?? [],
      productTitle: updates.productTitle ?? '',
    });

    if (updates.productIds?.length) {
      merged.productIds = fromUpdate.productIds;
      merged.productId = updates.productId?.trim() || fromUpdate.productId;
      merged.productTitle = fromUpdate.productTitle;
    } else {
      const combined = normalizeLeadProducts({
        productId: fromUpdate.productId || current.productId,
        productIds: [...(current.productIds ?? []), ...fromUpdate.productIds],
        productTitle: fromUpdate.productTitle || current.productTitle,
      });
      merged.productIds = combined.productIds;
      merged.productId = updates.productId?.trim() || combined.productId;
      merged.productTitle = combined.productTitle;
    }

    const synced = normalizeLeadProducts(merged);
    merged.productId = synced.productId;
    merged.productIds = synced.productIds;
    merged.productTitle = synced.productTitle;
  }

  return merged;
}

export function stripPreviewOpenMarkers(text: string): string {
  return text
    .replace(/\s*\[[^\]]*\]\(OPEN:[a-z0-9-]+\)/gi, '')
    .replace(/\s*\[OPEN:[a-z0-9-]+\]/gi, '')
    .replace(/\s*\[CHOICE:[^\]]+\]/gi, '')
    .replace(/\s*\[LEAD:[^\]]+\]/gi, '')
    .replace(/\s*\[LEAD_READY\]/gi, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export type PreviewAiSection = {
  title: string;
  body: string;
};

export type PreviewAiParsedMessage = {
  preface: string;
  sections: PreviewAiSection[];
};

/** Разбивает ответ ассистента на секции вида **Заголовок:** … */
export function parsePreviewAiMessage(raw: string): PreviewAiParsedMessage {
  const text = raw
    .replace(/\s*\[CHOICE:[^\]]+\]/gi, '')
    .replace(/\s*\[LEAD:[^\]]+\]/gi, '')
    .replace(/\s*\[LEAD_READY\]/gi, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  if (!text) return { preface: '', sections: [] };

  const markerRe = /\*\*([^*]+?)\*\*:\s*/g;
  const markers = [...text.matchAll(markerRe)];

  if (markers.length === 0) {
    return { preface: text, sections: [] };
  }

  const firstIndex = markers[0]?.index ?? 0;
  const preface = text.slice(0, firstIndex).trim();
  const sections: PreviewAiSection[] = [];

  markers.forEach((marker, i) => {
    const start = (marker.index ?? 0) + marker[0].length;
    const end = markers[i + 1]?.index ?? text.length;
    sections.push({
      title: (marker[1] ?? '').trim(),
      body: text.slice(start, end).trim(),
    });
  });

  return { preface, sections };
}

export function stripInlineBoldMarkers(text: string): string {
  return text.replace(/\*\*([^*]+)\*\*/g, '$1');
}

export function isAiLeadReady(draft: AiLeadDraft): boolean {
  return Boolean(
    draft.ready &&
      draft.channel.trim() &&
      (draft.productId.trim() ||
        draft.productTitle.trim() ||
        (draft.productIds?.length ?? 0) > 0),
  );
}

export function aiLeadProgress(draft: AiLeadDraft): { filled: number; total: number } {
  const checks = [
    draft.channel,
    draft.productId || draft.productTitle || (draft.productIds?.length ? '1' : ''),
    draft.notes,
    draft.name && draft.phone,
  ];
  const filled = checks.filter((value) => Boolean(String(value || '').trim())).length;
  return { filled, total: checks.length };
}

export const AI_LEAD_TRACKED_KEYS = [
  'channel',
  'productTitle',
  'name',
  'phone',
  'notes',
] as const;

export type AiLeadTrackedKey = (typeof AI_LEAD_TRACKED_KEYS)[number];

export function countAiLeadFieldStats(
  draft: AiLeadDraft,
  aiFilledKeys: ReadonlySet<string>,
): { empty: number; aiFilled: number; total: number } {
  const total = AI_LEAD_TRACKED_KEYS.length;
  let empty = 0;
  let aiFilled = 0;

  for (const key of AI_LEAD_TRACKED_KEYS) {
    const value = String(draft[key] ?? '').trim();
    if (!value) {
      empty += 1;
      continue;
    }
    if (
      aiFilledKeys.has(key) ||
      (key === 'productTitle' &&
        (aiFilledKeys.has('productId') || aiFilledKeys.has('productIds')))
    ) {
      aiFilled += 1;
    }
  }

  return { empty, aiFilled, total };
}
