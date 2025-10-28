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
    <div className="fixed top-[80px] left-0 right-0 bottom-0 z-40 bg-background overflow-y-auto border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-foreground">Все услуги</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group p-6 bg-card rounded-lg border border-border hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center group-hover:bg-primary transition-colors">
                    <Icon className="w-5 h-5 text-foreground group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{service.name}</h3>
                </div>
                <ul className="space-y-2">
                  {service.services.map((item, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-foreground mt-1">•</span>
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
