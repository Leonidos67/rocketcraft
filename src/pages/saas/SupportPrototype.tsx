import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronDown,
  Eye,
  EyeOff,
  FileText,
  Inbox,
  MessageCircle,
  Moon,
  Plus,
  Search,
  Send,
  Settings2,
  Sparkles,
  Sun,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type SupportView = 'chats' | 'widget' | 'ai';

interface SupportPrototypeProps {
  brand: string;
  userName: string;
  companyName: string;
  accent: string;
  isDark: boolean;
  initialView?: SupportView;
}
interface ChatMessage {
  id: string;
  from: 'client' | 'agent';
  text: string;
  time: string;
}

interface SupportChat {
  id: string;
  client: string;
  preview: string;
  status: 'new' | 'open' | 'done';
  unread: number;
  messages: ChatMessage[];
}

type SocialNetworkId = 'discord' | 'telegram' | 'x' | 'instagram' | 'vk';

interface SocialNetwork {
  id: SocialNetworkId;
  title: string;
  placeholder: string;
  defaultUrl: string;
}

interface WidgetSocialLink {
  id: string;
  networkId: SocialNetworkId;
  title: string;
  url: string;
  enabled: boolean;
}

const SOCIAL_NETWORKS: SocialNetwork[] = [
  {
    id: 'discord',
    title: 'Discord',
    placeholder: 'https://discord.gg/...',
    defaultUrl: 'https://discord.gg/example',
  },
  {
    id: 'telegram',
    title: 'Telegram',
    placeholder: 'https://t.me/...',
    defaultUrl: 'https://t.me/example',
  },
  {
    id: 'x',
    title: 'X',
    placeholder: 'https://x.com/...',
    defaultUrl: 'https://x.com/example',
  },
  {
    id: 'instagram',
    title: 'Instagram',
    placeholder: 'https://instagram.com/...',
    defaultUrl: 'https://instagram.com/example',
  },
  {
    id: 'vk',
    title: 'VK',
    placeholder: 'https://vk.com/...',
    defaultUrl: 'https://vk.com/example',
  },
];

const SocialLogo = ({ networkId, className }: { networkId: SocialNetworkId; className?: string }) => {
  const common = cn('h-4 w-4 shrink-0', className);

  if (networkId === 'discord') {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden>
        <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    );
  }

  if (networkId === 'telegram') {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden>
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    );
  }

  if (networkId === 'x') {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.717-8.739L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    );
  }

  if (networkId === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden>
      <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.724-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.888 4.03 8.69 4.03 8.156c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .373.17.508.271.508.22 0 .407-.135.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.491-.085.744-.576.744z" />
    </svg>
  );
};

const initialChats: SupportChat[] = [
  {
    id: 'c1',
    client: 'Елена К.',
    preview: 'Здравствуйте! Хочу уточнить запись…',
    status: 'new',
    unread: 2,
    messages: [
      {
        id: 'm1',
        from: 'client',
        text: 'Здравствуйте! Хочу уточнить запись на маникюр.',
        time: '10:42',
      },
      {
        id: 'm2',
        from: 'client',
        text: 'Можно ли перенести на пятницу вечером?',
        time: '10:43',
      },
      {
        id: 'm3',
        from: 'agent',
        text: 'Добрый день! Конечно, сейчас посмотрю свободные слоты.',
        time: '10:45',
      },
    ],
  },
  {
    id: 'c2',
    client: 'Максим Р.',
    preview: 'Подскажите стоимость SPA-ухода',
    status: 'open',
    unread: 0,
    messages: [
      {
        id: 'm1',
        from: 'client',
        text: 'Подскажите стоимость SPA-ухода для лица?',
        time: '09:18',
      },
      {
        id: 'm2',
        from: 'agent',
        text: 'Базовый уход — 4 500 ₽, расширенный — 6 200 ₽. Могу сразу записать.',
        time: '09:21',
      },
    ],
  },
  {
    id: 'c3',
    client: 'Ирина Л.',
    preview: 'Не пришло напоминание о визите',
    status: 'open',
    unread: 1,
    messages: [
      {
        id: 'm1',
        from: 'client',
        text: 'Не пришло напоминание о визите вчера.',
        time: '08:05',
      },
    ],
  },
];

const defaultSocialLinks: WidgetSocialLink[] = [
  {
    id: 'link-discord',
    networkId: 'discord',
    title: 'Discord',
    url: 'https://discord.gg/example',
    enabled: true,
  },
  {
    id: 'link-x',
    networkId: 'x',
    title: 'X',
    url: 'https://x.com/example',
    enabled: true,
  },
];

const DEFAULT_AI_PROMPT = `Ты — AI-ассистент поддержки {{brand}} (компания {{company}}).

Стиль общения: {{tone}}.
Продукт / услуга: {{product}}.

Правила:
— отвечай кратко и по делу на русском;
— если данных не хватает — задай один уточняющий вопрос;
— для типовых ситуаций используй шаблонные ответы;
— не выдумывай цены и сроки, если их нет в контексте.`;

interface AiTemplateReply {
  id: string;
  title: string;
  text: string;
  enabled: boolean;
}

const defaultTemplates: AiTemplateReply[] = [
  {
    id: 't1',
    title: 'Приветствие',
    text: 'Здравствуйте! Чем можем помочь?',
    enabled: true,
  },
  {
    id: 't2',
    title: 'Часы работы',
    text: 'Мы на связи ежедневно с 10:00 до 22:00. Оставьте вопрос — ответим в ближайшее время.',
    enabled: true,
  },
  {
    id: 't3',
    title: 'Перенос записи',
    text: 'Конечно, можем перенести запись. Напишите удобную дату и время — подберём свободный слот.',
    enabled: false,
  },
];

const nowTime = () =>
  new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

