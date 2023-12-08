import { NameSpace } from '../../const';
import { TState } from '../../types/state';
import { TOffers } from '../../types/offer';

export const getActiveCity = (state: TState): string => state[NameSpace.App].activeCity;
export const getSortType = (state: TState): string | null => state[NameSpace.App].sortType;
export const getOffersByCity = (state: TState): TOffers => state[NameSpace.App].offersByCity;
