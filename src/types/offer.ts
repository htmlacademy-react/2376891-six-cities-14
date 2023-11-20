export type TLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type TCity = {
  name: string;
  location: TLocation;
};

export type THost = {
  id: number;
  name: string;
  isPro: boolean;
  avatarUrl: string;
};

export type TOffer = {
  city: TCity;
  previewImage: string;
  images: string[];
  title: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  type: string;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  host: THost;
  description: string;
  location: TLocation;
  id: string;
};

export type TOffers = TOffer[];
