import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOffers, TOffer } from '../types/offer';
import { TReviews } from '../types/review';
import { TReviewToPost } from '../types/review-to-post';
import {
  loadOffers,
  loadOffer,
  loadNearPlaces,
  loadReviews,
  requireAuthorization,
  setUser,
  setError,
  setOffersLoadingStatus,
  setOfferLoadingStatus,
  setNewReviewPostingStatus,
  redirectToRoute
} from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AuthorizationStatus, AppRoute, TIMEOUT_SHOW_ERROR } from '../const';
import { TLoginData } from '../types/login-data';
import { TUserData } from '../types/user-data';
import { store } from '.';

type TExtra = {
  extra: AxiosInstance;
}

export const clearErrorAction = createAsyncThunk(
  'error/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchOffersAction = createAsyncThunk<void, undefined, TExtra>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    try {
      dispatch(setOffersLoadingStatus(true));
      const { data } = await api.get<TOffers>(APIRoute.Offers);
      dispatch(loadOffers(data));
    } finally {
      dispatch(setOffersLoadingStatus(false));
    }
  },
);

export const fetchOfferAction = createAsyncThunk<void, TOffer['id'], TExtra>(
  'data/fetchOffer',
  async (offerId, { dispatch, extra: api }) => {
    try {
      dispatch(setOfferLoadingStatus(true));
      const { data } = await api.get<TOffer>(`${APIRoute.Offer}${offerId}`);
      dispatch(loadOffer(data));
    } finally {
      dispatch(setOfferLoadingStatus(false));
    }
  },
);

export const fetchNearPlacesAction = createAsyncThunk<void, TOffer['id'], TExtra>(
  'data/fetchNearPlaces',
  async (offerId, { dispatch, extra: api }) => {
    const { data } = await api.get<TOffers>(`${APIRoute.Offer}${offerId}/nearby`);
    dispatch(loadNearPlaces(data));
  },
);

export const fetchReviewsAction = createAsyncThunk<void, TOffer['id'], TExtra>(
  'data/fetchReviews',
  async (offerId, { dispatch, extra: api }) => {
    const { data } = await api.get<TReviews>(`${APIRoute.Comments}${offerId}`);
    dispatch(loadReviews(data));
    dispatch(setNewReviewPostingStatus(false));
  },
);

export const addNewReviewAction = createAsyncThunk<void, [TOffer['id'], TReviewToPost], TExtra>(
  'data/postReview',
  async ([id, formData], { dispatch, extra: api }) => {
    await api.post<TReviewToPost>(`${APIRoute.Comments}${id}`, formData);
    dispatch(setNewReviewPostingStatus(true));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, TExtra>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<TUserData>(APIRoute.Login);
      dispatch(setUser(data));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, TLoginData, TExtra>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<TUserData>(APIRoute.Login, { email, password });
      saveToken(data.token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUser(data));
      dispatch(redirectToRoute(AppRoute.Root));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, TExtra>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setUser(null));
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
