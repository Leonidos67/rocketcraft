import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import FullscreenServicesMenu from './FullscreenServicesMenu';
import { Rocket } from '@/components/ui/motion/Rocket';
import { SparklesText } from '@/components/ui/sparkles-text';

const Header = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isBusinessSolutionsOpen, setIsBusinessSolutionsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Removed dark theme enforcement to maintain consistent light background

  // Переключение глобального класса для белого курсора при открытом окне услуг
  useEffect(() => {
    const root = document.documentElement;
    if (isServicesOpen) {
      root.classList.add('services-open');
    } else {
      root.classList.remove('services-open');
    }
    return () => {
      root.classList.remove('services-open');
    };
  }, [isServicesOpen]);

  // На всякий случай: при смене маршрута всегда снимаем любые блокировки скролла страницы
  useEffect(() => {
    document.body.style.overflow = '';
  }, [location.pathname]);

  // Блокируем скролл страницы, когда открыто окно услуг (но оставляем скролл внутри модалки)
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (isServicesOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = previousOverflow || '';
    }
    return () => {
      document.body.style.overflow = previousOverflow || '';
    };
  }, [isServicesOpen]);

  // Отслеживание прокрутки
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;
  const isHomePage = location.pathname === '/';
  const shouldBeTransparent = isHomePage && !isScrolled && !isServicesOpen;

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          shouldBeTransparent 
            ? 'bg-transparent border-b border-transparent' 
            : isServicesOpen
            ? 'bg-background border-b border-border'
            : 'bg-white/20 backdrop-blur-sm border-b border-transparent'
        }`}
        style={{ top: isScrolled ? '0px' : '28px' }} // Initial offset, removed when scrolled
      >
        <div className="px-6">
          <div className="relative flex items-center justify-between h-20">
            <div className="hidden lg:flex items-center">
              <Link to="/" className={`flex items-center gap-2 ${isServicesOpen ? 'text-white' : 'text-black'}`}>
                <div className={`${isServicesOpen ? 'text-white' : 'text-black'}`}>
                  <Rocket 
                    width={28} 
                    height={28} 
                    stroke="currentColor"
                  />
                </div>
                <SparklesText className="text-xl" sparklesCount={5}>
                  Agyra
                </SparklesText>
              </Link>
            </div>

            <Link to="/" className={`lg:hidden flex items-center gap-2 ${isServicesOpen ? 'text-white' : 'text-black'}`}>
              <div className={`${isServicesOpen ? 'text-white' : 'text-black'}`}>
                <Rocket 
                  width={28} 
                  height={28} 
                  stroke="currentColor"
                />
              </div>
              <span className="text-xl font-semibold transition-colors">
                Agyra
              </span>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
              <div className="relative">
                <button
                  onClick={() => setIsBusinessSolutionsOpen(!isBusinessSolutionsOpen)}
                  className={`text-sm transition-colors px-3 py-1.5 rounded-md flex items-center gap-2 ${
                    isBusinessSolutionsOpen
                      ? 'bg-white bg-opacity-10 text-white font-medium' : 'text-black'
                  }`}
                  onMouseEnter={() => setIsBusinessSolutionsOpen(true)}
                >
                  Решения для бизнеса
                  <ChevronRight className="w-4 h-4" />
                </button>
                
                {/* Dropdown */}
                {isBusinessSolutionsOpen && (
                  <div 
                    className="absolute left-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg z-50 py-2"
                    onMouseLeave={() => setIsBusinessSolutionsOpen(false)}
                  >
                    <a 
                      href="#" 
                      className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = '/business-solutions';
                        setIsBusinessSolutionsOpen(false);
                      }}
                    >
                      Апарт-отели и Гостевые дома
                    </a>
                  </div>
                )}
              </div>
              <Link
                to="/services"
                className={`text-sm transition-colors px-3 py-1.5 rounded-md ${
                  isActive('/team')
                    ? isServicesOpen ? 'bg-white bg-opacity-10 text-white font-medium' : 'bg-black bg-opacity-10 text-black font-medium'
                    : isServicesOpen ? 'text-white hover:bg-white hover:bg-opacity-10' : 'text-black hover:bg-black hover:bg-opacity-10'
                }`}
              >
                Услуги
              </Link>
              <Link
                to="/team"
                className={`text-sm transition-colors px-3 py-1.5 rounded-md ${
                  isActive('/team')
                    ? isServicesOpen ? 'bg-white bg-opacity-10 text-white font-medium' : 'bg-black bg-opacity-10 text-black font-medium'
                    : isServicesOpen ? 'text-white hover:bg-white hover:bg-opacity-10' : 'text-black hover:bg-black hover:bg-opacity-10'
                }`}
              >
                Команда
              </Link>
              <Link
                to="/cases"
                className={`text-sm transition-colors px-3 py-1.5 rounded-md ${
                  isActive('/cases')
                    ? isServicesOpen ? 'bg-white bg-opacity-10 text-white font-medium' : 'bg-black bg-opacity-10 text-black font-medium'
                    : isServicesOpen ? 'text-white hover:bg-white hover:bg-opacity-10' : 'text-black hover:bg-black hover:bg-opacity-10'
                }`}
              >
                Кейсы
              </Link>
              {/* <Link
                to="/pricing"
                className={`text-sm transition-colors px-3 py-1.5 rounded-md ${
                  isActive('/pricing')
                    ? isServicesOpen ? 'bg-white bg-opacity-10 text-white font-medium' : 'bg-black bg-opacity-10 text-black font-medium'
                    : isServicesOpen ? 'text-white hover:bg-white hover:bg-opacity-10' : 'text-black hover:bg-black hover:bg-opacity-10'
                }`}
              >
                Тарифы
              </Link> */}
              <Link
                to="/process"
                className={`text-sm transition-colors px-3 py-1.5 rounded-md ${
                  isActive('/process')
                    ? isServicesOpen ? 'bg-white bg-opacity-10 text-white font-medium' : 'bg-black bg-opacity-10 text-black font-medium'
                    : isServicesOpen ? 'text-white hover:bg-white hover:bg-opacity-10' : 'text-black hover:bg-black hover:bg-opacity-10'
                }`}
              >
                Процесс
              </Link>
              {/* <Link
                to="/contacts"
                className={`text-sm transition-colors px-3 py-1.5 rounded-md ${
                  isActive('/contacts')
                    ? 'bg-black bg-opacity-10 text-black font-medium'
                    : 'text-black hover:bg-black hover:bg-opacity-10'
                }`}
              >
                Контакты
              </Link> */}
            </nav>

            <div className="hidden lg:flex items-center">
              <Link to="/contacts">
                <InteractiveHoverButton 
                  variant={isServicesOpen ? "outline" : "default"} 
                  className={`text-sm px-3 py-1.5 pr-6 pl-6 h-auto shadow-md ${isServicesOpen ? 'border-white text-white' : 'border-primary'}`}
                >
                  Оставить заявку
                </InteractiveHoverButton>
              </Link>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden transition-colors ${isServicesOpen ? 'text-white' : 'text-black'}`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
            {isMobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-border">
              <nav className="flex flex-col gap-3">
                <Link
                  to="/business-solutions"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-2 text-left text-sm transition-colors py-2 px-3 rounded-md ${
                    isServicesOpen ? 'text-white' : 'text-black'
                  }`}
                >
                  Решения для бизнеса
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => {
                    setIsServicesOpen(!isServicesOpen);
                    setIsMobileMenuOpen(false);
                  }}
                    className={`flex items-center gap-1 text-left text-sm transition-colors py-2 px-3 rounded-md ${
                      isServicesOpen
                        ? 'bg-white bg-opacity-10 text-white font-medium'
                        : isServicesOpen || isBusinessSolutionsOpen ? 'text-white hover:bg-white hover:bg-opacity-10' : 'text-black hover:bg-black hover:bg-opacity-10'
                    }`}
                >
                  Услуги
                  <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                <Link
                  to="/team"
                  onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-left text-sm transition-colors py-2 px-3 rounded-md ${
                      isActive('/team')
                        ? isServicesOpen ? 'bg-white bg-opacity-10 text-white font-medium' : 'bg-black bg-opacity-10 text-black font-medium'
                        : isServicesOpen ? 'text-white hover:bg-white hover:bg-opacity-10' : 'text-black hover:bg-black hover:bg-opacity-10'
                    }`}
                >
                  Команда
                </Link>
                <Link
                  to="/cases"
                  onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-left text-sm transition-colors py-2 px-3 rounded-md ${
                      isActive('/cases')
                        ? isServicesOpen ? 'bg-white bg-opacity-10 text-white font-medium' : 'bg-black bg-opacity-10 text-black font-medium'
                        : isServicesOpen ? 'text-white hover:bg-white hover:bg-opacity-10' : 'text-black hover:bg-black hover:bg-opacity-10'
                    }`}
                >
                  Кейсы
                </Link>
                {/* <Link
                  to="/pricing"
                  onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-left text-sm transition-colors py-2 px-3 rounded-md ${
                      isActive('/pricing')
                        ? isServicesOpen ? 'bg-white bg-opacity-10 text-white font-medium' : 'bg-black bg-opacity-10 text-black font-medium'
                        : isServicesOpen ? 'text-white hover:bg-white hover:bg-opacity-10' : 'text-black hover:bg-black hover:bg-opacity-10'
                    }`}
                >
                  Тарифы
                </Link> */}
                <Link
                  to="/process"
                  onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-left text-sm transition-colors py-2 px-3 rounded-md ${
                      isActive('/process')
                        ? isServicesOpen ? 'bg-white bg-opacity-10 text-white font-medium' : 'bg-black bg-opacity-10 text-black font-medium'
                        : isServicesOpen ? 'text-white hover:bg-white hover:bg-opacity-10' : 'text-black hover:bg-black hover:bg-opacity-10'
                    }`}
                >
                  Процесс
                </Link>
                {/* <Link
                  to="/contacts"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-left text-sm transition-colors py-2 px-3 rounded-md ${
                    isActive('/contacts')
                      ? 'bg-white bg-opacity-10 text-black font-medium'
                      : 'text-black hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  Контакты
                </Link> */}
                <Link to="/contacts" className="w-full mt-2">
                  <InteractiveHoverButton variant="default" className="w-full shadow-md">
                    Оставить заявку
                  </InteractiveHoverButton>
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      <FullscreenServicesMenu isOpen={isServicesOpen} onClose={() => setIsServicesOpen(false)} />
    </>
  );
};

export default Header;
