import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TDataProcess } from '../../types/state';
import {
  fetchOffersAction,
  fetchOfferAction,
  fetchNearPlacesAction,
  fetchFavoritesAction,
  changeOfferFavoriteStatus,
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
  isOffersChanged: false,
};

export const dataProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setOfferChangedStatus: (state, action: PayloadAction<boolean>) => {
      state.isOffersChanged = action.payload;
    },
    setNewReviewPostedStatus: (state, action: PayloadAction<boolean>) => {
      state.isNewReviewPosted = action.payload;
    },
  },
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
      .addCase(changeOfferFavoriteStatus.fulfilled, (state, action) => {
        state.favorites = action.payload['newFavoritesOffers'];
        if (action.payload['newOffers']) {
          state.offers = action.payload['newOffers'];
        }
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isNewReviewPosted = false;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.reviews = [];
      })
      .addCase(addNewReviewAction.pending, (state) => {
        state.isOffersChanged = true;
        state.isNewReviewPosted = false;
      })
      .addCase(addNewReviewAction.fulfilled, (state, action) => {
        state.isNewReviewPosted = true;
        state.isOffersChanged = false;
        state.reviews.push(action.payload);
      })
      .addCase(addNewReviewAction.rejected, (state) => {
        state.isNewReviewPosted = false;
        state.isOffersChanged = false;
      });
  }
});

export const {setOfferChangedStatus, setNewReviewPostedStatus} = dataProcess.actions;
