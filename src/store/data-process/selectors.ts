import { NameSpace } from '../../const';
import { TState } from '../../types/state';
import { TOffer, TOffers } from '../../types/offer';
import { TReviews } from '../../types/review';

export const getOffers = (state: TState): TOffers => state[NameSpace.Data].offers;
export const getOffer = (state: TState): TOffer | null => state[NameSpace.Data].offer;
export const getNearPlaces = (state: TState): TOffers => state[NameSpace.Data].offers;
export const getFavorites = (state: TState): TOffers => state[NameSpace.Data].favorites;
export const getReviews = (state: TState): TReviews => state[NameSpace.Data].reviews;
export const getNewReviewPostingStatus = (state: TState): boolean => state[NameSpace.Data].isNewReviewPosted;
export const getOffersLoadingStatus = (state: TState): boolean => state[NameSpace.Data].isOffersLoading;
export const getOfferLoadingStatus = (state: TState): boolean => state[NameSpace.Data].isOfferLoading;
export const getErrorStatus = (state: TState): boolean => state[NameSpace.Data].hasError;
export const getOffersChangedStatus = (state: TState): boolean => state[NameSpace.Data].isOffersChanged;
export const getOfferChangedStatus = (state: TState): boolean => state[NameSpace.Data].isOfferChanged;
