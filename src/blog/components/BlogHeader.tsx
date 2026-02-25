import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BlogHeader = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchValue('');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      // Здесь будет логика поиска
      console.log('Поиск:', searchValue);
    }
  };

  return (
    <>
      <header className="bg-[#111] shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-20">
              <Link to="/" className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors cursor-pointer">
                <motion.div
                  animate={{ 
                    y: [0, -5, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <svg 
                    width="28" 
                    height="28" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    className="text-white"
                  >
                    {/* Документ */}
                    <motion.path 
                      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                      animate={{
                        pathLength: [0, 1, 1]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                    />
                    <motion.polyline 
                      points="14,2 14,8 20,8"
                      animate={{
                        pathLength: [0, 1, 1]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 2,
                        delay: 0.3
                      }}
                    />
                    
                    {/* Карандаш */}
                    <motion.path 
                      d="M17 12l-5 5-5-5"
                      animate={{
                        opacity: [0, 1, 1, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                    />
                    <motion.path 
                      d="M12 17l-3 3 3 3"
                      animate={{
                        opacity: [0, 1, 1, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                        delay: 0.5
                      }}
                    />
                  </svg>
                </motion.div>
                <div>
                  <span className="text-xl font-bold bg-white bg-clip-text text-transparent">
                    Agyra | Blog
                  </span>
                </div>
              </Link>
              
              <nav className="flex space-x-6 items-center">
                <Link to="/" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                  Главная
                </Link>
                <a 
                  href="http://localhost:5173/trend" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  <span>Тренды 2026 - как используем</span>
                  <div className="ml-[-5px] mt-[-10px] bg-gradient-to-r from-red-500 to-orange-500 px-2 rounded-full">
                    <span className="text-white font-bold text-xs">HOT</span>
                  </div>
                </a>
              </nav>
            </div>
            
            <a 
              href="https://Agyra.io" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors cursor-pointer"
            >
              Перейти на Agyra.io
            </a>
          </div>
        </div>
      </header>
      
      {/* Разделитель */}
      <div className="h-px bg-[#222] mx-auto" />
      
      {/* Вторая шапка с меню */}
      <nav className="bg-[#111]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between relative">
            {showSearch ? (
              // Поле поиска
              <form onSubmit={handleSearchSubmit} className="flex-1 mr-4 flex items-center">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Поиск по блогу..."
                  className="w-full bg-gray-800 text-white px-4 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </form>
            ) : (
              // Меню категорий
              <>
                <div className="flex overflow-x-auto gap-4 pb-1 hide-scrollbar flex-1">
                  {[
                    'Автоматизация процессов', 
                    'Готовые решения', 
                    'ИИ-инструменты', 
                    'Кейсы и истории', 
                    'Старт и масштабирование',
                    'Интеграции и технологии', 
                    'Мнения и тренды', 
                    'Бесплатные ресурсы', 
                    'База знаний / Помощь',
                    ''
                  ].map((item, index) => (
                    <a
                      key={index}
                      href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-white px-1 rounded-lg text-center font-small transition-all cursor-pointer whitespace-nowrap"
                    >
                      {item}
                    </a>
                  ))}
                </div>
                {/* Градиент справа - фиксированный */}
                <div className="absolute right-8 top-0 bottom-0 w-16 bg-gradient-to-l from-[#111] to-transparent pointer-events-none"></div>
              </>
            )}
            
            {/* Иконка поиска/закрытия */}
            <div className="ml-4 mt-1 z-20">
              <button 
                onClick={toggleSearch}
                className="text-gray-200 hover:text-white transition-colors cursor-pointer"
              >
                {showSearch ? (
                  // Иконка закрытия
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                ) : (
                  // Иконка поиска
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default BlogHeader;