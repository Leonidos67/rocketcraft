import { useParams } from 'react-router-dom';
import AutomationServicePage from '@/pages/AutomationServicePage';
import ServiceGuidePage from '@/pages/ServiceGuidePage';
import Services from '@/pages/Services';
import { isServiceGuideSlug } from '@/data/serviceGuides';

const ServicesSlugRoute = () => {
  const { slug = '' } = useParams<{ slug: string }>();

  if (slug === 'automation') {
    return <AutomationServicePage />;
  }

  if (isServiceGuideSlug(slug)) {
    return <ServiceGuidePage guideSlug={slug} />;
  }

  return <Services />;
};

export default ServicesSlugRoute;
