import OfferCard from '../card/offer-card';
import { TOffers, TOffer } from '../../types/offer';
import { addPluralEnding, sortOffersToHigh, sortOffersToLow, sortOffersByRating } from '../../utils/common';
// import { useState } from 'react';
// import { useAppSelector } from '../../hooks';
// import { SortOption } from '../../const';
import SortOptions from '../sort-options/sort-options';
import Map from '../map/map';
import { useAppSelector } from '../../hooks';
import { SortingOption } from '../../const';
import {useState} from 'react';

type TCitiesProps = {
  offersByCity: TOffers;
  activeCity: string;
  // selectedCity: string | null;
  // onOfferHover: (offerId: string) => void;
  // children: JSX.Element[];
}

function getSortedOffers(sortType: string | null, offersByCity: TOffers): TOffers {
  const sortedOffers: TOffers = [...offersByCity];

  switch (sortType) {
    case SortingOption.Popular:
      return offersByCity;
    case SortingOption.LowToHigh:
      return sortedOffers.sort(sortOffersToHigh);
    case SortingOption.HighToLow:
      return sortedOffers.sort(sortOffersToLow);
    case SortingOption.TopRatedFirst:
      return sortedOffers.sort(sortOffersByRating);
  }
  return sortedOffers;
}

function Cities({ offersByCity, activeCity }: TCitiesProps): JSX.Element {
  const [selectedOffer, setSelectedOffer] = useState<TOffer | undefined>(undefined);
  const sortType = useAppSelector((state) => state.sortType);
  const sortedOffers = getSortedOffers(sortType, offersByCity);
  const location = offersByCity[0].city.location;

  const handleCardMouseEnter = (offerId: string) => {
    const currentOffer = offersByCity.find((offer) => offer.id === offerId);
    setSelectedOffer(currentOffer);
  };

  const handleCardMouseLeave = () => {
    setSelectedOffer(undefined);
  };

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offersByCity.length} place{addPluralEnding(offersByCity.length)} to stay in {activeCity}</b>
          <SortOptions />
          <div className="cities__places-list places__list tabs__content">
            {(offersByCity) &&
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
        <div className="cities__right-section">
          <Map offers={sortedOffers} selectedOffer={selectedOffer} location={location} block='cities'></Map>
        </div>
      </div>
    </div>
  );
}

export default Cities;
