import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageActions from '@/components/PageActions';
import PageLoader from '@/components/PageLoader';
import ContactSection from '@/components/ContactSection';

const Contacts = () => {
  return (
    <div className="min-h-screen">
      <PageLoader />
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Контакты
            </h1>
            <p className="text-lg text-muted-foreground">
              Оставьте заявку и мы свяжемся с вами в течение 2 часов. 
              Или пишите напрямую в Telegram.
            </p>
          </div>
          <ContactSection />
        </div>
      </main>
      <Footer />
      <PageActions title="Контакты" />
    </div>
  );
};

export default Contacts;
