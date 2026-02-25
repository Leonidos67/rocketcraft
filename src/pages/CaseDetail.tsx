import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, MapPin, Tag, TrendingUp, Wrench, CheckCircle, Code } from 'lucide-react';
import { caseStudies, CaseStudy } from '@/data/cases';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import PageActions from '@/components/PageActions';
import PageLoader from '@/components/PageLoader';
import Banner from '@/components/Banner';

const CaseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for better UX
    setTimeout(() => {
      const foundCase = caseStudies.find(c => c.id === id);
      setCaseStudy(foundCase);
      setLoading(false);
    }, 300);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <PageLoader />
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive">Кейс не найден</h2>
          <p className="text-muted-foreground mt-2">Запрашиваемый кейс не существует</p>
          <Button asChild className="mt-4">
            <Link to="/cases">Вернуться к кейсам</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <Banner />
      <PageLoader />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Back button */}
          <Button variant="outline" asChild className="mb-8">
            <Link to="/cases" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" /> Назад к кейсам
            </Link>
          </Button>

          {/* Hero section */}
          <section className="mb-16">
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img 
                src={caseStudy.imageUrl} 
                alt={caseStudy.title}
                className="w-full h-[400px] object-cover"
              />
            </div>
            
            <div className="mt-6 flex flex-wrap gap-4 items-center justify-between">
              <div>
                <Badge variant="secondary" className="text-lg px-4 py-1.5 bg-primary/10 text-primary">
                  {caseStudy.industry}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-2">{caseStudy.title}</h1>
                <p className="text-xl text-muted-foreground">{caseStudy.subtitle}</p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{new Date(caseStudy.startDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  {caseStudy.endDate && (
                    <>
                      <span className="mx-2">—</span>
                      <span>{new Date(caseStudy.endDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </>
                  )}
                </div>
                
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{caseStudy.client}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Overview section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Обзор проекта</h2>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-xl text-muted-foreground leading-relaxed">
                {caseStudy.detailedDescription}
              </p>
            </div>
          </section>

          {/* Services and technologies */}
          <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <Wrench className="mr-3 h-8 w-8 text-primary" />
                Услуги
              </h2>
              <div className="space-y-3">
                {caseStudy.services.map((service, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-lg">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <Code className="mr-3 h-8 w-8 text-primary" />
                Технологии
              </h2>
              <div className="flex flex-wrap gap-2">
                {caseStudy.technologies.map((tech, index) => (
                  <Badge key={index} variant="outline" className="text-lg px-4 py-2">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </section>

          {/* Challenges and solutions */}
          <section className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-red-500">Проблемы</h2>
              <div className="space-y-4">
                {caseStudy.challenges.map((challenge, index) => (
                  <div key={index} className="p-6 bg-destructive/5 rounded-lg border border-border">
                    <div className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-red-500 flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <p className="text-lg">{challenge}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-6 text-green-500">Решения</h2>
              <div className="space-y-4">
                {caseStudy.solutions.map((solution, index) => (
                  <div key={index} className="p-6 bg-green-500/5 rounded-lg border border-border">
                    <div className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <p className="text-lg">{solution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Results */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <TrendingUp className="mr-3 h-8 w-8 text-primary" />
              Результаты
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {caseStudy.results.map((result, index) => (
                <div 
                  key={index} 
                  className="p-6 bg-gradient-to-br from-primary/5 to-secondary rounded-lg border border-border flex flex-col h-full"
                >
                  <TrendingUp className="h-10 w-10 text-primary mb-4" />
                  <p className="text-xl font-medium flex-grow">{result}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Tags */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Tag className="mr-3 h-6 w-6 text-primary" />
              Теги
            </h2>
            <div className="flex flex-wrap gap-2">
              {caseStudy.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-base px-4 py-1.5">
                  {tag}
                </Badge>
              ))}
            </div>
          </section>

          {/* Call to action */}
          <section className="py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Готовы начать свой проект?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Обсудим, как мы можем помочь вашему бизнесу достичь новых высот
            </p>
            <Button size="lg" asChild>
              <Link to="/contacts">Связаться с нами</Link>
            </Button>
          </section>
        </div>
      </main>
      <Footer />
      <PageActions title={caseStudy.title} />
    </div>
  );
};

export default CaseDetail;