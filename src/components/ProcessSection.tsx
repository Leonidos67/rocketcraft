import { ClipboardList, Settings, TestTube, Rocket } from 'lucide-react';

const steps = [
  {
    icon: ClipboardList,
    title: 'Диагностика',
    description: 'Анализируем ваш бизнес и определяем точки автоматизации',
  },
  {
    icon: Settings,
    title: 'Настройка',
    description: 'Создаём и настраиваем боты, CRM и интеграции под ваши задачи',
  },
  {
    icon: TestTube,
    title: 'Тестирование',
    description: 'Проверяем все сценарии и обучаем вашу команду работе с системой',
  },
  {
    icon: Rocket,
    title: 'Запуск',
    description: 'Запускаем систему в работу и обеспечиваем техническую поддержку',
  },
];

const ProcessSection = () => {
  return (
    <section id="process" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Процесс работы</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            От идеи до запуска за 4 простых шага
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto group hover:bg-primary transition-colors duration-300">
                    <Icon className="w-10 h-10 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xl font-semibold text-primary">Среднее время запуска: 48 часов</p>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
