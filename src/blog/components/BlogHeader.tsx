import PrimaryButton from '@/components/PrimaryButton';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const BlogHeader = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      console.log('Поиск:', searchValue);
    }
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 bg-background border-b border-border"
        style={{ paddingTop: 'var(--page-header-top-padding)' }}
      >
        <div className="site-container">
          <div className="flex items-center justify-between" style={{ height: 'var(--page-header-height)' }}>
            <Link to="/" className="text-lg md:text-xl font-semibold text-foreground shrink-0">
              Agyra <span className="text-muted-foreground font-normal">| Blog</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              <Link to="/" className="nav-link">Главная</Link>
              <a href="http://localhost:5173/trend" target="_blank" rel="noopener noreferrer" className="nav-link">
                Тренды 2026
              </a>
            </nav>

            <div className="flex items-center gap-4">
              <PrimaryButton to="https://agyra.ru" external compact className="hidden md:inline-flex">
                На agyra.ru
              </PrimaryButton>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden flex items-center gap-2 text-sm font-semibold"
                aria-label="Меню"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav
        className="fixed left-0 right-0 z-30 bg-sm-grey-light border-b border-border"
        style={{ top: 'calc(var(--page-header-top-padding) + var(--page-header-height))' }}
      >
        <div className="site-container py-3">
          <div className="flex items-center justify-between relative">
            {showSearch ? (
              <form onSubmit={handleSearchSubmit} className="flex-1 mr-4">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Поиск по блогу..."
                  className="w-full bg-white text-foreground px-5 py-2 rounded-pill border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
                  autoFocus
                />
              </form>
            ) : (
              <div className="flex overflow-x-auto gap-4 pb-1 hide-scrollbar flex-1">
                {[
                  'Автоматизация',
                  'Готовые решения',
                  'ИИ-инструменты',
                  'Кейсы',
                  'Масштабирование',
                  'Интеграции',
                  'Тренды',
                ].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm text-muted-foreground hover:text-foreground whitespace-nowrap transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            )}

            <button
              onClick={() => setShowSearch(!showSearch)}
              className="ml-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showSearch ? 'Закрыть поиск' : 'Поиск'}
            >
              {showSearch ? <X className="w-5 h-5" /> : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-20 bg-primary md:hidden pt-32 px-6">
          <nav className="flex flex-col gap-6 text-center">
            <Link to="/" className="text-primary-foreground text-3xl font-semibold" onClick={() => setIsMobileMenuOpen(false)}>Главная</Link>
            <a href="https://agyra.ru" className="text-primary-foreground text-3xl font-semibold">На agyra.ru</a>
          </nav>
        </div>
      )}
    </>
  );
};

export default BlogHeader;
