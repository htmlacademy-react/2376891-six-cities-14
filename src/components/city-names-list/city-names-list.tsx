import { CityName } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOffersAction } from '../../store/api-actions';
import { setActiveCity } from '../../store/app-process/app-process';
import CityItem from '../city-item/city-item';
import { getOffersChangedStatus } from '../../store/data-process/selectors';

function CityNamesList(): JSX.Element {
  const dispatch = useAppDispatch();

  const isOffersChange = useAppSelector(getOffersChangedStatus);

  const handleCityClick = (cityName: string | null) => {
    dispatch(setActiveCity(cityName));
    if (isOffersChange) {
      dispatch(fetchOffersAction());
    }
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CityName.map((city) => (
            <CityItem key={city} city={city} onCityClick={handleCityClick} />
          ))}
        </ul>
      </section>
    </div>
  );
}

export default CityNamesList;
