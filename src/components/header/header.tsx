import Logo from '../logo/logo';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import React, {MouseEvent} from 'react';
import { logoutAction } from '../../store/api-actions';

// type THeaderProps = {
//   authorizationStatus: AuthorizationStatus;
// }

function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const favoritesOffers = useAppSelector((state) => state.favorites);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  const handleClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();

    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo />
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link className="header__nav-link header__nav-link--profile" to="#">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  {authorizationStatus === AuthorizationStatus.NoAuth ? (
                    <Link to={AppRoute.Login} >
                      <span className="header__login">Sign in</span>
                    </Link>
                  ) : (
                    <React.Fragment>
                      <Link to={AppRoute.Favorites}>
                        <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                      </Link>
                      <span className="header__favorite-count">{favoritesOffers.length}</span>
                    </React.Fragment>
                  )}

                </Link>
              </li>
              {authorizationStatus === AuthorizationStatus.Auth && (
                <li className="header__nav-item">
                  <Link className="header__nav-link" to="#" onClick={handleClick} >
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
