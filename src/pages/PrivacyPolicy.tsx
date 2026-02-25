import Footer from '@/components/Footer';
import PageActions from '@/components/PageActions';
import PageLoader from '@/components/PageLoader';
import Banner from '@/components/Banner';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronRight, GripVertical, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Компонент навигации по странице с плавным перетаскиванием (копируем из страницы услуг)
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
    <div className="cursor-default">
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

// Секции для навигации по странице политики конфиденциальности
const privacyPolicySections = [
  { id: 'general-provisions', title: '1. Общие положения' },
  { id: 'personal-data', title: '2. Персональные данные' },
  { id: 'processing-purposes', title: '3. Цели обработки' },
  { id: 'legal-basis', title: '4. Правовые основания' },
  { id: 'processing-principles', title: '5. Принципы обработки' },
  { id: 'processing-conditions', title: '6. Условия обработки' },
  { id: 'data-storage', title: '7. Порядок обработки' },
  { id: 'final-provisions', title: '8. Заключительные положения' },
];

const PrivacyPolicy = () => {
  return (
    <div className="cursor-default min-h-screen">
      <Banner />
      <PageLoader />
      
      {/* Добавляем навигацию */}
      <DraggablePageNavigation sections={privacyPolicySections} />
      
      <main className="pt-40 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
              Политика конфиденциальности
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <section id="general-provisions" className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">1. Общие положения</h2>
                <p className="text-muted-foreground mb-4">
                  Настоящая политика обработки персональных данных составлена в соответствии с требованиями 
                  Федерального закона от 27.07.2006. №152-ФЗ «О персональных данных» и определяет порядок 
                  обработки персональных данных и меры по обеспечению безопасности персональных данных, 
                  предпринимаемые Smart AI (далее – Оператор).
                </p>
              </section>

              <section id="personal-data" className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">2. Оператор может обрабатывать следующие персональные данные Пользователя</h2>
                <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                  <li>Фамилия, имя, отчество</li>
                  <li>Номер телефона</li>
                  <li>Адрес электронной почты</li>
                  <li>Год, месяц, дата и место рождения</li>
                  <li>Фотографии</li>
                  <li>Также на сайте происходит сбор и обработка обезличенных данных о посетителях (в т.ч. файлов «cookie») с помощью сервисов интернет-статистики</li>
                </ul>
              </section>

              <section id="processing-purposes" className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">3. Цели обработки персональных данных</h2>
                <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                  <li>Информирование Пользователя посредством отправки электронных писем</li>
                  <li>Заключение, исполнение и прекращение гражданско-правовых договоров</li>
                  <li>Предоставление доступа Пользователю к сервисам, информации и/или материалам, содержащимся на веб-сайте</li>
                </ul>
              </section>

              <section id="legal-basis" className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">4. Правовые основания обработки персональных данных</h2>
                <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                  <li>Федеральный закон "Об информации, информационных технологиях и о защите информации"</li>
                  <li>Федеральный закон "О персональных данных"</li>
                  <li>Федеральный закон "О рекламе"</li>
                </ul>
              </section>

              <section id="processing-principles" className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">5. Принципы обработки персональных данных</h2>
                <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                  <li>Обработка персональных данных осуществляется на законной и справедливой основе</li>
                  <li>Обработка персональных данных ограничивается достижением конкретных, заранее определенных и законных целей</li>
                  <li>Не допускается объединение баз данных, содержащих персональные данные, обработка которых осуществляется в целях, несовместимых между собой</li>
                </ul>
              </section>

              <section id="processing-conditions" className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">6. Условия обработки персональных данных</h2>
                <p className="text-muted-foreground mb-4">
                  Обработка персональных данных осуществляется с согласия субъекта персональных данных на обработку 
                  его персональных данных, а также без такового в случаях, предусмотренных законодательством.
                </p>
              </section>

              <section id="data-storage" className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">7. Порядок сбора, хранения, передачи и других видов обработки персональных данных</h2>
                <p className="text-muted-foreground mb-4">
                  Безопасность персональных данных, которые обрабатываются Оператором, обеспечивается путем реализации 
                  правовых, организационных и технических мер, необходимых для выполнения в полном объеме требований 
                  действующего законодательства в области защиты персональных данных.
                </p>
              </section>

              <section id="final-provisions" className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">8. Заключительные положения</h2>
                <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                  <li>Пользователь может получить любые разъяснения по интересующим вопросам, касающимся обработки его персональных данных</li>
                  <li>В данном документе будут отражены любые изменения политики обработки персональных данных Оператором</li>
                  <li>Политика распространяется только на персональные данные, обрабатываемые Оператором</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <PageActions title="Политика конфиденциальности" />
    </div>
  );
};

export default PrivacyPolicy;