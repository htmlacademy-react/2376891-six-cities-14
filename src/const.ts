export const OFFER_IMAGES_COUNT = 6;
export const MAX_NEAR_PLACES_COUNT = 3;
export const MAX_REVIEWS_COUNT = 10;
export const DEFAULT_CITY = 'Paris';

export const cities = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const Rating = {
  '1': 'terribly',
  '2': 'badly',
  '3': 'not bad',
  '4': 'good',
  '5': 'perfect',
};
