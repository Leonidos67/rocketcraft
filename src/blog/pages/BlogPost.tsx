import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Rocket } from '@/components/ui/motion/Rocket';

interface BlogTag {
  id: string;
  name: string;
  slug: string;
  color: string;
}

interface BlogPost {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
  tags: BlogTag[];
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  gradientBlock?: {
    type: 1 | 2;
    title: string;
    description: string;
  };
  headings?: string[];
}

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);

  // Константа для изображения над блоком информации
  const INFO_IMAGE_URL = "https://placehold.co/600x400/2563eb/white?text=Информация+о+посте";

  // Общее количество постов
  const TOTAL_POSTS = 2;

  // Стили для градиентных блоков
  const getGradientStyle = (type: 1 | 2) => {
    if (type === 1) {
      return {
        backgroundColor: '#254336',
        backgroundImage: `radial-gradient(at 87% 3%, #254336 0%, transparent 60%), 
                         radial-gradient(at 59% 94%, #6b8a7a 0%, transparent 50%), 
                         radial-gradient(at 50% 38%, #b7b597 0%, transparent 40%), 
                         radial-gradient(at 24% 47%, #dad3be 0%, transparent 30%)`
      };
    } else {
      return {
        backgroundColor: '#feffd2',
        backgroundImage: `radial-gradient(at 36% 28%, #feffd2 0%, transparent 60%), 
                         radial-gradient(at 73% 48%, #ffeea9 0%, transparent 50%), 
                         radial-gradient(at 81% 87%, #ffbf78 0%, transparent 40%), 
                         radial-gradient(at 40% 80%, #ff7d29 0%, transparent 30%)`
      };
    }
  };

  useEffect(() => {
    // Заглушка для демонстрации
    const tags: BlogTag[] = [
      { id: 'automation', name: 'Автоматизация процессов', slug: 'automation', color: 'blue' },
      { id: 'solutions', name: 'Готовые решения', slug: 'solutions', color: 'green' },
      { id: 'ai-tools', name: 'ИИ-инструменты', slug: 'ai-tools', color: 'purple' },
      { id: 'cases', name: 'Кейсы и истории', slug: 'cases', color: 'orange' },
      { id: 'startup', name: 'Старт и масштабирование', slug: 'startup', color: 'pink' },
      { id: 'integrations', name: 'Интеграции и технологии', slug: 'integrations', color: 'yellow' },
      { id: 'opinions', name: 'Мнения и тренды', slug: 'opinions', color: 'indigo' },
      { id: 'resources', name: 'Бесплатные ресурсы', slug: 'resources', color: 'red' },
      { id: 'knowledge', name: 'База знаний / Помощь', slug: 'knowledge', color: 'teal' }
    ];

    const mockPosts: Record<number, BlogPost> = {
      1: {
        id: 1,
        title: "5 инструментов, которые заменят целый штат уже сегодня",
        gradientBlock: {
          type: 1,
          title: "Автоматизация бизнеса",
          description: "Как ИИ-инструменты экономят время и деньги"
        },
        headings: [
          "1. ChatGPT или Gemini: ваш стратег и генератор идей",
          "2. Midjourney или Leonardo.ai: ваш дизайнер-иллюстратор",
          "3. Tome или Gamma: ваш презентатор",
          "4. Otter.ai или Notta.ai: ваш личный секретарь на совещаниях"
        ],
        content: `
            <div id="section-1"></div>

<h3 style="font-size: 1.4em; color: #f9f9f9; margin-top: 2em; margin-bottom: 1em; padding-bottom: 0.5em; border-bottom: 1px solid #eee;">1. Claude (от Anthropic) — ваш стратег</h3>
<p style="margin-bottom: 0.8em;"><strong style="color: #3498db;">Для чего:</strong> Продвинутый AI с огромным контекстным окном (до 200K токенов). Может анализировать документы объемом с книгу, видит глубинные связи и выдает стратегически точные решения. Лучше ChatGPT понимает бизнес-контекст и нюансы.</p>
<div style="background-color: rgb(32, 32, 32); padding: 1.2em; margin: 1em 0; border-radius: 8px; border-left: 4px solid #ffffff;">
    <p style="margin: 0; font-size: 0.95em;"><strong style="color: #f9f9f9;">Практический лайфхак:</strong> Загрузите в Claude всю переписку с топ-20 клиентов за полгода и попросите выделить паттерны, которые ведут к сделке. Он найдет неочевидные триггеры и возражения, которые вы упускали.</p>
</div>
<p style="margin-bottom: 1em;"><strong style="color: #27ae60;">Что это даст бизнесу:</strong> <strong style="color: #e74c3c;">Глубокая аналитика</strong> коммуникаций без привлечения дорогих аналитиков. Стратегия, основанная на реальных данных, а не на интуиции.</p>
<div style="margin-bottom: 2em;">
    <a href="https://claude.ai" target="_blank" style="display: inline-block; border: 1px solid #555; color: white; padding: 0.5em 1.2em; border-radius: 6px; text-decoration: none; font-weight: 500; margin-right: 0.8em; font-size: 0.9em;">Сайт Claude</a>
</div>

<h3 style="font-size: 1.4em; color: #f9f9f9; margin-top: 2.5em; margin-bottom: 1em; padding-bottom: 0.5em; border-bottom: 1px solid #eee;">2. Perplexity AI — генератор идей и исследователь</h3>
<p style="margin-bottom: 0.8em;"><strong style="color: #3498db;">Для чего:</strong> Не просто чат, а AI-поисковик с ссылками на реальные источники. Выдает факты, статистику, тренды с подтверждением откуда взял. Идеален для создания контента на базе исследований, а не просто "фантазии нейросети".</p>
<div style="background-color: rgb(32, 32, 32); padding: 1.2em; margin: 1em 0; border-radius: 8px; border-left: 4px solid #ffffff;">
    <p style="margin: 0; font-size: 0.95em;"><strong style="color: #f9f9f9;">Практический лайфхак:</strong> Используйте Perplexity для быстрого создания экспертных постов. Запрос: "Собери 10 исследований 2024 года о поведении потребителей в нише [ваша сфера] с цифрами и графиками". Получаете выжимку с ссылками за 1 минуту.</p>
</div>
<p style="margin-bottom: 1em;"><strong style="color: #27ae60;">Что это даст бизнесу:</strong> <strong style="color: #e74c3c;">Контент с авторитетом.</strong> Посты перестают быть "водой", появляются реальные факты, которые убеждают клиентов.</p>
<div style="margin-bottom: 2em;">
    <a href="https://www.perplexity.ai" target="_blank" style="display: inline-block; border: 1px solid #555; color: white; padding: 0.5em 1.2em; border-radius: 6px; text-decoration: none; font-weight: 500; margin-right: 0.8em; font-size: 0.9em;">Сайт Perplexity</a>
</div>

<h3 style="font-size: 1.4em; color: #f9f9f9; margin-top: 2.5em; margin-bottom: 1em; padding-bottom: 0.5em; border-bottom: 1px solid #eee;">3. Ideogram — дизайнер-иллюстратор</h3>
<p style="margin-bottom: 0.8em;"><strong style="color: #3498db;">Для чего:</strong> Лучший AI для работы с типографикой и текстом на картинках. В отличие от Midjourney, Ideogram умеет писать читаемые слова, логотипы, посты с надписями, мерч. Идеален для соцсетей, где нужен текст на визуале.</p>
<div style="background-color: rgb(32, 32, 32); padding: 1.2em; margin: 1em 0; border-radius: 8px; border-left: 4px solid #ffffff;">
    <p style="margin: 0; font-size: 0.95em;"><strong style="color: #f9f9f9;">Практический лайфхак:</strong> Генерируйте обложки для Reels и постов сразу с заголовком. Например: "Создай изображение в стиле кинопостера с текстом '5 способов увеличить прибыль'". Экономите часы в Canva.</p>
</div>
<p style="margin-bottom: 1em;"><strong style="color: #27ae60;">Что это даст бизнесу:</strong> <strong style="color: #e74c3c;">Скорость производства</strong> визуала. От идеи до готовой картинки с текстом — 30 секунд.</p>
<div style="margin-bottom: 2em;">
    <a href="https://ideogram.ai" target="_blank" style="display: inline-block; border: 1px solid #555; color: white; padding: 0.5em 1.2em; border-radius: 6px; text-decoration: none; font-weight: 500; margin-right: 0.8em; font-size: 0.9em;">Сайт Ideogram</a>
</div>

<h3 style="font-size: 1.4em; color: #f9f9f9; margin-top: 2.5em; margin-bottom: 1em; padding-bottom: 0.5em; border-bottom: 1px solid #eee;">4. Beautiful.ai — ваш презентатор</h3>
<p style="margin-bottom: 0.8em;"><strong style="color: #3498db;">Для чего:</strong> AI-презентации, которые реально выглядят дорого. Сам подбирает макеты, выравнивает элементы, анимирует появление. Достаточно добавить текст и картинки — все остальное сервис делает сам, соблюдая законы дизайна.</p>
<div style="background-color: rgb(32, 32, 32); padding: 1.2em; margin: 1em 0; border-radius: 8px; border-left: 4px solid #ffffff;">
    <p style="margin: 0; font-size: 0.95em;"><strong style="color: #f9f9f9;">Практический лайфхак:</strong> Сделайте корпоративный шаблон в Beautiful.ai и научите менеджеров делать КП. Любой сотрудник сможет собрать презентацию уровня топ-дизайнера за 15 минут.</p>
</div>
<p style="margin-bottom: 1em;"><strong style="color: #27ae60;">Что это даст бизнесу:</strong> <strong style="color: #e74c3c;">Имидж премиальности.</strong> Клиенты воспринимают компанию как серьезного игрока, когда видят качественные материалы.</p>
<div style="margin-bottom: 2em;">
    <a href="https://www.beautiful.ai" target="_blank" style="display: inline-block; border: 1px solid #555; color: white; padding: 0.5em 1.2em; border-radius: 6px; text-decoration: none; font-weight: 500; margin-right: 0.8em; font-size: 0.9em;">Сайт Beautiful.ai</a>
</div>

<h3 style="font-size: 1.4em; color: #f9f9f9; margin-top: 2.5em; margin-bottom: 1em; padding-bottom: 0.5em; border-bottom: 1px solid #eee;">5. Fathom.video — AI-секретарь на совещаниях</h3>
<p style="margin-bottom: 0.8em;"><strong style="color: #3498db;">Для чего:</strong> Бесплатный AI-ассистент для Zoom. Сам подключается к встрече, записывает, расшифровывает, выделяет ключевые моменты и отправляет саммари в CRM или Notion. Не требует от участников нажимать "запись".</p>
<div style="background-color: rgb(32, 32, 32); padding: 1.2em; margin: 1em 0; border-radius: 8px; border-left: 4px solid #ffffff;">
    <p style="margin: 0; font-size: 0.95em;"><strong style="color: #f9f9f9;">Практический лайфхак:</strong> Интегрируйте с HubSpot или Salesforce. После созвона Fathom сам создаст карточку контакта, запишет туда итоги встречи и поставит задачу менеджеру.</p>
</div>
<p style="margin-bottom: 1em;"><strong style="color: #27ae60;">Что это даст бизнесу:</strong> <strong style="color: #e74c3c;">Прозрачность продаж.</strong> Руководитель видит, как проходят переговоры, без подслушивания. Ни один пункт договоренностей не теряется.</p>
<div style="margin-bottom: 2em;">
    <a href="https://fathom.video" target="_blank" style="display: inline-block; border: 1px solid #555; color: white; padding: 0.5em 1.2em; border-radius: 6px; text-decoration: none; font-weight: 500; margin-right: 0.8em; font-size: 0.9em;">Сайт Fathom</a>
</div>

<!-- БЛОК ПРО ВНЕДРЕНИЕ AI В БИЗНЕС (без изменений внутри, только фон остался) -->
<div style="margin-top: 3em; margin-bottom: 2em; padding: 2em; background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
    <h3 style="font-size: 1.8em; color: #222222; margin-top: 0; margin-bottom: 0.5em; text-align: center;">Внедряем AI в ваш бизнес</h3>
    <p style="font-size: 1.1em; color: #444444; text-align: center; margin-bottom: 2em;">Мы в AGURA не просто рассказываем про инструменты — мы собираем из них готовые рабочие системы под ваши задачи</p>
    
    <div style="display: flex; flex-wrap: wrap; gap: 1.5em; margin-bottom: 2em;">
        <div style="flex: 1; min-width: 250px; background: white; padding: 1.5em; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">
            <div style="font-size: 2em; margin-bottom: 0.3em;">🎯</div>
            <h4 style="color: #222222; margin-top: 0; margin-bottom: 0.8em;">Аудит и стратегия</h4>
            <p style="color: #555555; margin-bottom: 0;">Анализируем ваши текущие процессы, находим точки, где AI даст максимум эффекта. Составляем дорожную карту внедрения с конкретными метриками.</p>
        </div>
        <div style="flex: 1; min-width: 250px; background: white; padding: 1.5em; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">
            <div style="font-size: 2em; margin-bottom: 0.3em;">⚙️</div>
            <h4 style="color: #222222; margin-top: 0; margin-bottom: 0.8em;">Настройка и интеграция</h4>
            <p style="color: #555555; margin-bottom: 0;">Подбираем связки инструментов, интегрируем их с вашей CRM, телефонией и соцсетями. Все работает в единой системе, ничего не теряется.</p>
        </div>
        <div style="flex: 1; min-width: 250px; background: white; padding: 1.5em; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">
            <div style="font-size: 2em; margin-bottom: 0.3em;">📊</div>
            <h4 style="color: #222222; margin-top: 0; margin-bottom: 0.8em;">Аналитика и оптимизация</h4>
            <p style="color: #555555; margin-bottom: 0;">Настраиваем сквозную аналитику, чтобы вы видели реальный ROI от внедрения. Ежемесячно оптимизируем связки под растущие задачи.</p>
        </div>
    </div>
    
    <div style="background-color: #f0f0f0; padding: 1.5em; border-radius: 12px; margin-bottom: 2em;">
        <h4 style="color: #222222; margin-top: 0; margin-bottom: 0.8em;">Примеры того, что мы уже собрали для клиентов:</h4>
        <ul style="color: #444444; margin-bottom: 0;">
            <li style="margin-bottom: 0.5em;"><strong>Для бьюти-студии:</strong> Автоматическая запись клиентов через AI-ассистента + напоминания о визите + сбор обратной связи после процедуры. Запись выросла на 40%.</li>
            <li style="margin-bottom: 0.5em;"><strong>Для инфобизнеса:</strong> Связка ChatGPT + Midjourney + Tome = производство 30 постов, 10 Reels и 5 презентаций в неделю силами одного человека. Охваты выросли в 3 раза.</li>
            <li style="margin-bottom: 0.5em;"><strong>Для отдела продаж:</strong> Otter.ai анализирует все звонки, CRM автоматически ставит задачи менеджерам, конверсия в сделку +18%.</li>
        </ul>
    </div>
    
    <div style="text-align: center; margin-top: 1.5em;">
        <a href="#" style="display: inline-block; background-color: #222222; color: white; padding: 1em 2.5em; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 1.2em; box-shadow: 0 5px 15px rgba(0,0,0,0.2);">👉 Перейти на сайт AGURA — получить консультацию</a>
        <p style="color: #666666; margin-top: 1em; font-size: 0.9em;">Рассчитаем, сколько сэкономит ваш бизнес с AI</p>
    </div>
</div>
        `,
        date: "2026-01-09",
        author: "Автор",
        tags: [tags[0], tags[2]],
        publishedAt: "2026-01-09",
        updatedAt: "2026-01-09",
        readingTime: "8 мин"
      },
      2: {
        id: 2,
        title: "Привет",
        gradientBlock: {
          type: 2,
          title: "Приветствие",
          description: "Краткое введение в блог"
        },
        headings: [],
        content: "<p>привет</p>",
        date: "2026-01-08",
        author: "Автор",
        tags: [tags[1], tags[5]],
        publishedAt: "2026-01-08",
        updatedAt: "2026-01-08",
        readingTime: "1 мин"
      }
    };

    const postId = parseInt(id || '1');
    setPost(mockPosts[postId] || mockPosts[1]);
  }, [id]);

  if (!post) {
    return <div>буквально секунду...</div>;
  }

  return (
    <div className="min-h-screen bg-black">
      
      <main className="container mx-auto px-0 py-2">
        {/* Breadcrumbs */}
        <div className="my-3">
          <div className="flex items-center text-sm">
            <button 
              onClick={() => window.history.back()}
              className="mr-4 p-2 rounded-lg hover:bg-[#161616] transition-colors text-[#999] hover:text-white cursor-pointer"
              aria-label="Назад"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <Link to="/" className="text-[#999] hover:text-white transition-colors">
              Блог
            </Link>
            <span className="mx-2 text-[#999]">/</span>
            {post.tags.length > 0 && (
              <>
                <span className="text-[#999]">{post.tags[0].name}</span>
                <span className="mx-2 text-[#999]">/</span>
              </>
            )}
            <span className="text-white font-medium">{post.title}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-12 gap-3">
          
          {/* Левая колонка */}
          <div className="col-span-12 md:col-span-3">
            <div className="p-2 sticky top-6">
              
              {/* Градиентный блок статьи */}
              {post.gradientBlock && (
                <div 
                  className="mb-3 rounded-lg p-2 flex items-end relative"
                  style={{
                    height: '120px',
                    ...(post.gradientBlock.type === 1 
                      ? { color: 'white' }
                      : { color: '#333' }),
                    ...getGradientStyle(post.gradientBlock.type)
                  }}
                >
                  {/* Счетчик сверху справа */}
                  <span className="absolute top-2 right-2 text-xs font-medium">
                    {post.id}/{TOTAL_POSTS}
                  </span>
                  
                  <div className="w-full">
                    
                    {/* Кнопки и заголовок в одной строке */}
                    <div className="flex items-center justify-between">
                      <button 
                        onClick={() => {
                          const prevId = Math.max(1, post.id - 1);
                          window.location.href = `/post/${prevId}`;
                        }}
                        className="p-2 rounded-lg hover:bg-black/20 transition-colors cursor-pointer"
                        disabled={post.id <= 1}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      
                      <h3 className="text-base font-bold">{post.gradientBlock.title}</h3>
                      
                      <button 
                        onClick={() => {
                          const nextId = Math.min(TOTAL_POSTS, post.id + 1);
                          window.location.href = `/post/${nextId}`;
                        }}
                        className="p-2 rounded-lg hover:bg-black/20 transition-colors cursor-pointer"
                        disabled={post.id >= TOTAL_POSTS}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="">
                
                <h3 className="text-white font-semibold my-4 text-base">Теги</h3>
                <div className="space-y-2 mb-6">
                    {post.tags.map((tag) => (
                    <div 
                        key={tag.id}
                        className={`inline-block px-3 py-2 rounded-lg text-sm font-medium ${
                        tag.color === 'blue' ? 'bg-blue-500/20 text-blue-300' :
                        tag.color === 'green' ? 'bg-green-500/20 text-green-300' :
                        tag.color === 'purple' ? 'bg-purple-500/20 text-purple-300' :
                        tag.color === 'orange' ? 'bg-orange-500/20 text-orange-300' :
                        tag.color === 'pink' ? 'bg-pink-500/20 text-pink-300' :
                        tag.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-300' :
                        tag.color === 'indigo' ? 'bg-indigo-500/20 text-indigo-300' :
                        tag.color === 'red' ? 'bg-red-500/20 text-red-300' :
                        tag.color === 'teal' ? 'bg-teal-500/20 text-teal-300' :
                        'bg-gray-500/20 text-gray-300'
                        }`}
                    >
                        {tag.name}
                    </div>
                    ))}
                </div>

                <h4 className="text-white font-semibold mb-3 text-base">Информация</h4>
                <div className="space-y-2 text-xs font-bold text-white/60">
                  <div>
                    <span className="text-gray-200">Опубликовано: </span>
                    {new Date(post.publishedAt).toLocaleDateString('ru-RU')}
                  </div>
                  <div>
                    <span className="text-gray-200">Обновлено: </span>
                    {new Date(post.updatedAt).toLocaleDateString('ru-RU')}
                  </div>
                  <div>
                    <span className="text-gray-200">Время прочтения: </span>
                    {post.readingTime}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Центральная колонка - пост */}
          <div className="col-span-12 md:col-span-6">
            <article className="p-2">
          
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">{post.title}</h1>
            {/* Теги */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span 
                  key={tag.id}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    tag.color === 'blue' ? 'bg-blue-500/20 text-blue-300' :
                    tag.color === 'green' ? 'bg-green-500/20 text-green-300' :
                    tag.color === 'purple' ? 'bg-purple-500/20 text-purple-300' :
                    tag.color === 'orange' ? 'bg-orange-500/20 text-orange-300' :
                    tag.color === 'pink' ? 'bg-pink-500/20 text-pink-300' :
                    tag.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-300' :
                    tag.color === 'indigo' ? 'bg-indigo-500/20 text-indigo-300' :
                    tag.color === 'red' ? 'bg-red-500/20 text-red-300' :
                    tag.color === 'teal' ? 'bg-teal-500/20 text-teal-300' :
                    'bg-gray-500/20 text-gray-300'
                  }`}
                >
                  {tag.name}
                </span>
              ))}
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <span>{post.author}</span>
              <span className="mx-2">•</span>
              <span>{new Date(post.date).toLocaleDateString('ru-RU')}</span>
            </div>
            </header>
            

            <div 
              className="prose prose-invert max-w-none text-[#d8d8d8]"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
          </div>

            {/* Правая колонка - призыв к действию */}
            <div className="col-span-12 md:col-span-3">

                {/* Оглавление */}
                {post.headings && post.headings.length > 0 && (
                <div className="mb-6 bg-white/5 rounded-2xl border border-white/15 p-4 sticky top-6">
                    <h3 className="text-white font-semibold mb-3 text-base">Оглавление</h3>
                    <div className="space-y-2">
                        {post.headings.map((heading, index) => (
                        <a 
                            key={index}
                            href={`#section-${index + 1}`}
                            className="block text-sm text-blue-300 hover:text-blue-100 transition-colors"
                        >
                            {heading}
                        </a>
                        ))}
                    </div>
                </div>
                )}

                <div className="bg-white/5 rounded-2xl border border-white/15 p-4 sticky top-6">
                <h3 className="text-white font-semibold mb-4 text-sm">
                    <a 
                    href="http://localhost:5173" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
                    >
                    <Rocket 
                        width={20}
                        height={20}
                        stroke="currentColor"
                        strokeWidth={2}
                    />
                    <span className='text-lg'>Agyra</span>
                    </a>
                    <div className="mt-2">
                    Готовы перейти от рутины к полной автоматизации?
                    </div>
                </h3>
                <a 
                    href="http://localhost:5173" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm w-full bg-white/5 hover:bg-white/10 text-white font-medium py-3 px-3 rounded-lg text-center transition-colors duration-200 cursor-pointer"
                >
                    Перейти на сайт Agyra
                </a>
                </div>
            </div>
          
        </div>
      </main>
    </div>
  );
};

export default BlogPost;