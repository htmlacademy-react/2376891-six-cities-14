import { useState } from 'react';
import { TOffer } from '../types/offer';

type TUseCities = [TOffer | undefined, (offer: TOffer | undefined) => void];

export const useCities = ():TUseCities => {
  const [selectedOffer, setSelectedOffer] = useState<TOffer | undefined>(undefined);

  const handleSelectedOfferChange = (offer: TOffer | undefined) => {
    setSelectedOffer(offer);
  };

  return [selectedOffer, handleSelectedOfferChange];
};
