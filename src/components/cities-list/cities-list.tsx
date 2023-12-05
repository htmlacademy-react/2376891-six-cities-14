import { TOffers } from '../../types/offer';
import OfferCard from '../card/offer-card';
import { memo } from 'react';

type TCitiesListProps = {
  sortedOffers: TOffers;
  onCityCardMouseEnter: (offerId: string) => void;
  onCityCardMouseLeave: () => void;
}

function CitiesList({ sortedOffers, onCityCardMouseEnter, onCityCardMouseLeave }: TCitiesListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {(sortedOffers) &&
        sortedOffers.map((offer) => (
          <OfferCard
            offer={offer}
            key={offer.id}
            onCardMouseEnter={() => onCityCardMouseEnter(offer.id)}
            onCardMouseLeave={onCityCardMouseLeave}
            block={'cities'}
          />)
        )}
    </div>
  );
}

export default memo(CitiesList, (prevProps, nextProps) => prevProps.sortedOffers === nextProps.sortedOffers);
