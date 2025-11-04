import { useState, useEffect, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CodeExample from '@/components/CodeExample';
import { Button } from '@/components/ui/button';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { IconCloud } from '@/components/ui/icon-cloud';
import { Highlighter } from '@/components/ui/highlighter';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { ArrowRight, Coffee, Briefcase, DollarSign, Workflow, Eye, Bell, Zap, Code, Rocket, Cloud, Sparkles, Shield, Lock, TrendingUp, Users, Target, Clock, Heart, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import OrbModal from '@/components/OrbModal';
import ScrollBasedVelocityDemo from '@/components/ScrollBasedVelocityDemo';
import ScrollableCardStack from '@/components/ui/scrollable-card-stack';
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack';
import { Globe } from '@/components/ui/globe';

const techSlugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];

const carouselData = [
  {
    id: 0,
    title: 'Рост прибыли',
    description: 'Комплексная автоматизация продаж и маркетинга увеличивает выручку без увеличения штата сотрудников.',
    icon: TrendingUp,
    metric: '+35%',
    metricLabel: 'Рост прибыли клиентов',
  },
  {
    id: 1,
    title: 'Экономия времени',
    description: 'Сокращаем рутинные операции, отчёты и ручные задачи — команда работает быстрее, бизнес масштабируется легче.',
    icon: Clock,
    metric: '-80%',
    metricLabel: 'Ручной работы',
  },
  {
    id: 2,
    title: 'Контроль и прозрачность',
    description: 'Руководитель видит всё: заявки, клиентов, сотрудников и показатели в одной панели управления.',
    icon: Eye,
    metric: '100%',
    metricLabel: 'Прозрачность процессов',
  },
  {
    id: 3,
    title: 'Лояльные клиенты',
    description: 'Автоматические рассылки, напоминания и персональные акции повышают вовлечённость и удержание клиентов.',
    icon: Heart,
    metric: '21%',
    metricLabel: 'Повторных покупок',
  },
  {
    id: 4,
    title: 'Умная аналитика',
    description: 'AI-анализ данных помогает находить узкие места, прогнозировать спрос и принимать точные управленческие решения.',
    icon: BarChart3,
    metric: 'AI',
    metricLabel: 'Поддержка решений',
  },
];

const sections = [
  {
    title: 'Услуги',
    icon: Coffee,
    description: 'Telegram-боты, CRM-интеграции, автоматизация процессов для вашего бизнеса',
    link: '/services',
    highlights: ['6 отраслей', 'Готовые решения', 'Под ключ'],
  },
  {
    title: 'Кейсы',
    icon: Briefcase,
    description: 'Реальные результаты: +40% записей, -80% ручного труда, рост лояльности',
    link: '/cases',
    highlights: ['3 кейса', 'Проверенные метрики', 'Реальные клиенты'],
  },
  {
    title: 'Тарифы',
    icon: DollarSign,
    description: 'Прозрачные цены от 15 000 ₽. Lite, Pro, Full — выберите свой вариант',
    link: '/pricing',
    highlights: ['Фиксированные цены', 'Без скрытых платежей', 'От 15 000 ₽'],
  },
  {
    title: 'Процесс',
    icon: Workflow,
    description: '4 простых шага: диагностика, настройка, тестирование, запуск за 5-14 дней',
    link: '/process',
    highlights: ['4 этапа', '5-14 дней', 'Прозрачный процесс'],
  },
];

const heroBaseText = 'Ваш бизнес, который ';
const heroTexts = [
  'не требует контроля',
  'привлекает клиентов сам',
  'продаёт, пока вы отдыхаете',
  'не теряет заявки и заказы',
  'экономит время и деньги',
  'растёт без хаоса и рутины',
  'работает чётко, как система',
  'работает на автопилоте',
  'впечатляет клиентов сервисом',
  // 'объединяет все процессы в одном месте',
];

const Index = () => {
  const [activeCarousel, setActiveCarousel] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [resetTimer, setResetTimer] = useState(0);
  const [isOrbOpen, setIsOrbOpen] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [shouldHighlightTypewriter, setShouldHighlightTypewriter] = useState(false);
  const [circleScale, setCircleScale] = useState(1);
  const [transitionStage, setTransitionStage] = useState<'circle' | 'text' | 'complete'>('circle');
  const [circleOpacity, setCircleOpacity] = useState(1);
  const [textScale, setTextScale] = useState(1);
  const [maxCircleScale, setMaxCircleScale] = useState(15);
  const activeItem = carouselData[activeCarousel];
  const Icon = activeItem.icon;

  // Memoize icon URLs to prevent re-renders
  const iconUrls = useMemo(() => 
    techSlugs.map(slug => `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg`),
    []
  );

  // Ensure page scrolling is enabled on the homepage
  useEffect(() => {
    document.body.style.overflow = '';
    document.documentElement.style.overflowY = 'auto';
  }, []);

  // Typewriter эффект для заголовка
  useEffect(() => {
    const currentText = heroTexts[currentTextIndex];
    if (!currentText) return;

    const typeSpeed = isDeleting ? 50 : 100; // Быстрее при удалении
    const pauseTime = 2000; // Пауза после завершения текста

    if (!isDeleting && displayedText === currentText) {
      // Текст полностью напечатан, ждем и начинаем удалять
      setShouldHighlightTypewriter(true);
      const highlightTime = pauseTime - 500; // Анимация на 0.5 сек меньше паузы
      const timeout1 = setTimeout(() => {
        setShouldHighlightTypewriter(false);
      }, highlightTime);
      const timeout2 = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
      };
    }

    if (isDeleting && displayedText === '') {
      // Текст полностью удален, переключаемся на следующий
      setIsDeleting(false);
      setCurrentTextIndex((prev) => (prev + 1) % heroTexts.length);
      return;
    }

    // Если текст пуст и не удаляем - начинаем печатать
    if (!isDeleting && displayedText === '' && currentText) {
      setDisplayedText(currentText[0]);
      return;
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setDisplayedText((prev) => prev.slice(0, -1));
      } else {
        const nextText = currentText.slice(0, displayedText.length + 1);
        setDisplayedText(nextText);
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, currentTextIndex, isDeleting]);

  // Автоматическое переключение слайдов каждые 8 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveCarousel((prev) => (prev + 1) % carouselData.length);
        setIsAnimating(false);
      }, 300);
    }, 8000);

    return () => clearInterval(interval);
  }, [resetTimer]);

  const handleManualChange = (index: number) => {
    if (index !== activeCarousel) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveCarousel(index);
        setIsAnimating(false);
        setResetTimer(prev => prev + 1); // Сброс таймера
      }, 300);
    }
  };

  // Calculate max circle scale to fit screen width
  useEffect(() => {
    const calculateMaxScale = () => {
      const screenWidth = window.innerWidth;
      const baseCircleSize = 384; // w-96 = 384px
      const maxScale = screenWidth / baseCircleSize * 0.6; // 60% of screen width
      setMaxCircleScale(maxScale);
    };
    
    calculateMaxScale();
    window.addEventListener('resize', calculateMaxScale);
    return () => window.removeEventListener('resize', calculateMaxScale);
  }, []);

  // Track scroll for circle scale and transition stages
  useEffect(() => {
    const handleScroll = () => {
      const transitionSection = document.getElementById('transition-section');
      if (!transitionSection) return;

      const rect = transitionSection.getBoundingClientRect();
      const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
      const scrollProgress = Math.min(Math.max(0, -rect.top), 500);
      
      if (isInView && rect.top < 0) {
        // Stage 1: Circle enlarges (0-100px)
        if (scrollProgress <= 100) {
          const scale = 1 + (scrollProgress / 100) * (maxCircleScale - 1);
          setCircleScale(scale);
          const textScale = 1 + (scrollProgress / 100) * 0.5; // from 1 to 1.5
          setTextScale(textScale);
          setTransitionStage('circle');
          setCircleOpacity(1);
        }
        // Stage 2: Background changes and circle fades (100-500px)
        else {
          setCircleScale(maxCircleScale);
          setTextScale(1.5);
          setTransitionStage('complete');
          // Fade out circle as we scroll past 100px
          const fadeProgress = Math.min((scrollProgress - 100) / 100, 1);
          setCircleOpacity(1 - fadeProgress);
        }
      } else {
        // Reset when out of view
        if (rect.bottom < 0 && transitionStage === 'complete') {
          // Keep final state
        } else {
          setCircleScale(1);
          setTextScale(1);
          setTransitionStage('circle');
          setCircleOpacity(1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [transitionStage, maxCircleScale]);

  return (
    <div className={`min-h-screen transition-colors ${transitionStage === 'complete' ? 'bg-[#ff9800]' : ''}`}>
      <Header />
      
      {/* Hero + Scroll Velocity (общий блок на высоту экрана) */}
      <section className="relative min-h-screen overflow-hidden flex flex-col">
        {/* Light Background - только для hero */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #e7e5e4 1px, transparent 1px),
              linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 0",
            maskImage: `
              repeating-linear-gradient(
                to right,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              ),
              repeating-linear-gradient(
                to bottom,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              ),
              radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)
            `,
            WebkitMaskImage: `
              repeating-linear-gradient(
                to right,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              ),
              repeating-linear-gradient(
                to bottom,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              ),
              radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)
            `,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />
          {/* Верхняя часть: контент hero */}
          <div className="px-8 md:px-10 lg:px-12 xl:px-16 pt-28 md:pt-32 relative z-10 w-full mt-auto mb-8 md:mb-16">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              {/* IconCloud */}
              <div className="flex justify-center items-center mb-8">
                <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
                  <IconCloud images={iconUrls} />
                </div>
              </div>
              <h1 className="text-hero-base">
                <span className="block">
                  <Highlighter action="underline" color="#FF9800" isView={true}>
                    Автоматизируем
                  </Highlighter>
                  {' '}ваш бизнес,{' '}
                  который
                </span>
                <span className="block text-hero-typewriter">
                  {displayedText && (
                    <Highlighter action="highlight" color="#87CEFA" enableAnimation={shouldHighlightTypewriter}>
                      {displayedText}
                      <span className="inline-block w-0.5 h-[1em] bg-primary ml-1 animate-pulse">|</span>
                    </Highlighter>
                  )}
                </span>
              </h1>
              <p className="text-hero-description">
                Telegram-боты, CRM, интеграции и рассылки под ключ. <br />
                Увеличьте поток клиентов и упростите процессы за 48 часов.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contacts">
                  <ShimmerButton className="shadow-2xl h-11 pr-8 pl-8 text-black" background="transparent" shimmerColor="#000000" borderRadius="6px">
                    <span className="text-center text-sm font-medium">
                      Посмотреть кейсы
                    </span>
                  </ShimmerButton>
                </Link>
                <Link to="/cases">
                  <InteractiveHoverButton className="border-black pr-8 pl-6 shadow-2xl">
                    Оставить заявку
                  </InteractiveHoverButton>
                </Link>
              </div>
            </div>
          </div>

          {/* Нижняя часть: С кем работаем (текст слева, бегущие строки справа) */}
          {/* <div className="relative z-10 w-full">
            <div className="pr-8 pl-4 md:pr-20 lg:pr-40 xl:pr-56 py-2">
              <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] items-center gap-6">
                <div>
                  <h3 className="text-hero-section-label">С кем работаем</h3>
                </div>
                <div>
                  <ScrollBasedVelocityDemo />
                </div>
              </div>
            </div>
            <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l" />
          </div> */}
        </section>

      {/* Metrics Carousel Section */}
      <section className="py-16 border-t border-transparent">
        <div className="px-8 md:px-20 lg:px-40 xl:px-40">
          <div className="flex flex-col border border-border rounded-2xl backdrop-blur-sm">
              {/* Navigation Buttons */}
              <div className="grid grid-cols-5 gap-2 p-2">
                {carouselData.map((item, index) => {
                  const ItemIcon = item.icon;
                  const isActive = activeCarousel === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleManualChange(item.id)}
                      className={`relative p-5 backdrop-blur-sm rounded-lg transition-all overflow-hidden ${
                        isActive
                          ? 'bg-primary/20 shadow-lg shadow-primary/20'
                          : 'bg-[#f0f0f0] hover:bg-[#e0e0e0]'
                      }`}
                    >
                      {/* Прогресс-бар */}
                      {isActive && (
                        <div 
                          key={`progress-${item.id}-${activeCarousel}`}
                          className="absolute inset-0 bg-[#f0f0f0] animate-progress"
                        />
                      )}
                      <ItemIcon className={`w-6 h-6 mx-auto transition-colors relative z-10 ${
                        isActive ? 'text-black' : 'text-muted-foreground'
                      }`} />
                    </button>
                  );
                })}
              </div>

              {/* Content Block */}
              <div 
                className={`p-8 bg-white/10 transition-all duration-300 ${
                  isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                }`}
              >
                <div className="mb-6">
                  <h3 className="text-carousel-title">{activeItem.title}</h3>
                  <p className="text-carousel-description">{activeItem.description}</p>
                </div>
                {/* Разделитель */}
                <div className="w-full border-t border-black/20 mb-6" />
                <div className="flex items-baseline gap-2">
                  <span className="text-carousel-metric">{activeItem.metric}</span>
                  <span className="text-carousel-metric-label">{activeItem.metricLabel}</span>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* Scroll Stack Section */}
      <section className="py-20 min-h-screen mt-20">
        <div className="text-center">
          <h2 className="text-section-title">
            Наши направления
          </h2>
        </div>
        <ScrollStack useWindowScroll={true}>
          <ScrollStackItem itemClassName="relative bg-gradient-to-br from-blue-500/20 to-purple-500/10 backdrop-blur-sm rounded-2xl border border-border p-8 pb-16">
            <h2 className="text-3xl font-bold mb-4">Автоматизация бизнес-процессов</h2>
            <div className="text-xl text-black/80 space-y-3">
              <p>
                Системы, которые берут на себя рутину и делают бизнес эффективнее.
              </p>
              <ul className="list-disc pl-6">
                <li>Автоматизация заявок</li>
                <li>Автоматизация уведомлений</li>
                <li>Автоматизация отчётов</li>
                <li>Автоматизация взаимодействия с клиентами</li>
                <li>Сокращение до 80% ручной работы и исключение ошибок</li>
              </ul>
              <p>
                Бизнес работает быстрее, сотрудники — продуктивнее, клиенты — довольнее.
              </p>
            </div>
            <div className="absolute bottom-6 left-8">
              <Link to="/services">
                <InteractiveHoverButton className="border-black pr-8 pl-6 shadow-2xl">
                  Подробнее об услуге
                </InteractiveHoverButton>
              </Link>
            </div>
          </ScrollStackItem>
          <ScrollStackItem itemClassName="relative bg-gradient-to-br from-green-500/20 to-teal-500/10 backdrop-blur-sm rounded-2xl border border-border p-8 pb-16">
            <h2 className="text-3xl font-bold mb-4">Боты и мессенджер-системы</h2>
            <div className="text-xl text-black/80 space-y-3">
              <p>
                Telegram и WhatsApp-боты для:
              </p>
              <ul className="list-disc pl-6">
                <li>Автоматизация заявок</li>
                <li>Автоматизация уведомлений</li>
                <li>Автоматизация отчётов</li>
                <li>Автоматизация взаимодействия с клиентами</li>
                <li>Сокращение до 80% ручной работы и исключение ошибок</li>
              </ul>
              <p>
                Бизнес работает быстрее, сотрудники — продуктивнее, клиенты — довольнее.
              </p>
            </div>
            <div className="absolute bottom-6 left-8">
              <Link to="/services">
                <InteractiveHoverButton className="border-black pr-8 pl-6 shadow-2xl">
                  Подробнее об услуге
                </InteractiveHoverButton>
              </Link>
            </div>
          </ScrollStackItem>
          <ScrollStackItem itemClassName="relative bg-gradient-to-br from-orange-500/20 to-red-500/10 backdrop-blur-sm rounded-2xl border border-border p-8 pb-16">
            <h2 className="text-3xl font-bold mb-4">Интеграции и CRM</h2>
            <p>
              
            </p>
            <div className="absolute bottom-6 left-8">
              <Link to="/services">
                <InteractiveHoverButton className="border-black pr-8 pl-6 shadow-2xl">
                  Подробнее об услуге
                </InteractiveHoverButton>
              </Link>
            </div>
          </ScrollStackItem>
          <ScrollStackItem itemClassName="relative bg-gradient-to-br from-pink-500/20 to-rose-500/10 backdrop-blur-sm rounded-2xl border border-border p-8 pb-16">
            <h2 className="text-3xl font-bold mb-4">AI и аналитика</h2>
            <p>
              
            </p>
            <div className="absolute bottom-6 left-8">
              <Link to="/services">
                <InteractiveHoverButton className="border-black pr-8 pl-6 shadow-2xl">
                  Подробнее об услуге
                </InteractiveHoverButton>
              </Link>
            </div>
          </ScrollStackItem>
        </ScrollStack>
      </section>

      {/* Transition Section */}
      <section id="transition-section" className="min-h-screen flex flex-col items-center justify-center py-20 relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10 transition-all">
          <div className="text-white text-4xl md:text-5xl font-bold" style={{ transform: `scale(${textScale})` }}>
            НАШИ
          </div>
          <div className="text-white text-4xl md:text-5xl font-bold" style={{ transform: `scale(${textScale})` }}>
            КЕЙСЫ
          </div>
        </div>
        <div 
          className="w-96 h-96 rounded-full bg-[#ff9800] transition-all"
          style={{ transform: `scale(${circleScale})`, opacity: circleOpacity }}
        />
      </section>

      {/* Cases Section with Scrollable Cards */}
      <section className="pb-20 px-8 md:px-20 lg:px-40 xl:px-40">
        <div className="mx-auto w-full max-w-md">
          <ScrollableCardStack
            items={[
              {
                id: "case1",
                name: "Edu Calvo",
                handle: "@educalvolpz",
                avatar: "https://res.cloudinary.com/dyzxnud9z/image/upload/w_40,h_40,c_fill,g_auto/v1759818651/smoothui/educalvolpz.jpg",
                video: "https://res.cloudinary.com/dyzxnud9z/video/upload/smoothui/siriorb.mp4",
                href: "https://x.com/educalvolpz",
              },
              {
                id: "case2",
                name: "Sarah Chen",
                handle: "@sarahchen",
                avatar: "https://res.cloudinary.com/dyzxnud9z/image/upload/w_40,h_40,c_fill,g_auto/v1759818651/smoothui/educalvolpz.jpg",
                video: "https://res.cloudinary.com/dyzxnud9z/video/upload/smoothui/richpopover.mp4",
                href: "https://x.com/sarahchen",
              },
              {
                id: "case3",
                name: "Marcus Johnson",
                handle: "@marcusj",
                avatar: "https://res.cloudinary.com/dyzxnud9z/image/upload/w_40,h_40,c_fill,g_auto/v1759818651/smoothui/educalvolpz.jpg",
                video: "https://res.cloudinary.com/dyzxnud9z/video/upload/smoothui/sparkbites.mp4",
                href: "https://x.com/marcusj",
              },
            ]}
            cardHeight={420}
            perspective={1200}
            transitionDuration={200}
            className="mx-auto"
          />
        </div>
      </section>

      {/* Overview Sections */}
      <section className="py-20 border-t border-transparent">
        <div className="px-8 md:px-20 lg:px-40 xl:px-40">
          <div className="mb-16">
            <h2 className="text-section-title">
              Что мы предлагаем
            </h2>
            <p className="text-section-subtitle">
              Комплексные решения для автоматизации вашего бизнеса
            </p>
          </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <Link
                    key={index}
                    to={section.link}
                    className="group p-8 bg-card backdrop-blur-sm rounded-lg border border-border hover:bg-accent hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-6 h-6 text-primary transition-colors" />
                        </div>
                        <h2 className="text-section-card-title">{section.title}</h2>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                    
                    <p className="text-section-card-description">
                      {section.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {section.highlights.map((highlight, i) => (
                        <span
                          key={i}
                          className="text-section-highlight"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Enterprise Features */}
        <section className="py-20 border-t border-border">
        <div className="px-8 md:px-20 lg:px-40 xl:px-40">
          <div className="mb-16 text-center">
            <h2 className="text-section-title">
              Возможности корпоративного уровня
            </h2>
            <p className="text-section-subtitle max-w-3xl mx-auto">
              Создавайте и масштабируйте автоматизацию бизнеса с высоким уровнем прозрачности, безопасности и надежности
            </p>
          </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Первый блок - акцентный с градиентом */}
              <div className="p-8 bg-gradient-to-br from-violet-500/20 to-purple-500/10 backdrop-blur-sm rounded-xl border border-violet-500/20 hover:border-violet-500/40 hover:shadow-2xl hover:shadow-violet-500/20 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-600/10 border border-violet-500/20 flex items-center justify-center mb-6 shadow-lg">
                  <Eye className="w-8 h-8 text-violet-600" />
                </div>
                <h3 className="text-feature-title-medium">
                  Визуализируйте ваши процессы
                </h3>
                <p className="text-feature-description">
                  Наглядно выстраивайте сложные бизнес-процессы с помощью визуальных схем или готовых решений. Охватывайте вашу бизнес-логику через различные сервисы и платформы.
                </p>
              </div>

              {/* Второй блок - минималистичный */}
              <div className="p-8 bg-card backdrop-blur-sm rounded-xl border border-border hover:bg-accent transition-all group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Bell className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-feature-title-compact">
                    Настраивайте метрики
                  </h3>
                </div>
                <p className="text-feature-description">
                  Отслеживайте важные показатели: количество активных процессов, время выполнения и процент завершения. Получайте уведомления при возникновении ошибок.
                </p>
              </div>

              {/* Третий блок - с фоном и тенью */}
              <div className="p-8 bg-gradient-to-br from-amber-500/10 to-orange-500/5 backdrop-blur-sm rounded-xl border border-amber-500/20 hover:border-amber-500/40 hover:shadow-xl transition-all">
                <div className="mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400/10 to-orange-500/10 border border-amber-500/20 flex items-center justify-center shadow-md">
                    <Zap className="w-7 h-7 text-amber-600" />
                  </div>
                </div>
                <h3 className="text-feature-title-medium">
                  Устраняйте проблемы за минуты
                </h3>
                <p className="text-feature-description">
                  Легко находите точки отказа среди тысяч процессов, чтобы протестировать, доработать и внедрить исправление в считанные минуты.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why RocketCraft */}
        <section className="py-20 border-t border-border">
        <div className="px-8 md:px-20 lg:px-40 xl:px-40">
          <div className="mb-16 text-center">
            <h2 className="text-section-title">
              Почему выбирают Rocket Craft
            </h2>
          </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Большой блок - занимает 2 колонки */}
              <div className="md:col-span-2 p-10 bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-transparent backdrop-blur-sm rounded-2xl border border-blue-500/30 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-600/10 border border-blue-500/20 flex items-center justify-center shadow-xl flex-shrink-0">
                    <Code className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-feature-title-large">
                      Никакого кода с вашей стороны
                    </h3>
                    <p className="text-feature-description-large">
                      Вам не нужно писать ни строчки кода. Мы создаем решения на базе no-code платформ, которые просто работают. Сосредоточьтесь на развитии бизнеса, а не на технических деталях.
                    </p>
                  </div>
                </div>
              </div>

              {/* Компактный вертикальный блок */}
              <div className="p-6 bg-card backdrop-blur-sm rounded-xl border border-border hover:bg-accent transition-all">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500/10 to-rose-600/10 border border-pink-500/20 flex items-center justify-center mb-4 shadow-lg">
                  <Rocket className="w-7 h-7 text-pink-600" />
                </div>
                <h3 className="text-feature-title-small">
                  Запуск за 48 часов
                </h3>
                <p className="text-feature-description-small">
                  От идеи до продакшена — всего 2 дня благодаря готовым решениям и автоматизации.
                </p>
              </div>

              {/* Горизонтальный блок */}
              <div className="p-6 bg-gradient-to-r from-emerald-500/10 to-teal-500/5 backdrop-blur-sm rounded-xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-400/10 to-teal-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:rotate-12 transition-transform">
                    <Cloud className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-feature-title-compact">
                    Работаем с вашими платформами
                  </h3>
                </div>
                <p className="text-feature-description-small">
                  Интеграция с Telegram, WhatsApp, CRM и облачными сервисами.
                </p>
              </div>

              {/* Блок с тенью и подсветкой */}
              <div className="p-6 bg-gradient-to-br from-purple-500/15 to-fuchsia-500/10 backdrop-blur-sm rounded-xl border border-purple-500/30 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/20 transition-all">
                <div className="mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/10 to-fuchsia-600/10 border border-purple-500/20 flex items-center justify-center shadow-lg">
                    <Sparkles className="w-7 h-7 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-feature-title-small">
                  Бесконечное масштабирование
                </h3>
                <p className="text-feature-description-small">
                  Решения готовы к любой нагрузке — от 10 до 10 000 клиентов в день.
                </p>
              </div>

              {/* Минималистичный блок */}
              <div className="p-6 bg-card backdrop-blur-sm rounded-xl border border-border hover:bg-accent hover:border-green-500/30 transition-all group">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400/10 to-emerald-500/10 border border-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-feature-title-compact pt-1">
                    Безопасные интеграции
                  </h3>
                </div>
                <p className="text-feature-description-small">
                  Современное шифрование защищает ваши данные на каждом этапе.
                </p>
              </div>

              {/* Акцентный блок */}
              <div className="p-8 bg-gradient-to-br from-orange-500/20 to-red-500/10 backdrop-blur-sm rounded-2xl border border-orange-500/30 hover:border-orange-500/50 hover:shadow-xl transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/10 to-red-600/10 border border-orange-500/20 flex items-center justify-center shadow-lg">
                    <Lock className="w-7 h-7 text-orange-600" />
                  </div>
                  <h3 className="text-feature-title-compact">
                    Конфиденциальность гарантирована
                  </h3>
                </div>
                <p className="text-feature-description">
                  Безопасное хранение чувствительных данных без раскрытия в интерфейсе.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Globe Section */}
        <section className="py-0">
          <div className="px-8 md:px-20 lg:px-40 xl:px-40">
            <div className="relative flex size-full max-w-6xl mx-auto items-center justify-center overflow-hidden min-h-[700px] pt-8 pb-40 md:pb-60">
              <Globe className="top-28" />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 border-t border-border mb-20">
          <div className="px-8 md:px-20 lg:px-40 xl:px-40">
            <div className="p-12 bg-gradient-to-r from-primary/10 to-primary/5 backdrop-blur-sm rounded-2xl border border-border text-center">
              <h2 className="text-cta-title">
                Начните автоматизацию уже сегодня
              </h2>
              <p className="text-cta-description">
                Запустите свой первый бот за 48 часов и увидьте результаты уже на следующей неделе
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="btn-primary"
                  asChild
                >
                  <Link to="/contacts">
                    Начать бесплатно
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="btn-outline"
                  asChild
                >
                  <Link to="/services">Смотреть услуги</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
    </div>
  );
};

export default Index;
