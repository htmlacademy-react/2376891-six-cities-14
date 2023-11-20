import OfferCard from '../card/offer-card';
import { TOffer } from '../../types/offer';
import { addPluralEnding } from '../../utils/common';
import { useState } from 'react';

type TCitiesProps = {
  offersByCity: TOffer[];
  selectedCity: string | null;
  onOfferHover: (offerId: string) => void;
  children: JSX.Element;
}

function Cities({ offersByCity, selectedCity, onOfferHover, children }: TCitiesProps): JSX.Element {
  const [, setActiveCardId] = useState<string | null>(null);

  const handleCardMouseEnter = (id: string) => {
    setActiveCardId(id);
    onOfferHover(id);
  };

  const handleCardMouseLeave = () => {
    setActiveCardId(null);
    onOfferHover('');
  };

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offersByCity.length} place{addPluralEnding(offersByCity.length)} to stay in {selectedCity}</b>
          <form className="places__sorting" action="#" method="get">
            <span className="places__sorting-caption">Sort by</span>
            <span className="places__sorting-type" tabIndex={0}>
              Popular
              <svg className="places__sorting-arrow" width="7" height="4">
                <use xlinkHref="#icon-arrow-select"></use>
              </svg>
            </span>
            <ul className="places__options places__options--custom places__options--opened">
              <li className="places__option places__option--active" tabIndex={0}>Popular</li>
              <li className="places__option" tabIndex={0}>Price: low to high</li>
              <li className="places__option" tabIndex={0}>Price: high to low</li>
              <li className="places__option" tabIndex={0}>Top rated first</li>
            </ul>
          </form>
          <div className="cities__places-list places__list tabs__content">
            {(offersByCity.length > 0) &&
              offersByCity.map((offer) => (
                <OfferCard
                  offer={offer}
                  key={offer.id}
                  onCardMouseEnter={() => handleCardMouseEnter(offer.id)}
                  onCardMouseLeave={handleCardMouseLeave}
                  block={'cities'}
                />)
              )}
          </div>
        </section>
        {children}
      </div>
    </div>
  );
}

export default Cities;
