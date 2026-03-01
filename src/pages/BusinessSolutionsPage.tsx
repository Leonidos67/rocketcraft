import Footer from '@/components/Footer';
import PageActions from '@/components/PageActions';
import PageLoader from '@/components/PageLoader';
import Banner from '@/components/Banner';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import React, { useState, useRef, useCallback, useEffect } from 'react';

const BusinessSolutionsPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Шапка */}
      <Header />

      {/* Баннер */}
      <Banner />

      {/* Основной контент */}
      <main className="relative">
        {/* Заголовок страницы */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-6">
              Решения для бизнеса
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Современные решения для автоматизации и развития вашего бизнеса
            </p>
          </div>
        </section>

        {/* Дополнительный контент */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-card p-8 rounded-xl border border-border">
                <h2 className="text-2xl font-bold mb-4">Апарт-отели</h2>
                <p className="text-muted-foreground">
                  Современные решения для автоматизации управления апарт-отелями. 
                  Онлайн-бронирование, системы лояльности, чат-боты для обслуживания гостей и многое другое.
                </p>
              </div>
              <div className="bg-card p-8 rounded-xl border border-border">
                <h2 className="text-2xl font-bold mb-4">Гостевые дома</h2>
                <p className="text-muted-foreground">
                  Комплексные решения для автоматизации гостевых домов. 
                  Системы учета гостей, автоматические уведомления, интеграция с популярными платформами бронирования.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Навигационные действия */}
      <PageActions title="Решения для бизнеса" />

      {/* Футер */}
      <Footer />
    </div>
  );
};

export default BusinessSolutionsPage;