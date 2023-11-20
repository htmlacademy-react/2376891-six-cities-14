import OfferCard from '../card/offer-card';
import { TOffers } from '../../types/offer';
import { addPluralEnding, sortOffersToHigh, sortOffersToLow, sortOffersByRating } from '../../utils/common';
import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { SortOption } from '../../const';

type TCitiesProps = {
  offersByCity: TOffers;
  selectedCity: string | null;
  onOfferHover: (offerId: string) => void;
  children: JSX.Element[];
}

function getSortedOffers(sortType: string | null, offersByCity: TOffers): TOffers {
  const sortedOffers: TOffers = [...offersByCity];

  switch (sortType) {
    case SortOption.Popular:
      return offersByCity;
    case SortOption.LowToHigh:
      return sortedOffers.sort(sortOffersToHigh);
    case SortOption.HighToLow:
      return sortedOffers.sort(sortOffersToLow);
    case SortOption.TopRatedFirst:
      return sortedOffers.sort(sortOffersByRating);
  }
  return sortedOffers;
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

  const sortType = useAppSelector((state) => state.sortType);
  const sortedOffers = getSortedOffers(sortType, offersByCity);

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offersByCity.length} place{addPluralEnding(offersByCity.length)} to stay in {selectedCity}</b>
          {children[0]}
          <div className="cities__places-list places__list tabs__content">
            {(sortedOffers) &&
              sortedOffers.map((offer) => (
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
        {children[1]}
      </div>
    </div>
  );
}

export default Cities;