const SupportPrototype = ({
  brand,
  userName,
  companyName,
  accent,
  isDark: initialDark,
  initialView = 'chats',
}: SupportPrototypeProps) => {
  const [dark, setDark] = useState(initialDark);
  const [view, setView] = useState<SupportView>(initialView);
  const [chats, setChats] = useState(initialChats);
  const [activeChatId, setActiveChatId] = useState(initialChats[0].id);
  const [reply, setReply] = useState('');
  const [widgetOpen, setWidgetOpen] = useState(true);
  const [widgetStep, setWidgetStep] = useState<'home' | 'chat'>('home');
  const [widgetDraft, setWidgetDraft] = useState('');
  const [widgetMessages, setWidgetMessages] = useState<ChatMessage[]>([
    {
      id: 'wm0',
      from: 'agent',
      text: 'Здравствуйте! Напишите вопрос — мы ответим здесь.',
      time: 'сейчас',
    },
  ]);
  const [greeting, setGreeting] = useState('Привет 👋');
  const [subtitle, setSubtitle] = useState('Чем можем помочь?');
  const [ctaLabel, setCtaLabel] = useState('Задать вопрос');
  const [showDocs, setShowDocs] = useState(true);
  const [mobileShowChat, setMobileShowChat] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const [socialLinks, setSocialLinks] = useState<WidgetSocialLink[]>(defaultSocialLinks);
  const [draftNetworkId, setDraftNetworkId] = useState<SocialNetworkId | null>(null);
  const [draftUrl, setDraftUrl] = useState('');

  const [aiProvider, setAiProvider] = useState<'openai' | 'anthropic' | 'custom'>('openai');
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKeySaved, setApiKeySaved] = useState(false);
  const [promptTone, setPromptTone] = useState('');
  const [promptProduct, setPromptProduct] = useState('');
  const [aiPrompt, setAiPrompt] = useState(DEFAULT_AI_PROMPT);
  const [promptSource, setPromptSource] = useState<'default' | 'custom'>('default');
  const [templates, setTemplates] = useState(defaultTemplates);
  const [newTemplateTitle, setNewTemplateTitle] = useState('');
  const [newTemplateText, setNewTemplateText] = useState('');
  const promptFileRef = useRef<HTMLInputElement>(null);

  const linkInputRef = useRef<HTMLInputElement>(null);
  const widgetChatEndRef = useRef<HTMLDivElement>(null);
  const agentChatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDark(initialDark);
  }, [initialDark]);

  useEffect(() => {
    setView(initialView);
  }, [initialView]);

  useEffect(() => {
    if (draftNetworkId && socialOpen) {
      linkInputRef.current?.focus();
    }
  }, [draftNetworkId, socialOpen]);

  useEffect(() => {
    widgetChatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [widgetMessages, widgetStep]);

  useEffect(() => {
    agentChatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChatId, chats]);

  const displayName = userName.trim() || 'Пользователь';
  const displayCompany = companyName.trim() || 'Компания';
  const initials =
    displayName
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('') || 'U';

  const theme = useMemo(
    () => ({
      page: dark ? '#0c0c0e' : '#f4f4f5',
      panel: dark ? '#141416' : '#ffffff',
      sidebar: dark ? '#101012' : '#ffffff',
      border: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)',
      text: dark ? '#f5f5f5' : '#111827',
      muted: dark ? 'rgba(255,255,255,0.55)' : '#6b7280',
      soft: dark ? 'rgba(255,255,255,0.05)' : '#f3f4f6',
      clientBubble: dark ? '#1f1f23' : '#ffffff',
      agentBubble: `${accent}22`,
      mineBubble: accent,
    }),
    [dark, accent],
  );

  const activeChat = chats.find((chat) => chat.id === activeChatId) ?? chats[0];
  const enabledSocialLinks = socialLinks.filter((link) => link.enabled);
  const availableNetworks = SOCIAL_NETWORKS.filter(
    (network) => !socialLinks.some((link) => link.networkId === network.id),
  );

  const startAddNetwork = (networkId: SocialNetworkId) => {
    const network = SOCIAL_NETWORKS.find((item) => item.id === networkId);
    if (!network) return;
    setDraftNetworkId(networkId);
    setDraftUrl(network.defaultUrl);
  };

  const saveSocialLink = () => {
    if (!draftNetworkId) return;
    const network = SOCIAL_NETWORKS.find((item) => item.id === draftNetworkId);
    if (!network) return;
    const url = draftUrl.trim() || network.defaultUrl;
    setSocialLinks((current) => [
      ...current,
      {
        id: `link-${network.id}-${Date.now()}`,
        networkId: network.id,
        title: network.title,
        url,
        enabled: true,
      },
    ]);
    setDraftNetworkId(null);
    setDraftUrl('');
  };

  const toggleSocialLink = (id: string) => {
    setSocialLinks((current) =>
      current.map((link) => (link.id === id ? { ...link, enabled: !link.enabled } : link)),
    );
  };

  const removeSocialLink = (id: string) => {
    setSocialLinks((current) => current.filter((link) => link.id !== id));
    if (draftNetworkId && socialLinks.find((link) => link.id === id)?.networkId === draftNetworkId) {
      setDraftNetworkId(null);
    }
  };

  const filledPrompt = aiPrompt
    .replaceAll('{{brand}}', brand || '…')
    .replaceAll('{{company}}', displayCompany || '…')
    .replaceAll('{{tone}}', promptTone.trim() || '…')
    .replaceAll('{{product}}', promptProduct.trim() || '…');

  const promptReady =
    Boolean(promptTone.trim()) && Boolean(promptProduct.trim()) && Boolean(apiKey.trim());

  const saveApiKey = () => {
    if (!apiKey.trim()) return;
    setApiKeySaved(true);
  };

  const resetDefaultPrompt = () => {
    setAiPrompt(DEFAULT_AI_PROMPT);
    setPromptSource('default');
  };

  const handlePromptUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === 'string' ? reader.result : '';
      if (text.trim()) {
        setAiPrompt(text);
        setPromptSource('custom');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const addTemplate = () => {
    const title = newTemplateTitle.trim();
    const text = newTemplateText.trim();
    if (!title || !text) return;
    setTemplates((current) => [
      ...current,
      { id: `t-${Date.now()}`, title, text, enabled: true },
    ]);
    setNewTemplateTitle('');
    setNewTemplateText('');
  };

  const toggleTemplate = (id: string) => {
    setTemplates((current) =>
      current.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item)),
    );
  };

  const removeTemplate = (id: string) => {
    setTemplates((current) => current.filter((item) => item.id !== id));
  };

  const insertTemplateToReply = (text: string) => {
    setReply(text);
  };

  const sendAgentReply = () => {
    const text = reply.trim();
    if (!text || !activeChat) return;
    const nextMessage: ChatMessage = {
      id: `a-${Date.now()}`,
      from: 'agent',
      text,
      time: nowTime(),
    };
    setChats((current) =>
      current.map((chat) =>
        chat.id === activeChat.id
          ? {
              ...chat,
              preview: text,
              unread: 0,
              status: 'open',
              messages: [...chat.messages, nextMessage],
            }
          : chat,
      ),
    );
    setReply('');
  };

  const sendWidgetMessage = () => {
    const text = widgetDraft.trim();
    if (!text) return;
    const time = nowTime();
    const nextMessage: ChatMessage = {
      id: `w-${Date.now()}`,
      from: 'client',
      text,
      time,
    };

    setWidgetMessages((current) => [...current, nextMessage]);
    setWidgetDraft('');

    const widgetChatId = 'widget-live';
    setChats((current) => {
      const existing = current.find((chat) => chat.id === widgetChatId);
      if (existing) {
        return current.map((chat) =>
          chat.id === widgetChatId
            ? {
                ...chat,
                preview: text,
                unread: view === 'chats' && activeChatId === widgetChatId ? 0 : chat.unread + 1,
                status: 'new',
                messages: [...chat.messages, nextMessage],
              }
            : chat,
        );
      }
      return [
        {
          id: widgetChatId,
          client: 'Посетитель сайта',
          preview: text,
          status: 'new' as const,
          unread: 1,
          messages: [
            {
              id: 'wm0-sync',
              from: 'agent' as const,
              text: 'Здравствуйте! Напишите вопрос — мы ответим здесь.',
              time: 'сейчас',
            },
            nextMessage,
          ],
        },
        ...current,
      ];
    });
  };

  const statusLabel = {
    new: 'Новое',
    open: 'В работе',
    done: 'Закрыто',
  } as const;

  const draftNetwork = SOCIAL_NETWORKS.find((item) => item.id === draftNetworkId);

  return (
    <div
      className="flex h-[100svh] overflow-hidden supports-[height:100dvh]:h-[100dvh]"
      style={{ backgroundColor: theme.page, color: theme.text }}
    >
      <aside
        className="hidden w-[15.5rem] shrink-0 flex-col border-r p-3 md:flex"
        style={{ backgroundColor: theme.sidebar, borderColor: theme.border }}
      >
        <div className="mb-4 flex items-center gap-2.5 px-2 pt-1">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold text-white"
            style={{ backgroundColor: accent }}
          >
            {brand.slice(0, 1).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="m-0 truncate text-sm font-semibold">{brand}</p>
            <p className="m-0 text-[0.6875rem]" style={{ color: theme.muted }}>
              Support
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <p
              className="mb-1.5 px-2 text-[0.625rem] font-semibold uppercase tracking-[0.08em]"
              style={{ color: theme.muted }}
            >
              Обращения
            </p>
            <button
              type="button"
              onClick={() => setView('chats')}
              className="flex w-full cursor-pointer items-center gap-2 rounded-xl border-none px-2.5 py-2 text-left text-sm font-medium"
              style={{
                backgroundColor: view === 'chats' ? theme.soft : 'transparent',
                color: view === 'chats' ? theme.text : theme.muted,
                boxShadow: view === 'chats' ? `inset 3px 0 0 ${accent}` : 'none',
              }}
            >
              <Inbox className="h-4 w-4" />
              Чаты / заявки
            </button>
          </div>

          <div>
            <p
              className="mb-1.5 px-2 text-[0.625rem] font-semibold uppercase tracking-[0.08em]"
              style={{ color: theme.muted }}
            >
              Виджет
            </p>
            <button
              type="button"
              onClick={() => setView('widget')}
              className="flex w-full cursor-pointer items-center gap-2 rounded-xl border-none px-2.5 py-2 text-left text-sm font-medium"
              style={{
                backgroundColor: view === 'widget' ? theme.soft : 'transparent',
                color: view === 'widget' ? theme.text : theme.muted,
                boxShadow: view === 'widget' ? `inset 3px 0 0 ${accent}` : 'none',
              }}
            >
              <Settings2 className="h-4 w-4" />
              Настройка виджета
            </button>
            <button
              type="button"
              onClick={() => setView('ai')}
              className="mt-0.5 flex w-full cursor-pointer items-center gap-2 rounded-xl border-none px-2.5 py-2 text-left text-sm font-medium"
              style={{
                backgroundColor: view === 'ai' ? theme.soft : 'transparent',
                color: view === 'ai' ? theme.text : theme.muted,
                boxShadow: view === 'ai' ? `inset 3px 0 0 ${accent}` : 'none',
              }}
            >
              <Sparkles className="h-4 w-4" />
              ИИ
            </button>
          </div>
        </div>

        <button
          type="button"
          className="mt-auto flex cursor-pointer items-center gap-2.5 rounded-2xl border-none p-2 text-left"
          style={{ backgroundColor: theme.soft }}
        >
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: accent }}
          >
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="m-0 truncate text-sm font-semibold">{displayName}</p>
            <p className="m-0 truncate text-[0.6875rem]" style={{ color: theme.muted }}>
              {displayCompany}
            </p>
          </div>
          <ChevronDown className="h-4 w-4" style={{ color: theme.muted }} />
        </button>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col pb-[4.25rem] md:pb-0">
        <header
          className="flex h-12 shrink-0 items-center justify-between gap-3 border-b px-3 sm:h-14 sm:px-5"
          style={{ backgroundColor: theme.panel, borderColor: theme.border }}
        >
          <div className="min-w-0">
            <div className="mb-0.5 flex items-center gap-2 md:hidden">
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[0.65rem] font-bold text-white"
                style={{ backgroundColor: accent }}
              >
                {brand.slice(0, 1).toUpperCase()}
              </div>
              <p className="m-0 truncate text-sm font-semibold">{brand}</p>
            </div>
            <p className="m-0 truncate text-sm font-semibold">
              {view === 'chats'
                ? 'Чаты / заявки'
                : view === 'widget'
                  ? 'Настройка виджета'
                  : 'ИИ-ассистент'}
            </p>
            <p className="m-0 hidden text-xs md:block" style={{ color: theme.muted }}>
              {view === 'chats'
                ? 'Все диалоги с сайта приходят сюда в реальном времени'
                : view === 'widget'
                  ? 'Плашка с диалогом встраивается на сайт клиента'
                  : 'API-ключ, промпт и шаблонные ответы для автоответов'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setDark((current) => !current)}
            className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border-none"
            style={{ backgroundColor: theme.soft, color: theme.muted }}
            aria-label={dark ? 'Светлая тема' : 'Тёмная тема'}
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </header>

        {view === 'chats' ? (
          <div className="grid min-h-0 flex-1 lg:grid-cols-[16rem_minmax(0,1fr)]">
            <div
              className={cn(
                'min-h-0 overflow-auto border-r',
                mobileShowChat ? 'hidden lg:block' : 'block',
              )}
              style={{ borderColor: theme.border, backgroundColor: theme.panel }}
            >
              <div className="flex items-center gap-2 border-b px-3 py-3" style={{ borderColor: theme.border }}>
                <Search className="h-4 w-4" style={{ color: theme.muted }} />
                <span className="text-sm" style={{ color: theme.muted }}>
                  Поиск обращений
                </span>
              </div>
              {chats.map((chat) => (
                <button
                  key={chat.id}
                  type="button"
                  onClick={() => {
                    setActiveChatId(chat.id);
                    setMobileShowChat(true);
                    setChats((current) =>
                      current.map((entry) =>
                        entry.id === chat.id ? { ...entry, unread: 0 } : entry,
                      ),
                    );
                  }}
                  className="block w-full cursor-pointer border-none px-3 py-3 text-left"
                  style={{
                    backgroundColor: activeChatId === chat.id ? `${accent}14` : 'transparent',
                    borderBottom: `1px solid ${theme.border}`,
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="m-0 text-sm font-semibold">{chat.client}</p>
                    <span
                      className="rounded-full px-1.5 py-0.5 text-[0.625rem] font-semibold"
                      style={{
                        backgroundColor: chat.status === 'new' ? `${accent}22` : theme.soft,
                        color: chat.status === 'new' ? accent : theme.muted,
                      }}
                    >
                      {statusLabel[chat.status]}
                    </span>
                  </div>
                  <p className="m-0 mt-1 truncate text-xs" style={{ color: theme.muted }}>
                    {chat.preview}
                  </p>
                  {chat.unread > 0 && (
                    <span
                      className="mt-2 inline-flex rounded-full px-1.5 py-0.5 text-[0.625rem] font-bold text-white"
                      style={{ backgroundColor: accent }}
                    >
                      {chat.unread} новых
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div
              className={cn(
                'min-h-0 flex-col',
                mobileShowChat ? 'flex' : 'hidden lg:flex',
              )}
              style={{ backgroundColor: theme.page }}
            >
              <div
                className="flex items-center justify-between gap-2 border-b px-3 py-3 sm:px-4"
                style={{ borderColor: theme.border, backgroundColor: theme.panel }}
              >
                <div className="flex min-w-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setMobileShowChat(false)}
                    className="inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border-none lg:hidden"
                    style={{ backgroundColor: theme.soft, color: theme.muted }}
                    aria-label="К списку чатов"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <div className="min-w-0">
                    <p className="m-0 truncate text-sm font-semibold">{activeChat.client}</p>
                    <p className="m-0 truncate text-xs" style={{ color: theme.muted }}>
                      Сообщение с виджета на сайте
                    </p>
                  </div>
                </div>
                <MessageCircle className="h-4 w-4 shrink-0" style={{ color: accent }} />
              </div>

              <div className="flex-1 space-y-3 overflow-auto p-3 sm:p-4">
                {activeChat.messages.map((message) => {
                  const isMine = message.from === 'agent';
                  return (
                    <div
                      key={message.id}
                      className={cn('flex', isMine ? 'justify-end' : 'justify-start')}
                    >
                      {!isMine && (
                        <div
                          className="mr-2 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[0.625rem] font-bold text-white"
                          style={{ backgroundColor: '#94a3b8' }}
                        >
                          {activeChat.client.slice(0, 1)}
                        </div>
                      )}
                      <div
                        className={cn(
                          'max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm',
                          isMine ? 'rounded-br-md' : 'rounded-bl-md',
                        )}
                        style={{
                          backgroundColor: isMine ? theme.mineBubble : theme.clientBubble,
                          border: isMine ? 'none' : `1px solid ${theme.border}`,
                          color: isMine ? '#ffffff' : theme.text,
                        }}
                      >
                        <p
                          className="m-0 mb-1 text-[0.6875rem] font-medium"
                          style={{ color: isMine ? 'rgba(255,255,255,0.75)' : theme.muted }}
                        >
                          {isMine ? 'Вы' : activeChat.client} · {message.time}
                        </p>
                        <p className="m-0">{message.text}</p>
                      </div>
                    </div>
                  );
                })}
                <div ref={agentChatEndRef} />
              </div>

              <div
                className="border-t p-2.5 sm:p-3"
                style={{ borderColor: theme.border, backgroundColor: theme.panel }}
              >
                <div className="flex items-end gap-2">
                  <textarea
                    value={reply}
                    onChange={(event) => setReply(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault();
                        sendAgentReply();
                      }
                    }}
                    rows={2}
                    placeholder="Ответить клиенту…"
                    className="min-h-[2.5rem] flex-1 resize-none rounded-2xl border-none px-3 py-2 text-sm outline-none sm:min-h-[2.75rem] sm:py-2.5"
                    style={{ backgroundColor: theme.soft, color: theme.text }}
                  />
                  <button
                    type="button"
                    onClick={sendAgentReply}
                    className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-none text-white sm:h-11 sm:w-11"
                    style={{ backgroundColor: accent }}
                    aria-label="Отправить"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                <p className="m-0 mt-2 hidden text-[0.6875rem] sm:block" style={{ color: theme.muted }}>
                  Enter — отправить, Shift+Enter — новая строка
                </p>
              </div>
            </div>
          </div>
        ) : view === 'widget' ? (
          <div className="grid min-h-0 flex-1 gap-3 overflow-auto p-3 lg:grid-cols-[minmax(16rem,0.9fr)_minmax(0,1.2fr)] lg:overflow-hidden lg:p-4">
            <div
              className="min-h-0 overflow-auto rounded-2xl border p-4"
              style={{ backgroundColor: theme.panel, borderColor: theme.border }}
            >
              <p className="m-0 text-sm font-semibold">Параметры плашки</p>
              <p className="m-0 mt-1 text-xs" style={{ color: theme.muted }}>
                <span className="lg:hidden">Настройки сразу отражаются в превью ниже</span>
                <span className="hidden lg:inline">Настройки сразу отражаются в превью виджета справа</span>
              </p>

              <div className="mt-4 flex flex-col gap-3">
                <label className="flex flex-col gap-1.5 text-xs font-medium" style={{ color: theme.muted }}>
                  Приветствие
                  <input
                    value={greeting}
                    onChange={(event) => setGreeting(event.target.value)}
                    className="h-10 rounded-xl border-none px-3 text-sm outline-none"
                    style={{ backgroundColor: theme.soft, color: theme.text }}
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-xs font-medium" style={{ color: theme.muted }}>
                  Подзаголовок
                  <input
                    value={subtitle}
                    onChange={(event) => setSubtitle(event.target.value)}
                    className="h-10 rounded-xl border-none px-3 text-sm outline-none"
                    style={{ backgroundColor: theme.soft, color: theme.text }}
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-xs font-medium" style={{ color: theme.muted }}>
                  Текст кнопки
                  <input
                    value={ctaLabel}
                    onChange={(event) => setCtaLabel(event.target.value)}
                    className="h-10 rounded-xl border-none px-3 text-sm outline-none"
                    style={{ backgroundColor: theme.soft, color: theme.text }}
                  />
                </label>

                <label className="flex items-center justify-between gap-3 text-sm">
                  <span>Кнопка «Документация»</span>
                  <input
                    type="checkbox"
                    checked={showDocs}
                    onChange={(event) => setShowDocs(event.target.checked)}
                    className="h-4 w-4 cursor-pointer"
                  />
                </label>

                <div
                  className="overflow-hidden rounded-xl border"
                  style={{ borderColor: theme.border }}
                >
                  <button
                    type="button"
                    onClick={() => setSocialOpen((open) => !open)}
                    className="flex w-full cursor-pointer items-center justify-between border-none px-3 py-2.5 text-left text-sm"
                    style={{ backgroundColor: theme.soft, color: theme.text }}
                  >
                    <span>Соцсети</span>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 transition-transform duration-200',
                        socialOpen && 'rotate-180',
                      )}
                      style={{ color: theme.muted }}
                    />
                  </button>

                  {socialOpen && (
                    <div className="space-y-3 border-t p-3" style={{ borderColor: theme.border }}>
                      {socialLinks.length > 0 && (
                        <div className="space-y-2">
                          <p
                            className="m-0 text-[0.6875rem] font-semibold uppercase tracking-[0.06em]"
                            style={{ color: theme.muted }}
                          >
                            В виджете
                          </p>
                          {socialLinks.map((link) => (
                            <div
                              key={link.id}
                              className="flex items-center gap-2 rounded-xl px-2.5 py-2"
                              style={{ backgroundColor: theme.soft }}
                            >
                              <SocialLogo networkId={link.networkId} />
                              <div className="min-w-0 flex-1">
                                <p className="m-0 truncate text-sm font-medium">{link.title}</p>
                                <p className="m-0 truncate text-[0.6875rem]" style={{ color: theme.muted }}>
                                  {link.url}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => toggleSocialLink(link.id)}
                                className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border-none"
                                style={{
                                  backgroundColor: link.enabled ? `${accent}22` : 'transparent',
                                  color: link.enabled ? accent : theme.muted,
                                }}
                                aria-label={link.enabled ? 'Отключить' : 'Включить'}
                                title={link.enabled ? 'Отключить' : 'Включить'}
                              >
                                <Check className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => removeSocialLink(link.id)}
                                className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border-none"
                                style={{ color: theme.muted, backgroundColor: 'transparent' }}
                                aria-label="Удалить"
                                title="Удалить"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {availableNetworks.length > 0 && (
                        <div className="space-y-2">
                          <p
                            className="m-0 text-[0.6875rem] font-semibold uppercase tracking-[0.06em]"
                            style={{ color: theme.muted }}
                          >
                            Добавить
                          </p>
                          {availableNetworks.map((network) => (
                            <button
                              key={network.id}
                              type="button"
                              onClick={() => startAddNetwork(network.id)}
                              className={cn(
                                'flex w-full cursor-pointer items-center gap-2.5 rounded-xl border-none px-2.5 py-2 text-left text-sm',
                                draftNetworkId === network.id && 'ring-1',
                              )}
                              style={{
                                backgroundColor:
                                  draftNetworkId === network.id ? `${accent}14` : theme.soft,
                                color: theme.text,
                                boxShadow:
                                  draftNetworkId === network.id ? `inset 0 0 0 1px ${accent}` : 'none',
                              }}
                            >
                              <SocialLogo networkId={network.id} />
                              <span className="font-medium">{network.title}</span>
                            </button>
                          ))}
                        </div>
                      )}

                      {draftNetwork && (
                        <div
                          className="space-y-2 rounded-xl border p-3"
                          style={{ borderColor: theme.border, backgroundColor: theme.page }}
                        >
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <SocialLogo networkId={draftNetwork.id} />
                            {draftNetwork.title}
                          </div>
                          <input
                            ref={linkInputRef}
                            value={draftUrl}
                            onChange={(event) => setDraftUrl(event.target.value)}
                            onKeyDown={(event) => {
                              if (event.key === 'Enter') {
                                event.preventDefault();
                                saveSocialLink();
                              }
                            }}
                            placeholder={draftNetwork.placeholder}
                            className="h-10 w-full rounded-xl border-none px-3 text-sm outline-none"
                            style={{ backgroundColor: theme.soft, color: theme.text }}
                          />
                          <button
                            type="button"
                            onClick={saveSocialLink}
                            className="inline-flex h-9 w-full cursor-pointer items-center justify-center rounded-xl border-none text-sm font-semibold text-white"
                            style={{ backgroundColor: accent }}
                          >
                            Сохранить
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div
                className="mt-5 rounded-xl px-3 py-2.5 text-xs leading-relaxed"
                style={{ backgroundColor: `${accent}18`, color: accent }}
              >
                Виджет ставится на сайт одной строкой кода. Все сообщения из плашки
                появляются во вкладке «Чаты / заявки».
              </div>
            </div>

            <div
              className="relative min-h-[22rem] overflow-hidden rounded-2xl border sm:min-h-[26rem] lg:min-h-[28rem]"
              style={{ backgroundColor: dark ? '#17171a' : '#e8e8ea', borderColor: theme.border }}
            >
              <div className="absolute inset-3 rounded-xl border border-dashed border-black/10 bg-white/70 p-3 sm:inset-4 sm:p-4">
                <div className="mb-3 h-6 rounded-lg bg-black/5 sm:mb-4 sm:h-8" />
                <div className="grid grid-cols-[5rem_1fr] gap-2 sm:grid-cols-[7rem_1fr] sm:gap-3">
                  <div className="space-y-2">
                    <div className="h-12 rounded-lg bg-black/5 sm:h-16" />
                    <div className="h-12 rounded-lg bg-black/5 sm:h-16" />
                    <div className="h-16 rounded-lg bg-black/5 sm:h-24" />
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="h-16 rounded-xl bg-black/[0.04] sm:h-24" />
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      <div className="h-20 rounded-xl bg-black/[0.04] sm:h-28" />
                      <div className="h-20 rounded-xl bg-black/[0.04] sm:h-28" />
                    </div>
                  </div>
                </div>
                <p className="absolute left-5 top-5 text-xs font-medium text-black/35 sm:left-7 sm:top-6">
                  Превью сайта
                </p>
              </div>

              <div className="absolute bottom-3 right-3 z-[2] flex flex-col items-end gap-2 sm:bottom-5 sm:right-5 sm:gap-3">
                {widgetOpen && (
                  <div className="w-[min(18rem,calc(100vw-2.5rem))] overflow-hidden rounded-[1.35rem] bg-white text-black shadow-[0_18px_50px_rgba(0,0,0,0.22)] sm:w-[min(20rem,calc(100vw-3rem))]">
                    {widgetStep === 'home' ? (
                      <>
                        <div
                          className="relative px-4 pb-5 pt-4"
                          style={{
                            background: `linear-gradient(180deg, ${accent}33 0%, #ffffff 75%)`,
                          }}
                        >
                          <div className="mb-5 flex items-center justify-between">
                            <div
                              className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
                              style={{ backgroundColor: accent }}
                            >
                              {brand.slice(0, 1).toUpperCase()}
                            </div>
                            <div className="flex -space-x-2">
                              {['A', 'M', 'K'].map((letter) => (
                                <span
                                  key={letter}
                                  className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[0.625rem] font-bold text-white"
                                  style={{ backgroundColor: accent }}
                                >
                                  {letter}
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="m-0 text-[1.35rem] font-semibold leading-tight">{greeting}</p>
                          <p className="m-0 mt-1 text-sm text-black/50">{subtitle}</p>
                        </div>

                        <div className="space-y-2 px-3 pb-3">
                          {enabledSocialLinks.map((link) => (
                            <a
                              key={link.id}
                              href={link.url}
                              target="_blank"
                              rel="noreferrer"
                              className="flex w-full items-center gap-2 rounded-xl bg-[#f3f4f6] px-3 py-2.5 text-left text-sm font-medium text-black no-underline"
                            >
                              <SocialLogo networkId={link.networkId} />
                              {link.networkId === 'discord'
                                ? 'Join Our Discord'
                                : link.networkId === 'x'
                                  ? 'Follow us on X'
                                  : link.title}
                            </a>
                          ))}
                          {showDocs && (
                            <button
                              type="button"
                              className="flex w-full cursor-pointer items-center gap-2 rounded-xl border-none bg-[#f3f4f6] px-3 py-2.5 text-left text-sm font-medium"
                            >
                              <BookOpen className="h-4 w-4" />
                              Search our Docs
                            </button>
                          )}
                          <button
                            type="button"
                            className="flex w-full cursor-pointer items-center gap-2 rounded-xl border-none bg-[#f3f4f6] px-3 py-2.5 text-left text-sm font-medium"
                          >
                            <FileText className="h-4 w-4" />
                            Частые вопросы
                          </button>
                          <button
                            type="button"
                            onClick={() => setWidgetStep('chat')}
                            className="flex w-full cursor-pointer items-center justify-between rounded-xl border-none px-3 py-3 text-sm font-semibold text-white"
                            style={{ backgroundColor: accent }}
                          >
                            {ctaLabel}
                            <Send className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="m-0 pb-3 text-center text-[0.625rem] text-black/35">
                          Powered by {brand}
                        </p>
                      </>
                    ) : (
                      <div className="flex h-[18rem] flex-col sm:h-[22rem]">
                        <div
                          className="flex items-center justify-between px-3 py-3 text-white"
                          style={{ backgroundColor: accent }}
                        >
                          <div>
                            <p className="m-0 text-sm font-semibold">{brand}</p>
                            <p className="m-0 text-[0.6875rem] text-white/80">Обычно отвечаем за минуты</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setWidgetStep('home')}
                            className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-none bg-white/15 text-white"
                            aria-label="Назад"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <div className="flex-1 space-y-2.5 overflow-auto bg-[#f8fafc] p-3">
                          {widgetMessages.map((message) => {
                            const isMine = message.from === 'client';
                            return (
                              <div
                                key={message.id}
                                className={cn('flex', isMine ? 'justify-end' : 'justify-start')}
                              >
                                {!isMine && (
                                  <div
                                    className="mr-2 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[0.5625rem] font-bold text-white"
                                    style={{ backgroundColor: accent }}
                                  >
                                    {brand.slice(0, 1).toUpperCase()}
                                  </div>
                                )}
                                <div
                                  className={cn(
                                    'max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm',
                                    isMine ? 'rounded-br-md text-white' : 'rounded-bl-md bg-white text-black',
                                  )}
                                  style={isMine ? { backgroundColor: accent } : undefined}
                                >
                                  <p className="m-0">{message.text}</p>
                                  <p
                                    className={cn(
                                      'm-0 mt-1 text-[0.625rem]',
                                      isMine ? 'text-white/70' : 'text-black/40',
                                    )}
                                  >
                                    {message.time}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                          <div ref={widgetChatEndRef} />
                        </div>
                        <div className="flex gap-2 border-t border-black/5 bg-white p-2.5">
                          <input
                            value={widgetDraft}
                            onChange={(event) => setWidgetDraft(event.target.value)}
                            onKeyDown={(event) => {
                              if (event.key === 'Enter') sendWidgetMessage();
                            }}
                            placeholder="Ваше сообщение…"
                            className="h-10 flex-1 rounded-xl border-none bg-[#f3f4f6] px-3 text-sm outline-none"
                          />
                          <button
                            type="button"
                            onClick={sendWidgetMessage}
                            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-none text-white"
                            style={{ backgroundColor: accent }}
                            aria-label="Отправить из виджета"
                          >
                            <Send className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setWidgetOpen((current) => !current)}
                  className="inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-none text-white shadow-lg"
                  style={{ backgroundColor: accent }}
                  aria-label={widgetOpen ? 'Свернуть виджет' : 'Открыть виджет'}
                >
                  {widgetOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="min-h-0 flex-1 overflow-auto p-3 sm:p-4">
            <div className="mx-auto flex max-w-3xl flex-col gap-3">
              <div
                className="rounded-2xl border p-4"
                style={{ backgroundColor: theme.panel, borderColor: theme.border }}
              >
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" style={{ color: accent }} />
                  <p className="m-0 text-sm font-semibold">Подключение API</p>
                </div>
                <p className="m-0 mb-4 text-xs leading-relaxed" style={{ color: theme.muted }}>
                  Имитация настройки AI-ответов: укажите ключ провайдера. В демо ключ не уходит
                  на сервер — только для превью сценария.
                </p>

                <div className="flex flex-col gap-3">
                  <label className="flex flex-col gap-1.5 text-xs font-medium" style={{ color: theme.muted }}>
                    Провайдер
                    <select
                      value={aiProvider}
                      onChange={(event) =>
                        setAiProvider(event.target.value as 'openai' | 'anthropic' | 'custom')
                      }
                      className="h-10 rounded-xl border-none px-3 text-sm outline-none"
                      style={{ backgroundColor: theme.soft, color: theme.text }}
                    >
                      <option value="openai">OpenAI</option>
                      <option value="anthropic">Anthropic</option>
                      <option value="custom">Custom endpoint</option>
                    </select>
                  </label>

                  <label className="flex flex-col gap-1.5 text-xs font-medium" style={{ color: theme.muted }}>
                    API-ключ
                    <div className="flex gap-2">
                      <div className="relative min-w-0 flex-1">
                        <input
                          type={showApiKey ? 'text' : 'password'}
                          value={apiKey}
                          onChange={(event) => {
                            setApiKey(event.target.value);
                            setApiKeySaved(false);
                          }}
                          placeholder="sk-… или ваш ключ"
                          className="h-10 w-full rounded-xl border-none px-3 pr-10 text-sm outline-none"
                          style={{ backgroundColor: theme.soft, color: theme.text }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowApiKey((current) => !current)}
                          className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg border-none bg-transparent"
                          style={{ color: theme.muted }}
                          aria-label={showApiKey ? 'Скрыть ключ' : 'Показать ключ'}
                        >
                          {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={saveApiKey}
                        className="inline-flex h-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border-none px-3 text-sm font-semibold text-white"
                        style={{ backgroundColor: accent }}
                      >
                        Сохранить
                      </button>
                    </div>
                  </label>

                  {apiKeySaved && (
                    <p className="m-0 text-xs font-medium" style={{ color: accent }}>
                      Ключ сохранён в демо-сессии
                    </p>
                  )}
                </div>
              </div>

              <div
                className="rounded-2xl border p-4"
                style={{ backgroundColor: theme.panel, borderColor: theme.border }}
              >
                <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                  <p className="m-0 text-sm font-semibold">Системный промпт</p>
                  <span
                    className="rounded-full px-2 py-0.5 text-[0.625rem] font-semibold"
                    style={{
                      backgroundColor: promptSource === 'custom' ? `${accent}22` : theme.soft,
                      color: promptSource === 'custom' ? accent : theme.muted,
                    }}
                  >
                    {promptSource === 'custom' ? 'Свой файл' : 'Шаблон по умолчанию'}
                  </span>
                </div>
                <p className="m-0 mb-4 text-xs leading-relaxed" style={{ color: theme.muted }}>
                  Шаблон уже есть — заполните поля ниже или загрузите свой .txt промпт.
                  Плейсхолдеры: {'{{brand}}'}, {'{{company}}'}, {'{{tone}}'}, {'{{product}}'}.
                </p>

                <div className="mb-3 grid gap-3 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5 text-xs font-medium" style={{ color: theme.muted }}>
                    Тон общения *
                    <input
                      value={promptTone}
                      onChange={(event) => setPromptTone(event.target.value)}
                      placeholder="например: дружелюбный, короткий"
                      className="h-10 rounded-xl border-none px-3 text-sm outline-none"
                      style={{ backgroundColor: theme.soft, color: theme.text }}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5 text-xs font-medium" style={{ color: theme.muted }}>
                    Продукт / услуга *
                    <input
                      value={promptProduct}
                      onChange={(event) => setPromptProduct(event.target.value)}
                      placeholder="например: запись в салон красоты"
                      className="h-10 rounded-xl border-none px-3 text-sm outline-none"
                      style={{ backgroundColor: theme.soft, color: theme.text }}
                    />
                  </label>
                </div>

                <textarea
                  value={aiPrompt}
                  onChange={(event) => {
                    setAiPrompt(event.target.value);
                    setPromptSource('custom');
                  }}
                  rows={8}
                  className="w-full resize-y rounded-xl border-none px-3 py-2.5 text-sm leading-relaxed outline-none"
                  style={{ backgroundColor: theme.soft, color: theme.text }}
                />

                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={resetDefaultPrompt}
                    className="inline-flex h-9 cursor-pointer items-center justify-center rounded-xl border-none px-3 text-sm font-medium"
                    style={{ backgroundColor: theme.soft, color: theme.text }}
                  >
                    Вернуть шаблон
                  </button>
                  <button
                    type="button"
                    onClick={() => promptFileRef.current?.click()}
                    className="inline-flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-xl border-none px-3 text-sm font-medium"
                    style={{ backgroundColor: theme.soft, color: theme.text }}
                  >
                    <Upload className="h-3.5 w-3.5" />
                    Загрузить .txt
                  </button>
                  <input
                    ref={promptFileRef}
                    type="file"
                    accept=".txt,text/plain"
                    className="hidden"
                    onChange={handlePromptUpload}
                  />
                </div>

                <div
                  className="mt-4 rounded-xl px-3 py-2.5 text-xs leading-relaxed"
                  style={{ backgroundColor: theme.page, color: theme.muted }}
                >
                  <p className="m-0 mb-1 font-semibold" style={{ color: theme.text }}>
                    Превью после подстановки
                  </p>
                  <pre className="m-0 whitespace-pre-wrap font-sans text-xs leading-relaxed">
                    {filledPrompt}
                  </pre>
                </div>

                {!promptReady && (
                  <p className="m-0 mt-3 text-xs" style={{ color: theme.muted }}>
                    Чтобы «запустить» ИИ в демо, заполните API-ключ, тон и продукт.
                  </p>
                )}
              </div>

              <div
                className="rounded-2xl border p-4"
                style={{ backgroundColor: theme.panel, borderColor: theme.border }}
              >
                <p className="m-0 text-sm font-semibold">Шаблонные ответы</p>
                <p className="m-0 mt-1 text-xs leading-relaxed" style={{ color: theme.muted }}>
                  Быстрые заготовки для ИИ и операторов. Можно включать, удалять и добавлять свои.
                </p>

                <div className="mt-4 space-y-2">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className="rounded-xl px-3 py-2.5"
                      style={{ backgroundColor: theme.soft }}
                    >
                      <div className="flex items-start gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="m-0 text-sm font-medium">{template.title}</p>
                          <p className="m-0 mt-1 text-xs leading-relaxed" style={{ color: theme.muted }}>
                            {template.text}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleTemplate(template.id)}
                          className="inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border-none"
                          style={{
                            backgroundColor: template.enabled ? `${accent}22` : 'transparent',
                            color: template.enabled ? accent : theme.muted,
                          }}
                          aria-label={template.enabled ? 'Отключить' : 'Включить'}
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeTemplate(template.id)}
                          className="inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border-none bg-transparent"
                          style={{ color: theme.muted }}
                          aria-label="Удалить"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      {view === 'ai' && (
                        <button
                          type="button"
                          onClick={() => {
                            setView('chats');
                            setMobileShowChat(true);
                            insertTemplateToReply(template.text);
                          }}
                          className="mt-2 inline-flex cursor-pointer items-center border-none bg-transparent p-0 text-xs font-medium"
                          style={{ color: accent }}
                        >
                          Подставить в ответ оператора
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div
                  className="mt-4 space-y-2 rounded-xl border p-3"
                  style={{ borderColor: theme.border, backgroundColor: theme.page }}
                >
                  <p className="m-0 text-xs font-semibold uppercase tracking-[0.06em]" style={{ color: theme.muted }}>
                    Добавить шаблон
                  </p>
                  <input
                    value={newTemplateTitle}
                    onChange={(event) => setNewTemplateTitle(event.target.value)}
                    placeholder="Заголовок"
                    className="h-10 w-full rounded-xl border-none px-3 text-sm outline-none"
                    style={{ backgroundColor: theme.soft, color: theme.text }}
                  />
                  <textarea
                    value={newTemplateText}
                    onChange={(event) => setNewTemplateText(event.target.value)}
                    placeholder="Текст ответа"
                    rows={3}
                    className="w-full resize-none rounded-xl border-none px-3 py-2 text-sm outline-none"
                    style={{ backgroundColor: theme.soft, color: theme.text }}
                  />
                  <button
                    type="button"
                    onClick={addTemplate}
                    className="inline-flex h-9 w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border-none text-sm font-semibold text-white"
                    style={{ backgroundColor: accent }}
                  >
                    <Plus className="h-4 w-4" />
                    Добавить
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <nav
        className="fixed inset-x-0 bottom-0 z-30 flex border-t md:hidden"
        style={{
          backgroundColor: theme.panel,
          borderColor: theme.border,
          paddingBottom: 'max(0.35rem, env(safe-area-inset-bottom))',
        }}
      >
        <button
          type="button"
          onClick={() => {
            setView('chats');
            setMobileShowChat(false);
          }}
          className="flex flex-1 cursor-pointer flex-col items-center gap-0.5 border-none bg-transparent py-2 text-[0.6875rem] font-medium"
          style={{ color: view === 'chats' ? accent : theme.muted }}
        >
          <Inbox className="h-5 w-5" />
          Чаты
        </button>
        <button
          type="button"
          onClick={() => setView('widget')}
          className="flex flex-1 cursor-pointer flex-col items-center gap-0.5 border-none bg-transparent py-2 text-[0.6875rem] font-medium"
          style={{ color: view === 'widget' ? accent : theme.muted }}
        >
          <Settings2 className="h-5 w-5" />
          Виджет
        </button>
        <button
          type="button"
          onClick={() => setView('ai')}
          className="flex flex-1 cursor-pointer flex-col items-center gap-0.5 border-none bg-transparent py-2 text-[0.6875rem] font-medium"
          style={{ color: view === 'ai' ? accent : theme.muted }}
        >
          <Sparkles className="h-5 w-5" />
          ИИ
        </button>
      </nav>
    </div>
  );
};

export default SupportPrototype;
