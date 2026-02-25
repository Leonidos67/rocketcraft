import { useState } from 'react';
import { MessageSquare, Database, Workflow, Link2, Building, LayoutDashboard, Sparkles, Stethoscope, Cpu, Smartphone, Bot, TrendingUp, BarChart3, GraduationCap, Wrench, Coffee, Scissors, Dumbbell, ShoppingBag, BookOpen, Briefcase, LayoutGrid, ChevronDown, Zap, Globe, Megaphone, Target, LifeBuoy, Headphones, FileText, Users, UserCheck, Clock, ClipboardList, Award, FileBarChart, Brain } from 'lucide-react';

interface Service {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface Industry {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
}

// Основные услуги
const coreServices: Service[] = [
  {
    name: 'Telegram-боты для бизнеса',
    icon: MessageSquare,
    description: 'Приём заказов, бронирование, ответы на частые вопросы, уведомления и программы лояльности — всё через Telegram.',
  },
  {
    name: 'CRM-системы',
    icon: Database,
    description: 'Кастомные CRM на базе no-code платформ: лиды, сделки, отчёты и аналитика — всё в одном месте, без сложных интерфейсов.',
  },
  {
    name: 'Автоматизация процессов',
    icon: Workflow,
    description: 'Настраиваем автосценарии для заявок, уведомлений, отчётов и распределения задач. Экономия времени — до 70% ручной работы.',
  },
  {
    name: 'Воронки продаж и лидогенерация',
    icon: TrendingUp,
    description: 'Создаём автоматические воронки, которые собирают лиды, утепляют клиентов и ведут их к покупке без участия менеджера.',
  },
  {
    name: 'AI-маркетинг и персонализация',
    icon: Sparkles,
    description: 'Используем нейросети для анализа поведения клиентов и автоматического подбора предложений, текстов и акций.',
  },
  {
    name: 'Панель управления бизнесом',
    icon: LayoutDashboard,
    description: 'Создаём дашборды с ключевыми метриками: продажи, заявки, клиенты. Управляйте бизнесом через одну страницу.',
  },
  {
    name: 'Бизнес-процессы под ключ',
    icon: Briefcase,
    description: 'Полная цифровизация отделов продаж, маркетинга или сервиса. От анализа до внедрения с нуля под ваш бизнес.',
  },
  {
    name: 'Маркетинговая автоматизация',
    icon: Megaphone,
    description: 'Интеграции с рекламой, сбор лидов, ретаргетинг, автоворонки и рассылки — чтобы каждая заявка стоила дешевле.',
  },
];

// Интеграции и коммуникации
const integrationServices: Service[] = [
  {
    name: 'Интеграции сервисов',
    icon: Link2,
    description: 'Связываем Telegram, Google Sheets, Notion, Tilda, Airtable, Make (Integromat), GPT, amoCRM и другие платформы.',
  },
  {
    name: 'Мультиплатформенные мессенджеры',
    icon: Smartphone,
    description: 'Автоматизация WhatsApp, Telegram, Instagram и VK для приёма заказов, уведомлений и поддержки клиентов.',
  },
  {
    name: 'API и веб-хуки',
    icon: Globe,
    description: 'Настройка обмена данными между вашими системами в реальном времени через API и webhooks.',
  },
  {
    name: 'Синхронизация данных',
    icon: Zap,
    description: 'Автоматическая синхронизация данных между CRM, таблицами, складом и финансовыми системами.',
  },
];

// AI и аналитика
const aiAnalyticsServices: Service[] = [
  {
    name: 'AI-ассистенты и чат-боты',
    icon: Bot,
    description: 'Интеллектуальные боты на базе ChatGPT и других моделей для общения с клиентами и автоматизации рутинных задач.',
  },
  {
    name: 'AI-аналитика и отчётность',
    icon: BarChart3,
    description: 'Дашборды и отчёты с автоматической обработкой данных и рекомендациями на основе AI.',
  },
  {
    name: 'Персонализация и сегментация клиентов',
    icon: Target,
    description: 'AI-анализ поведения клиентов, построение сегментов и персонализированные предложения.',
  },
  {
    name: 'Распознавание и обработка данных',
    icon: Cpu,
    description: 'Используем нейросети для анализа изображений, документов и сообщений для ускорения бизнес-процессов.',
  },
];

// Поддержка и развитие
const supportServices: Service[] = [
  {
    name: 'Обучение и сопровождение',
    icon: GraduationCap,
    description: 'Пошаговое обучение вашей команды, видео-гайды, документация и техническая поддержка 24/7.',
  },
  {
    name: 'Техническая поддержка',
    icon: Headphones,
    description: 'Круглосуточная техподдержка, мониторинг систем, обновления и устранение ошибок в реальном времени.',
  },
  {
    name: 'Консалтинг и аудит',
    icon: FileText,
    description: 'Оценим текущие процессы, предложим стратегию оптимизации и автоматизации вашего бизнеса.',
  },
  {
    name: 'Индивидуальные решения под ключ',
    icon: Wrench,
    description: 'Разработка уникальных решений под конкретные задачи и отрасли, полный цикл от идеи до внедрения.',
  },
];

// Контроль за сотрудниками
const employeeControlServices: Service[] = [
  {
    name: 'Контроль за сотрудниками',
    icon: UserCheck,
    description: 'Системы для отслеживания активности, учёта задач и повышения эффективности работы персонала.',
  },
  {
    name: 'Учёт рабочего времени',
    icon: Clock,
    description: 'Автоматический трекинг времени: начало/окончание смен, перерывы, отчёты по продуктивности и KPI.',
  },
  {
    name: 'CRM-действия сотрудников',
    icon: ClipboardList,
    description: 'Фиксация действий в CRM: звонки, заявки, закрытые сделки, отчётность по каждому менеджеру или администратору.',
  },
  {
    name: 'Система мотивации и рейтингов',
    icon: Award,
    description: 'Встроенные рейтинги, бонусы и автоматические напоминания — геймификация для повышения вовлечённости.',
  },
  {
    name: 'Автоматическая отчётность',
    icon: FileBarChart,
    description: 'Ежедневные и еженедельные отчёты о результатах сотрудников прямо в Telegram или на дашборде руководителя.',
  },
  {
    name: 'AI-мониторинг и прогноз эффективности',
    icon: Brain,
    description: 'Искусственный интеллект анализирует активность и помогает предсказать, кто снижает темп работы или может "выгореть".',
  },
];

// Все услуги вместе
const allServices: Service[] = [
  ...coreServices,
  ...integrationServices,
  ...aiAnalyticsServices,
  ...supportServices,
  ...employeeControlServices,
];

const industries: Industry[] = [
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
  {
    name: 'Для клиник и стоматологий',
    icon: Stethoscope,
    features: ['Онлайн-запись', 'Напоминания', 'История пациентов', 'Обратная связь'],
  },
  {
    name: 'Для агентств недвижимости',
    icon: Building,
    features: ['CRM для сделок', 'Распределение лидов', 'Автоматические уведомления', 'Каталог объектов'],
  },
  {
    name: 'Для образовательных центров',
    icon: GraduationCap,
    features: ['Учёт студентов', 'Расписание занятий', 'Уведомления', 'CRM и отчёты'],
  },
];


interface FullscreenServicesMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const FullscreenServicesMenu = ({ isOpen, onClose }: FullscreenServicesMenuProps) => {
  const [activeTab, setActiveTab] = useState<'all' | 'core' | 'integration' | 'ai' | 'support' | 'employee' | 'industries'>('all');
  const [showAllIndustries, setShowAllIndustries] = useState(false);
  const [showAllCore, setShowAllCore] = useState(false);
  const [showAllIntegration, setShowAllIntegration] = useState(false);
  const [showAllAI, setShowAllAI] = useState(false);
  const [showAllSupport, setShowAllSupport] = useState(false);
  const [showAllEmployee, setShowAllEmployee] = useState(false);

