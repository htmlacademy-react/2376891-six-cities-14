import {useEffect} from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { MAX_NEAR_PLACES_COUNT, citiesMap } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import NotFoundPage from '../not-found-page/not-found-page';
import OfferDetails from '../../components/offer-details/offer-details';
import OfferCard from '../../components/card/offer-card';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import LoadingPage from '../loading-screen/loading-screen';
import { dropOffer } from '../../store/app-process/app-process';
import { getOfferLoadingStatus, getOffer, getOffersChangedStatus, getNearPlaces } from '../../store/data-process/selectors';
import { fetchOfferAction, fetchNearPlacesAction, fetchReviewsAction } from '../../store/api-actions';
import { setOfferChangedStatus } from '../../store/data-process/data-process';
import { getActiveCity } from '../../store/app-process/selectors';

function OfferPage(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const isOfferLoading = useAppSelector(getOfferLoadingStatus);
  const offer = useAppSelector(getOffer);
  const nearPlaces = useAppSelector(getNearPlaces);
  const isOffersChanged = useAppSelector(getOffersChangedStatus);
  const activeCity = useAppSelector(getActiveCity);
  let location = citiesMap.find((city) => city.name === activeCity)?.location;

  if (!location) {
    location = citiesMap[0].location;
  }

  const nearPlacesToRender = structuredClone(nearPlaces)
    .filter((nearPlace) => nearPlace.id !== id)
    .slice(0, MAX_NEAR_PLACES_COUNT);

  if (isOffersChanged) {
    dispatch(setOfferChangedStatus(false));
  }

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(id));
      dispatch(fetchNearPlacesAction(id));
      dispatch(fetchReviewsAction(id));
    }

    return () => {
      dispatch(dropOffer());
    };
  }, [id, dispatch]);

  if (isOfferLoading) {
    return <LoadingPage />;
  }

  if (!offer) {
    return <NotFoundPage />;
  }

  const nearOffersForMap = nearPlacesToRender.concat(offer);

  return (
    <div className="page">
      <Helmet>
        <title>{'6 cities - Offer'}</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferDetails offer={offer} />
          <Map offers={nearOffersForMap} selectedOffer={offer} location={location} block='offer' />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearPlacesToRender.map((nearPlace) => <OfferCard offer={nearPlace} block={'near-places'} key={nearPlace.id} />)}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
