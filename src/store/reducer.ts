import { createReducer } from '@reduxjs/toolkit';
import { setActiveCity, fetchOffers, fetchOffer, fetchNearPlaces, fetchReviews, dropOffer, fetchFavorites } from './action';
import { DEFAULT_CITY } from '../const';
import { offers } from '../mocks/offers';
import { reviews } from '../mocks/reviews';
import { TOffer, TOffers } from '../types/offer';
import { TReviews } from '../types/review';

type TInitialState = {
  activeCity: string | null;
  offers: TOffers;
  offer: null | TOffer;
  nearPlaces: TOffers;
  reviews: TReviews;
  favorites: TOffers;
}

const initialState: TInitialState = {
  activeCity: DEFAULT_CITY,
  offers: [],
  offer: null,
  nearPlaces: [],
  reviews: [],
  favorites: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveCity, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(fetchOffers, (state) => {
      state.offers = offers;
    })
    .addCase(fetchOffer, (state, action) => {
      state.offer = state.offers.find((offer) => offer.id === action.payload) ?? null;
    })
    .addCase(fetchNearPlaces, (state, action) => {
      state.nearPlaces = offers.filter((offer) => offer.id !== action.payload);
    })
    .addCase(fetchReviews, (state) => {
      state.reviews = reviews;
    })
    .addCase(dropOffer, (state) => {
      state.offer = null;
      state.nearPlaces = [];
    })
    .addCase(fetchFavorites, (state) => {
      state.favorites = state.offers.filter((offer) => offer.isFavorite);
    });
});

export { reducer };
