import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../../const';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import ProtectedRoute from '../protected-route/protected-route';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<MainPage />}
          />
          <Route
            path={AppRoute.Login}
            element={
              <ProtectedRoute
                authorizationStatus={AuthorizationStatus.Auth}
                redirectTo={AppRoute.Root}
              >
                <LoginPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <ProtectedRoute
                authorizationStatus={AuthorizationStatus.Auth}
                redirectTo={AppRoute.Login}
              >
                <FavoritesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={`${AppRoute.Offer}/:id`}
            element={<OfferPage />}
          />
          <Route
            path='*'
            element={<NotFoundPage />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
