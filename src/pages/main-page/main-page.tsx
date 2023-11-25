import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import Cities from '../../components/cities/cities';
import CitiesList from '../../components/cities-list/cities-list';
import { useAppSelector } from '../../hooks';

function MainPage(): JSX.Element | null {
  const activeCity = useAppSelector((state) => state.activeCity);
  const offers = useAppSelector((state) => state.offers);
  const offersByCity = offers.filter((offer) => offer.city.name === activeCity);

  if (offers.length === 0) {
    return null;
  }

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>{'6 cities'}</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList />{/*cities={cities} onCityClick={handleCityClick} */}
        <Cities offersByCity={offersByCity} activeCity={activeCity} ></Cities>
      </main>
    </div>
  );
}

export default MainPage;
