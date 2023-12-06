import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import Cities from '../../components/cities/cities';
import CityNamesList from '../../components/city-names-list/city-names-list';
import NoCities from '../../components/no-cities/no-cities';
import { useAppSelector } from '../../hooks';
import { getActiveCity } from '../../store/app-process/selectors';
import { getOffers } from '../../store/data-process/selectors';
import { TOffers } from '../../types/offer';

function MainPage(): JSX.Element | null {
  const activeCity = useAppSelector(getActiveCity);
  const offers = useAppSelector(getOffers);
  const isNoOffers = (offers.length === 0);

  let offersByCity: TOffers = [];

  if (!isNoOffers) {
    offersByCity = offers.filter((offer) => offer.city.name === activeCity);
  }

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>{'6 cities'}</title>
      </Helmet>
      <Header />
      <main className={`page__main page__main--index ${isNoOffers ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <CityNamesList />
        {isNoOffers ? (
          <NoCities activeCity={activeCity} />
        ) : (
          <Cities offersByCity={offersByCity} activeCity={activeCity} ></Cities>
        )}
      </main>
    </div>
  );
}

export default MainPage;
