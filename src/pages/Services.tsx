import { MessageSquare, Database, Workflow, Link2, Send, Bot, TrendingUp, BarChart3, GraduationCap, Wrench, Coffee, Scissors, Dumbbell, ShoppingBag, BookOpen } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageActions from '@/components/PageActions';
import PageLoader from '@/components/PageLoader';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const services = [
  {
    name: 'Telegram-боты для бизнеса',
    icon: MessageSquare,
    description: 'Автоматизация взаимодействия с клиентами, приём заказов, брони, уведомления, программы лояльности.',
  },
  {
    name: 'CRM-системы',
    icon: Database,
    description: 'Настройка клиентских баз, лид-учёт, аналитика, отчёты, напоминания, сегментация клиентов.',
  },
  {
    name: 'Автоматизация процессов',
    icon: Workflow,
    description: 'Автоматические сценарии: заявки, отчёты, напоминания, обработка данных, уведомления сотрудникам.',
  },
  {
    name: 'Интеграции сервисов',
    icon: Link2,
    description: 'Связка Telegram, Google Sheets, Notion, Tilda, Airtable, Make (Integromat), GPT, amoCRM и других.',
  },
  {
    name: 'Автоматические рассылки',
    icon: Send,
    description: 'Email, Telegram, WhatsApp — сегментированные рассылки акций, напоминаний и событий.',
  },
  {
    name: 'AI-ассистенты и чат-боты',
    icon: Bot,
    description: 'Подключение ChatGPT и других AI-моделей для поддержки клиентов, ответов на вопросы, обработки заявок.',
  },
  {
    name: 'Воронки продаж и лидогенерация',
    icon: TrendingUp,
    description: 'Настройка автоматических воронок, лид-магнитов и CRM-триггеров для привлечения и удержания клиентов.',
  },
  {
    name: 'Аналитика и отчётность',
    icon: BarChart3,
    description: 'Дашборды и отчёты в Google Sheets, Notion или Telegram: показатели продаж, активности, конверсий.',
  },
  {
    name: 'Обучение и сопровождение',
    icon: GraduationCap,
    description: 'Обучение команды клиента работе с системой, документация, видео-гайды, поддержка 24/7.',
  },
  {
    name: 'Индивидуальные решения под ключ',
    icon: Wrench,
    description: 'Разработка комплексной автоматизации под конкретные бизнес-процессы и отрасли.',
  },
];

const industries = [
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
];

const Services = () => {
  return (
    <div className="min-h-screen">
      <PageLoader />
      <Header />
      <main className="pt-32 pb-20">
        {/* Услуги */}
        <section className="mb-32">
          <div className="px-8 md:px-20 lg:px-40 xl:px-56">
            <div className="mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Услуги
            </h1>
              <p className="text-xl text-muted-foreground">
                Комплексная автоматизация бизнеса через no-code решения
            </p>
          </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                    className="group p-8 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all">
                        <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-foreground mb-2">{service.name}</h2>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Решения по отраслям */}
        <section className="border-t border-border pt-20">
          <div className="px-8 md:px-20 lg:px-40 xl:px-56">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Решения по отраслям
              </h2>
              <p className="text-lg text-muted-foreground">
                Готовые автоматизации под специфику вашего бизнеса
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {industries.map((industry, index) => {
                const Icon = industry.icon;
                return (
                  <div
                    key={index}
                    className="p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground">{industry.name}</h3>
                    </div>
                    <ul className="space-y-2">
                      {industry.features.map((feature, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

            {/* CTA */}
            <div className="p-8 bg-primary/10 rounded-2xl border border-primary/20 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Не нашли свою отрасль?
              </h3>
              <p className="text-muted-foreground mb-6">
                Мы создаём индивидуальные решения под любой бизнес
              </p>
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/contacts">Обсудить проект</Link>
              </Button>
            </div>
        </div>
        </section>
      </main>
      <PageActions title="Услуги" />
      <Footer />
    </div>
  );
};

export default Services;
