import FavoriteCard from '../../components/card/favorite-card';
import { Helmet } from 'react-helmet-async';
import { Offer } from '../../types/offer';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

type TFavoritesProps = {
  offers: Offer[];
};

// function getFavoritesByCity() {

// }

function getOffers(offers: Offer[]) {
  const favoriteCity = new Set<string>();
  const favoritesOffers = offers.filter((offer) => offer.isFavorite).sort((a, b) => (a.city.name > b.city.name ? 1 : -1));

  favoritesOffers.map((offer) => {
    if (!favoriteCity.has(offer.city.name)) {
      favoriteCity.add(offer.city.name);
    }
  });

  return (
    <ul className="favorites__list">
      {Array.from(favoriteCity).map((city) => (
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{city}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {favoritesOffers.map((offer) => {
              if (offer.city.name === city) {
                return (
                  <FavoriteCard offer={offer} key={offer.id} />
                );
              }
            })}
          </div>
        </li>
      ))}
    </ul>
  );
}

function FavoritesPage({ offers }: TFavoritesProps): JSX.Element {
  return (
    <div className="page">
      <Helmet>
        <title>{'6 cities - Favorites'}</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            {getOffers(offers)}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default FavoritesPage;
