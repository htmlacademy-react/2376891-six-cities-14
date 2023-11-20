import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';

type TCitiesList = {
  cities: string[];
  onCityClick: (cityName: string | null) => void;
}

function CitiesList({ cities, onCityClick }: TCitiesList): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <li className="locations__item" key={city} onClick={(evt: MouseEvent<HTMLLIElement>) => {
              evt.preventDefault();
              onCityClick((evt.target as HTMLElement).textContent);
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
