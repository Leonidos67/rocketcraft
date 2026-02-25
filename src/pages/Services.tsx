import { 
  MessageSquare, Database, Workflow, Link2, Send, Bot, 
  TrendingUp, BarChart3, GraduationCap, Wrench, Coffee, 
  Scissors, Dumbbell, ShoppingBag, BookOpen, ChevronRight,
  Shield, Users, BarChart, Package, Menu, X, GripVertical
} from 'lucide-react';
import Footer from '@/components/Footer';
import PageActions from '@/components/PageActions';
import PageLoader from '@/components/PageLoader';
import Banner from '@/components/Banner';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import React, { useEffect, useState, useRef, useCallback } from 'react';

// Определяем цветовые классы здесь, чтобы они были доступны для ServiceModal
const colorClasses = {
  blue: 'bg-blue-500/10 text-blue-600 border-blue-200',
  purple: 'bg-purple-500/10 text-purple-600 border-purple-200',
  green: 'bg-green-500/10 text-green-600 border-green-200',
  orange: 'bg-orange-500/10 text-orange-600 border-orange-200',
  indigo: 'bg-indigo-500/10 text-indigo-600 border-indigo-200',
  violet: 'bg-violet-500/10 text-violet-600 border-violet-200',
  pink: 'bg-pink-500/10 text-pink-600 border-pink-200',
  yellow: 'bg-yellow-500/10 text-yellow-600 border-yellow-200',
  cyan: 'bg-cyan-500/10 text-cyan-600 border-cyan-200',
  gray: 'bg-gray-500/10 text-gray-600 border-gray-200'
};

const iconColorClasses = {
  blue: 'text-blue-600',
  purple: 'text-purple-600',
  green: 'text-green-600',
  orange: 'text-orange-600',
  indigo: 'text-indigo-600',
  violet: 'text-violet-600',
  pink: 'text-pink-600',
  yellow: 'text-yellow-600',
  cyan: 'text-cyan-600',
  gray: 'text-gray-600'
};

