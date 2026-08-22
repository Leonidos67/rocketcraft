import { useState, useEffect, useRef } from 'react';

import { ChevronLeft, X } from 'lucide-react';

import { Link, useLocation } from 'react-router-dom';

import { AnimatePresence, motion } from 'framer-motion';

import PrimaryButton from '@/components/PrimaryButton';

import HeaderDesktopNav from '@/components/HeaderDesktopNav';

import BusinessSolutionsModal from './BusinessSolutionsModal';
import ROICalculatorModal from '@/components/ROICalculatorModal';
import LeadRequestPopover from '@/components/LeadRequestPopover';
import ServicesMenuModal from '@/components/ServicesMenuModal';
import { servicesDropdownItems } from '@/data/headerServicesMenu';

import { Grip } from '@/components/ui/motion/Grip';

import { siteContainerClass } from '@/lib/layoutStyles';
import { cn } from '@/lib/utils';

const MENU_EASE = [0.22, 1, 0.36, 1] as const;

type MobileMenuView = 'root' | 'services';

type MobileMenuItem =
  | { label: string; to: string }
  | { label: string; href: string }
  | { label: string; action: 'roi' }
  | { label: string; kind: 'services' };

const mobileMenuLinkClass =
  'block w-full cursor-pointer border-none bg-transparent py-[0.35rem] font-[\'Oi\',serif] text-[clamp(1.5rem,5.5vw,2.25rem)] font-normal italic uppercase leading-[1.15] tracking-[0.01em] text-foreground no-underline transition-[color,opacity] duration-200 hover:text-primary hover:opacity-90';

const mobileSubmenuLinkClass =
  'block w-full cursor-pointer border-none bg-transparent py-[0.35rem] text-left font-[\'Oi\',serif] text-[clamp(1.25rem,4.5vw,1.75rem)] font-normal italic uppercase leading-[1.2] tracking-[0.01em] text-foreground no-underline transition-[color,opacity] duration-200 hover:text-primary hover:opacity-90';

const mobileMenuItems: MobileMenuItem[] = [
  { label: 'Услуги', kind: 'services' },
  { label: 'Процесс', to: '/process' },
  { label: 'Готовые решения', to: '/product-preview' },
  { label: 'Калькулятор ROI', action: 'roi' as const },
  // { label: 'Решения для бизнеса' },
  // { label: 'Кейсы', to: '/cases' },
  // { label: 'Блог', href: 'https://blog.agyra.ru' },
];



