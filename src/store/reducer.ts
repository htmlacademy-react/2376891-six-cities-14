import { createReducer } from '@reduxjs/toolkit';
import {
  setActiveCity,
  loadOffers,
  loadOffer,
  // loadNearPlaces,
  // loadReviews,
  dropOffer,
  loadFavorites,
  setSortType,
  requireAuthorization,
  setError,
  setOffersDataLoadingStatus
} from './action';
import { AuthorizationStatus, DEFAULT_CITY } from '../const';
import { TOffer, TOffers } from '../types/offer';
import { TReviews } from '../types/review';
import { SortOption } from '../const';

type TInitialState = {
  activeCity: string | null;
  offers: TOffers;
  offer: null | TOffer;
  nearPlaces: TOffers;
  reviews: TReviews;
  favorites: TOffers;
  sortType: string | null;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  isOffersDataLoading: boolean;
}

const initialState: TInitialState = {
  activeCity: DEFAULT_CITY,
  offers: [],
  offer: null,
  nearPlaces: [],
  reviews: [],
  favorites: [],
  sortType: SortOption.Popular,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isOffersDataLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveCity, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadOffer, (state, action) => {
      state.offer = state.offers.find((offer) => offer.id === action.payload) ?? null;
    })
    // .addCase(loadNearPlaces, (state, action) => {
    //   state.nearPlaces = offers.filter((offer) => offer.id !== action.payload);
    // })
    // .addCase(loadReviews, (state) => {
    //   state.reviews = reviews;
    // })
    .addCase(dropOffer, (state) => {
      state.offer = null;
      state.nearPlaces = [];
    })
    .addCase(loadFavorites, (state) => {
      state.favorites = state.offers.filter((offer) => offer.isFavorite);
    })
    .addCase(setSortType, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    });
});

export { reducer };