// Компонент модального окна
const ServiceModal = ({ service, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const Icon = service.icon;
  const iconColorClass = iconColorClasses[service.color];
  const bgColorClass = colorClasses[service.color];
  
  const getRandomPrice = () => {
    const prices = [
      'от 25 000 ₽',
      'от 45 000 ₽', 
      'от 65 000 ₽',
      'от 85 000 ₽',
      'от 120 000 ₽',
      'от 150 000 ₽'
    ];
    return prices[Math.floor(Math.random() * prices.length)];
  };
  
  const servicePrice = getRandomPrice();
  
  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqItems = [
    {
      q: 'Сколько времени занимает внедрение?',
      a: 'Обычно 2-3 недели, в зависимости от сложности проекта'
    },
    {
      q: 'Нужна ли техническая подготовка с нашей стороны?',
      a: 'Нет, мы проводим полное обучение вашей команды'
    },
    {
      q: 'Какая гарантия на работу?',
      a: '6 месяцев гарантии + пожизненная техническая поддержка'
    },
    {
      q: 'Можно ли масштабировать решение?',
      a: 'Да, все наши решения создаются с учётом будущего роста'
    }
  ];

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-10 bg-black/70 backdrop-blur-md"
      onClick={onClose}
    >
      <div 
        ref={modalRef}
        className="relative bg-white dark:bg-gray-900 rounded-3xl w-full h-full max-h-[calc(100vh-48px)] max-w-[calc(100vw-48px)] overflow-hidden border-0 shadow-2xl dark:shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-50 w-12 h-12 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-110 active:scale-95 transition-all duration-300 ease-out shadow-lg hover:shadow-xl"
        >
          <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        
        {/* Контент модального окна с кастомным скроллом */}
        <div className="h-full flex flex-col">
          {/* Заголовок с градиентом */}
          <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 p-8 border-b border-gray-100 dark:border-gray-800">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className={cn(
                "w-20 h-20 rounded-2xl flex items-center justify-center border-2 shadow-lg",
                bgColorClass
              )}>
                <Icon className={cn("w-10 h-10", iconColorClass)} />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{service.name}</h2>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-sm font-medium">
                    Решаем: {service.problem}
                  </div>
                  {/* Блок с ценой */}
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-medium border border-green-200 dark:border-green-800">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-bold">{servicePrice}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Основной контент с скроллом */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto custom-scrollbar p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Левая колонка */}
                <div className="space-y-6">
                  {/* Стоимость внедрения - переехала в начало */}
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-2">Стоимость внедрения</h3>
                        <div className="text-2xl font-bold mb-1">{servicePrice}</div>
                        <p className="text-blue-100 text-sm opacity-90">
                          *окончательная цена формируется после консультации
                        </p>
                      </div>
                      <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                    </div>
                    <Button 
                      size="lg" 
                      variant="secondary"
                      className="w-full bg-white text-blue-600 hover:bg-white/90 font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                      asChild
                    >
                      <Link to="/contacts">
                        Заказать внедрение
                      </Link>
                    </Button>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Описание решения</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
                
                {/* Правая колонка */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800/30">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Ожидаемый результат</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "text-lg font-bold px-5 py-2.5 rounded-xl",
                        "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
                      )}>
                        {service.benefit}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Средний показатель для наших клиентов
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Что вы получаете</h3>
                    </div>
                    <ul className="space-y-3">
                      {[
                        'Полное техническое сопровождение',
                        'Обучение вашей команды',
                        'Документация и инструкции',
                        'Поддержка 24/7 после запуска',
                        'Регулярные обновления и оптимизация'
                      ].map((item, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                          <span className="text-gray-600 dark:text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Связанные решения</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {['Автоматизация CRM', 'Интеграции API', 'Telegram боты', 'Аналитика']
                        .map((tag, index) => (
                          <div 
                            key={index}
                            className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700"
                          >
                            {tag}
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
              
              {/* FAQ - аккордеон по центру */}
              <div className="mt-12 pt-12 border-t border-gray-100 dark:border-gray-800">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Часто задаваемые вопросы</h3>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                    Ответы на самые популярные вопросы о нашем решении
                  </p>
                </div>
                
                <div className="max-w-3xl mx-auto space-y-3">
                  {faqItems.map((faq, index) => (
                    <div 
                      key={index}
                      className={cn(
                        "bg-gray-50 dark:bg-gray-800/50 rounded-xl overflow-hidden transition-all duration-300",
                        openFaqIndex === index 
                          ? "ring-2 ring-blue-500/20 shadow-md" 
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      )}
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full p-5 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300",
                            openFaqIndex === index 
                              ? "bg-blue-500 text-white" 
                              : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                          )}>
                            <span className="font-bold">{index + 1}</span>
                          </div>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {faq.q}
                          </span>
                        </div>
                        <ChevronRight className={cn(
                          "w-5 h-5 text-gray-400 transition-transform duration-300",
                          openFaqIndex === index && "rotate-90 text-blue-500"
                        )} />
                      </button>
                      
                      <div className={cn(
                        "overflow-hidden transition-all duration-300",
                        openFaqIndex === index ? "max-h-96" : "max-h-0"
                      )}>
                        <div className="p-5 pt-0 pl-16">
                          <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border-l-4 border-blue-500">
                            <p className="text-gray-600 dark:text-gray-300">
                              {faq.a}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Кнопка "Вернуться к списку" - новая стилизация */}
                <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button 
                      size="lg"
                      variant="outline"
                      onClick={onClose}
                      className="group px-8 py-3 h-auto bg-transparent border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300"
                    >
                      <div className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform duration-300" />
                        <span className="font-semibold">Вернуться к списку</span>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Компонент навигации по странице с плавным перетаскиванием
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
    <div className="cursor-deefault">
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

const services = [
  {
    name: 'Telegram-боты для бизнеса',
    problem: 'Теряете заявки в мессенджерах',
    icon: MessageSquare,
    description: 'Автоматизация взаимодействия с клиентами, приём заявок, брони, уведомления, программы лояльности',
    benefit: '+30% к конверсии заявок',
    color: 'blue'
  },
  {
    name: 'CRM-системы',
    problem: 'Нет системы учёта клиентов',
    icon: Database,
    description: 'Настройка клиентских баз, лид-учёт, аналитика, отчёты, напоминания, сегментация клиентов',
    benefit: '+40% повторных продаж',
    color: 'purple'
  },
  {
    name: 'Автоматизация процессов',
    problem: 'Рутина съедает время',
    icon: Workflow,
    description: 'Автоматические сценарии: заявки, отчёты, напоминания, обработка данных, уведомления сотрудникам',
    benefit: '-20 часов рутины в неделю',
    color: 'green'
  },
  {
    name: 'Интеграции сервисов',
    problem: 'Данные разрознены в разных системах',
    icon: Link2,
    description: 'Связка Telegram, Google Sheets, Notion, Tilda, Airtable, Make, GPT, amoCRM и других',
    benefit: 'Автоматическая синхронизация',
    color: 'orange'
  },
  {
    name: 'Автоматические рассылки',
    problem: 'Низкая эффективность маркетинга',
    icon: Send,
    description: 'Email, Telegram, WhatsApp — сегментированные рассылки акций, напоминаний и событий',
    benefit: '+35% открываемости писем',
    color: 'indigo'
  },
  {
    name: 'AI-ассистенты и чат-боты',
    problem: 'Нет круглосуточной поддержки',
    icon: Bot,
    description: 'Подключение ChatGPT и других AI-моделей для поддержки клиентов, ответов на вопросы, обработки заявок',
    benefit: 'Поддержка 24/7 без оператора',
    color: 'violet'
  },
  {
    name: 'Воронки продаж и лидогенерация',
    problem: 'Нет системы привлечения клиентов',
    icon: TrendingUp,
    description: 'Настройка автоматических воронок, лид-магнитов и CRM-триггеров для привлечения и удержания клиентов',
    benefit: '+50% лидов в базу',
    color: 'pink'
  },
  {
    name: 'Аналитика и отчётность',
    problem: 'Нет ясной картины бизнеса',
    icon: BarChart3,
    description: 'Дашборды и отчёты в Google Sheets, Notion или Telegram: показатели продаж, активности, конверсий',
    benefit: 'Управление на основе данных',
    color: 'yellow'
  },
  {
    name: 'Обучение и сопровождение',
    problem: 'Команда не умеет работать с системой',
    icon: GraduationCap,
    description: 'Обучение команды клиента работе с системой, документация, видео-гайды, поддержка 24/7',
    benefit: 'Самостоятельное управление',
    color: 'cyan'
  },
  {
    name: 'Индивидуальные решения под ключ',
    problem: 'Нужна комплексная автоматизация',
    icon: Wrench,
    description: 'Разработка комплексной автоматизации под конкретные бизнес-процессы и отрасли',
    benefit: 'Система под ваши задачи',
    color: 'gray'
  },
];

const industries = [
  {
    name: 'Для салонов красоты',
    icon: Scissors,
    features: ['Онлайн-запись', 'Напоминания', 'CRM клиентов', 'Программы лояльности'],
  },
  {
    name: 'Для кафе и ресторанов',
    icon: Coffee,
    features: ['Бронирование столов', 'Приём заказов', 'Меню в боте', 'Отзывы и рейтинги'],
  },
  {
    name: 'Для фитнес-студий',
    icon: Dumbbell,
    features: ['Запись на тренировки', 'Учёт абонементов', 'Напоминания', 'Статистика посещений'],
  },
  {
    name: 'Для розничной торговли',
    icon: ShoppingBag,
    features: ['Каталог товаров', 'Программа лояльности', 'Рассылка акций', 'Сбор отзывов'],
  },
  {
    name: 'Для онлайн-школ',
    icon: BookOpen,
    features: ['Запись на курсы', 'Напоминания о занятиях', 'Выдача материалов', 'Обратная связь'],
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Анализ и диагностика',
    description: 'Изучаем ваш бизнес, находим точки роста и составляем план автоматизации'
  },
  {
    number: '02',
    title: 'Проектирование',
    description: 'Создаём прототип системы, согласовываем с вами все детали'
  },
  {
    number: '03',
    title: 'Разработка',
    description: 'Внедряем автоматизацию, интегрируем сервисы, настраиваем процессы'
  },
  {
    number: '04',
    title: 'Запуск и обучение',
    description: 'Запускаем систему, обучаем вашу команду, предоставляем поддержку'
  }
];

// Секции для навигации
const pageSections = [
  { id: 'hero', title: 'Начало' },
  { id: 'solutions', title: 'Наши решения' },
  { id: 'industries', title: 'По отраслям' },
  { id: 'process', title: 'Как мы работаем' },
  { id: 'guarantee', title: 'Гарантии' },
  { id: 'cta', title: 'Консультация' },
];

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredServices, setFilteredServices] = useState(services);

  // Функция определения тега услуги
  const getServiceTag = (serviceName) => {
    const name = serviceName.toLowerCase();
    if (name.includes('telegram') || name.includes('бот')) return 'telegram';
    if (name.includes('crm') || name.includes('клиент')) return 'crm';
    if (name.includes('автоматизация') || name.includes('процесс') || name.includes('интеграция')) return 'automation';
    if (name.includes('аналитика') || name.includes('отчёт')) return 'analytics';
    if (name.includes('ai') || name.includes('чат') || name.includes('искусственн') || name.includes('ассистент')) return 'ai';
    if (name.includes('рассылка') || name.includes('воронк') || name.includes('маркетинг') || name.includes('лид')) return 'marketing';
    return 'other';
  };

  // Функция получения цвета для тега
  const getTagColor = (tag) => {
    const colors = {
      telegram: 'bg-blue-500/10 text-blue-600 border-blue-200',
      crm: 'bg-purple-500/10 text-purple-600 border-purple-200',
      automation: 'bg-green-500/10 text-green-600 border-green-200',
      analytics: 'bg-yellow-500/10 text-yellow-600 border-yellow-200',
      ai: 'bg-violet-500/10 text-violet-600 border-violet-200',
      marketing: 'bg-pink-500/10 text-pink-600 border-pink-200',
      other: 'bg-gray-500/10 text-gray-600 border-gray-200'
    };
    return colors[tag] || colors.other;
  };

  // Функция получения названия тега
  const getTagLabel = (tag) => {
    const labels = {
      telegram: 'Telegram',
      crm: 'CRM',
      automation: 'Автоматизация',
      analytics: 'Аналитика',
      ai: 'AI',
      marketing: 'Маркетинг',
      other: 'Другое'
    };
    return labels[tag] || labels.other;
  };

  // Обработчик изменения фильтра
  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    
    if (filterId === 'all') {
      setFilteredServices(services);
    } else {
      const filtered = services.filter(service => {
        const tag = getServiceTag(service.name);
        return tag === filterId;
      });
      setFilteredServices(filtered);
    }
  };

  // Функция клика по услуге
  const handleServiceClick = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedService(null);
    }, 300);
  };

  // Добавьте useEffect для обработки клавиши ESC
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isModalOpen) {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isModalOpen]);

  return (
    <div className="min-h-screen bg-background cursor-default">
      <Banner />
      <PageLoader />
      
      {/* Навигация по странице с плавным перетаскиванием */}
      <DraggablePageNavigation sections={pageSections} />
      
      <main className="pt-32 pb-20">

        {/* Hero Section */}
        <section id="hero" className="cursor-default mb-24 px-6 max-w-7xl mx-auto">
          <div className="mb-4">
            <h1 className="cursor-default text-5xl md:text-6xl font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-top-5 duration-700">
              Услуги
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed animate-in fade-in slide-in-from-top-5 duration-900 mb-8">
              Создаём и внедряем решения, которые экономят время, сокращают издержки 
              и увеличивают прибыль. От готовых услуг до отдельных инструментов и комплексных систем под ключ.
            </p>
            
            {/* Основные направления */}
            <div className="flex flex-wrap gap-3 animate-in fade-in slide-in-from-bottom-5 duration-1200">
              {[
                { icon: Bot, label: 'Telegram-боты', color: 'bg-blue-500/20 text-blue-600' },
                { icon: Database, label: 'CRM системы', color: 'bg-purple-500/20 text-purple-600' },
                { icon: Workflow, label: 'Автоматизация', color: 'bg-green-500/20 text-green-600' },
                { icon: TrendingUp, label: 'Аналитика', color: 'bg-yellow-500/20 text-yellow-600' },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={index}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${item.color} border border-transparent hover:border-current transition-all duration-300 ease-out hover:scale-105`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Секция с текстом в полную ширину */}
        <section id="marquee-section" className="relative mb-24 overflow-hidden py-8">
          {/* Первый блок - градиентный фон */}
          <div className="relative w-full bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 py-12 rotate-[-2deg] -translate-y-2 overflow-hidden group transition-transform duration-500 ease-out">
            {/* Бегущий текст в первом блоке */}
            <div className="marquee-container">
              <div className="marquee-content text-6xl md:text-7xl font-bold tracking-tighter whitespace-nowrap text-white/90">
                <span className="mx-8">✦ АВТОМАТИЗАЦИЯ БИЗНЕСА ✦</span>
                <span className="mx-8">✦ ИННОВАЦИОННЫЕ РЕШЕНИЯ ✦</span>
                <span className="mx-8">✦ ЦИФРОВАЯ ТРАНСФОРМАЦИЯ ✦</span>
                <span className="mx-8">✦ ОПТИМИЗАЦИЯ ПРОЦЕССОВ ✦</span>
                <span className="mx-8">✦ РОСТ ЭФФЕКТИВНОСТИ ✦</span>
                <span className="mx-8">✦ АВТОМАТИЗАЦИЯ БИЗНЕСА ✦</span>
                <span className="mx-8">✦ ИННОВАЦИОННЫЕ РЕШЕНИЯ ✦</span>
                <span className="mx-8">✦ ЦИФРОВАЯ ТРАНСФОРМАЦИЯ ✦</span>
                <span className="mx-8">✦ ОПТИМИЗАЦИЯ ПРОЦЕССОВ ✦</span>
                <span className="mx-8">✦ РОСТ ЭФФЕКТИВНОСТИ ✦</span>
              </div>
            </div>
            
            {/* Наложение с эффектом бликов */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"></div>
          </div>

          {/* Второй блок - другой оттенок желтого */}
          <div className="relative w-full bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 py-12 rotate-[2deg] translate-y-2 overflow-hidden group transition-transform duration-500 ease-out">
            {/* Бегущий текст во втором блоке (в обратную сторону) */}
            <div className="marquee-container reverse">
              <div className="marquee-content text-6xl md:text-7xl font-bold tracking-tighter whitespace-nowrap text-white/90">
                <span className="mx-8">▷ ТЕХНОЛОГИИ БУДУЩЕГО ▷</span>
                <span className="mx-8">▷ ИСКУССТВЕННЫЙ ИНТЕЛЛЕКТ ▷</span>
                <span className="mx-8">▷ МАСШТАБИРУЕМЫЕ СИСТЕМЫ ▷</span>
                <span className="mx-8">▷ АВТОМАТИЧЕСКИЕ ВОРОНКИ ▷</span>
                <span className="mx-8">▷ CRM ИНТЕГРАЦИИ ▷</span>
                <span className="mx-8">▷ ТЕЛЕГРАМ БОТЫ ▷</span>
                <span className="mx-8">▷ ТЕХНОЛОГИИ БУДУЩЕГО ▷</span>
                <span className="mx-8">▷ ИСКУССТВЕННЫЙ ИНТЕЛЛЕКТ ▷</span>
                <span className="mx-8">▷ МАСШТАБИРУЕМЫЕ СИСТЕМЫ ▷</span>
                <span className="mx-8">▷ АВТОМАТИЧЕСКИЕ ВОРОНКИ ▷</span>
                <span className="mx-8">▷ CRM ИНТЕГРАЦИИ ▷</span>
                <span className="mx-8">▷ ТЕЛЕГРАМ БОТЫ ▷</span>
              </div>
            </div>
            
            {/* Наложение с эффектом бликов */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"></div>
          </div>
          
          {/* Стили для бегущего текста */}
          <style>{`
            @keyframes marquee {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            
            @keyframes marquee-reverse {
              0% {
                transform: translateX(-50%);
              }
              100% {
                transform: translateX(0);
              }
            }
            
            .marquee-container {
              width: 200%;
              animation: marquee 30s linear infinite;
            }
            
            .marquee-container.reverse {
              animation: marquee-reverse 25s linear infinite;
            }
            
            .marquee-content {
              display: inline-flex;
              align-items: center;
            }
            
            /* Кастомный скроллбар */
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
            }
            
            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
              border-radius: 3px;
            }
            
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(0, 0, 0, 0.1);
              border-radius: 3px;
              transition: background 0.2s;
            }
            
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: rgba(0, 0, 0, 0.2);
            }
            
            .dark .custom-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(255, 255, 255, 0.1);
            }
            
            .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: rgba(255, 255, 255, 0.2);
            }
            
            .custom-scrollbar {
              scrollbar-width: thin;
              scrollbar-color: rgba(0, 0, 0, 0.1) transparent;
            }
            
            .dark .custom-scrollbar {
              scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
            }
          `}</style>
        </section>

        {/* Наши решения - Services Grid */}
<section id="solutions" className="mb-24 px-6 max-w-7xl mx-auto">
  <div className="mb-16 animate-in fade-in slide-in-from-left-5 duration-500">
    <div className="flex items-center gap-3 mb-4">
      <div className="h-px w-12 bg-primary"></div>
      <h2 className="text-3xl md:text-4xl font-bold">Наши решения</h2>
    </div>
    <p className="text-muted-foreground text-lg max-w-3xl">
      Комплексные услуги для полной автоматизации бизнес-процессов. 
      Каждое решение — это готовый инструмент для роста вашей компании.
    </p>
  </div>

  {/* Фильтры по направлениям */}
  <div className="mb-10 animate-in fade-in slide-in-from-left-5 duration-700">
    <div className="flex flex-wrap gap-3 mb-6">
      {/* Подсчет количества услуг в каждой категории */}
      {(() => {
        const counts = {
          all: services.length,
          telegram: services.filter(s => getServiceTag(s.name) === 'telegram').length,
          crm: services.filter(s => getServiceTag(s.name) === 'crm').length,
          automation: services.filter(s => getServiceTag(s.name) === 'automation').length,
          analytics: services.filter(s => getServiceTag(s.name) === 'analytics').length,
          ai: services.filter(s => getServiceTag(s.name) === 'ai').length,
          marketing: services.filter(s => getServiceTag(s.name) === 'marketing').length,
          other: services.filter(s => getServiceTag(s.name) === 'other').length,
        };

        return [
          { id: 'all', label: 'Все решения', icon: Package, count: counts.all },
          { id: 'telegram', label: 'Telegram-боты', icon: MessageSquare, count: counts.telegram },
          { id: 'crm', label: 'CRM системы', icon: Database, count: counts.crm },
          { id: 'automation', label: 'Автоматизация', icon: Workflow, count: counts.automation },
          { id: 'analytics', label: 'Аналитика', icon: BarChart3, count: counts.analytics },
          { id: 'ai', label: 'AI решения', icon: Bot, count: counts.ai },
          { id: 'marketing', label: 'Маркетинг', icon: TrendingUp, count: counts.marketing },
          { id: 'other', label: 'Другое', icon: Wrench, count: counts.other },
        ].map((tag) => {
          const Icon = tag.icon;
          const isActive = activeFilter === tag.id;
          return (
            <button
              key={tag.id}
              onClick={() => handleFilterChange(tag.id)}
              className={cn(
                "group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-300 ease-out",
                "hover:shadow-md hover:-translate-y-0.5 active:translate-y-0",
                isActive 
                  ? "bg-primary text-primary-foreground border-primary shadow-md" 
                  : "bg-card hover:bg-card/80 border-border hover:border-primary/30",
                tag.count === 0 && "opacity-50 cursor-not-allowed hover:translate-y-0 hover:shadow-none"
              )}
              disabled={tag.count === 0}
            >
              <Icon className={cn(
                "w-4 h-4 transition-all duration-300 flex-shrink-0",
                isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary"
              )} />
              <span className="font-medium text-sm whitespace-nowrap">{tag.label}</span>
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full transition-all duration-300 min-w-[24px] text-center",
                isActive 
                  ? "bg-white/20 text-white" 
                  : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
              )}>
                {tag.count}
              </span>
            </button>
          );
        });
      })()}
    </div>
    
    {/* Индикатор активного фильтра */}
    {activeFilter !== 'all' && (
      <div className="flex items-center justify-between animate-in fade-in slide-in-from-top-5 duration-500">
        <button
          onClick={() => handleFilterChange('all')}
          className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1 hover:gap-2 transition-all duration-300"
        >
          <span>Сбросить фильтр</span>
          <X className="w-3 h-3" />
        </button>
      </div>
    )}
  </div>

  {/* Сетка услуг */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {filteredServices.map((service, index) => {
      const Icon = service.icon;
      const serviceTag = getServiceTag(service.name);
      
      return (
        <div
          key={service.name}
          onClick={() => handleServiceClick(service)}
          className={cn(
            "group relative overflow-hidden bg-gradient-to-br from-white to-white/95 dark:from-gray-900 dark:to-gray-900/95",
            "rounded-2xl border border-gray-100 dark:border-gray-800 p-6",
            "transition-all duration-500 ease-out cursor-pointer",
            "hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] active:scale-100",
            "hover:border-primary/30 dark:hover:border-primary/30",
            "animate-in fade-in zoom-in-95"
          )}
          style={{
            animationDelay: `${index * 50}ms`,
            animationFillMode: 'both'
          }}
        >
          {/* Эффект свечения при наведении */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
          
          {/* Акцентная линия сверху */}
          <div className={cn(
            "absolute top-0 left-0 right-0 h-1 rounded-t-2xl",
            "bg-gradient-to-r from-transparent via-primary to-transparent",
            "opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          )}></div>
          
          {/* Тег услуги */}
          <div className="absolute top-3 right-3 z-10">
            <div className={cn(
              "text-xs font-semibold px-3 py-1 rounded-full border backdrop-blur-sm",
              "transition-all duration-300 group-hover:scale-105",
              getTagColor(serviceTag)
            )}>
              {getTagLabel(serviceTag)}
            </div>
          </div>
          
          <div className="flex flex-col h-full relative z-10">
            {/* Иконка услуги */}
            <div className={cn(
              "w-16 h-16 rounded-2xl mb-5 flex items-center justify-center",
              "transition-all duration-500 ease-out",
              "group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg",
              colorClasses[service.color]
            )}>
              <Icon className={cn(
                "w-8 h-8 transition-all duration-500",
                "group-hover:scale-110",
                iconColorClasses[service.color]
              )} />
            </div>
            
            {/* Заголовок и описание */}
            <div className="mb-5">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300 pr-12 line-clamp-2">
                {service.name}
              </h3>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                {service.description}
              </p>
            </div>
            
            {/* Проблема и результат */}
            <div className="mt-auto space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                <div className="text-xs font-medium text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors duration-300">
                  Решаем: {service.problem}
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                <div className={cn(
                  "text-xs font-semibold",
                  "text-primary group-hover:text-primary/80 dark:group-hover:text-primary/90",
                  "transition-colors duration-300"
                )}>
                  Результат: {service.benefit}
                </div>
              </div>
            </div>
            
            {/* Индикатор кликабельности */}
            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 group-hover:border-primary/20 transition-colors duration-300">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors duration-300">
                  Узнать подробнее
                </span>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  "bg-gray-100 dark:bg-gray-800 group-hover:bg-primary/10",
                  "transition-all duration-300 group-hover:translate-x-1"
                )}>
                  <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-primary transition-colors duration-300" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Эффект при клике */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none">
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-active:opacity-100 transition-opacity duration-200 rounded-2xl"></div>
          </div>
        </div>
      );
    })}
  </div>
</section>

        {/* Модальное окно */}
        {selectedService && (
          <ServiceModal
            service={selectedService}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        )}

        {/* Industries Section */}
        <section id="industries" className="mb-24 bg-gradient-to-b from-muted/30 to-transparent py-16">
          <div className="px-6 max-w-7xl mx-auto">
            <div className="mb-12 animate-in fade-in slide-in-from-right-5 duration-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-primary"></div>
                <h2 className="text-3xl md:text-4xl font-bold">Решения по отраслям</h2>
              </div>
              <p className="text-muted-foreground text-lg">
                Готовые сценарии автоматизации для конкретных видов бизнеса
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industries.map((industry, index) => {
                const Icon = industry.icon;
                return (
                  <div 
                    key={index} 
                    className="bg-card rounded-xl border p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-in fade-in"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-all duration-500">
                        <Icon className="w-7 h-7 text-primary group-hover:rotate-12 transition-transform duration-500" />
                      </div>
                      <h3 className="text-lg font-bold">{industry.name}</h3>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      {industry.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3 group">
                          <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 group-hover:scale-150 transition-transform duration-300" />
                          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full gap-2 text-primary hover:text-primary hover:bg-primary/5 transition-all duration-300 hover:scale-105 active:scale-95"
                      asChild
                    >
                      <Link to="/contacts">
                        <span>Обсудить проект</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 text-center animate-in fade-in slide-in-from-bottom-5 duration-700">
              <div className="inline-block p-8 bg-card rounded-xl border max-w-2xl hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
                <h3 className="text-xl font-bold mb-3">Не нашли свою отрасль?</h3>
                <p className="text-muted-foreground mb-6">
                  Мы создаём индивидуальные решения под любой бизнес. 
                  Свяжитесь с нами для обсуждения ваших специфических задач.
                </p>
                <Button 
                  asChild
                  className="hover:scale-105 active:scale-95 transition-transform"
                >
                  <Link to="/contacts">
                    Обсудить индивидуальный проект
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="mb-24 px-6 max-w-7xl mx-auto">
          <div className="mb-12 animate-in fade-in slide-in-from-left-5 duration-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-primary"></div>
              <h2 className="text-3xl md:text-4xl font-bold">Как мы работаем</h2>
            </div>
            <p className="text-muted-foreground text-lg">
              Чёткий процесс от заявки до результата
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div 
                key={index} 
                className="relative group animate-in fade-in slide-in-from-bottom-5 duration-500"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: 'both'
                }}
              >
                <div className="bg-card rounded-xl border p-8 h-full hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2">
                  <div className="text-4xl font-bold text-primary/20 mb-4 group-hover:text-primary/30 transition-colors duration-500">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors duration-500">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                    {step.description}
                  </p>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 w-6 h-0.5 bg-border transform -translate-y-1/2 translate-x-3 group-hover:bg-primary/50 transition-colors duration-500" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Guarantee Section */}
        <section id="guarantee" className="mb-24 px-6 max-w-7xl mx-auto">
          <div className="bg-card border rounded-2xl p-12 hover:shadow-xl transition-all duration-500 animate-in fade-in duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-6 h-6 text-primary animate-pulse" />
                  <h2 className="text-3xl font-bold">Гарантии и поддержка</h2>
                </div>
                <p className="text-muted-foreground mb-8 text-lg">
                  Мы сопровождаем каждый проект от начала до полного внедрения 
                  и обеспечиваем постоянную поддержку после запуска.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-500">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                        Персональный менеджер проекта
                      </h3>
                      <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        Единая точка контакта для решения всех вопросов
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-500">
                      <BarChart className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                        Регулярная отчётность
                      </h3>
                      <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        Прозрачные отчёты о ходе работ и результатах
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/50 rounded-xl p-8 hover:shadow-lg transition-all duration-500 group">
                <h3 className="text-xl font-bold mb-6 group-hover:text-primary transition-colors duration-300">
                  Что вы получаете
                </h3>
                <div className="space-y-4">
                  {[
                    'Пошаговый план автоматизации под ваш бизнес',
                    'Расчёт ROI и экономического эффекта',
                    'Готовые решения под вашу нишу',
                    'Техническую документацию и инструкции',
                    'Поддержку 24/7 после запуска'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 group/item">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover/item:scale-125 group-hover/item:bg-primary/30 transition-all duration-300">
                        <ChevronRight className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm group-hover/item:text-primary transition-colors duration-300">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section id="cta" className="px-6 max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-primary to-primary/90 rounded-2xl p-12 text-center text-white hover:shadow-2xl transition-all duration-500 animate-in fade-in slide-in-from-bottom-5 duration-1000">
            <h2 className="text-3xl font-bold mb-4">
              Готовы начать автоматизацию?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto text-lg">
              Получите бесплатную консультацию и расчёт стоимости под ваш проект
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 font-semibold hover:scale-105 active:scale-95 transition-transform"
                asChild
              >
                <Link to="/contacts">
                  Получить консультацию
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white/10 font-semibold hover:scale-105 active:scale-95 transition-transform"
                asChild
              >
                <Link to="/cases">
                  Посмотреть кейсы
                </Link>
              </Button>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-sm text-white/60">
                Средний срок внедрения решений — 2–4 недели • Окупаемость — от 1 месяца
              </p>
            </div>
          </div>
        </section>

      </main>
      <PageActions title="Услуги" />
      <Footer />
    </div>
  );
};

export default Services;