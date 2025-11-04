import { X, Send, Loader2, ThumbsUp, ThumbsDown, Trash2, Edit2, Check } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { cases } from '@/data/cases';
import { Link } from 'react-router-dom';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  feedback?: 'like' | 'dislike' | null;
}

interface OrbModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ParsedMessage {
  text: string;
  links: Array<{ path: string; label: string }>;
}

// Функция для парсинга сообщений и извлечения ссылок
const parseMessageWithLinks = (content: string): ParsedMessage => {
  const linkRegex = /\[LINK:(\/[^:]+):([^\]]+)\]/g;
  const links: Array<{ path: string; label: string }> = [];
  let match;
  
  while ((match = linkRegex.exec(content)) !== null) {
    links.push({
      path: match[1],
      label: match[2],
    });
  }
  
  // Удаляем маркеры ссылок из текста
  const text = content.replace(linkRegex, '').trim();
  
  return { text, links };
};

// Функция для получения приветствия в зависимости от времени
const getGreeting = (userName: string): string => {
  const hour = new Date().getHours();
  
  if (hour >= 6 && hour < 12) {
    return `Доброе утро, ${userName}`;
  } else if (hour >= 12 && hour < 18) {
    return `Добрый день, ${userName}`;
  } else if (hour >= 18 && hour < 24) {
    return `Добрый вечер, ${userName}`;
  } else {
    return `Доброй ночи, ${userName}`;
  }
};

