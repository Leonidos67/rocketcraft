import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageActions from '@/components/PageActions';
import PageLoader from '@/components/PageLoader';
import { Button } from '@/components/ui/button';
import { Search, ClipboardList, Settings, CheckCircle, Rocket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    number: '01',
    title: 'Диагностика',
    description: 'Изучаем ваш бизнес, задачи, текущие процессы и точки боли.',
    result: 'Понимание, что именно нужно автоматизировать и какие решения дадут максимальный эффект.',
    icon: Search,
    case: '+40% записей выявлено на этапе анализа',
  },
  {
    number: '02',
    title: 'Планирование решения',
    description: 'Выбираем шаблоны, настраиваем бота, CRM и интеграции.',
    result: 'Готовый план, который вы видите и утверждаете перед началом работ.',
    icon: ClipboardList,
    case: 'План готов за 24 часа',
  },
  {
    number: '03',
    title: 'Сборка и настройка',
    description: 'Подключаем Telegram-бот, CRM, рассылки и интеграции.',
    result: 'Система готова к тестированию, все процессы настроены и работают.',
    icon: Settings,
    case: 'Настройка за 12-24 часа',
  },
  {
    number: '04',
    title: 'Тестирование',
    description: 'Проверяем работу бота, уведомлений, CRM и корректность интеграций.',
    result: 'Вы видите, как система работает. Исправляем баги и дорабатываем детали.',
    icon: CheckCircle,
    case: 'Нулевые баги после запуска',
  },
  {
    number: '05',
    title: 'Запуск и сопровождение',
    description: 'Запускаем систему для реальных клиентов, подключаем аналитику.',
    result: 'Всё работает "из коробки". Вы получаете отчёты и можете подключить поддержку.',
    icon: Rocket,
    case: 'Поддержка 24/7',
  },
];

const Process = () => {
  return (
    <div className="min-h-screen">
      <PageLoader />
      <Header />
      <main className="pt-32 pb-20">
          <div className="px-6 md:px-16 lg:px-32 xl:px-48">
            {/* Логотипы компаний */}
            <div className="mb-8 flex justify-center">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <img 
                  src="https://i.ibb.co/81CJgRy/image.png" 
                  alt="Company 1" 
                  className="h-12 md:h-16 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all"
                />
                <img 
                  src="https://i.ibb.co/GNVtYYM/image.png" 
                  alt="Company 2" 
                  className="h-16 md:h-24 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all"
                />
                <img 
                  src="https://i.ibb.co/v6Vt6Lcc/image.png" 
                  alt="Company 3" 
                  className="h-22 md:h-32 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all"
                />
                <img 
                  src="https://i.ibb.co/3m7BZwTd/image.png" 
                  alt="Company 4" 
                  className="h-16 md:h-24 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all"
                />
                <img 
                  src="https://i.ibb.co/XfHy6K7X/image.png" 
                  alt="Company 5" 
                  className="h-12 md:h-16 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all"
                />
              </div>
            </div>

            {/* Вступление */}
            <div className="mb-20">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Как мы автоматизируем ваш бизнес за 48 часов
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                От первой консультации до готовой системы — всё прозрачно, быстро и без лишних усилий.
              </p>
            </div>

            {/* Timeline Steps */}
            <div className="space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
                const isLast = index === steps.length - 1;
                
              return (
                  <div key={index} className="relative">
                    {/* Connecting Line */}
                    {!isLast && (
                      <div className="absolute left-8 top-20 bottom-0 w-px bg-border hidden md:block" />
                    )}
                    
                    <div className="group p-8 bg-card rounded-xl border border-border hover:shadow-lg transition-all relative">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Icon and Number */}
                        <div className="flex-shrink-0">
                          <div className="relative">
                            <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary transition-colors">
                              <Icon className="w-8 h-8 text-foreground group-hover:text-primary-foreground transition-colors" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                              {step.number}
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-4">
                          <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                              {step.title}
                            </h2>
                            <p className="text-muted-foreground text-lg">
                              {step.description}
                            </p>
                          </div>

                          {/* Result */}
                          <div className="p-4 bg-secondary rounded-lg border border-border">
                            <h3 className="text-sm font-semibold text-foreground mb-2">
                              Результат для вас:
                            </h3>
                            <p className="text-muted-foreground">
                              {step.result}
                            </p>
                          </div>

                          {/* Mini Case */}
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/30">
                            <span className="text-sm font-medium text-primary">
                              {step.case}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              );
            })}
          </div>

            {/* CTA Section */}
            <div className="mt-20 p-12 bg-card rounded-2xl border border-border text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Хотите такую же автоматизацию для своего бизнеса?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Оставьте заявку — мы покажем демо за 2 минуты и обсудим ваш проект.
              </p>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 h-auto"
                asChild
              >
                <Link to="/contacts">
                  Оставить заявку
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
        <PageActions title="Процесс работы" />
    </div>
  );
};

export default Process;
