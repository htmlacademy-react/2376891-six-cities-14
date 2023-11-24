import { createReducer } from '@reduxjs/toolkit';
import {
  setActiveCity,
  loadOffers,
  loadOffer,
  loadNearPlaces,
  loadReviews,
  dropOffer,
  loadFavorites,
  setSortType,
  requireAuthorization,
  setError,
  setOffersLoadingStatus,
  setOfferLoadingStatus,
  setNewReviewPostingStatus,
  setUser
} from './action';
import { AuthorizationStatus, DEFAULT_CITY } from '../const';
import { TOffer, TOffers } from '../types/offer';
import { TReviews } from '../types/review';
import { SortingOption } from '../const';
import { TUserData } from '../types/user-data';

type TInitialState = {
  activeCity: string;
  offers: TOffers;
  offer: null | TOffer;
  nearPlaces: TOffers;
  reviews: TReviews;
  favorites: TOffers;
  sortType: string | null;
  authorizationStatus: AuthorizationStatus;
  user: TUserData | null;
  error: string | null;
  isOffersLoading: boolean;
  isOfferLoading: boolean;
  isNewReviewPosted: boolean;
}

const initialState: TInitialState = {
  activeCity: DEFAULT_CITY,
  offers: [],
  offer: null,
  nearPlaces: [],
  reviews: [],
  favorites: [],
  sortType: SortingOption.Popular,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  error: null,
  isOffersLoading: false,
  isOfferLoading: false,
  isNewReviewPosted: false,
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
      state.offer = action.payload;
    })
    .addCase(loadNearPlaces, (state, action) => {
      state.nearPlaces = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(dropOffer, (state) => {
      state.offer = null;
      state.nearPlaces = [];
      state.reviews = [];
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
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    })
    .addCase(setOfferLoadingStatus, (state, action) => {
      state.isOfferLoading = action.payload;
    })
    .addCase(setNewReviewPostingStatus, (state, action) => {
      state.isNewReviewPosted = action.payload;
    });
});

export { reducer };
