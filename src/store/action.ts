import { createAction } from '@reduxjs/toolkit';
import { TOffer } from '../types/offer';

export const setActiveCity = createAction<string | null>('setActiveCity');

export const fetchOffers = createAction('OFFERS/fetchOffers');

export const fetchOffer = createAction<TOffer['id']>('OFFER/fetchOffer');

export const fetchNearPlaces = createAction<TOffer['id']>('NEAR_PLACES/fetchNearPlaces');

export const fetchReviews = createAction('REVIEWS/fetchReviews');

export const dropOffer = createAction('OFFER/dropOffer');

export const fetchFavorites = createAction('FAVORITES/fetchFavorites');

export const setSortType = createAction<string | null>('SORT_TYPES/setSortType');
