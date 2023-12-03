import Logo from '../logo/logo';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import React, {MouseEvent} from 'react';
import { logoutAction } from '../../store/api-actions';
import { getFavorites } from '../../store/data-process/selectors';
import { getAuthorizationStatus, getUser } from '../../store/user-process/selectors';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const favoritesOffers = useAppSelector(getFavorites);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userData = useAppSelector(getUser);

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
                  {authorizationStatus === AuthorizationStatus.NoAuth ? (
                    <React.Fragment>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <Link to={AppRoute.Login} >
                        <span className="header__login">Sign in</span>
                      </Link>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                        <img className="header__avatar user__avatar" src={userData?.avatarUrl} width="54" height="54" alt="Reviews avatar" />
                      </div>
                      <Link to={AppRoute.Favorites}>
                        <span className="header__user-name user__name">{userData?.email}</span>
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
