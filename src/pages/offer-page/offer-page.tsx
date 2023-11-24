import { Helmet } from 'react-helmet-async';
import OfferDetails from '../../components/offer-details/offer-details';
import { useParams } from 'react-router-dom';
import { MAX_NEAR_PLACES_COUNT } from '../../const';
import NotFoundPage from '../not-found-page/not-found-page';
import OfferCard from '../../components/card/offer-card';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import LoadingScreen from '../loading-screen/loading-screen';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {useEffect} from 'react';
import { dropOffer } from '../../store/action';
import { fetchOfferAction, fetchNearPlacesAction, fetchReviewsAction } from '../../store/api-actions';

function OfferPage(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const isOfferLoading = useAppSelector((state) => state.isOfferLoading);
  const offer = useAppSelector((state) => state.offer);
  const nearPlaces = useAppSelector((state) => state.nearPlaces);
  const nearPlacesToRender = nearPlaces.slice(0, MAX_NEAR_PLACES_COUNT);

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
    return <LoadingScreen />;
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
          <Map offers={nearOffersForMap} selectedOffer={offer} location={offer.city.location} block='offer'></Map>
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
