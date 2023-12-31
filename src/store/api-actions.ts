import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOffers, TOffer } from '../types/offer';
import { TReview, TReviews } from '../types/review';
import { TReviewToPost } from '../types/review-to-post';
import { TLoginData } from '../types/login-data';
import { TUserData } from '../types/user-data';
import { redirectToRoute } from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AppRoute } from '../const';

type TExtra = {
  extra: AxiosInstance;
}

export const fetchOffersAction = createAsyncThunk<TOffers, undefined, TExtra>(
  'data/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TOffers>(APIRoute.Offers);
    return data;
  },
);

export const fetchOfferAction = createAsyncThunk<TOffer, TOffer['id'], TExtra>(
  'data/fetchOffer',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<TOffer>(`${APIRoute.Offers}/${offerId}`);
    return data;
  },
);

export const fetchNearPlacesAction = createAsyncThunk<TOffers, TOffer['id'], TExtra>(
  'data/fetchNearPlaces',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<TOffers>(`${APIRoute.Offers}/${offerId}/nearby`);
    return data;
  },
);

export const fetchFavoritesAction = createAsyncThunk<TOffers, undefined, TExtra>(
  'data/fetchFavorites',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TOffers>(`${APIRoute.Favorite}`);
    return data;
  },
);

export const changeOfferFavoriteStatus = createAsyncThunk<{
  newFavoritesOffers: TOffers;
  newOffers: TOffers;
}, {
  id: TOffer['id'];
  favoriteStatus: number;
  newData: {
    newFavoritesOffers: TOffers;
    newOffers: TOffers;
  };
}, TExtra>(
  'data/addOfferFavoriteStatus',
  async ({ id, favoriteStatus, newData }, { extra: api }) => {
    await api.post<TOffer['id']>(`${APIRoute.Favorite}/${id}/${favoriteStatus}`);
    return newData;
  }
);

export const fetchReviewsAction = createAsyncThunk<TReviews, TOffer['id'], TExtra>(
  'data/fetchReviews',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<TReviews>(`${APIRoute.Comments}${offerId}`);
    return data;
  },
);

export const addNewReviewAction = createAsyncThunk<TReview, [TOffer['id'], TReviewToPost], TExtra>(
  'data/postReview',
  async ([id, formData], { extra: api }) => {
    const data = await api.post<TReview>(`${APIRoute.Comments}${id}`, formData);
    return data.data;
  }
);

export const checkAuthAction = createAsyncThunk<TUserData, undefined, TExtra>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TUserData>(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<TUserData, TLoginData, TExtra>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<TUserData>(APIRoute.Login, { email, password });
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Root));
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, TExtra>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);
