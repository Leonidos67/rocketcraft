import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Rocket } from 'lucide-react';
import FullscreenServicesMenu from './FullscreenServicesMenu';

const Header = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Rocket className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold text-primary">Rocket Craft</span>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center gap-8">
              <button
                onClick={() => setIsServicesOpen(true)}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Услуги
              </button>
              <button
                onClick={() => scrollToSection('cases')}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Кейсы
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Тарифы
              </button>
              <button
                onClick={() => scrollToSection('process')}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Процесс
              </button>
              <button
                onClick={() => scrollToSection('contacts')}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Контакты
              </button>
            </nav>

            <div className="flex items-center gap-4">
              <Button
                onClick={() => scrollToSection('contacts')}
                className="hidden lg:inline-flex bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Оставить заявку
              </Button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-foreground"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-border">
              <nav className="flex flex-col gap-4">
                <button
                  onClick={() => {
                    setIsServicesOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left text-foreground hover:text-primary transition-colors font-medium py-2"
                >
                  Услуги
                </button>
                <button
                  onClick={() => scrollToSection('cases')}
                  className="text-left text-foreground hover:text-primary transition-colors font-medium py-2"
                >
                  Кейсы
                </button>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="text-left text-foreground hover:text-primary transition-colors font-medium py-2"
                >
                  Тарифы
                </button>
                <button
                  onClick={() => scrollToSection('process')}
                  className="text-left text-foreground hover:text-primary transition-colors font-medium py-2"
                >
                  Процесс
                </button>
                <button
                  onClick={() => scrollToSection('contacts')}
                  className="text-left text-foreground hover:text-primary transition-colors font-medium py-2"
                >
                  Контакты
                </button>
                <Button
                  onClick={() => scrollToSection('contacts')}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
                >
                  Оставить заявку
                </Button>
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
