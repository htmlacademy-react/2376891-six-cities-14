import { Helmet } from 'react-helmet-async';
import OfferDetails from '../../components/offer-details/offer-details';
import { Offer } from '../../types/offer';
import { Review } from '../../types/review';
import { useParams } from 'react-router-dom';
import { MAX_NEAR_OFFERS_COUNT } from '../../const';
import NotFoundPage from '../not-found-page/not-found-page';
import OfferCard from '../../components/card/offer-card';
import Header from '../../components/header/header';
import Map from '../../components/map/map';

type TOfferPageProps = {
  offers: Offer[];
  reviews: Review[];
}

function OfferPage({ offers, reviews }: TOfferPageProps): JSX.Element {
  const { id } = useParams();
  const offer = offers.find((item) => Number(item.id) === Number(id));

  if (offer) {
    offers.map((offersItem) => offer.id !== offersItem.id);
  }
  const nearbyOffers = offers.slice(0, MAX_NEAR_OFFERS_COUNT);

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
          <OfferDetails offer={offer} reviews={reviews} />
          <Map offers={nearbyOffers} selectedOffer={offer} location={offer.city.location} block='offer'></Map>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearbyOffers.map((nearbyOffer) => <OfferCard offer={nearbyOffer} block={'near-places'} key={nearbyOffer.id} />)}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
