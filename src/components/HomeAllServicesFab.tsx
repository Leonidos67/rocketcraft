import { Link } from 'react-router-dom';

const HomeAllServicesFab = () => (
  <div className="home-all-services-fab-slot">
    <Link to="/services" className="home-all-services-fab">
      <span className="home-all-services-fab__text">
        Все работы
      </span>
    </Link>
  </div>
);

export default HomeAllServicesFab;
