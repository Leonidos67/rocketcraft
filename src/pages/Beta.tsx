import { useState, useEffect } from 'react';
import { 
  MessageSquare, Database, Workflow, Link2, Bot, 
  TrendingUp, BarChart3, ChevronRight, ArrowRight,
  Check, Zap, Shield, Users, Clock, Sparkles
} from 'lucide-react';
import Footer from '@/components/Footer';
import PageActions from '@/components/PageActions';
import PageLoader from '@/components/PageLoader';
import Banner from '@/components/Banner';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Home = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      icon: MessageSquare,
      title: 'Telegram-боты',
      description: 'Автоматизация общения с клиентами 24/7',
      stats: 'Конверсия +30%',
      color: 'blue',
      link: '/services#telegram'
    },
    {
      icon: Database,
      title: 'CRM-системы',
      description: 'Учёт клиентов и управление продажами',
      stats: 'Продажи +40%',
      color: 'purple',
      link: '/services#crm'
    },
    {
      icon: Workflow,
      title: 'Автоматизация',
      description: 'Избавление от рутины и ошибок',
      stats: '-20 часов/неделя',
      color: 'green',
      link: '/services#automation'
    },
    {
      icon: Bot,
      title: 'AI-решения',
      description: 'Искусственный интеллект для бизнеса',
      stats: 'Эффективность ×3',
      color: 'violet',
      link: '/services#ai'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Аудит и план',
      description: 'Анализируем процессы и составляем план автоматизации'
    },
    {
      number: '02',
      title: 'Разработка',
      description: 'Создаём и настраиваем решения под ваши задачи'
    },
    {
      number: '03',
      title: 'Запуск за 48ч',
      description: 'Быстрый запуск и обучение вашей команды'
    },
    {
      number: '04',
      title: 'Результаты',
      description: 'Вы получаете работающую систему и первые результаты'
    }
  ];

  const benefits = [
    { icon: Clock, text: 'Запуск за 48 часов' },
    { icon: Shield, text: 'Гарантия 6 месяцев' },
    { icon: Users, text: 'Обучение команды' },
    { icon: Zap, text: 'Поддержка 24/7' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Banner />
      <PageLoader />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-in fade-in slide-in-from-top-5 duration-700">
              <Sparkles className="w-4 h-4" />
              <span>Тренд 2026: Кастомизированные ИИ-автоматизации. Мы в тренде.</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-top-5 duration-900">
              <span className="block">Автоматизируем ваш</span>
              <span className="block text-primary">бизнес, который продаёт</span>
              <span className="block">пока вы отдыхаете</span>
            </h1>
            
            {/* Description */}
            <p className="text-xl text-muted-foreground max-w-2xl mb-10 animate-in fade-in slide-in-from-top-5 duration-1100">
              Telegram-боты, CRM, интеграции и AI решения под ключ. 
              Увеличьте поток клиентов и упростите процессы за 48 часов.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-in fade-in slide-in-from-top-5 duration-1300">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 hover:scale-105 active:scale-95 transition-transform"
                asChild
              >
                <Link to="/contacts">
                  <span className="font-semibold">Заказать автоматизацию</span>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 hover:scale-105 active:scale-95 transition-transform"
                asChild
              >
                <Link to="/services">
                  <span>Смотреть услуги</span>
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
            
            {/* Benefits */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl animate-in fade-in slide-in-from-bottom-5 duration-1500">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div 
                    key={index}
                    className="flex items-center gap-3 bg-card border rounded-xl p-4 hover:border-primary/50 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium">{benefit.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-in fade-in duration-700">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Что мы предлагаем</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Комплексные решения для автоматизации вашего бизнеса
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="group bg-card border rounded-2xl p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 animate-in fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className={cn(
                    "w-16 h-16 rounded-xl flex items-center justify-center mb-6",
                    `bg-${service.color}-500/10 text-${service.color}-600`
                  )}>
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-primary">
                      {service.stats}
                    </div>
                    <Link 
                      to={service.link}
                      className="text-primary hover:text-primary/80 flex items-center gap-1 group-hover:gap-2 transition-all duration-300"
                    >
                      <span className="text-sm font-medium">Подробнее</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="text-center animate-in fade-in slide-in-from-bottom-5 duration-1000">
            <Button 
              size="lg" 
              variant="outline"
              className="hover:scale-105 active:scale-95 transition-transform"
              asChild
            >
              <Link to="/services">
                <span>Смотреть все услуги и цены</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-in fade-in slide-in-from-left-5 duration-700">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Запуск автоматизации
                <span className="text-primary block">за 48 часов</span>
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8">
                Быстрый результат без долгого ожидания. Мы работаем по чёткому процессу 
                и гарантируем запуск вашей автоматизации в течение 2 дней.
              </p>
              
              <div className="space-y-6">
                {[
                  'Бесплатный аудит бизнес-процессов',
                  'Пошаговый план автоматизации',
                  'Подбор оптимальных инструментов',
                  'Гарантия результата'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                size="lg" 
                className="mt-8 hover:scale-105 active:scale-95 transition-transform"
                asChild
              >
                <Link to="/contacts">
                  <span>Получить бесплатный аудит</span>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
            
            <div className="space-y-6 animate-in fade-in slide-in-from-right-5 duration-1000">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className="group relative bg-card border rounded-2xl p-8 hover:border-primary/50 hover:shadow-lg transition-all duration-500"
                >
                  <div className="absolute -left-4 top-8 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                    {step.number}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                  
                  {index < 3 && (
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-0.5 h-6 bg-border"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-primary to-primary/90 rounded-3xl p-12 text-center text-white">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
                💰 Прозрачное ценообразование
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Узнайте стоимость автоматизации
                <span className="block text-white/90">вашего бизнеса</span>
              </h2>
              
              <p className="text-xl text-white/80 mb-8">
                Отправьте заявку и получите расчёт стоимости в течение 2 часов. 
                Без обязательств, только цифры.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                  <div className="text-3xl font-bold mb-2">от 25 000 ₽</div>
                  <div className="text-white/70">За готовое решение</div>
                </div>
                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                  <div className="text-3xl font-bold mb-2">от 85 000 ₽</div>
                  <div className="text-white/70">За комплекс под ключ</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="bg-white text-primary hover:bg-white/90 font-semibold hover:scale-105 active:scale-95 transition-transform"
                  asChild
                >
                  <Link to="/contacts">
                    <span>Узнать точную стоимость</span>
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 font-semibold hover:scale-105 active:scale-95 transition-transform"
                  asChild
                >
                  <Link to="/services">
                    <span>Смотреть все услуги</span>
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-sm text-white/60">
                  Средний срок окупаемости — 1 месяц • Гарантия на работы — 6 месяцев
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Начните автоматизацию
              <span className="text-primary block">уже сегодня</span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Запустите свой первый бот за 48 часов и увидите результаты 
              уже на следующей неделе
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 hover:scale-105 active:scale-95 transition-transform"
                asChild
              >
                <Link to="/contacts">
                  <span className="font-semibold">Начать бесплатно</span>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 hover:scale-105 active:scale-95 transition-transform"
                asChild
              >
                <Link to="/services">
                  <span>Смотреть услуги</span>
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Успешных проектов</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">48ч</div>
                <div className="text-sm text-muted-foreground">Средний срок запуска</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">95%</div>
                <div className="text-sm text-muted-foreground">Довольных клиентов</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">6 мес</div>
                <div className="text-sm text-muted-foreground">Гарантия на работы</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <PageActions title="Главная" />
    </div>
  );
};

export default Home;