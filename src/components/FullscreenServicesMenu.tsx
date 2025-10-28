import { X, Coffee, Scissors, Dumbbell, Sparkles, ShoppingBag, Bot } from 'lucide-react';

interface Service {
  name: string;
  services: string[];
  icon: any;
}

const services: Service[] = [
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

interface FullscreenServicesMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const FullscreenServicesMenu = ({ isOpen, onClose }: FullscreenServicesMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-card overflow-y-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Наши услуги</h2>
          <button
            onClick={onClose}
            className="text-foreground hover:text-primary transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group p-6 bg-background rounded-xl border border-border hover:border-primary transition-all duration-300 hover-lift"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                    <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{service.name}</h3>
                </div>
                <ul className="space-y-2">
                  {service.services.map((item, i) => (
                    <li key={i} className="text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FullscreenServicesMenu;
