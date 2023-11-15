import { Helmet } from 'react-helmet-async';
import { Offer } from '../../types/offer';
import Header from '../../components/header/header';
import Cities from '../../components/cities/cities';
import Map from '../../components/map/map';
import { useState } from 'react';

type TMainPageProps = {
  offers: Offer[];
};

function MainPage({ offers }: TMainPageProps): JSX.Element {
  const location = offers[0].city.location;
  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(undefined);

  const handleOfferHover = (offerId: string) => {
    const currentOffer = offers.find((offer) => offer.id === offerId);
    setSelectedOffer(currentOffer);
  };

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>{'6 cities'}</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Paris</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Cologne</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Brussels</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item tabs__item--active">
                  <span>Amsterdam</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Hamburg</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Dusseldorf</span>
                </a>
              </li>
            </ul>
          </section>
        </div>
        <Cities offers={offers} onOfferHover={handleOfferHover}>
          <div className="cities__right-section">
            <Map offers={offers} selectedOffer={selectedOffer} location={location} block='cities'></Map>
          </div>
        </Cities>
      </main>
    </div>
  );
}

export default MainPage;

