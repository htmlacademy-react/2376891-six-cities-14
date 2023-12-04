import { CityName } from '../../const';
import { useAppDispatch } from '../../hooks';
import { setActiveCity } from '../../store/app-process/app-process';
import CityItem from '../city-item/city-item';

function CityNamesList(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleCityClick = (cityName: string | null) => {
    dispatch(setActiveCity(cityName));
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
