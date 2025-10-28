import { Coffee, Scissors, Dumbbell, Sparkles, ShoppingBag, Bot } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const services = [
  {
    name: 'Café & Restaurants',
    icon: Coffee,
    services: [
      'Бот бронирования столов',
      'CRM учёт клиентов',
      'Автоматические рассылки акций',
      'Отчёты по посещаемости и доходу',
    ],
  },
  {
    name: 'Barbers & Beauty',
    icon: Scissors,
    services: [
      'Бот записи по мастерам',
      'Напоминания о визите',
      'CRM-учёт клиентов и услуг',
      'Авто-рассылка акций и повторных визитов',
    ],
  },
  {
    name: 'Fitness & Sports',
    icon: Dumbbell,
    services: [
      'Запись на тренировки через Telegram',
      'CRM-учёт абонементов',
      'Автоматические напоминания',
      'Отчёты по посещаемости',
    ],
  },
  {
    name: 'Studio Services',
    icon: Sparkles,
    services: [
      'Запись на услуги (массаж, маникюр, СПА, фото)',
      'Напоминания клиентам',
      'CRM для базы клиентов',
      'Автоматизация повторных визитов',
    ],
  },
  {
    name: 'Retail & Coffee Shops',
    icon: ShoppingBag,
    services: [
      'Программа лояльности через Telegram',
      'Автоматическая рассылка новинок и акций',
      'Сбор отзывов',
      'CRM-учёт посещений и покупок',
    ],
  },
  {
    name: 'Automation & AI',
    icon: Bot,
    services: [
      'Интеграции с Make/Integromat',
      'Шаблоны для быстрого запуска ботов',
      'Автоматизация рутинных задач',
      'Аналитика и отчёты в реальном времени',
    ],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Наши услуги
            </h1>
            <p className="text-lg text-muted-foreground">
              Предоставляем комплексные решения для автоматизации бизнес-процессов. 
              От Telegram-ботов до полноценных CRM-систем и интеграций.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="group p-8 bg-card rounded-lg border border-border hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary transition-colors">
                      <Icon className="w-6 h-6 text-foreground group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">{service.name}</h2>
                  </div>
                  <ul className="space-y-3">
                    {service.services.map((item, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-3">
                        <span className="text-foreground mt-1 font-medium">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
