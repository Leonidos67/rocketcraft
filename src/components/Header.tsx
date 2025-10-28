import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Rocket } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import FullscreenServicesMenu from './FullscreenServicesMenu';

const Header = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2">
              <Rocket className="w-7 h-7 text-primary" />
              <span className="text-xl font-semibold text-foreground">Rocket Craft</span>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center gap-6">
              <button
                onClick={() => setIsServicesOpen(true)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Услуги
              </button>
              <Link
                to="/cases"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Кейсы
              </Link>
              <Link
                to="/pricing"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Тарифы
              </Link>
              <Link
                to="/process"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Процесс
              </Link>
              <Link
                to="/contacts"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Контакты
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <Button
                asChild
                size="sm"
                className="hidden lg:inline-flex bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link to="/contacts">Оставить заявку</Link>
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
              <nav className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setIsServicesOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  Услуги
                </button>
                <Link
                  to="/cases"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-left text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  Кейсы
                </Link>
                <Link
                  to="/pricing"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-left text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  Тарифы
                </Link>
                <Link
                  to="/process"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-left text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  Процесс
                </Link>
                <Link
                  to="/contacts"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-left text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  Контакты
                </Link>
                <Button
                  asChild
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 w-full mt-2"
                >
                  <Link to="/contacts">Оставить заявку</Link>
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
