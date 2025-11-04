import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageActions from '@/components/PageActions';
import PageLoader from '@/components/PageLoader';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Lite',
    price: '15 000 ₽',
    period: 'единоразово',
    description: 'Базовая автоматизация для старта',
    features: [
      'Telegram-бот для записи',
      'Базовая настройка CRM',
      'Шаблон рассылки',
      'Инструкция по использованию',
      'Техподдержка 14 дней',
    ],
    cta: 'Выбрать Lite',
    popular: false,
  },
  {
    name: 'Pro',
    price: '35 000 ₽',
    period: 'единоразово',
    description: 'Полная автоматизация под ключ',
    features: [
      'Всё из Lite +',
      'Интеграция с CRM (amoCRM, Битрикс24)',
      'Автоматические напоминания',
      'Персонализированные рассылки',
      'Отчёты и аналитика',
      'Техподдержка 30 дней',
    ],
    cta: 'Выбрать Pro',
    popular: true,
  },
  {
    name: 'Full',
    price: 'от 60 000 ₽',
    period: 'под проект',
    description: 'Индивидуальное решение',
    features: [
      'Всё из Pro +',
      'Кастомные функции под задачи',
      'Интеграции с любыми сервисами',
      'AI-помощник в боте',
      'Полная автоматизация процессов',
      'Приоритетная техподдержка',
    ],
    cta: 'Обсудить проект',
    popular: false,
  },
];

const Pricing = () => {
  const scrollToContacts = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <PageLoader />
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Тарифы
            </h1>
            <p className="text-lg text-muted-foreground">
              Выберите подходящий тариф для вашего бизнеса. Все цены фиксированные, без скрытых платежей.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative p-8 bg-card rounded-lg border transition-all ${
                  plan.popular
                    ? 'border-primary shadow-md scale-105'
                    : 'border-border hover:shadow-sm'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                      Популярный
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-foreground mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{plan.period}</p>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={scrollToContacts}
                  className={`w-full ${
                    plan.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <PageActions title="Тарифы" />
    </div>
  );
};

export default Pricing;
