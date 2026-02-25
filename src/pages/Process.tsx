import Footer from '@/components/Footer';
import PageActions from '@/components/PageActions';
import PageLoader from '@/components/PageLoader';
import Banner from '@/components/Banner';
import { Button } from '@/components/ui/button';
import { Search, ClipboardList, Settings, CheckCircle, Rocket, ArrowRight, Clock, Zap, Shield, BarChart, Menu, X, GripVertical, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import React, { useEffect, useState, useRef, useCallback } from 'react';

// Компонент навигации по странице с плавным перетаскиванием
const DraggablePageNavigation = ({ sections }) => {
  const [activeSection, setActiveSection] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  
  const dragRef = useRef(null);
  const navRef = useRef(null);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(0);
  const startPos = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });
  const inertiaRef = useRef({ x: 0, y: 0 });
  const hasMounted = useRef(false);
  const hoverTimeout = useRef(null);

  // Инициализация позиции при монтировании
  useEffect(() => {
    if (hasMounted.current) return;
    
    // Рассчитываем начальную позицию: 20px от правого края
    const initialX = window.innerWidth - 300 - 20; // 300px ширина + 20px отступ
    const initialY = 20; // 20px от верхнего края
    
    setPosition({ x: initialX, y: initialY });
    hasMounted.current = true;
  }, []);

  // Анимация инерции
  const animateInertia = useCallback(() => {
    if (!isAnimating || Math.abs(velocity.x) < 0.1 && Math.abs(velocity.y) < 0.1) {
      setIsAnimating(false);
      return;
    }

    const now = Date.now();
    const deltaTime = now - lastTimeRef.current;
    lastTimeRef.current = now;

    if (deltaTime > 100) return; // Пропускаем большие паузы

    const friction = 0.93;
    const newVelocity = {
      x: velocity.x * friction,
      y: velocity.y * friction
    };

    const navWidth = navRef.current?.offsetWidth || 300;
    const navHeight = navRef.current?.offsetHeight || 400;
    const maxX = window.innerWidth - navWidth;
    const maxY = window.innerHeight - navHeight;

    const newX = position.x + newVelocity.x * (deltaTime / 16);
    const newY = position.y + newVelocity.y * (deltaTime / 16);

    // Проверяем границы - теперь можно доходить до самого верха
    let boundedX = newX;
    let boundedY = newY;
    let bounce = false;

    if (newX < 0) { // Можно прижимать к левому краю
      boundedX = 0;
      newVelocity.x = -newVelocity.x * 0.5;
      bounce = true;
    } else if (newX > maxX) {
      boundedX = maxX;
      newVelocity.x = -newVelocity.x * 0.5;
      bounce = true;
    }

    if (newY < 0) { // Можно прижимать к верхнему краю
      boundedY = 0;
      newVelocity.y = -newVelocity.y * 0.5;
      bounce = true;
    } else if (newY > maxY) {
      boundedY = maxY;
      newVelocity.y = -newVelocity.y * 0.5;
      bounce = true;
    }

    setPosition({ x: boundedX, y: boundedY });
    setVelocity(newVelocity);

    if (bounce || Math.abs(newVelocity.x) > 0.1 || Math.abs(newVelocity.y) > 0.1) {
      animationRef.current = requestAnimationFrame(animateInertia);
    } else {
      setIsAnimating(false);
    }
  }, [position, velocity, isAnimating]);

  // Запуск анимации инерции
  useEffect(() => {
    if (isAnimating) {
      lastTimeRef.current = Date.now();
      animationRef.current = requestAnimationFrame(animateInertia);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating, animateInertia]);

  // Инициализация перетаскивания
  useEffect(() => {
    const handleMouseDown = (e) => {
      if (!e.target.closest('.drag-handle')) return;
      
      setIsDragging(true);
      setIsAnimating(false);
      startPos.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y
      };
      lastPos.current = { x: e.clientX, y: e.clientY };
      inertiaRef.current = { x: 0, y: 0 };
      
      e.preventDefault();
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      
      const newX = e.clientX - startPos.current.x;
      const newY = e.clientY - startPos.current.y;
      
      // Рассчитываем скорость
      const deltaTime = 16; // предполагаемый интервал между кадрами
      inertiaRef.current = {
        x: (e.clientX - lastPos.current.x) / deltaTime * 2,
        y: (e.clientY - lastPos.current.y) / deltaTime * 2
      };
      
      lastPos.current = { x: e.clientX, y: e.clientY };
      
      // Ограничиваем движение в пределах окна
      const navWidth = navRef.current?.offsetWidth || 300;
      const navHeight = navRef.current?.offsetHeight || 400;
      const maxX = window.innerWidth - navWidth;
      const maxY = window.innerHeight - navHeight;
      
      setPosition({
        x: Math.max(0, Math.min(maxX, newX)), // 0 вместо 10
        y: Math.max(0, Math.min(maxY, newY))  // 0 вместо 80
      });
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        setVelocity(inertiaRef.current);
        setIsAnimating(true);
      }
    };

    const dragHandle = dragRef.current;
    if (dragHandle) {
      dragHandle.addEventListener('mousedown', handleMouseDown);
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseUp);

    return () => {
      if (dragHandle) {
        dragHandle.removeEventListener('mousedown', handleMouseDown);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [isDragging, position]);

  // Touch events для мобильных устройств
  useEffect(() => {
    const handleTouchStart = (e) => {
      if (!e.target.closest('.drag-handle')) return;
      
      setIsDragging(true);
      setIsAnimating(false);
      const touch = e.touches[0];
      startPos.current = {
        x: touch.clientX - position.x,
        y: touch.clientY - position.y
      };
      lastPos.current = { x: touch.clientX, y: touch.clientY };
      inertiaRef.current = { x: 0, y: 0 };
      
      e.preventDefault();
    };

    const handleTouchMove = (e) => {
      if (!isDragging || !e.touches[0]) return;
      
      const touch = e.touches[0];
      const newX = touch.clientX - startPos.current.x;
      const newY = touch.clientY - startPos.current.y;
      
      // Рассчитываем скорость
      const deltaTime = 16;
      inertiaRef.current = {
        x: (touch.clientX - lastPos.current.x) / deltaTime * 3,
        y: (touch.clientY - lastPos.current.y) / deltaTime * 3
      };
      
      lastPos.current = { x: touch.clientX, y: touch.clientY };
      
      // Ограничиваем движение в пределах окна
      const navWidth = navRef.current?.offsetWidth || 300;
      const navHeight = navRef.current?.offsetHeight || 400;
      const maxX = window.innerWidth - navWidth;
      const maxY = window.innerHeight - navHeight;
      
      setPosition({
        x: Math.max(0, Math.min(maxX, newX)),
        y: Math.max(0, Math.min(maxY, newY))
      });
      
      e.preventDefault();
    };

    const handleTouchEnd = () => {
      if (isDragging) {
        setIsDragging(false);
        setVelocity(inertiaRef.current);
        setIsAnimating(true);
      }
    };

    const dragHandle = dragRef.current;
    if (dragHandle) {
      dragHandle.addEventListener('touchstart', handleTouchStart, { passive: false });
    }

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      if (dragHandle) {
        dragHandle.removeEventListener('touchstart', handleTouchStart);
      }
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [isDragging, position]);

  // Обновление позиции при изменении размера окна
  useEffect(() => {
    const handleResize = () => {
      const navWidth = navRef.current?.offsetWidth || 300;
      const maxX = window.innerWidth - navWidth;
      
      // Если текущая позиция выходит за пределы экрана, корректируем её
      if (position.x > maxX) {
        setPosition(prev => ({ 
          x: Math.max(0, maxX), 
          y: prev.y 
        }));
      }
      
      const maxY = window.innerHeight - (navRef.current?.offsetHeight || 400);
      if (position.y > maxY) {
        setPosition(prev => ({ 
          x: prev.x, 
          y: Math.max(0, maxY) 
        }));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [position]);

  // Отслеживание активной секции
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      let currentSection = '';
      sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentSection = section.id;
          }
        }
      });
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    }
  };

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setIsHovered(false);
    }, 150); // Небольшая задержка для плавности
  };

  // Очистка таймаута при размонтировании
  useEffect(() => {
    return () => {
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current);
      }
    };
  }, []);

  // Показываем компонент только после установки начальной позиции
  if (!hasMounted.current && position.x === 0 && position.y === 0) {
    return (
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-24 right-4 z-50 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow active:scale-95"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>
    );
  }

  return (
    <div className="cursor-deefault">
      {/* Мобильная кнопка */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-24 right-4 z-50 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow active:scale-95"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Навигация с плавным перетаскиванием */}
      <div
        ref={navRef}
        className={cn(
          "fixed z-40 select-none transform-gpu will-change-transform",
          isDragging ? "cursor-grabbing transition-none" : "cursor-default transition-all duration-200 ease-out",
          isAnimating && !isDragging && "transition-all duration-300 ease-out",
          "md:block",
          isOpen ? "block" : "hidden"
        )}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          touchAction: 'none',
          transform: isDragging ? 'scale(1.02) rotate(0.5deg)' : 'scale(1) rotate(0deg)',
          boxShadow: isDragging 
            ? '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(var(--primary), 0.2)' 
            : isHovered 
              ? '0 15px 50px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(var(--primary), 0.1)'
              : '0 10px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)',
          transition: isDragging ? 'box-shadow 0.2s ease-out, transform 0.2s ease-out' : 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="bg-card/95 backdrop-blur-sm border border-white/10 rounded-xl w-72 overflow-hidden transition-all duration-300">
          {/* Заголовок с ручкой для перетаскивания */}
          <div 
            ref={dragRef}
            className={cn(
              "drag-handle flex items-center p-3 border-b border-white/10 cursor-grab select-none",
              isDragging ? "cursor-grabbing bg-primary/5" : "hover:bg-muted/30 active:bg-primary/5 transition-colors duration-200"
            )}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className={cn(
              "mr-3 transition-transform duration-300",
              isDragging && "animate-pulse",
              isHovered && "scale-110"
            )}>
              <GripVertical className="w-4 h-4 text-muted-foreground" />
            </div>
            <span className="text-sm font-semibold transition-colors duration-200">
              Навигация
            </span>
          </div>
          
          {/* Контент навигации */}
          <div className="p-1 max-h-[60vh] overflow-y-auto overscroll-contain">
            <nav className={cn(
              "space-y-0 transition-all duration-300 ease-out",
              isHovered && "space-y-3"
            )}>
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg transition-all duration-300 transform",
                    "hover:text-primary hover:translate-x-0.5",
                    activeSection === section.id
                      ? "text-primary font-medium"
                      : "text-muted-foreground",
                    !isHovered && "py-1.5"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "transition-all duration-300 flex-shrink-0",
                      activeSection === section.id 
                        ? cn(
                            "w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]",
                            !isHovered && "w-1 h-6 rounded-none" // Прямоугольник по умолчанию для активного
                          )
                        : cn(
                            !isHovered 
                              ? "w-1 h-6 rounded-none bg-border" // Прямоугольник по умолчанию
                              : "w-2 h-2 rounded-full bg-border" // Круг при наведении
                          )
                    )} />
                    <span className="truncate transition-all duration-300">
                      {section.title}
                    </span>
                  </div>
                </button>
              ))}
            </nav>
            
            {/* Кнопка CTA - появляется при наведении */}
            <div className={cn(
              "mt-0 pt-0 border-t border-white/0 overflow-hidden transition-all duration-500 ease-out",
              isHovered && "mt-4 pt-4 border-t border-white/10"
            )}>
              <div className={cn(
                "transform transition-all duration-500 ease-out",
                isHovered 
                  ? "translate-y-0 opacity-100" 
                  : "translate-y-8 opacity-0"
              )}>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full gap-2 text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
                  asChild
                >
                  <Link to="/contacts">
                    <span>Обсудить проект</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

