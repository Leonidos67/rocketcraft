import { Coffee, Scissors, Dumbbell, Sparkles, ShoppingBag, Bot } from 'lucide-react';

const services = [
  {
    name: 'Café & Restaurants',
    icon: Coffee,
    description: 'Бронирование столов, CRM, рассылки акций и аналитика посещаемости',
  },
  {
    name: 'Barbers & Beauty',
    icon: Scissors,
    description: 'Запись к мастерам, напоминания, CRM и авто-рассылки',
  },
  {
    name: 'Fitness & Sports',
    icon: Dumbbell,
    description: 'Запись на тренировки, учёт абонементов и отчёты',
  },
  {
    name: 'Studio Services',
    icon: Sparkles,
    description: 'Запись на услуги, CRM клиентов и автоматизация визитов',
  },
  {
    name: 'Retail & Coffee Shops',
    icon: ShoppingBag,
    description: 'Программы лояльности, рассылки и сбор отзывов',
  },
  {
    name: 'Automation & AI',
    icon: Bot,
    description: 'Интеграции, шаблоны ботов и аналитика в реальном времени',
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Наши услуги
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Комплексные решения для автоматизации вашего бизнеса
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group p-8 bg-background rounded-xl border border-border hover:border-primary transition-all duration-300 hover-lift"
              >
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                  <Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">{service.name}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