  if (!isOpen) return null;

  const tabs = [
    { id: 'all' as const, label: 'Все услуги', icon: LayoutGrid },
    { id: 'core' as const, label: 'Основные услуги', icon: Zap },
    { id: 'integration' as const, label: 'Интеграции и коммуникации', icon: Link2 },
    { id: 'ai' as const, label: 'AI и аналитика', icon: Bot },
    { id: 'support' as const, label: 'Поддержка и развитие', icon: LifeBuoy },
    { id: 'employee' as const, label: 'Контроль за сотрудниками', icon: UserCheck },
    { id: 'industries' as const, label: 'Решения по отраслям', icon: ShoppingBag },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-sm flex overflow-hidden">
      {/* Левая панель - Навигация */}
      <div className="w-64 border-r border-border bg-card flex-shrink-0 overflow-y-auto hide-scrollbar h-full">
        <div className="p-6">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
          <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                    isActive
                      ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                      : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{tab.label}</span>
          </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Правая панель - Контент */}
      <div className="flex-1 bg-background overflow-y-auto hide-scrollbar h-full">
        {/* Контент Все услуги */}
        {activeTab === 'all' && (
          <div>
            {/* Основные услуги */}
            <div className="px-8 md:px-12 lg:px-16 pt-8 pb-16">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-2">Основные услуги</h2>
                  <p className="text-lg text-muted-foreground">
                    Ключевые решения для автоматизации бизнеса
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {coreServices.slice(0, showAllCore ? coreServices.length : 4).map((service, index) => {
                    const Icon = service.icon;
                    return (
                      <div
                        key={index}
                        className="group p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                      >
                        <div className="flex flex-col items-center text-center mb-3">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300 ease-in-out">
                            <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300 ease-in-out" />
                          </div>
                          <h3 className="text-base font-bold text-foreground mb-2 truncate max-w-full">{service.name}</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Кнопка "Показать еще/Скрыть" */}
                  {coreServices.length > 4 && (
                    <button
                      onClick={() => setShowAllCore(!showAllCore)}
                      className="col-span-full py-2 hover:bg-secondary/50 rounded-xl border-2 border-dashed border-border hover:border-primary transition-all flex items-center justify-center"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <ChevronDown className={`w-4 h-4 text-primary-foreground transition-transform ${showAllCore ? 'rotate-180' : ''}`} />
                        </div>
                        <span className="text-base font-semibold text-foreground">
                          {showAllCore ? 'Скрыть' : 'Показать еще'}
                        </span>
                      </div>
                    </button>
                  )}
                </div>
            </div>

            {/* Разделитель */}
            <div className="w-full border-t border-border"></div>

            {/* Интеграции и коммуникации */}
            <div className="px-8 md:px-12 lg:px-16 pt-12 pb-16">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-2">Интеграции и коммуникации</h2>
                  <p className="text-lg text-muted-foreground">
                    Связь всех систем в единую экосистему
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {integrationServices.slice(0, showAllIntegration ? integrationServices.length : 4).map((service, index) => {
                    const Icon = service.icon;
                    return (
                      <div
                        key={index}
                        className="group p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                      >
                        <div className="flex flex-col items-center text-center mb-3">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300 ease-in-out">
                            <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300 ease-in-out" />
                          </div>
                          <h3 className="text-base font-bold text-foreground mb-2 truncate max-w-full">{service.name}</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Кнопка "Показать еще/Скрыть" */}
                  {integrationServices.length > 4 && (
                    <button
                      onClick={() => setShowAllIntegration(!showAllIntegration)}
                      className="col-span-full py-2 hover:bg-secondary/50 rounded-xl border-2 border-dashed border-border hover:border-primary transition-all flex items-center justify-center"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <ChevronDown className={`w-4 h-4 text-black transition-transform ${showAllIntegration ? 'rotate-180' : ''}`} />
                        </div>
                        <span className="text-base font-semibold text-foreground">
                          {showAllIntegration ? 'Скрыть' : 'Показать еще'}
                        </span>
                      </div>
                    </button>
                  )}
                </div>
            </div>

            {/* Разделитель */}
            <div className="w-full border-t border-border"></div>

            {/* AI и аналитика */}
            <div className="px-8 md:px-12 lg:px-16 pt-12 pb-16">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-2">AI и аналитика</h2>
                  <p className="text-lg text-muted-foreground">
                    Умные решения на основе искусственного интеллекта
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {aiAnalyticsServices.slice(0, showAllAI ? aiAnalyticsServices.length : 4).map((service, index) => {
                    const Icon = service.icon;
                    return (
                      <div
                        key={index}
                        className="group p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                      >
                        <div className="flex flex-col items-center text-center mb-3">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300 ease-in-out">
                            <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300 ease-in-out" />
                          </div>
                          <h3 className="text-base font-bold text-foreground mb-2 truncate max-w-full">{service.name}</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Кнопка "Показать еще/Скрыть" */}
                  {aiAnalyticsServices.length > 4 && (
                    <button
                      onClick={() => setShowAllAI(!showAllAI)}
                      className="col-span-full py-2 hover:bg-secondary/50 rounded-xl border-2 border-dashed border-border hover:border-primary transition-all flex items-center justify-center"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <ChevronDown className={`w-4 h-4 text-black transition-transform ${showAllAI ? 'rotate-180' : ''}`} />
                        </div>
                        <span className="text-base font-semibold text-foreground">
                          {showAllAI ? 'Скрыть' : 'Показать еще'}
                        </span>
                      </div>
                    </button>
                  )}
                </div>
            </div>

            {/* Разделитель */}
            <div className="w-full border-t border-border"></div>

            {/* Поддержка и развитие */}
            <div className="px-8 md:px-12 lg:px-16 pt-12 pb-16">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-2">Поддержка и развитие</h2>
                  <p className="text-lg text-muted-foreground">
                    Обучение, консалтинг и техническое сопровождение
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {supportServices.slice(0, showAllSupport ? supportServices.length : 4).map((service, index) => {
                    const Icon = service.icon;
                    return (
                      <div
                        key={index}
                        className="group p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                      >
                        <div className="flex flex-col items-center text-center mb-3">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300 ease-in-out">
                            <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300 ease-in-out" />
                          </div>
                          <h3 className="text-base font-bold text-foreground mb-2 truncate max-w-full">{service.name}</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Кнопка "Показать еще/Скрыть" */}
                  {supportServices.length > 4 && (
                    <button
                      onClick={() => setShowAllSupport(!showAllSupport)}
                      className="col-span-full py-2 hover:bg-secondary/50 rounded-xl border-2 border-dashed border-border hover:border-primary transition-all flex items-center justify-center"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <ChevronDown className={`w-4 h-4 text-black transition-transform ${showAllSupport ? 'rotate-180' : ''}`} />
                        </div>
                        <span className="text-base font-semibold text-foreground">
                          {showAllSupport ? 'Скрыть' : 'Показать еще'}
                        </span>
                      </div>
                    </button>
                  )}
                </div>
            </div>

            {/* Разделитель */}
            <div className="w-full border-t border-border"></div>

            {/* Контроль за сотрудниками */}
            <div className="px-8 md:px-12 lg:px-16 pt-12 pb-16">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-2">Контроль за сотрудниками</h2>
                  <p className="text-lg text-muted-foreground">
                    Системы учёта, мотивации и повышения эффективности персонала
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {employeeControlServices.slice(0, showAllEmployee ? employeeControlServices.length : 4).map((service, index) => {
                    const Icon = service.icon;
                    return (
                      <div
                        key={index}
                        className="group p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                      >
                        <div className="flex flex-col items-center text-center mb-3">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300 ease-in-out">
                            <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300 ease-in-out" />
                          </div>
                          <h3 className="text-base font-bold text-foreground mb-2 truncate max-w-full">{service.name}</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Кнопка "Показать еще/Скрыть" */}
                  {employeeControlServices.length > 4 && (
                    <button
                      onClick={() => setShowAllEmployee(!showAllEmployee)}
                      className="col-span-full py-2 hover:bg-secondary/50 rounded-xl border-2 border-dashed border-border hover:border-primary transition-all flex items-center justify-center"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <ChevronDown className={`w-4 h-4 text-black transition-transform ${showAllEmployee ? 'rotate-180' : ''}`} />
                        </div>
                        <span className="text-base font-semibold text-foreground">
                          {showAllEmployee ? 'Скрыть' : 'Показать еще'}
                        </span>
                      </div>
                    </button>
                  )}
                </div>
            </div>

            {/* Разделитель */}
            <div className="w-full border-t border-border"></div>

            {/* Решения по отраслям */}
            <div className="px-8 md:px-12 lg:px-16 pt-12 pb-12">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-2">Решения по отраслям</h2>
                  <p className="text-lg text-muted-foreground">
                    Готовые автоматизации под специфику вашего бизнеса
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
                  {industries.slice(0, showAllIndustries ? industries.length : 4).map((industry, index) => {
                    const Icon = industry.icon;
  return (
                      <div
                        key={index}
                        className="p-5 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-sm transition-all"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <h3 className="text-sm font-bold text-foreground">{industry.name}</h3>
                        </div>
                        <ul className="space-y-1.5">
                          {industry.features.map((feature, i) => (
                            <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                              <span className="text-primary mt-0.5 text-xs">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                  
                  {/* Кнопка "Показать еще/Скрыть" */}
                  {industries.length > 4 && (
          <button
                      onClick={() => setShowAllIndustries(!showAllIndustries)}
                      className="col-span-full py-2 hover:bg-secondary/50 rounded-xl border-2 border-dashed border-border hover:border-primary transition-all flex items-center justify-center"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <ChevronDown className={`w-4 h-4 text-black transition-transform ${showAllIndustries ? 'rotate-180' : ''}`} />
                        </div>
                        <span className="text-base font-semibold text-foreground">
                          {showAllIndustries ? 'Скрыть' : 'Показать еще'}
                        </span>
                      </div>
          </button>
                  )}
                </div>
            </div>
          </div>
        )}

        {/* Контент Основные услуги */}
        {activeTab === 'core' && (
          <div className="px-8 md:px-12 lg:px-16 py-8">
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">Основные услуги</h2>
                <p className="text-lg text-muted-foreground">
                  Ключевые решения для автоматизации бизнеса
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
                {coreServices.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <div
                      key={index}
                      className="group p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                      <div className="flex flex-col items-center text-center mb-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300 ease-in-out">
                          <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300 ease-in-out" />
                        </div>
                        <h3 className="text-base font-bold text-foreground mb-2 truncate max-w-full">{service.name}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Контент Интеграции и коммуникации */}
        {activeTab === 'integration' && (
          <div className="px-8 md:px-12 lg:px-16 py-8">
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">Интеграции и коммуникации</h2>
                <p className="text-lg text-muted-foreground">
                  Связь всех систем в единую экосистему
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
                {integrationServices.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <div
                      key={index}
                      className="group p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                      <div className="flex flex-col items-center text-center mb-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300 ease-in-out">
                          <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300 ease-in-out" />
                        </div>
                        <h3 className="text-base font-bold text-foreground mb-2 truncate max-w-full">{service.name}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Контент AI и аналитика */}
        {activeTab === 'ai' && (
          <div className="px-8 md:px-12 lg:px-16 py-8">
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">AI и аналитика</h2>
                <p className="text-lg text-muted-foreground">
                  Умные решения на основе искусственного интеллекта
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
                {aiAnalyticsServices.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <div
                      key={index}
                      className="group p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                      <div className="flex flex-col items-center text-center mb-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300 ease-in-out">
                          <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300 ease-in-out" />
                        </div>
                        <h3 className="text-base font-bold text-foreground mb-2 truncate max-w-full">{service.name}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Контент Поддержка и развитие */}
        {activeTab === 'support' && (
          <div className="px-8 md:px-12 lg:px-16 py-8">
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">Поддержка и развитие</h2>
                <p className="text-lg text-muted-foreground">
                  Обучение, консалтинг и техническое сопровождение
                </p>
        </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
                {supportServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                      className="group p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                      <div className="flex flex-col items-center text-center mb-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300 ease-in-out">
                          <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300 ease-in-out" />
                        </div>
                        <h3 className="text-base font-bold text-foreground mb-2 truncate max-w-full">{service.name}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Контент Контроль за сотрудниками */}
        {activeTab === 'employee' && (
          <div className="px-8 md:px-12 lg:px-16 py-8">
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">Контроль за сотрудниками</h2>
                <p className="text-lg text-muted-foreground">
                  Системы учёта, мотивации и повышения эффективности персонала
                </p>
        </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
                {employeeControlServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                      className="group p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                      <div className="flex flex-col items-center text-center mb-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300 ease-in-out">
                          <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300 ease-in-out" />
                        </div>
                        <h3 className="text-base font-bold text-foreground mb-2 truncate max-w-full">{service.name}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Контент Решения по отраслям */}
        {activeTab === 'industries' && (
          <div className="px-8 md:px-12 lg:px-16 py-8">
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">Решения по отраслям</h2>
                <p className="text-lg text-muted-foreground">
                  Готовые автоматизации под специфику вашего бизнеса
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
                {industries.map((industry, index) => {
                  const Icon = industry.icon;
                  return (
                    <div
                      key={index}
                      className="p-5 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-primary" />
                       </div>
                        <h3 className="text-sm font-bold text-foreground truncate max-w-full">{industry.name}</h3>
                      </div>
                      <ul className="space-y-1.5">
                        {industry.features.map((feature, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-0.5 text-xs">•</span>
                            <span className="truncate max-w-full">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FullscreenServicesMenu;
