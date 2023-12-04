import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';

type TCityItem = {
  onCityClick: (cityName: string | null) => void;
  city: string;
}

function CityItem({onCityClick, city}: TCityItem): JSX.Element {
  return (
    <li className="locations__item" key={city} onClick={(evt: MouseEvent<HTMLLIElement>) => {
      evt.preventDefault();
      onCityClick((evt.target as HTMLElement).textContent);
    }}
    >
      <Link className="locations__item-link tabs__item" to="#">
        <span>{city}</span>
      </Link>
    </li>
  );
}

export default CityItem;
