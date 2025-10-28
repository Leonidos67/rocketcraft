import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Lite',
    price: '15 000₽',
    description: 'Идеально для начала автоматизации',
    features: [
      'Telegram-бот для записи',
      'Базовые напоминания',
      'До 100 клиентов',
      'Техподдержка в чате',
      'Настройка за 24 часа',
    ],
  },
  {
    name: 'Pro',
    price: '35 000₽',
    description: 'Полная автоматизация бизнес-процессов',
    features: [
      'Всё из Lite +',
      'CRM-система',
      'Автоматические рассылки',
      'До 500 клиентов',
      'Интеграции с сервисами',
      'Аналитика и отчёты',
      'Приоритетная поддержка',
    ],
    popular: true,
  },
  {
    name: 'Full',
    price: 'от 60 000₽',
    description: 'Индивидуальное решение под ваш бизнес',
    features: [
      'Всё из Pro +',
      'Безлимитные клиенты',
      'AI-помощник в боте',
      'Интеграция с Make/Zapier',
      'Кастомные функции',
      'Выделенный менеджер',
      'Обучение команды',
    ],
  },
];

const PricingSection = () => {
  const scrollToContacts = () => {
    const element = document.getElementById('contacts');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Тарифы</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Выберите подходящий план для вашего бизнеса
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`p-8 rounded-xl border transition-all duration-300 hover-lift ${
                plan.popular
                  ? 'bg-primary text-primary-foreground border-primary scale-105'
                  : 'bg-background border-border hover:border-primary'
              }`}
            >
              {plan.popular && (
                <div className="text-center mb-4">
                  <span className="px-4 py-1 bg-primary-foreground text-primary text-sm font-semibold rounded-full">
                    Популярный
                  </span>
                </div>
              )}

              <h3
                className={`text-2xl font-bold mb-2 ${
                  plan.popular ? 'text-primary-foreground' : 'text-foreground'
                }`}
              >
                {plan.name}
              </h3>
              <div
                className={`text-4xl font-bold mb-4 ${
                  plan.popular ? 'text-primary-foreground' : 'text-primary'
                }`}
              >
                {plan.price}
              </div>
              <p
                className={`mb-6 ${
                  plan.popular ? 'text-primary-foreground/90' : 'text-muted-foreground'
                }`}
              >
                {plan.description}
              </p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check
                      className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        plan.popular ? 'text-primary-foreground' : 'text-primary'
                      }`}
                    />
                    <span
                      className={plan.popular ? 'text-primary-foreground/90' : 'text-foreground'}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={scrollToContacts}
                className={`w-full ${
                  plan.popular
                    ? 'bg-primary-foreground text-primary hover:bg-primary-foreground/90'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
              >
                Выбрать тариф
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
