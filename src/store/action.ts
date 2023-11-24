import { createAction } from '@reduxjs/toolkit';
import { TOffer, TOffers } from '../types/offer';
import { TReviews } from '../types/review';
import { AppRoute, AuthorizationStatus } from '../const';
import { TUserData } from '../types/user-data';

export const loadOffers = createAction<TOffers>('offers/loadOffers');

export const loadOffer = createAction<TOffer>('offers/loadOffer');

export const dropOffer = createAction('offer/dropOffer');

export const loadNearPlaces = createAction<TOffers>('nearPlaces/loadNearPlaces');

export const loadFavorites = createAction('favorites/loadFavorites');

export const loadReviews = createAction<TReviews>('reviews/loadReviews');

export const setActiveCity = createAction<string>('offers/setActiveCity');

export const setSortType = createAction<string | null>('sortTypes/setSortType');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setUser = createAction<TUserData | null>('user/setUser');

export const setError = createAction<string | null>('page/setError');

export const setOffersLoadingStatus = createAction<boolean>('offers/setOffersLoadingStatus');

export const setOfferLoadingStatus = createAction<boolean>('offer/setOfferLoadingStatus');

export const setNewReviewPostingStatus = createAction<boolean>('reviews/setNewReviewPostingStatus');

export const redirectToRoute = createAction<AppRoute>('data/redirectToRoute');
