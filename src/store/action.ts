import { createAction } from '@reduxjs/toolkit';
import { TOffer, TOffers } from '../types/offer';
import { AppRoute, AuthorizationStatus } from '../const';

export const setActiveCity = createAction<string | null>('setActiveCity');

export const loadOffers = createAction<TOffers>('offers/fetchOffers');

export const loadOffer = createAction<TOffer['id']>('offer/fetchOffer');

export const loadNearPlaces = createAction<TOffer['id']>('nearPlaces/fetchNearPlaces');

export const loadReviews = createAction('reviews/fetchReviews');

export const dropOffer = createAction('offer/dropOffer');

export const loadFavorites = createAction('favorites/fetchFavorites');

export const setSortType = createAction<string | null>('sortTypes/setSortType');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string | null>('error/setError');

export const setOffersDataLoadingStatus = createAction<boolean>('offers/setOffersDataLoadingStatus');

export const redirectToRoute = createAction<AppRoute>('data/redirectToRoute');
