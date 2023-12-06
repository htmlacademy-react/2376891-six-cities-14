import { store } from '../store/index.ts';
import { AuthorizationStatus } from '../const.ts';
import { TUserData } from './user-data.ts';
import { TOffers, TOffer } from './offer.ts';
import { TReviews } from './review.ts';

export type TUserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: TUserData | null;
};

export type TDataProcess = {
  offers: TOffers;
  offer: TOffer | null;
  nearPlaces: TOffers;
  favorites: TOffers;
  reviews: TReviews;
  isNewReviewPosted: boolean;
  isOffersLoading: boolean;
  isOfferLoading: boolean;
  hasError: boolean;
  isOffersChanged: boolean;
}

export type TAppProcess = {
  activeCity: string;
  offer: TOffer | null;
  nearPlaces: TOffers;
  reviews: TReviews;
  sortType: string | null;
}

export type TState = ReturnType<typeof store.getState>;

export type TAppDispatch = typeof store.dispatch;
