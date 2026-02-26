import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import { Rocket } from '@/components/ui/motion/Rocket';
import { SparklesText } from '@/components/ui/sparkles-text';

const Header = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Removed dark theme enforcement to maintain consistent light background

  // На всякий случай: при смене маршрута всегда снимаем любые блокировки скролла страницы
  useEffect(() => {
    document.body.style.overflow = '';
  }, [location.pathname]);

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
  const shouldBeTransparent = isHomePage && !isScrolled;

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          shouldBeTransparent 
            ? 'bg-transparent border-b border-transparent' 
            : 'bg-transparent border-b border-transparent mobile-header-glass'
        }`}
        style={{ top: isScrolled ? '0px' : '28px' }} // Initial offset, removed when scrolled
      >
        <div className="px-6">
          <div className="relative flex items-center justify-between h-20">
            <div className="hidden lg:flex items-center">
              <Link to="/" className="flex items-center gap-2 text-black">
                <div className="text-black">
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

            <Link to="/" className="lg:hidden flex items-center gap-2 text-black">
              <div className="text-black">
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
              <Link
                to="/services"
                className={`text-sm transition-colors px-3 py-1.5 rounded-md ${
                  isActive('/services')
                    ? 'bg-black bg-opacity-10 text-black font-medium'
                    : 'text-black hover:bg-black hover:bg-opacity-10'
                }`}
              >
                Услуги
              </Link>
              <Link
                to="/team"
                className={`text-sm transition-colors px-3 py-1.5 rounded-md ${
                  isActive('/team')
                    ? 'bg-black bg-opacity-10 text-black font-medium'
                    : 'text-black hover:bg-black hover:bg-opacity-10'
                }`}
              >
                Команда
              </Link>
              <Link
                to="/cases"
                className={`text-sm transition-colors px-3 py-1.5 rounded-md ${
                  isActive('/cases')
                    ? 'bg-black bg-opacity-10 text-black font-medium'
                    : 'text-black hover:bg-black hover:bg-opacity-10'
                }`}
              >
                Кейсы
              </Link>
              {/* <Link
                to="/pricing"
                className={`text-sm transition-colors px-3 py-1.5 rounded-md ${
                  isActive('/pricing')
                    ? 'bg-black bg-opacity-10 text-black font-medium'
                    : 'text-black hover:bg-black hover:bg-opacity-10'
                }`}
              >
                Тарифы
              </Link> */}
              <Link
                to="/process"
                className={`text-sm transition-colors px-3 py-1.5 rounded-md ${
                  isActive('/process')
                    ? 'bg-black bg-opacity-10 text-black font-medium'
                    : 'text-black hover:bg-black hover:bg-opacity-10'
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
                  variant="default" 
                  className="text-sm px-3 py-1.5 pr-6 pl-6 h-auto shadow-md border-primary"
                >
                  Оставить заявку
                </InteractiveHoverButton>
              </Link>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden transition-colors text-black"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
            {isMobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-border mobile-dropdown-menu">
              <nav className="flex flex-col gap-3">
                <Link
                  to="/services"
                  onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-1 text-left text-sm transition-colors py-2 px-3 rounded-md ${
                      isActive('/services')
                        ? 'bg-black bg-opacity-10 text-black font-medium'
                        : 'text-black hover:bg-black hover:bg-opacity-10'
                    }`}
                >
                  Услуги
                </Link>
                <Link
                  to="/team"
                  onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-left text-sm transition-colors py-2 px-3 rounded-md ${
                      isActive('/team')
                        ? 'bg-black bg-opacity-10 text-black font-medium'
                        : 'text-black hover:bg-black hover:bg-opacity-10'
                    }`}
                >
                  Команда
                </Link>
                <Link
                  to="/cases"
                  onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-left text-sm transition-colors py-2 px-3 rounded-md ${
                      isActive('/cases')
                        ? 'bg-black bg-opacity-10 text-black font-medium'
                        : 'text-black hover:bg-black hover:bg-opacity-10'
                    }`}
                >
                  Кейсы
                </Link>
                {/* <Link
                  to="/pricing"
                  onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-left text-sm transition-colors py-2 px-3 rounded-md ${
                      isActive('/pricing')
                        ? 'bg-black bg-opacity-10 text-black font-medium'
                        : 'text-black hover:bg-black hover:bg-opacity-10'
                    }`}
                >
                  Тарифы
                </Link> */}
                <Link
                  to="/process"
                  onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-left text-sm transition-colors py-2 px-3 rounded-md ${
                      isActive('/process')
                        ? 'bg-black bg-opacity-10 text-black font-medium'
                        : 'text-black hover:bg-black hover:bg-opacity-10'
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

    </>
  );
};

export default Header;