// Секции для навигации
const pageSections = [
  { id: 'hero', title: 'Начало' },
  { id: 'timeline', title: 'Процесс работы' },
  { id: 'cta', title: 'Консультация' },
];

const steps = [
  {
    number: '01',
    title: 'Глубокая диагностика',
    description: 'Проводим аудит вашего бизнеса, анализируем процессы, выявляем точки роста и автоматизации.',
    result: 'Детальный отчет с картой процессов и рекомендациями по оптимизации.',
    icon: Search,
    case: 'Эффективность процессов повышается на 40-60%',
    duration: 'до 2 дней',
    color: 'blue',
  },
  {
    number: '02',
    title: 'Стратегическое планирование',
    description: 'Разрабатываем индивидуальную стратегию автоматизации с учетом специфики вашего бизнеса.',
    result: 'Пошаговый план реализации с четкими сроками и ожидаемыми результатами.',
    icon: ClipboardList,
    case: 'Прототип решения готов за 24 часа',
    duration: '1 день',
    color: 'purple',
  },
  {
    number: '03',
    title: 'Интеграция и настройка',
    description: 'Внедряем выбранные инструменты, настраиваем интеграции и обучаем вашу команду.',
    result: 'Полностью рабочая система, адаптированная под ваши бизнес-процессы.',
    icon: Settings,
    case: 'Среднее время настройки — 12 часов',
    duration: '1-2 дня',
    color: 'amber',
  },
  {
    number: '04',
    title: 'Тестирование и отладка',
    description: 'Проводим комплексное тестирование системы на всех этапах работы с реальными сценариями.',
    result: 'Стабильно работающая система с гарантией качества.',
    icon: CheckCircle,
    case: '99.8% безошибочной работы после запуска',
    duration: '6-12 часов',
    color: 'emerald',
  },
  {
    number: '05',
    title: 'Запуск и масштабирование',
    description: 'Осуществляем плавный запуск системы и обеспечиваем постоянную поддержку.',
    result: 'Автоматизированный бизнес, готовый к росту и масштабированию.',
    icon: Rocket,
    case: 'Сокращение операционных затрат на 65%',
    duration: 'Постоянно',
    color: 'rose',
  },
];

