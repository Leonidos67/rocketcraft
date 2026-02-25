import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PageLoader from '@/components/PageLoader';
import Banner from '@/components/Banner';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, Search, AlertCircle, RefreshCw, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

const NotFound = () => {
  const location = useLocation();
  const [isAnimating, setIsAnimating] = useState(true);
  const [particles, setParticles] = useState<Array<{x: number, y: number, size: number, speed: number}>>([]);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    
    // Создаем частицы для анимации
    const newParticles = Array.from({ length: 30 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 2 + 1
    }));
    setParticles(newParticles);
    
    // Запускаем анимацию
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Популярные страницы
  const popularPages = [
    { title: "Главная", path: "/", icon: Home },
    { title: "Услуги", path: "/services", icon: Search },
    { title: "Процесс", path: "/process", icon: RefreshCw },
    { title: "Контакты", path: "/contacts", icon: Compass },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background via-background/95 to-background/90">
      <Banner />
      <PageLoader />
      
      {/* Анимированные частицы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, index) => (
          <div
            key={index}
            className="absolute rounded-full bg-primary/10 animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animation: `float ${3 + particle.speed}s ease-in-out infinite`,
              animationDelay: `${index * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-primary/5 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-primary/5 to-transparent rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

      <main className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-16">
            {/* Анимированный номер ошибки */}
            <div className={cn(
              "relative mb-8 inline-block",
              isAnimating && "animate-pulse"
            )}>
              <div className="text-[180px] md:text-[240px] font-bold tracking-tighter">
                <span className="bg-gradient-to-br from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  4
                </span>
                <span className="bg-gradient-to-br from-primary/80 via-primary/60 to-primary/40 bg-clip-text text-transparent animate-bounce inline-block">
                  0
                </span>
                <span className="bg-gradient-to-br from-primary/60 via-primary/40 to-primary/20 bg-clip-text text-transparent">
                  4
                </span>
              </div>
              
              {/* Вращающийся значок ошибки */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className={cn(
                  "w-32 h-32 rounded-full bg-gradient-to-br from-destructive/20 to-destructive/5 flex items-center justify-center",
                  isAnimating && "animate-spin-slow"
                )}>
                  <AlertCircle className="w-20 h-20 text-destructive" />
                </div>
              </div>
            </div>

            {/* Заголовок */}
            <div className="space-y-6 mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="block mb-2">Страница не найдена</span>
                <span className="text-lg md:text-xl font-normal text-muted-foreground">
                  Но не расстраивайтесь — у нас много других интересных страниц!
                </span>
              </h1>
              
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                Вы пытались перейти на: 
                <span className="block font-mono text-foreground bg-muted px-3 py-1 rounded-lg mt-2 inline-block">
                  {location.pathname}
                </span>
              </p>
            </div>

            {/* Кнопки действий */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                size="lg"
                className="gap-3 px-8 py-6 h-auto rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                asChild
              >
                <Link to="/">
                  <Home className="w-5 h-5" />
                  На главную
                </Link>
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="gap-3 px-8 py-6 h-auto rounded-xl border-2 hover:border-primary/50 transform hover:-translate-y-1 transition-all duration-300"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="w-5 h-5" />
                Вернуться назад
              </Button>
            </div>

            {/* Дополнительная информация */}
            <div className="mt-16 pt-8 border-t border-border/50">
              <div className="inline-flex flex-col sm:flex-row items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>Статус: Страница не найдена</span>
                </div>
                <div className="hidden sm:block h-4 w-px bg-border" />
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span>Путь: {location.pathname}</span>
                </div>
                <div className="hidden sm:block h-4 w-px bg-border" />
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span>Время: {new Date().toLocaleTimeString('ru-RU')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Юморная секция */}
          <div className="mt-20 p-8 bg-gradient-to-r from-muted/30 to-muted/10 rounded-2xl border border-border/50 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">😅</span>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-lg font-semibold mb-2">Наша команда уже тут!</h3>
                <p className="text-muted-foreground">
                  Если вы уверены, что здесь должно быть что-то важное — 
                  <Link to="/contacts" className="text-primary hover:text-primary/80 font-medium ml-1">
                    напишите нам
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* CSS анимации */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          33% {
            transform: translateY(-20px) translateX(10px);
          }
          66% {
            transform: translateY(10px) translateX(-10px);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound;