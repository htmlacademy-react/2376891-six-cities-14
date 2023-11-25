import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { CityName } from '../../const';
import { useAppDispatch } from '../../hooks';
import { setActiveCity } from '../../store/action';

function CitiesList(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleCityClick = (cityName: string | null) => {
    dispatch(setActiveCity(cityName));
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CityName.map((city) => (
            <li className="locations__item" key={city} onClick={(evt: MouseEvent<HTMLLIElement>) => {
              evt.preventDefault();
              handleCityClick((evt.target as HTMLElement).textContent);
            }}
            >
              <Link className="locations__item-link tabs__item" to="#">
                <span>{city}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default CitiesList;