const stats = [
  { value: '12', label: 'дней средний срок реализации', icon: Clock },
  { value: '>20', label: 'успешных проектов автоматизации', icon: Zap },
  { value: '100%', label: 'клиентов рекомендуют нас', icon: Shield },
  { value: '65%', label: 'средняя экономия времени', icon: BarChart },
];

const Process = () => {
  return (
    <div className="min-h-screen bg-background cursor-default">
      <Banner />
      <PageLoader />
      
      {/* Навигация по странице с плавным перетаскиванием */}
      <DraggablePageNavigation sections={pageSections} />
      
      <main className="pt-32 pb-20">
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 2xl:px-48">

          {/* Hero Section с единым стилем */}
          <section id="hero" className="cursor-default mb-40">
            <div className="mb-4">
              <h1 className="cursor-default text-5xl md:text-6xl font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-top-5 duration-700">
                Процесс работы
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed animate-in fade-in slide-in-from-top-5 duration-900 mb-8">
                От анализа до полного запуска — прозрачный процесс с измеримыми результатами на каждом этапе.
                Никаких скрытых условий, только конкретные сроки и гарантии.
              </p>
              
              {/* Основные направления */}
              <div className="flex flex-wrap gap-3 animate-in fade-in slide-in-from-bottom-5 duration-1200">
                {[
                  { icon: Clock, label: '48 часов реализации', color: 'bg-blue-500/20 text-blue-600' },
                  { icon: Shield, label: 'Гарантия качества', color: 'bg-green-500/20 text-green-600' },
                  { icon: Zap, label: 'Индивидуальный подход', color: 'bg-amber-500/20 text-amber-600' },
                  { icon: BarChart, label: 'Измеримый результат', color: 'bg-purple-500/20 text-purple-600' },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={index}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${item.color} border border-transparent hover:border-current transition-all duration-300 ease-out hover:scale-105`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={index}
                    className="p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/30 transition-all group animate-in fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground leading-tight">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Trusted Companies */}
            {/* <div className="mb-16 animate-in fade-in slide-in-from-bottom-5 duration-500">
              <p className="text-center text-muted-foreground mb-8 text-sm uppercase tracking-wider font-medium">
                Нам доверяют
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
                {[
                  'https://i.ibb.co/81CJgRy/image.png',
                  'https://i.ibb.co/GNVtYYM/image.png',
                  'https://i.ibb.co/v6Vt6Lcc/image.png',
                  'https://i.ibb.co/3m7BZwTd/image.png',
                  'https://i.ibb.co/XfHy6K7X/image.png'
                ].map((src, index) => (
                  <div 
                    key={index}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                    <img 
                      src={src} 
                      alt={`Company ${index + 1}`} 
                      className="h-10 md:h-12 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300 relative z-10"
                    />
                  </div>
                ))}
              </div>
            </div> */}
          </section>

          {/* Process Timeline - обновленный заголовок */}
          <section id="timeline" className="space-y-8 mb-24">
            <div className="mb-12 animate-in fade-in slide-in-from-left-5 duration-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-primary"></div>
                <h2 className="text-3xl md:text-4xl font-bold">Наш процесс работы</h2>
              </div>
              <p className="text-muted-foreground text-lg">
                5 четких этапов от знакомства до полной автоматизации вашего бизнеса. Держим вас в курсе каждого шага
              </p>
            </div>

            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === steps.length - 1;
              const colorClass = {
                blue: 'from-blue-500 to-cyan-500',
                purple: 'from-purple-500 to-pink-500',
                amber: 'from-amber-500 to-orange-500',
                emerald: 'from-emerald-500 to-teal-500',
                rose: 'from-rose-500 to-pink-500',
              }[step.color];

              return (
                <div key={index} className="relative group animate-in fade-in slide-in-from-bottom-5 duration-500"
                     style={{ animationDelay: `${index * 100}ms` }}>
                  {/* Desktop Timeline Line */}
                  <div className="hidden md:block absolute left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-border via-primary/30 to-border">
                    {!isLast && (
                      <div className="absolute top-20 bottom-0 w-full bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />
                    )}
                  </div>

                  {/* Step Card */}
                  <div className="relative md:pl-20">
                    {/* Timeline Dot */}
                    <div className="hidden md:flex absolute left-12 top-6 -translate-x-1/2 w-6 h-6 rounded-full bg-background border-4 border-primary z-10 items-center justify-center">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${colorClass}`} />
                    </div>

                    <div className="p-6 sm:p-8 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 cursor-default">
                      <div className="flex flex-col lg:flex-row gap-8">
                        {/* Icon and Number */}
                        <div className="flex-shrink-0">
                          <div className="relative group/icon">
                            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center shadow-lg group-hover/icon:scale-110 group-hover/icon:rotate-3 transition-all duration-500`}>
                              <Icon className="w-8 h-8 text-white" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-background border-2 border-primary/20 flex items-center justify-center text-sm font-bold text-foreground group-hover:scale-110 transition-transform duration-300">
                              {step.number}
                            </div>
                          </div>
                          
                          {/* Duration Badge */}
                          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-lg group/duration hover:bg-primary/10 transition-all duration-300">
                            <Clock className="w-3 h-3 text-muted-foreground group-hover/duration:text-primary transition-colors" />
                            <span className="text-xs font-medium text-muted-foreground group-hover/duration:text-foreground transition-colors">
                              {step.duration}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-6">
                          <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                              {step.title}
                            </h3>
                            <p className="text-lg text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                              {step.description}
                            </p>
                          </div>

                          {/* Result */}
                          <div className="p-5 bg-gradient-to-r from-secondary/80 to-secondary/40 rounded-xl border border-border/50 group/result hover:border-primary/20 transition-all duration-500">
                            <div className="flex items-center gap-2 mb-3">
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${colorClass}`} />
                              <h4 className="text-sm font-semibold text-foreground group-hover/result:text-primary transition-colors duration-300">
                                Результат этого этапа
                              </h4>
                            </div>
                            <p className="text-foreground text-lg">
                              {step.result}
                            </p>
                          </div>

                          {/* Case Study */}
                          <div className="inline-flex items-center gap-3 px-4 py-2.5 bg-primary/5 rounded-xl border border-primary/20 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 group/case">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${colorClass} bg-opacity-10 group-hover/case:scale-110 transition-transform duration-300`}>
                              <Zap className="w-4 h-4 text-primary group-hover/case:rotate-12 transition-transform duration-300" />
                            </div>
                            <span className="text-sm font-medium text-foreground group-hover/case:text-primary transition-colors duration-300">
                              {step.case}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>

          {/* CTA Section - с единым стилем */}
          <section id="cta" className="mt-24 relative animate-in fade-in duration-1000">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-3xl -m-8" />
            <div className="relative p-8 sm:p-12 lg:p-16 bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50 text-center hover:shadow-xl transition-all duration-500">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                <span className="text-sm font-medium text-primary">Бесплатная консультация</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight max-w-3xl mx-auto">
                Готовы автоматизировать
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                  свой бизнес?
                </span>
              </h2>
              
              <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Запишитесь на бесплатную демо-сессию. За 30 минут мы покажем, как автоматизация решит именно ваши задачи, и составим индивидуальный план.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 text-lg px-8 py-7 h-auto rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
                  asChild
                >
                  <Link to="/contacts">
                    Оставить заявку
                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-7 h-auto rounded-xl border-2 hover:border-primary/50 hover:scale-105 active:scale-95 transition-all duration-300"
                  asChild
                >
                  <Link to="/cases">
                    Смотреть кейсы
                  </Link>
                </Button>
              </div>
              
            </div>
          </section>

        </div>
      </main>
      <Footer />
      <PageActions title="Процесс работы" />
    </div>
  );
};

export default Process;