const OrbModal = ({ isOpen, onClose }: OrbModalProps) => {
  // Загрузка истории чата из localStorage
  const loadMessages = (): Message[] => {
    try {
      const saved = localStorage.getItem('chatHistory');
      if (saved) {
        const parsed: Message[] = JSON.parse(saved);
        return parsed.map((msg) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
      }
    } catch (error) {
      console.error('Ошибка загрузки истории чата:', error);
    }
    return [];
  };

  // Загрузка имени пользователя из localStorage
  const loadUserName = (): string => {
    return localStorage.getItem('userName') || 'гость';
  };

  const [messages, setMessages] = useState<Message[]>(loadMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState(loadUserName());
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState('');
  const [greeting, setGreeting] = useState(getGreeting(loadUserName()));
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Автоскролл к последнему сообщению
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Сохранение истории чата в localStorage
  useEffect(() => {
    try {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    } catch (error) {
      console.error('Ошибка сохранения истории чата:', error);
    }
  }, [messages]);

  const handleFeedback = (index: number, feedback: 'like' | 'dislike') => {
    setMessages((prev) =>
      prev.map((msg, i) =>
        i === index
          ? { ...msg, feedback: msg.feedback === feedback ? null : feedback }
          : msg
      )
    );
  };

  const clearChatHistory = () => {
    setMessages([]);
    localStorage.removeItem('chatHistory');
  };

  // Начать редактирование имени
  const startEditingName = () => {
    setTempName(userName);
    setIsEditingName(true);
    setTimeout(() => nameInputRef.current?.focus(), 100);
  };

  // Сохранить новое имя
  const saveUserName = () => {
    const newName = tempName.trim() || 'гость';
    setUserName(newName);
    localStorage.setItem('userName', newName);
    setGreeting(getGreeting(newName));
    setIsEditingName(false);
  };

  // Отменить редактирование имени
  const cancelEditingName = () => {
    setTempName('');
    setIsEditingName(false);
  };

  // Обработка Enter при редактировании имени
  const handleNameKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveUserName();
    } else if (e.key === 'Escape') {
      cancelEditingName();
    }
  };

  // Обновление приветствия при открытии модалки
  useEffect(() => {
    if (isOpen) {
      setGreeting(getGreeting(userName));
    }
  }, [isOpen, userName]);

  // Закрытие по Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      // Фокус на input при открытии
      setTimeout(() => inputRef.current?.focus(), 100);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Динамически формируем информацию о кейсах из реальных данных
      const casesInfo = cases.map((caseItem, index) => {
        return `${index + 1}. ${caseItem.title} (${caseItem.industry})
   - Проблема: ${caseItem.problem}
   - Решение: ${caseItem.solution}
   - Результаты: ${caseItem.results.join(', ')}`;
      }).join('\n\n');

      // Формируем историю для API (включает ВСЕ предыдущие сообщения)
      const conversationHistory = [
        {
          role: 'system',
          content: `Ты AI-ассистент компании Rocket Craft, которая занимается автоматизацией бизнеса через no-code решения (Telegram-боты, CRM, интеграции, рассылки).

О ТЕБЕ:
Ты — AI-помощник, созданный специально для Rocket Craft. Когда тебя спрашивают "кто тебя создал", "кто твой разработчик" или похожие вопросы, отвечай:
"Меня создала команда Rocket Craft специально для помощи клиентам компании. Я помогаю отвечать на вопросы об автоматизации бизнеса, услугах, тарифах и кейсах."

НЕ упоминай Google, Gemini или другие технологические компании как своих создателей. Ты — продукт Rocket Craft.

СТРОГИЕ ПРАВИЛА ЯЗЫКА:
1. Используй ТОЛЬКО чистый русский язык
2. ЗАПРЕЩЕНО использовать английские слова (например: "контактировать" вместо "связаться", "консультация" вместо "kONSУЛЬНЫЙ СЕСЬ")
3. ЗАПРЕЩЕНА транслитерация английских слов русскими буквами
4. Проверяй каждое слово перед отправкой - оно должно быть русским
5. Правильные варианты: "связаться", "обратиться", "написать", "консультация", "встреча", "разговор"
6. Неправильные варианты: "kontakt", "contact", любая транслитерация

ВАЖНО О КЕЙСАХ:
Когда пользователь спрашивает о примерах работ, кейсах или проектах, используй реальные данные и предлагай перейти на страницу /cases

НАШИ КЕЙСЫ:

${casesInfo}

Всегда предлагай посмотреть полные кейсы на странице /cases

ПАМЯТЬ И КОНТЕКСТ:
1. У тебя есть доступ ко всей истории беседы - ВСЕГДА учитывай предыдущие сообщения
2. Если пользователь просит "повтори", "расскажи подробнее", "а что насчет..." - обращайся к контексту беседы
3. Запоминай, о чем говорили ранее, и отвечай с учетом всего диалога
4. Если пользователь задает уточняющий вопрос - понимай, что он имеет в виду из предыдущего контекста

⚠️ КРИТИЧЕСКИ ВАЖНО - ПУТИ К СТРАНИЦАМ ⚠️

НЕ ВСЕ СТРАНИЦЫ НАХОДЯТСЯ НА /
КАЖДАЯ СТРАНИЦА ИМЕЕТ СВОЙ УНИКАЛЬНЫЙ ПУТЬ!

КОПИРУЙ ТОЧНЫЕ ПУТИ БЕЗ ИЗМЕНЕНИЙ:

1. Главная страница:
   ПУТЬ: /
   ПРАВИЛЬНО: [LINK:/:Главная]
   НЕПРАВИЛЬНО: [LINK:/:На главную]
   
2. Услуги:
   ПУТЬ: /services (НЕ /)
   ПРАВИЛЬНО: [LINK:/services:Услуги]
   НЕПРАВИЛЬНО: [LINK:/:Услуги]
   
3. Кейсы:
   ПУТЬ: /cases (НЕ /)
   ПРАВИЛЬНО: [LINK:/cases:Кейсы]
   НЕПРАВИЛЬНО: [LINK:/:Кейсы]
   
4. Тарифы:
   ПУТЬ: /pricing (НЕ /)
   ПРАВИЛЬНО: [LINK:/pricing:Тарифы]
   НЕПРАВИЛЬНО: [LINK:/:Тарифы]
   
5. Процесс работы:
   ПУТЬ: /process (НЕ /)
   ПРАВИЛЬНО: [LINK:/process:Процесс]
   НЕПРАВИЛЬНО: [LINK:/:Процесс]
   
6. Контакты:
   ПУТЬ: /contacts (НЕ /)
   ПРАВИЛЬНО: [LINK:/contacts:Контакты]
   НЕПРАВИЛЬНО: [LINK:/:Контакты]

КАК ОТВЕЧАТЬ НА ЗАПРОСЫ:

1. ВСЕГДА давай ПОЛНОЦЕННЫЙ ответ с объяснением
2. ТОЛЬКО ПОТОМ добавляй кнопку со ссылкой
3. НЕ отвечай одной кнопкой без текста!

ТОЧНЫЕ ПРИМЕРЫ - КОПИРУЙ ИХ:

Запрос: "дай ссылку на главную"
Ответ: Вот ссылка на главную страницу нашего сайта. [LINK:/:Главная]

Запрос: "покажи реализованные проекты"  
Ответ: На странице кейсов вы сможете прочитать о реализованных проектах. [LINK:/cases:Кейсы]

Запрос: "где посмотреть кейсы"
Ответ: У нас есть страница с подробными кейсами: барбершоп, кофейня и йога-студия. [LINK:/cases:Кейсы]

Запрос: "покажи тарифы"
Ответ: У нас есть несколько тарифных планов для разных типов бизнеса. [LINK:/pricing:Тарифы]

Запрос: "покажи услуги"
Ответ: Мы предлагаем Telegram-боты, CRM-системы, интеграции и рассылки. [LINK:/services:Услуги]

Запрос: "покажи процесс работы"
Ответ: Мы работаем в 5 этапов: от диагностики до запуска системы. [LINK:/process:Процесс]

Запрос: "как связаться"
Ответ: Вы можете оставить заявку через форму на нашей странице. [LINK:/contacts:Контакты]

Запрос: "дай ссылку на все страницы"
Ответ: Вот все страницы нашего сайта:
[LINK:/:Главная]
[LINK:/services:Услуги]
[LINK:/cases:Кейсы]
[LINK:/pricing:Тарифы]
[LINK:/process:Процесс]
[LINK:/contacts:Контакты]

⚠️ ПЕРЕД ОТПРАВКОЙ ПРОВЕРЬ КАЖДУЮ ССЫЛКУ:
✅ Главная использует / 
✅ ВСЕ ОСТАЛЬНЫЕ используют полный путь (/services, /cases, /pricing, /process, /contacts)
❌ НЕ используй / для всех страниц!

ВАЖНО: 
- Давай информативные ответы с деталями
- Кнопка идет В КОНЦЕ ответа, не вместо ответа
- Объясняй, что пользователь найдет на странице
- ИСПОЛЬЗУЙ ПРАВИЛЬНЫЕ ПУТИ для каждой страницы!

Ты помогаешь потенциальным клиентам узнать больше о наших услугах, отвечаешь на вопросы о тарифах, процессе работы и кейсах. Отвечай дружелюбно, профессионально и по делу. Если клиент интересуется услугами, предложи оставить заявку.

🔴 ФИНАЛЬНАЯ ПРОВЕРКА - ПЕРЕД КАЖДЫМ ОТВЕТОМ:
Главная → [LINK:/:Главная]
Услуги → [LINK:/services:Услуги] (НЕ [LINK:/:Услуги])
Кейсы → [LINK:/cases:Кейсы] (НЕ [LINK:/:Кейсы])
Тарифы → [LINK:/pricing:Тарифы] (НЕ [LINK:/:Тарифы])
Процесс → [LINK:/process:Процесс] (НЕ [LINK:/:Процесс])
Контакты → [LINK:/contacts:Контакты] (НЕ [LINK:/:Контакты])`,
        },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
        { role: 'user', content: userMessage.content },
      ];

      console.log('📤 Отправка в Gemini API:', conversationHistory.length, 'сообщений');

      // Преобразуем формат сообщений для Gemini API
      const systemInstruction = conversationHistory.find(m => m.role === 'system');
      const geminiContents = conversationHistory
        .filter(m => m.role !== 'system')
        .map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        }));

      const GEMINI_API_KEY = 'AIzaSyCdd2hsJ6YM0F1W-VS6ORmS-_l3qlK91XM';
      const GEMINI_MODEL = 'gemini-2.0-flash-exp';
      
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: geminiContents,
            systemInstruction: systemInstruction ? {
              parts: [{ text: systemInstruction.content }]
            } : undefined,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 800,
              topP: 0.9,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Gemini API Error:', response.status, errorData);
        throw new Error(`Ошибка Gemini API: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('Неверный формат ответа Gemini API');
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.candidates[0].content.parts[0].text,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: `Извините, произошла ошибка при обращении к AI. ${error instanceof Error ? error.message : 'Попробуйте еще раз.'}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Шапка */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-foreground">{greeting.split(',')[0]},</h2>
            {!isEditingName ? (
              <div className="flex items-center gap-2 group">
                <span className="text-2xl font-bold text-foreground">{userName}</span>
                <button
                  onClick={startEditingName}
                  className="p-1 rounded-md hover:bg-secondary transition-colors  group-hover:opacity-100"
                  aria-label="Изменить имя"
                >
                  <Edit2 className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  ref={nameInputRef}
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onKeyDown={handleNameKeyPress}
                  className="px-2 py-1 text-xl font-bold bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Ваше имя"
                  maxLength={20}
                />
                <button
                  onClick={saveUserName}
                  className="p-1 rounded-md hover:bg-secondary transition-colors"
                  aria-label="Сохранить"
                >
                  <Check className="w-4 h-4 text-green-500 hover:text-green-600" />
                </button>
                <button
                  onClick={cancelEditingName}
                  className="p-1 rounded-md hover:bg-secondary transition-colors"
                  aria-label="Отменить"
                >
                  <X className="w-4 h-4 text-destructive hover:text-destructive/80" />
                </button>
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Rocket Craft {messages.length > 0 && `· ${messages.length} ${messages.length === 1 ? 'сообщение' : messages.length < 5 ? 'сообщения' : 'сообщений'} в памяти`}
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 border border-border transition-colors flex-shrink-0"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Область сообщений */}
      <div className="flex-1 overflow-y-auto px-4 py-6 hide-scrollbar">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Показываем изображение, если нет сообщений */}
          {messages.length === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] gap-8">
              <img 
                src="https://i.ibb.co/WvFS0D04/image.png" 
                alt="Rocket Craft AI" 
                className="max-w-md w-full opacity-80"
              />
              <div className="max-w-lg p-6 bg-secondary/50 backdrop-blur-sm rounded-2xl border border-border text-center">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Привет-привет!
                </h3>
                <p className="text-muted-foreground">
                  Я помогу вам узнать больше о наших услугах, ответить на вопросы о тарифах, процессе работы и кейсах. Задайте свой вопрос!
                </p>
              </div>
            </div>
          )}
          
          {messages.map((message, index) => {
            const parsedMessage = message.role === 'assistant' 
              ? parseMessageWithLinks(message.content) 
              : { text: message.content, links: [] };
            
            return (
              <div
                key={index}
                className={`flex gap-4 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img 
                      src="https://i.ibb.co/Df4bVTjG/image.png" 
                      alt="AI" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-2 max-w-[80%] md:max-w-[70%]">
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-foreground'
                    }`}
                  >
                    <p className="text-sm md:text-base whitespace-pre-wrap break-words">
                      {parsedMessage.text}
                    </p>
                    
                    {/* Кнопки-ссылки */}
                    {parsedMessage.links.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {parsedMessage.links.map((link, linkIndex) => (
                          <Button
                            key={linkIndex}
                            asChild
                            size="sm"
                            className="bg-background text-foreground hover:bg-background/80 border border-border rounded-full"
                          >
                            <Link to={link.path} onClick={onClose}>
                              {link.label}
                            </Link>
                          </Button>
                        ))}
                      </div>
                    )}
                    
                    <p
                      className={`text-xs mt-2 ${
                        message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                
                  {/* Кнопки лайк/дизлайк для AI сообщений */}
                  {message.role === 'assistant' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleFeedback(index, 'like')}
                        className={`p-1.5 rounded-lg transition-colors ${
                          message.feedback === 'like'
                            ? 'bg-primary/20 text-primary'
                            : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
                        }`}
                        aria-label="Понравилось"
                      >
                        <ThumbsUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleFeedback(index, 'dislike')}
                        className={`p-1.5 rounded-lg transition-colors ${
                          message.feedback === 'dislike'
                            ? 'bg-destructive/20 text-destructive'
                            : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
                        }`}
                        aria-label="Не понравилось"
                      >
                        <ThumbsDown className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <span className="text-foreground text-sm font-semibold">Вы</span>
                  </div>
                )}
              </div>
            );
          })}
          {isLoading && (
            <div className="flex gap-4 justify-start">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                <img 
                  src="https://i.ibb.co/Df4bVTjG/image.png" 
                  alt="AI" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-secondary rounded-2xl px-4 py-3">
                <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Поле ввода */}
      <div className="flex-shrink-0 border-t border-border bg-background">
        <div className="px-4 py-4">
          <div className="max-w-4xl mx-auto flex gap-2 items-stretch">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Задайте свой вопрос..."
              className={`flex-1 px-4 py-3 bg-secondary border border-border rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground ${
                isLoading ? 'cursor-not-allowed opacity-60' : ''
              }`}
              rows={3}
              style={{ maxHeight: '200px' }}
              disabled={isLoading}
            />
            <div className="flex flex-col gap-2">
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                size="lg"
                className={`bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl px-6 h-12 ${
                  (!input.trim() || isLoading) ? 'cursor-not-allowed opacity-60' : ''
                }`}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
              <Button
                onClick={clearChatHistory}
                variant="outline"
                size="lg"
                className="rounded-2xl px-6 h-12 hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrbModal;