const Header = () => {

  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const [isBusinessSolutionsOpen, setIsBusinessSolutionsOpen] = useState(false);
  const [isRoiModalOpen, setIsRoiModalOpen] = useState(false);
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const [leadFormMode, setLeadFormMode] = useState<'popover' | 'dialog'>('popover');

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileMenuView, setMobileMenuView] = useState<MobileMenuView>('root');

  const location = useLocation();
  const [isStuck, setIsStuck] = useState(false);
  const servicesAnchorRef = useRef<HTMLButtonElement>(null);
  const leadAnchorRef = useRef<HTMLDivElement>(null);

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



  const isDesktopNavDropdownOpen = isServicesOpen;

  useEffect(() => {

    const root = document.documentElement;

    if (isDesktopNavDropdownOpen) {

      root.classList.add('services-open');

    } else {

      root.classList.remove('services-open');

    }

    return () => root.classList.remove('services-open');

  }, [isDesktopNavDropdownOpen]);



  useEffect(() => {
    document.body.style.overflow = '';
    setIsServicesOpen(false);
  }, [location.pathname]);



  useEffect(() => {
    if (!isMobileMenuOpen) {
      setMobileMenuView('root');
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (isBusinessSolutionsOpen || isMobileMenuOpen || isRoiModalOpen || (isLeadFormOpen && leadFormMode === 'dialog')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = previousOverflow || '';
    }

    return () => {
      document.body.style.overflow = previousOverflow || '';
    };
  }, [isBusinessSolutionsOpen, isMobileMenuOpen, isRoiModalOpen, isLeadFormOpen, leadFormMode]);

  useEffect(() => {
    setIsLeadFormOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isServicesOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Element;

      if (target.closest('[data-bubble-menu]')) return;
      if (target.closest('[data-services-menu]')) return;
      if (target.closest('[data-mobile-services-menu]')) return;

      setIsServicesOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [isServicesOpen]);



  const isOverlayOpen = isBusinessSolutionsOpen;

  const isInverse = isOverlayOpen;

  const openLeadForm = (mode: 'popover' | 'dialog') => {
    setLeadFormMode(mode);
    setIsLeadFormOpen(true);
    setIsBusinessSolutionsOpen(false);
    setIsServicesOpen(false);
    if (mode === 'dialog') {
      setIsMobileMenuOpen(false);
    }
  };

  const openRoiModal = () => {
    setIsRoiModalOpen(true);
    setIsBusinessSolutionsOpen(false);
    setIsServicesOpen(false);
    setIsMobileMenuOpen(false);
  };

  const openSolutions = () => {
    setIsBusinessSolutionsOpen(true);
    setIsServicesOpen(false);
    setIsMobileMenuOpen(false);
  };

  const toggleServices = () => {
    setIsServicesOpen((prev) => !prev);
    setIsBusinessSolutionsOpen(false);
    setIsMobileMenuOpen(false);
  };

  const closeDesktopNavMenus = () => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  };

  return (

    <>

      <div className={cn(
        'relative overflow-visible pt-[var(--site-header-shell-padding-top)]',
        isDesktopNavDropdownOpen && 'z-[130]'
      )}>
        <header
          className={cn(
            'relative h-header-height overflow-visible bg-background/85 backdrop-blur-[12px] transition-colors duration-300',
            isDesktopNavDropdownOpen ? 'z-[130]' : 'z-40',
            isInverse ? 'border-b-primary bg-primary text-primary-foreground' : 'text-foreground'
          )}
        >
        <div className={cn(siteContainerClass, 'h-full')}>
          <div className="flex relative h-full items-center justify-between overflow-visible">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                'relative z-[35] shrink-0 bg-transparent text-base font-semibold tracking-tight md:text-lg',
                isInverse ? 'text-primary-foreground' : 'text-foreground'
              )}
            >
              Agyra
            </Link>

            {!isStuck && (
              <HeaderDesktopNav
                isInverse={isInverse}
                isStuck={false}
                isServicesOpen={isServicesOpen}
                servicesAnchorRef={servicesAnchorRef}
                onOpenSolutions={openSolutions}
                onOpenRoi={openRoiModal}
                onToggleServices={toggleServices}
                onCloseMobileMenu={closeDesktopNavMenus}
              />
            )}

            <div className="flex items-center gap-3">
              {/* <Link
                type="button"
                to="tel:+79303811111"
                className={cn(
                  'inline-flex cursor-pointer items-center gap-2 border-none bg-transparent px-0 py-1 text-sm font-semibold',
                  isInverse ? 'text-primary-foreground' : 'text-foreground'
                )}
                aria-label="Открыть меню"
              >
                <span className="inline-flex h-6 w-6 items-center justify-center" aria-hidden="true">
                  <Phone className='w-8 h-8' unstyled animateOnMount />
                </span>
              </Link> */}
              <div ref={leadAnchorRef} className="relative hidden xl:inline-flex">
                <PrimaryButton compact onClick={() => openLeadForm('popover')}>
                  Оставить заявку
                </PrimaryButton>
                <LeadRequestPopover
                  open={isLeadFormOpen && leadFormMode === 'popover'}
                  onOpenChange={setIsLeadFormOpen}
                  anchorRef={leadAnchorRef}
                  mode="popover"
                />
              </div>

              {!isMobileMenuOpen && (
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className={cn(
                  'inline-flex cursor-pointer items-center gap-2 border-none bg-transparent px-0 py-1 text-sm font-semibold xl:hidden',
                  isInverse ? 'text-primary-foreground' : 'text-foreground'
                )}
                aria-expanded={false}
                aria-label="Открыть меню"
              >
                <span className="inline-flex h-7 w-7 items-center justify-center" aria-hidden="true">
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
          isServicesOpen={isServicesOpen}
          servicesAnchorRef={servicesAnchorRef}
          onOpenSolutions={openSolutions}
          onOpenRoi={openRoiModal}
          onToggleServices={toggleServices}
          onCloseMobileMenu={closeDesktopNavMenus}
        />
      )}


      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex h-dvh min-h-dvh flex-col bg-background xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: MENU_EASE }}
          >
            <div className="flex shrink-0 items-center justify-end px-4 pb-2 pt-[max(1rem,env(safe-area-inset-top,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))]">
              <motion.button
                type="button"
                className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-[background,border-color] duration-200 hover:border-foreground/15 hover:bg-muted"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Закрыть меню"
                initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                transition={{ duration: 0.3, ease: MENU_EASE }}
              >
                <X className="h-5 w-5" strokeWidth={2.25} />
              </motion.button>
            </div>

            <motion.div
              className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-6 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] text-center"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.4, ease: MENU_EASE }}
            >
              <AnimatePresence mode="wait">
                {mobileMenuView === 'root' ? (
                  <motion.div
                    key="mobile-menu-root"
                    className="w-full max-w-md"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.28, ease: MENU_EASE }}
                  >
                    <nav className="flex w-full list-none flex-col gap-3">
                      {mobileMenuItems.map((item, index) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.35, delay: 0.04 * index, ease: MENU_EASE }}
                        >
                          {'kind' in item && item.kind === 'services' ? (
                            <button
                              type="button"
                              onClick={() => setMobileMenuView('services')}
                              className={cn(mobileMenuLinkClass, 'flex w-full items-center justify-center gap-2')}
                              data-mobile-services-menu
                            >
                              <span>{item.label}</span>
                              <ChevronLeft className="h-5 w-5 rotate-180 text-muted-foreground" aria-hidden="true" />
                            </button>
                          ) : 'to' in item && item.to ? (
                            <Link
                              to={item.to}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={mobileMenuLinkClass}
                            >
                              {item.label}
                            </Link>
                          ) : 'href' in item && item.href ? (
                            <a href={item.href} className={mobileMenuLinkClass}>
                              {item.label}
                            </a>
                          ) : 'action' in item && item.action === 'roi' ? (
                            <button type="button" onClick={openRoiModal} className={mobileMenuLinkClass}>
                              {item.label}
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                setIsBusinessSolutionsOpen(true);
                                setIsMobileMenuOpen(false);
                              }}
                              className={mobileMenuLinkClass}
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
                      transition={{ duration: 0.35, delay: 0.28, ease: MENU_EASE }}
                    >
                      <PrimaryButton onClick={() => openLeadForm('dialog')}>
                        Оставить заявку
                      </PrimaryButton>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="mobile-menu-services"
                    className="w-full max-w-md text-left"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.28, ease: MENU_EASE }}
                  >
                    <button
                      type="button"
                      onClick={() => setMobileMenuView('root')}
                      className="mb-8 inline-flex items-center gap-2 rounded-full border border-black/[0.12] bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-[hsl(0_0%_96%)]"
                    >
                      <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                      Назад
                    </button>

                    <nav className="flex w-full list-none flex-col gap-4 text-left">
                      {servicesDropdownItems.map((service, index) => (
                        <motion.div
                          key={service.id}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.04 * index, ease: MENU_EASE }}
                        >
                          <Link
                            to={service.to}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={mobileSubmenuLinkClass}
                          >
                            {service.label}
                          </Link>
                        </motion.div>
                      ))}
                    </nav>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <ROICalculatorModal open={isRoiModalOpen} onOpenChange={setIsRoiModalOpen} />
      <LeadRequestPopover
        open={isLeadFormOpen && leadFormMode === 'dialog'}
        onOpenChange={setIsLeadFormOpen}
        anchorRef={leadAnchorRef}
        mode="dialog"
      />
      <BusinessSolutionsModal isOpen={isBusinessSolutionsOpen} onClose={() => setIsBusinessSolutionsOpen(false)} />
      <ServicesMenuModal
        isOpen={isServicesOpen}
        onClose={() => setIsServicesOpen(false)}
        anchorRef={servicesAnchorRef}
      />
    </>
  );
};

export default Header;


