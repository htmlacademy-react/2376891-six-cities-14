import { TOffers } from '../../types/offer';
import { citiesMap, CityMapDefault } from '../../const';
import { addPluralEnding, getSortedOffers } from '../../utils/common';
import SortOptions from '../sort-options/sort-options';
import Map from '../map/map';
import CitiesList from '../cities-list/cities-list';
import { useAppSelector } from '../../hooks';
import { useCities } from '../../hooks/use-cities';
import { getSortType } from '../../store/app-process/selectors';

type TCitiesProps = {
  offersByCity: TOffers;
  activeCity: string;
}

function Cities({ offersByCity, activeCity }: TCitiesProps): JSX.Element {
  const [selectedOffer, handleSelectedOfferChange] = useCities();
  const sortType = useAppSelector(getSortType);
  const sortedOffers = getSortedOffers(sortType, offersByCity);
  const location = citiesMap.find((city) => city.name === activeCity)?.location;

  const handleCardMouseEnter = (offerId: string) => {
    const currentOffer = offersByCity.find((offer) => offer.id === offerId);
    handleSelectedOfferChange(currentOffer);
  };

  const handleCardMouseLeave = () => {
    handleSelectedOfferChange(undefined);
  };

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offersByCity.length} place{addPluralEnding(offersByCity.length)} to stay in {activeCity}</b>
          <SortOptions />
          <CitiesList sortedOffers={sortedOffers} onCityCardMouseEnter={handleCardMouseEnter} onCityCardMouseLeave={handleCardMouseLeave} />
        </section>
        {offersByCity.length !== 0 && (
          <div className="cities__right-section">
            <Map
              offers={offersByCity}
              selectedOffer={selectedOffer}
              location={location ? location : CityMapDefault.location}
              block='cities'
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Cities;
