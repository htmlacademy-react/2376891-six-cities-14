import { CityName, DEFAULT_CITY } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import CityItem from '../city-item/city-item';
import { fetchOffersAction } from '../../store/api-actions';
import { setActiveCity } from '../../store/app-process/app-process';
import { getOffersChangedStatus } from '../../store/data-process/selectors';
import { getActiveCity } from '../../store/app-process/selectors';

function CityNamesList(): JSX.Element {
  const dispatch = useAppDispatch();

  const isOffersChange = useAppSelector(getOffersChangedStatus);
  const activeCity = useAppSelector(getActiveCity);

  const handleCityClick = (cityName: string | null) => {
    dispatch(setActiveCity(cityName ? cityName : DEFAULT_CITY));
    if (isOffersChange) {
      dispatch(fetchOffersAction());
    }
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {Object.values(CityName).map((city) => (
            <CityItem key={city} city={city} activeCity={activeCity} onCityClick={handleCityClick} />
          ))}
        </ul>
      </section>
    </div>
  );
}

export default CityNamesList;
