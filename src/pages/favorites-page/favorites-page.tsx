import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import FavoriteCard from '../../components/card/favorite-card';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { TOffers } from '../../types/offer';
import { useAppSelector } from '../../hooks';
import { getFavorites } from '../../store/data-process/selectors';

function getFavoritesList(favoritesOffers: TOffers) {
  const favoriteCity = new Set<string>();

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
              <Link className="locations__item-link" to="#">
                <span>{city}</span>
              </Link>
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

function FavoritesPage(): JSX.Element {
  const favoritesOffers = useAppSelector(getFavorites);
  const favoritesByCity = getFavoritesList(favoritesOffers);
  const isNoFavorite = !(favoritesOffers.length);

  return (
    <div className={`page ${isNoFavorite ? 'page--favorites-empty' : ''}`}>
      <Helmet>
        <title>{'6 cities - Favorites'}</title>
      </Helmet>
      <Header />
      <main className={`page__main page__main--favorites ${isNoFavorite ? 'page__main--favorites-empty' : ''}`}>
        <div className="page__favorites-container container">
          {isNoFavorite ? (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          ) : (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              {favoritesByCity}
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default FavoritesPage;
