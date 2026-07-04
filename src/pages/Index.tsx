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
import { AnimatedBeamMultipleOutputDemo } from '@/components/ui/animated-beam-demo';
import { BentoDemo } from '@/components/ui/bento-demo';
import { Link, useNavigate } from 'react-router-dom';
import PrimaryButton from '@/components/PrimaryButton';
import OrbModal from '@/components/OrbModal';
import ScrollBasedVelocityDemo from '@/components/ScrollBasedVelocityDemo';
import ScrollableCardStack from '@/components/ui/scrollable-card-stack';
import ServiceStackSection from '@/components/ServiceStackSection';
import { Globe } from '@/components/ui/globe';
import DottedMapSection from '@/components/ui/dotted-map-section';
import HomeAllServicesFab from '@/components/HomeAllServicesFab';

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
  const navigate = useNavigate();
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
    <div className="site-canvas cursor-default">
      <div className="site-section">
        <Header />

        {/* Hero + карта */}
        <div className="home-intro-track">
        <section className="home-hero relative min-h-screen flex flex-col justify-end pb-10 md:pb-24">
          <div className="site-container relative z-10 w-full">
            <div className="max-w-5xl">
              <h1 className="text-hero-base text-left mb-8">
                <span className="block">
                  Автоматизируем ваш бизнес, который
                </span>
                <span className="block text-hero-typewriter mt-2">
                  {displayedText}
                  <span className="inline-block w-0.5 h-[0.85em] bg-primary ml-1 animate-pulse align-middle" />
                </span>
              </h1>

              <p className="text-hero-description text-left mb-10">
                Telegram-боты, CRM, интеграции и рассылки под ключ.
                Увеличьте поток клиентов и упростите процессы.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <PrimaryButton to="/contacts">
                  Оставить заявку
                </PrimaryButton>
                <Link to="/services" className="btn-sm-secondary">
                  К услугам
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="home-map-fab-wrap">
          <DottedMapSection />
          <HomeAllServicesFab />
        </div>
        </div>
      </div>

      {/* Scroll Stack Section */}
      <section className="site-section site-container pt-4 sm:pt-8">
        <ServiceStackSection />
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

      {/* Transition Section */}
      {/* <section id="transition-section" className="site-container pb-40 flex items-center justify-center relative">
        <div 
          className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-primary cursor-pointer hover:opacity-90 transition-opacity relative flex items-center justify-center"
          onClick={() => navigate('/services')}
        >
          <div className="text-primary-foreground text-2xl md:text-4xl font-semibold text-center z-10 pointer-events-none leading-tight">
            Все<br/>услуги
          </div>
        </div>
      </section> */}

      {/* Cases Section with Scrollable Cards */}
      {/* <section className="site-container pb-20">
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
      </section> */}

      {/* Overview Sections */}
      <section className="site-section py-20">
        <div className="site-container">
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

        {/* Why Agyra */}
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
        <section className="site-section py-20">
          <div className="site-container">
            <div className="p-10 md:p-16 bg-sm-grey-light rounded-3xl border border-border text-center">
              <h2 className="text-cta-title">
                Начните автоматизацию уже сегодня
              </h2>
              <p className="text-cta-description">
                Запустите свой первый бот за 48 часов и увидите результаты уже на следующей неделе
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <PrimaryButton to="/contacts">
                  Начать бесплатно
                </PrimaryButton>
                <Link to="/services" className="btn-sm-secondary">
                  Смотреть услуги
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
    </div>
  );
};

export default Index;
