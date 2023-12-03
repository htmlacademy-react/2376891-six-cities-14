export const OFFER_IMAGES_COUNT = 6;
export const MAX_NEAR_PLACES_COUNT = 3;
export const MAX_REVIEWS_COUNT = 10;
export const DEFAULT_CITY = 'Paris';

export const CityName = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
] as const;

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offers',
  NotFound = '/404',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const SortingOption = {
  Popular: 'Popular',
  LowToHigh: 'Price: low to high',
  HighToLow: 'Price: high to low',
  TopRatedFirst: 'Top rated first',
} as const;

export enum APIRoute {
  Offers = '/offers',
  Offer = '/offers/',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments/',
  Favorite = '/favorite',
}

export enum NameSpace {
  Data = 'DATA',
  User = 'USER',
  App = 'APP',
}

export const Rating = {
  '5': 'perfect',
  '4': 'good',
  '3': 'not bad',
  '2': 'badly',
  '1': 'terribly',
};
