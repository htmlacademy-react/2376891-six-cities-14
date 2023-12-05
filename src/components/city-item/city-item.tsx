import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';

type TCityItem = {
  onCityClick: (cityName: string | null) => void;
  city: string;
  activeCity: string | null;
}

function CityItem({onCityClick, city, activeCity}: TCityItem): JSX.Element {
  return (
    <li className="locations__item" key={city} onClick={(evt: MouseEvent<HTMLLIElement>) => {
      evt.preventDefault();
      onCityClick((evt.target as HTMLElement).textContent);
    }}
    >
      <Link className={`locations__item-link tabs__item ${city === activeCity ? 'tabs__item--active' : ''}`} to="#">
        <span>{city}</span>
      </Link>
    </li>
  );
}

export default CityItem;
