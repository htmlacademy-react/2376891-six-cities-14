import { Helmet } from 'react-helmet-async';
import { TOffer } from '../../types/offer';
import Header from '../../components/header/header';
import Cities from '../../components/cities/cities';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import SortOptions from '../../components/sort-options/sort-options';
import { cities } from '../../const';
import {
  useState,
  // useEffect
} from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  setActiveCity,
  // loadOffers, loadFavorites
} from '../../store/action';
import { getOffersByCity } from '../../utils/common';

// type TMainPageProps = {
//   authorizationStatus: AuthorizationStatus;
// }

function MainPage(): JSX.Element | null {
  const dispatch = useAppDispatch();

  const offers = useAppSelector((state) => state.offers);
  const [selectedOffer, setSelectedOffer] = useState<TOffer | undefined>(undefined);

  const selectedCity = useAppSelector((state) => state.activeCity);

  // useEffect(() => {
  //   dispatch(loadOffers());
  //   dispatch(loadFavorites());
  // }, [dispatch, selectedCity]);

  if (offers.length === 0) {
    return null;
  }

  const offersByCity = getOffersByCity(offers, selectedCity);
  const location = offers[0].location;

  const handleOfferHover = (offerId: string) => {
    const currentOffer = offers.find((offer) => offer.id === offerId);
    setSelectedOffer(currentOffer);
  };

  const handleCityClick = (cityName: string | null) => {
    dispatch(setActiveCity(cityName));
  };

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>{'6 cities'}</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList cities={cities} onCityClick={handleCityClick} />
        <Cities offersByCity={offersByCity} selectedCity={selectedCity} onOfferHover={handleOfferHover}>
          <SortOptions />
          <div className="cities__right-section">
            <Map offers={offersByCity} selectedOffer={selectedOffer} location={location} block='cities'></Map>
          </div>
        </Cities>
      </main>
    </div>
  );
}

export default MainPage;
