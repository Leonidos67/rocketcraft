import { Button } from '@/components/ui/button';
import { ArrowUp, Send, ChevronDown, X, House } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import SiriOrb from '@/components/ui/SiriOrb';
import OrbModal from '@/components/OrbModal';

interface PageActionsProps {
  title: string;
}

const pages = [
  { path: '/services', title: 'Услуги' },
  { path: '/team', title: 'Команда' },
  { path: '/cases', title: 'Кейсы' },
  { path: '/process', title: 'Процесс работы' },
  { path: '/contacts', title: 'Контакты' },
];

const PageActions = ({ title }: PageActionsProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAiHint, setShowAiHint] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Отслеживание скролла для показа кнопки "В начало"
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    // Проверяем начальное состояние
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Проверка localStorage для отображения подсказки AI
  useEffect(() => {
    const aiHintClosedUntil = localStorage.getItem('aiHintClosedUntil');
    if (aiHintClosedUntil) {
      const closedDate = new Date(aiHintClosedUntil);
      const now = new Date();
      if (now < closedDate) {
        setShowAiHint(false);
        return;
      }
    }
    setShowAiHint(true);
  }, []);

  // Закрытие подсказки на 7 дней
  const closeAiHint = () => {
    const closeUntil = new Date();
    closeUntil.setDate(closeUntil.getDate() + 7);
    localStorage.setItem('aiHintClosedUntil', closeUntil.toISOString());
    setShowAiHint(false);
  };

  // Закрытие dropdown при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Не показываем компонент на главной странице
  if (isHomePage) {
    return null;
  }

  // Показываем все страницы (включая текущую)
  const allPages = pages;

  return (
    <>
      {/* Блок с текстом над компонентом */}
      {showAiHint && (
        <div className="fixed bottom-[88px] md:bottom-[105px] left-0 right-0 z-50 px-4 md:px-4 pointer-events-none">
          <div className="max-w-7xl mx-auto flex justify-center">
            <div className="relative">
              <div className="bg-background/95 backdrop-blur-sm border border-border shadow-lg rounded-xl px-4 py-2 pointer-events-auto animate-pulse-scale">
                <div className="flex items-center gap-2">
                  <p className="text-sm md:text-base bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-center">
                    Спросите у ии
                  </p>
                  <button
                    onClick={closeAiHint}
                    className="flex-shrink-0 hover:bg-secondary rounded-md p-1 transition-colors"
                    aria-label="Закрыть"
                  >
                    <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                  </button>
                </div>
              </div>
              {/* Стрелочка вниз */}
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-2">
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-border"></div>
                <div className="absolute left-1/2 -translate-x-1/2 -top-[7px] w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[7px] border-t-background/95"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Основной компонент */}
      <div className="fixed bottom-4 md:bottom-6 left-0 right-0 z-40 px-4 md:px-4">
        {/* Кнопка "В начало" для мобильной версии - теперь вне основного контейнера */}
        {hasScrolled && (
          <div className="flex md:hidden justify-center mb-2">
            <Button
              onClick={scrollToTop}
              variant="outline"
              size="sm"
              className="gap-1 h-8 px-3"
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
          </div>
        )}
        <div className="max-w-7xl mx-auto bg-background/95 backdrop-blur-sm border border-border shadow-lg rounded-2xl px-4 py-3 md:py-3">
          <div className="flex items-center justify-between gap-2.5 md:gap-4">
          {/* Левая часть - Навигация */}
          <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground flex-1">
            {/* Если не на главной - показываем "Главная /" */}
            {!isHomePage && (
              <>
                <Link to="/" className="hover:text-foreground transition-colors flex items-center">
                  <House className="w-5 h-5 md:hidden" />
                  <span className="hidden md:inline">Главная</span>
                </Link>
                <span>/</span>
              </>
            )}
            
            {/* Dropdown для выбора страницы */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1.5 md:gap-2 px-3 md:px-3 py-1 md:py-0.5 hover:bg-secondary/80 text-foreground font-semibold rounded-lg border border-border transition-colors text-sm md:text-sm"
              >
                <span className="truncate max-w-[140px] md:max-w-none">{title}</span>
                <ChevronDown className={`w-4 h-4 md:w-4 md:h-4 rotate-180 transition-transform flex-shrink-0 ${isDropdownOpen ? 'rotate-0' : ''}`} />
              </button>
              
              {/* Dropdown меню */}
              {isDropdownOpen && (
                <div className="absolute bottom-full left-0 mb-2 w-56 bg-background border border-border rounded-lg shadow-xl overflow-hidden p-1.5">
                  {allPages.map((page) => {
                    const isActive = location.pathname === page.path;
                    return (
                      <button
                        key={page.path}
                        onClick={() => {
                          navigate(page.path);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 my-1 rounded transition-colors text-sm ${
                          isActive
                            ? 'bg-primary/10 text-primary font-semibold cursor-default'
                            : 'text-foreground hover:bg-secondary cursor-pointer'
                        }`}
                      >
                        {page.title}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          
          {/* Центр - Siri Orb */}
          <div className="flex items-center justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full scale-90 md:scale-100"
              aria-label="Открыть меню"
            >
              <SiriOrb 
                size="40px" 
                animationDuration={15}
                colors={{
                  bg: "rgba(139, 92, 246, 0.2)",
                  c1: "hsl(var(--primary))",
                  c2: "#ec4899",
                  c3: "#06b6d4",
                }}
              />
            </button>
          </div>
          
          {/* Правая часть - кнопки */}
          <div className="flex gap-1.5 md:gap-2 flex-1 justify-end">
            {/* Кнопка "В начало" для десктопа - скрыта в мобильной версии */}
            {hasScrolled && (
              <Button
                onClick={scrollToTop}
                variant="outline"
                size="sm"
                className="hidden md:flex gap-1 md:gap-2 h-8 md:h-9 px-3 md:px-3"
              >
                <ArrowUp className="w-4 h-4 md:w-4 md:h-4" />
                <span className="hidden sm:inline text-xs md:text-sm">В начало</span>
              </Button>
            )}
            
            <Button
              asChild
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5 md:gap-2 h-8 md:h-9 px-3 md:px-3 py-1 md:py-0.5 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
            >
              <Link to="/contacts">
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline text-xs md:text-sm">Связаться</span>
              </Link>
            </Button>
          </div>
          </div>
        </div>
      </div>
      
      {/* Модальное окно */}
      <OrbModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default PageActions;

