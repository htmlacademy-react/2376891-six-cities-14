import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TDataProcess } from '../../types/state';
import {
  fetchOffersAction, fetchOfferAction, fetchNearPlacesAction,
  fetchFavoritesAction,
  fetchReviewsAction,
  addNewReviewAction
} from '../api-actions';

const initialState: TDataProcess = {
  offers: [],
  offer: null,
  nearPlaces: [],
  favorites: [],
  reviews: [],
  isNewReviewPosted: false,
  isOffersLoading: false,
  isOfferLoading: false,
  hasError: false,
};

export const dataProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.offers = [];
        state.isOffersLoading = false;
        state.hasError = true;
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferLoading = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.isOfferLoading = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.offer = null;
        state.isOfferLoading = false;
      })
      .addCase(fetchNearPlacesAction.fulfilled, (state, action) => {
        state.nearPlaces = action.payload;
      })
      .addCase(fetchNearPlacesAction.rejected, (state) => {
        state.nearPlaces = [];
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.favorites = [];
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isNewReviewPosted = false;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.reviews = [];
      })
      .addCase(addNewReviewAction.fulfilled, (state) => {
        state.isNewReviewPosted = true;
      })
      .addCase(addNewReviewAction.rejected, (state) => {
        state.isNewReviewPosted = false;
      });
  }
});
