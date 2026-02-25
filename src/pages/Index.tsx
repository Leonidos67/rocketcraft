import { useState, useEffect, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Banner from '@/components/Banner';
import CodeExample from '@/components/CodeExample';
import { Button } from '@/components/ui/button';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { IconCloud } from '@/components/ui/icon-cloud';
import { Highlighter } from '@/components/ui/highlighter';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { ArrowRight, Coffee, Briefcase, DollarSign, Workflow, Eye, Bell, Zap, Code, Rocket, Cloud, Sparkles, Shield, Lock, TrendingUp, Users, Target, Clock, Heart, BarChart3 } from 'lucide-react';
import { AnimatedBeamMultipleOutputDemo } from '@/components/ui/animated-beam-demo';
import { BentoDemo } from '@/components/ui/bento-demo';
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
  // {
  //   title: 'Тарифы',
  //   icon: DollarSign,
  //   description: 'Прозрачные цены от 15 000 ₽. Lite, Pro, Full — выберите свой вариант',
  //   link: '/pricing',
  //   highlights: ['Фиксированные цены', 'Без скрытых платежей', 'От 15 000 ₽'],
  // },
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
    <div className="min-h-screen cursor-default">
      <Banner />
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
                Telegram-боты, CRM, интеграции и рассылки под ключ.
                <br />
                Увеличьте поток клиентов и упростите процессы.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/services">
                  <ShimmerButton className="shadow-lg h-8 px-6 text-indigo-600" background="rgba(99, 102, 241, 0.1)" shimmerColor="#6366f1" borderRadius="0.5rem">
                    <span className="text-center font-medium">
                      К услугам
                    </span>
                  </ShimmerButton>
                </Link>
                <Link to="/contacts">
                  <InteractiveHoverButton variant="default" className="h-8 shadow-lg">
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

      {/* Metrics Carousel Section
      <section className="py-16 border-t border-transparent">
        <div className="px-8 md:px-20 lg:px-40 xl:px-40">
          <div className="flex flex-col border border-border rounded-2xl backdrop-blur-sm">
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
              <div 
                className={`p-8 bg-white/10 transition-all duration-300 ${
                  isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                }`}
              >
                <div className="mb-6">
                  <h3 className="text-carousel-title">{activeItem.title}</h3>
                  <p className="text-carousel-description">{activeItem.description}</p>
                </div>
                <div className="w-full border-t border-black/20 mb-6" />
                <div className="flex items-baseline gap-2">
                  <span className="text-carousel-metric">{activeItem.metric}</span>
                  <span className="text-carousel-metric-label">{activeItem.metricLabel}</span>
                </div>
              </div>
          </div>
        </div>
      </section> */}

      {/* Scroll Stack Section */}
      <section className="py-20  min-h-screen mt-20 px-8 md:px-20 lg:px-40 xl:px-40">
        {/* <div className="text-center">
          <h2 className="text-section-title">
            Наши направления
          </h2>
        </div> */}
        <ScrollStack useWindowScroll={true}>
          <ScrollStackItem itemClassName="relative bg-gradient-to-br from-green-500/20 to-purple-500/10 backdrop-blur-sm rounded-2xl border border-border p-6 sm:p-10 pb-16 sm:pb-20 shadow-lg">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-black leading-tight">Автоматизация бизнес-процессов</h2>
              <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-green-500 to-purple-500 rounded-full"></div>
            </div>
            <div className="text-base sm:text-lg md:text-xl text-black/70 leading-relaxed space-y-3 sm:space-y-4 pb-2">
              <p className="text-black/80 font-medium">
                Системы, которые берут на себя рутину и делают бизнес эффективнее.
              </p>
              <ul className="space-y-2 sm:space-y-2.5 pl-0 list-none">
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-green-500 mt-2"></span>
                  <span>Автоматизация заявок и отчётов</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-green-500 mt-2"></span>
                  <span>Автоматизация взаимодействия с клиентами</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-green-500 mt-2"></span>
                  <span>Сокращение до 90% ручной работы и исключение ошибок</span>
                </li>
              </ul>
              <p className="text-black/75 pt-2 border-t border-black/10">
                Бизнес работает быстрее, сотрудники — продуктивнее, клиенты — довольнее.
              </p>
            </div>
            <div className="absolute bottom-4 sm:bottom-8 left-6 sm:left-10 right-6 sm:right-10">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4 mb-[-100px] hover:scale-105 active:scale-95 transition-transform"
                asChild
              >
                <Link to="/contacts">
                  <span className="font-semibold">Заказать автоматизацию</span>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </ScrollStackItem>
          <ScrollStackItem itemClassName="relative bg-gradient-to-br from-blue-500/20 to-teal-500/10 backdrop-blur-sm rounded-2xl border border-border p-6 sm:p-10 pb-16 sm:pb-20 shadow-lg">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-black leading-tight">Боты и мессенджер-системы</h2>
              <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full"></div>
            </div>
            <div className="text-base sm:text-lg md:text-xl text-black/70 leading-relaxed space-y-3 sm:space-y-4 pb-2">
              <p className="text-black/80 font-medium">
                Telegram и WhatsApp-боты для автоматизации вашего бизнеса.
              </p>
              <ul className="space-y-2 sm:space-y-2.5 pl-0 list-none">
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></span>
                  <span>Приём заявок и бронирований 24/7</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></span>
                  <span>Автоматические напоминания клиентам</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></span>
                  <span>Мгновенная обработка запросов без ожидания</span>
                </li>
              </ul>
              <p className="text-black/75 pt-2 border-t border-black/10">
                Клиенты получают ответы мгновенно, а вы экономите время на рутинных операциях.
              </p>
            </div>
            <div className="absolute bottom-4 sm:bottom-8 left-6 sm:left-10 right-6 sm:right-10">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4 mb-[-100px] hover:scale-105 active:scale-95 transition-transform"
                asChild
              >
                <Link to="/contacts">
                  <span className="font-semibold">Заказать автоматизацию</span>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </ScrollStackItem>
          <ScrollStackItem itemClassName="relative bg-gradient-to-br from-orange-500/20 to-red-500/10 backdrop-blur-sm rounded-2xl border border-border p-6 sm:p-10 pb-16 sm:pb-20 shadow-lg">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-black leading-tight">Интеграции и CRM</h2>
              <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
            </div>
            <div className="text-base sm:text-lg md:text-xl text-black/70 leading-relaxed space-y-3 sm:space-y-4">
              <p className="text-black/80 font-medium">
                Подключение всех ваших инструментов в единую экосистему для максимальной эффективности.
              </p>
              <ul className="space-y-2 sm:space-y-2.5 pl-0 list-none">
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500 mt-2"></span>
                  <span>Синхронизация данных между платформами</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500 mt-2"></span>
                  <span>Автоматизация обмена информацией</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500 mt-2"></span>
                  <span>Единая база клиентов и сделок</span>
                </li>
              </ul>
              <p className="text-black/75 pt-2 border-t border-black/10">
                Все ваши инструменты работают вместе, экономя время и исключая ошибки.
              </p>
            </div>
            <div className="absolute bottom-4 sm:bottom-8 left-6 sm:left-10 right-6 sm:right-10">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4 mb-[-100px] hover:scale-105 active:scale-95 transition-transform"
                asChild
              >
                <Link to="/contacts">
                  <span className="font-semibold">Заказать автоматизацию</span>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </ScrollStackItem>
          <ScrollStackItem itemClassName="relative bg-gradient-to-br from-pink-500/20 to-rose-500/10 backdrop-blur-sm rounded-2xl border border-border p-6 sm:p-10 pb-16 sm:pb-20 shadow-lg">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-black leading-tight">AI и аналитика</h2>
              <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"></div>
            </div>
            <div className="text-base sm:text-lg md:text-xl text-black/70 leading-relaxed space-y-3 sm:space-y-4">
              <p className="text-black/80 font-medium">
                Умная аналитика и искусственный интеллект для принятия обоснованных решений.
              </p>
              <ul className="space-y-2 sm:space-y-2.5 pl-0 list-none">
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-pink-500 mt-2"></span>
                  <span>Анализ больших данных и выявление закономерностей</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-pink-500 mt-2"></span>
                  <span>Прогнозирование трендов и спроса</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-pink-500 mt-2"></span>
                  <span>Автоматическое выявление узких мест в процессах</span>
                </li>
              </ul>
              <p className="text-black/75 pt-2 border-t border-black/10">
                Данные работают на вас, помогая принимать решения быстрее и точнее.
              </p>
            </div>
            <div className="absolute bottom-4 sm:bottom-8 left-6 sm:left-10 right-6 sm:right-10">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4 mb-[-100px] hover:scale-105 active:scale-95 transition-transform"
                asChild
              >
                <Link to="/contacts">
                  <span className="font-semibold">Заказать автоматизацию</span>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
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
          <div className="mb-16 text-center">
            <h2 className="text-section-title">
              Что мы предлагаем
            </h2>
            <p className="text-section-subtitle">
              Комплексные решения для автоматизации вашего бизнеса
            </p>
          </div>
          
          <BentoDemo />
        </div>
      </section>

        {/* Enterprise Features */}
        {/*
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
        */}

        {/* Why RocketCraft */}
        {/* <section className="py-20 border-t border-border">
          <div className="px-8 md:px-20 lg:px-40 xl:px-40 mb-16 text-center">
            <h2 className="text-section-title">
              Что используем
            </h2>
          </div>
        </section> */}

        {/* 
        <section className="py-0">
          <AnimatedBeamMultipleOutputDemo />
        </section> */}

        {/* CTA Section */}
        <section className="py-20 mb-20">
          <div className="px-8 md:px-20 lg:px-40 xl:px-40">
            <div className="p-12 bg-gradient-to-r from-primary/10 to-primary/5 backdrop-blur-sm rounded-2xl border border-border text-center">
              <h2 className="text-cta-title">
                Начните автоматизацию уже сегодня
              </h2>
              <p className="text-cta-description">
                Запустите свой первый бот за 48 часов и увидите результаты уже на следующей неделе
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
