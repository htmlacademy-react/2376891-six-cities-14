import FavoriteCard from '../../components/card/favorite-card';
import { Helmet } from 'react-helmet-async';
import { TOffers } from '../../types/offer';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { useEffect } from 'react';
import { loadOffers, loadFavorites } from '../../store/action';
import { Link } from 'react-router-dom';

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
  const dispatch = useAppDispatch();
  const favoritesOffers = useAppSelector((state) => state.favorites);
  const favoritesByCity = getFavoritesList(favoritesOffers);

  useEffect(() => {
    dispatch(loadOffers());
    dispatch(loadFavorites());
  }, [dispatch]);

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
            {favoritesByCity}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default FavoritesPage;
