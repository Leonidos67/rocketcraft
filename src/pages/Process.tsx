import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Search, Settings, TestTube, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Диагностика',
    description: 'Анализируем ваш бизнес, находим точки роста и узкие места в процессах.',
    icon: Search,
    details: [
      'Встреча с командой (онлайн или офлайн)',
      'Аудит текущих процессов',
      'Определение задач для автоматизации',
      'Расчёт ROI и сроков окупаемости',
    ],
  },
  {
    number: '02',
    title: 'Настройка',
    description: 'Создаём и интегрируем решения: боты, CRM, рассылки, интеграции.',
    icon: Settings,
    details: [
      'Разработка Telegram-бота',
      'Настройка CRM и интеграций',
      'Создание сценариев автоматизации',
      'Подключение аналитики',
    ],
  },
  {
    number: '03',
    title: 'Тестирование',
    description: 'Проверяем всё на реальных данных, корректируем под ваши процессы.',
    icon: TestTube,
    details: [
      'Тестовый запуск на небольшой группе',
      'Сбор обратной связи',
      'Корректировка сценариев',
      'Обучение команды',
    ],
  },
  {
    number: '04',
    title: 'Запуск',
    description: 'Внедряем систему, обучаем команду и запускаем полноценную работу.',
    icon: Rocket,
    details: [
      'Полный запуск системы',
      'Обучение всей команды',
      'Передача документации',
      'Техподдержка и сопровождение',
    ],
  },
];

const Process = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Процесс работы
            </h1>
            <p className="text-lg text-muted-foreground">
              Прозрачный процесс от идеи до запуска. Обычно занимает от 5 до 14 рабочих дней.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="group p-8 bg-card rounded-lg border border-border hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary transition-colors">
                        <Icon className="w-8 h-8 text-foreground group-hover:text-primary-foreground transition-colors" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-sm font-medium text-muted-foreground">
                          {step.number}
                        </span>
                        <h2 className="text-2xl font-semibold text-foreground">
                          {step.title}
                        </h2>
                      </div>

                      <p className="text-muted-foreground mb-6">{step.description}</p>

                      <ul className="space-y-2">
                        {step.details.map((detail, i) => (
                          <li
                            key={i}
                            className="text-sm text-muted-foreground flex items-start gap-3"
                          >
                            <span className="text-foreground mt-1">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
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

export default Process;
