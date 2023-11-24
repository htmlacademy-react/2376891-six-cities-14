import { Helmet } from 'react-helmet-async';
// import { TOffer, TOffers } from '../../types/offer';
import Header from '../../components/header/header';
import Cities from '../../components/cities/cities';
// import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
// import LoadingScreen from '../loading-screen/loading-screen';
// import ErrorMessage from '../../components/error-message/error-message';
// import SortOptions from '../../components/sort-options/sort-options';
// import { cities } from '../../const';
// import { useEffect } from 'react';
import { useAppSelector } from '../../hooks';
// import { setActiveCity } from '../../store/action';
// import { getOffersByCity } from '../../utils/common';
// import { SortOption } from '../../const';
// import { sortOffersToHigh, sortOffersToLow, sortOffersByRating } from '../../utils/common';
// import { fetchOffersAction } from '../../store/api-actions';

// function getSortedOffers(sortType: string | null, offersByCity: TOffers): TOffers {
//   const sortedOffers: TOffers = [...offersByCity];

//   switch (sortType) {
//     case SortOption.Popular:
//       return offersByCity;
//     case SortOption.LowToHigh:
//       return sortedOffers.sort(sortOffersToHigh);
//     case SortOption.HighToLow:
//       return sortedOffers.sort(sortOffersToLow);
//     case SortOption.TopRatedFirst:
//       return sortedOffers.sort(sortOffersByRating);
//   }
//   return sortedOffers;
// }

function MainPage(): JSX.Element | null {
  // const dispatch = useAppDispatch();
  const activeCity = useAppSelector((state) => state.activeCity);
  const offers = useAppSelector((state) => state.offers);
  const offersByCity = offers.filter((offer) => offer.city.name === activeCity);

  if (offers.length === 0) {
    return null;
  }

  // useEffect(() => {
  //   console.log(1)
  //   dispatch(fetchOffersAction());
  // }, [dispatch]);
  // const [selectedOffer, setSelectedOffer] = useState<TOffer | undefined>(undefined);
  // const selectedCity = useAppSelector((state) => state.activeCity);
  // const sortType = useAppSelector((state) => state.sortType);
  // console.log(3)
  // const offersByCity = getOffersByCity(offers, selectedCity);
  // const sortedOffers = getSortedOffers(sortType, offersByCity);
  // const location = offers[0].location;
  // const handleOfferHover = (offerId: string) => {
  //   const currentOffer = offers.find((offer) => offer.id === offerId);
  //   setSelectedOffer(currentOffer);
  // };
  // const handleCityClick = (cityName: string | null) => {
  //   dispatch(setActiveCity(cityName));
  // };

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
        {/* <Cities offersByCity={sortedOffers} selectedCity={selectedCity} onOfferHover={handleOfferHover} >
          <SortOptions />
          <div className="cities__right-section">
            <Map offers={sortedOffers} selectedOffer={selectedOffer} location={location} block='cities'></Map>
          </div>
        </Cities> */}
      </main>
    </div>
  );
}

export default MainPage;
