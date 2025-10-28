import { ArrowRight } from 'lucide-react';

const cases = [
  {
    title: 'Кофейня "Бодрый день"',
    problem: 'Теряли до 30% клиентов из-за неудобной записи по телефону',
    result: '+45% новых клиентов через Telegram-бот, автоматизация бронирования',
    metrics: ['45% рост клиентов', '24/7 доступность', '0 пропущенных записей'],
  },
  {
    title: 'Барбершоп "Стиль"',
    problem: 'Мастера тратили 2 часа в день на обработку записей',
    result: 'Экономия 10 часов в неделю, рост повторных визитов на 60%',
    metrics: ['60% повторных визитов', '10 часов экономии/нед', 'CRM-учёт клиентов'],
  },
  {
    title: 'Фитнес-клуб "Энергия"',
    problem: 'Сложный учёт абонементов и низкая посещаемость',
    result: 'Автоматические напоминания увеличили посещаемость на 35%',
    metrics: ['35% рост посещаемости', 'Авто-напоминания', 'Аналитика в реальном времени'],
  },
];

const CasesSection = () => {
  return (
    <section id="cases" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Кейсы</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Реальные результаты наших клиентов
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((caseItem, index) => (
            <div
              key={index}
              className="group p-8 bg-card rounded-xl border border-border hover:border-primary transition-all duration-300 hover-lift"
            >
              <h3 className="text-2xl font-bold text-foreground mb-4">{caseItem.title}</h3>
              
              <div className="mb-4">
                <p className="text-sm font-semibold text-muted-foreground mb-2">Задача:</p>
                <p className="text-foreground">{caseItem.problem}</p>
              </div>

              <div className="mb-6">
                <p className="text-sm font-semibold text-muted-foreground mb-2">Решение:</p>
                <p className="text-foreground">{caseItem.result}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {caseItem.metrics.map((metric, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                  >
                    {metric}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center text-primary font-medium group-hover:gap-2 transition-all duration-300">
                Подробнее
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CasesSection;
