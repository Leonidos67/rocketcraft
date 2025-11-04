import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageActions from '@/components/PageActions';
import PageLoader from '@/components/PageLoader';
import { Badge } from '@/components/ui/badge';
import { cases } from '@/data/cases';

const Cases = () => {
  return (
    <div className="min-h-screen">
      <PageLoader />
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Кейсы
            </h1>
            <p className="text-lg text-muted-foreground">
              Реальные результаты наших клиентов. Смотрите, как автоматизация меняет бизнес.
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            {cases.map((caseItem, index) => (
              <div
                key={index}
                className="p-8 bg-card rounded-lg border border-border hover:shadow-md transition-all"
              >
                <div className="mb-4">
                  <Badge variant="secondary" className="mb-3">
                    {caseItem.industry}
                  </Badge>
                  <h2 className="text-2xl font-semibold text-foreground mb-2">
                    {caseItem.title}
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-2">Проблема</h3>
                    <p className="text-muted-foreground">{caseItem.problem}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-2">Решение</h3>
                    <p className="text-muted-foreground">{caseItem.solution}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">Результаты</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {caseItem.results.map((result, i) => (
                        <div
                          key={i}
                          className="p-4 bg-secondary rounded-md border border-border"
                        >
                          <p className="text-sm font-medium text-foreground">{result}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <PageActions title="Кейсы" />
    </div>
  );
};

export default Cases;
