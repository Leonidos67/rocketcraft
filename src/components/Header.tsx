import { useState, useEffect } from 'react';

import { X } from 'lucide-react';

import { Link, useLocation } from 'react-router-dom';

import { AnimatePresence, motion } from 'framer-motion';

import PrimaryButton from '@/components/PrimaryButton';

import HeaderDesktopNav from '@/components/HeaderDesktopNav';

import BusinessSolutionsModal from './BusinessSolutionsModal';

import { Grip } from '@/components/ui/motion/Grip';

import { cn } from '@/lib/utils';

const MENU_EASE = [0.22, 1, 0.36, 1] as const;

const mobileMenuItems = [
  { label: 'Решения для бизнеса' },
  { label: 'Услуги', to: '/services' },
  { label: 'Кейсы', to: '/cases' },
  { label: 'Процесс', to: '/process' },
  { label: 'Команда', to: '/team' },
  { label: 'Калькулятор ROI', to: '/roi-calc' },
  { label: 'Блог', href: 'https://blog.agyra.ru' },
];



const Header = () => {

  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const [isBusinessSolutionsOpen, setIsBusinessSolutionsOpen] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);

  const location = useLocation();
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const updateStuck = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      setIsStuck((current) => {
        const next = scrollTop > 8;
        return current === next ? current : next;
      });
    };

    updateStuck();

    let rafId = 0;
    const tick = () => {
      updateStuck();
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    window.addEventListener('resize', updateStuck);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', updateStuck);
    };
  }, [location.pathname]);



  useEffect(() => {

    const root = document.documentElement;

    if (isServicesOpen) {

      root.classList.add('services-open');

    } else {

      root.classList.remove('services-open');

    }

    return () => root.classList.remove('services-open');

  }, [isServicesOpen]);



  useEffect(() => {

    document.body.style.overflow = '';

  }, [location.pathname]);



  useEffect(() => {

    const previousOverflow = document.body.style.overflow;

    if (isServicesOpen || isBusinessSolutionsOpen || isMobileMenuOpen) {

      document.body.style.overflow = 'hidden';

    } else {

      document.body.style.overflow = previousOverflow || '';

    }

    return () => {

      document.body.style.overflow = previousOverflow || '';

    };

  }, [isServicesOpen, isBusinessSolutionsOpen, isMobileMenuOpen]);



  useEffect(() => {

    const handleClickOutside = (event: MouseEvent) => {

      if (isLearnMoreOpen && !(event.target as Element).closest('[data-learn-more]')) {

        setIsLearnMoreOpen(false);

      }

    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);

  }, [isLearnMoreOpen]);



  const isOverlayOpen = isServicesOpen || isBusinessSolutionsOpen;

  const isInverse = isOverlayOpen || isMobileMenuOpen;

  const openSolutions = () => {
    setIsBusinessSolutionsOpen(true);
    setIsServicesOpen(false);
    setIsMobileMenuOpen(false);
  };

  const closeDesktopNavMenus = () => {
    setIsMobileMenuOpen(false);
    setIsLearnMoreOpen(false);
  };

  return (

    <>

      <div className="site-header-shell">
        <header
          className={cn(
            'site-header transition-colors duration-300',
            isInverse ? 'site-header--inverse text-primary-foreground' : 'text-foreground'
          )}
        >
        <div className="site-container h-full">
          <div className="flex items-center justify-between h-full relative">
            <Link
              to="/"
              className={cn(
                'text-base md:text-lg font-semibold tracking-tight shrink-0',
                isInverse ? 'text-primary-foreground' : 'text-foreground'
              )}
            >
              Agyra
            </Link>

            {!isStuck && (
              <HeaderDesktopNav
                isInverse={isInverse}
                isStuck={false}
                isLearnMoreOpen={isLearnMoreOpen}
                onOpenSolutions={openSolutions}
                onToggleLearnMore={() => setIsLearnMoreOpen(!isLearnMoreOpen)}
                onCloseMobileMenu={closeDesktopNavMenus}
              />
            )}

            <div className="flex items-center gap-3">
              <PrimaryButton to="/contacts" compact className="hidden xl:inline-flex">
                Оставить заявку
              </PrimaryButton>

              {!isMobileMenuOpen && (
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className={cn(
                  'mobile-menu-toggle xl:hidden inline-flex items-center gap-2 text-sm font-semibold',
                  isInverse ? 'text-primary-foreground' : 'text-foreground'
                )}
                aria-expanded={false}
                aria-label="Открыть меню"
              >
                <span className="mobile-menu-toggle__icon" aria-hidden="true">
                  <Grip width={22} height={22} unstyled animateOnMount />
                </span>
                <span>Меню</span>
              </button>
              )}
            </div>
          </div>
        </div>
      </header>
      </div>

      {isStuck && (
        <HeaderDesktopNav
          isInverse={isInverse}
          isStuck
          isLearnMoreOpen={isLearnMoreOpen}
          onOpenSolutions={openSolutions}
          onToggleLearnMore={() => setIsLearnMoreOpen(!isLearnMoreOpen)}
          onCloseMobileMenu={closeDesktopNavMenus}
        />
      )}


      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu fixed inset-0 z-30 bg-background xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: MENU_EASE }}
          >
            <motion.button
              type="button"
              className="mobile-menu__close"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Закрыть меню"
              initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
              transition={{ duration: 0.3, ease: MENU_EASE }}
            >
              <X className="h-5 w-5" strokeWidth={2.25} />
            </motion.button>

            <motion.div
              className="mobile-menu__panel flex min-h-full flex-col items-center justify-center px-6 text-center"
              style={{ paddingTop: 'var(--page-main-offset)' }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.4, ease: MENU_EASE }}
            >
              <nav className="mobile-menu__nav flex w-full max-w-md flex-col gap-3">
                {mobileMenuItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.35, delay: 0.04 * index, ease: MENU_EASE }}
                  >
                    {'to' in item && item.to ? (
                      <Link
                        to={item.to}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="mobile-menu__link"
                      >
                        {item.label}
                      </Link>
                    ) : 'href' in item && item.href ? (
                      <a href={item.href} className="mobile-menu__link">
                        {item.label}
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setIsBusinessSolutionsOpen(true);
                          setIsMobileMenuOpen(false);
                        }}
                        className="mobile-menu__link"
                      >
                        {item.label}
                      </button>
                    )}
                  </motion.div>
                ))}
              </nav>

              <motion.div
                className="mt-12"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.35, delay: 0.28, ease: MENU_EASE }}
              >
                <PrimaryButton to="/contacts" onClick={() => setIsMobileMenuOpen(false)}>
                  Оставить заявку
                </PrimaryButton>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <BusinessSolutionsModal isOpen={isBusinessSolutionsOpen} onClose={() => setIsBusinessSolutionsOpen(false)} />
    </>
  );
};

export default Header;


