import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getOffersChangedStatus } from '../../store/data-process/selectors';
import { fetchOffersAction } from '../../store/api-actions';

function Logo(): JSX.Element {
  const dispatch = useAppDispatch();
  const isOffersChange = useAppSelector(getOffersChangedStatus);

  const handleCitiesLogoClick = () => {
    if (isOffersChange) {
      dispatch(fetchOffersAction());
    }
  };

  return (
    <div className="header__left">
      <Link to={AppRoute.Root} className="header__logo-link header__logo-link--active">
        <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" onClick={handleCitiesLogoClick} />
      </Link>
    </div>
  );
}

export default Logo;
