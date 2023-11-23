import { Helmet } from 'react-helmet-async';
import OfferDetails from '../../components/offer-details/offer-details';
import { useParams } from 'react-router-dom';
import { MAX_NEAR_PLACES_COUNT } from '../../const';
import NotFoundPage from '../not-found-page/not-found-page';
import OfferCard from '../../components/card/offer-card';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {useEffect} from 'react';
import { dropOffer, loadNearPlaces, loadOffer, loadReviews } from '../../store/action';

function OfferPage(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const offer = useAppSelector((state) => state.offer);
  // console.log(offer);
  const nearPlaces = useAppSelector((state) => state.nearPlaces).slice(0, MAX_NEAR_PLACES_COUNT);

  useEffect(() => {
    if (id) {
      dispatch(loadOffer(id));
      dispatch(loadNearPlaces(id));
      dispatch(loadReviews());
    }

    return () => {
      dispatch(dropOffer());
    };
  }, [id, dispatch]);

  if (!offer) {
    return <NotFoundPage />;
  }

  return (
    <div className="page">
      <Helmet>
        <title>{'6 cities - Offer'}</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferDetails offer={offer} />
          <Map offers={nearPlaces} selectedOffer={offer} location={offer.city.location} block='offer'></Map>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearPlaces.map((nearPlace) => <OfferCard offer={nearPlace} block={'near-places'} key={nearPlace.id} />)}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
