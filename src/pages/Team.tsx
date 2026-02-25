import Footer from '@/components/Footer';
import PageActions from '@/components/PageActions';
import PageLoader from '@/components/PageLoader';
import Banner from '@/components/Banner';

const Team = () => {
  return (
    <div className="min-h-screen">
      <Banner />
      <PageLoader />
      
      <main className="pt-40 pb-20">
        <div className="px-8 md:px-20 lg:px-40 xl:px-56">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Наша команда
          </h1>
          <p className="text-xl text-muted-foreground">
            Страница в разработке
          </p>
        </div>
      </main>

      <PageActions title="Команда" />
      <Footer />
    </div>
  );
};

export default Team;

