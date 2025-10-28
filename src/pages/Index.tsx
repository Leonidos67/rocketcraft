import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Coffee, Briefcase, DollarSign, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';

const sections = [
  {
    title: 'Услуги',
    icon: Coffee,
    description: 'Telegram-боты, CRM-интеграции, автоматизация процессов для вашего бизнеса',
    link: '/services',
    highlights: ['6 отраслей', 'Готовые решения', 'Под ключ'],
  },
  {
    title: 'Кейсы',
    icon: Briefcase,
    description: 'Реальные результаты: +40% записей, -80% ручного труда, рост лояльности',
    link: '/cases',
    highlights: ['3 кейса', 'Проверенные метрики', 'Реальные клиенты'],
  },
  {
    title: 'Тарифы',
    icon: DollarSign,
    description: 'Прозрачные цены от 15 000 ₽. Lite, Pro, Full — выберите свой вариант',
    link: '/pricing',
    highlights: ['Фиксированные цены', 'Без скрытых платежей', 'От 15 000 ₽'],
  },
  {
    title: 'Процесс',
    icon: Workflow,
    description: '4 простых шага: диагностика, настройка, тестирование, запуск за 5-14 дней',
    link: '/process',
    highlights: ['4 этапа', '5-14 дней', 'Прозрачный процесс'],
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Автоматизация вашего бизнеса, которая работает сама
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Telegram-боты, CRM, интеграции и рассылки под ключ. <br />
              Увеличьте поток клиентов и упростите процессы за 48 часов.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                asChild
              >
                <Link to="/contacts">
                  Оставить заявку
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
              >
                <Link to="/cases">Посмотреть кейсы</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Sections */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <Link
                  key={index}
                  to={section.link}
                  className="group p-8 bg-card rounded-lg border border-border hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary transition-colors">
                        <Icon className="w-6 h-6 text-foreground group-hover:text-primary-foreground transition-colors" />
                      </div>
                      <h2 className="text-2xl font-semibold text-foreground">{section.title}</h2>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {section.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {section.highlights.map((highlight, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-medium bg-secondary text-foreground rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
