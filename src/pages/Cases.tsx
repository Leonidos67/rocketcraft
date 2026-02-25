import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import PageActions from '@/components/PageActions';
import PageLoader from '@/components/PageLoader';
import Banner from '@/components/Banner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Calendar } from 'lucide-react';
import { caseStudies } from '@/data/cases';
import { cn } from '@/lib/utils';

const Cases = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <Banner />
      <PageLoader />
      <main className="pt-32 pb-20">
        <div className="container mx-auto">

          {/* Hero Section */}
          <section id="hero" className="cursor-default mb-24 px-6 max-w-7xl mx-auto">
            <div className="mb-4">
              <h1 className="cursor-default text-5xl md:text-6xl font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-top-5 duration-700">
                Наши кейсы
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed animate-in fade-in slide-in-from-top-5 duration-900 mb-8">
                Реальные примеры решений, которые мы реализовали для наших клиентов
              </p>
              
            </div>
          </section>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">

            {caseStudies.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
                <div className="relative overflow-hidden">
                  <img 
                    src={item.thumbnailUrl || item.imageUrl} 
                    alt={item.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {item.industry}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{item.subtitle}</p>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="space-y-3">
                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                    
                    <div className="flex flex-wrap gap-2 pt-2">
                      {item.tags.slice(0, 3).map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="pt-4 flex justify-between items-center">
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(item.startDate).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long' })}
                      </span>
                      
                      <Button asChild size="sm" className="group/btn">
                        <Link to={`/cases/${item.id}`}>
                          Подробнее
                          <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
