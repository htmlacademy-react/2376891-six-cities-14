export type TUser = {
  id: number;
  isPro: boolean;
  name: string;
  avatarUrl: string;
};

export type TReview = {
  id: number;
  user: TUser;
  rating: number;
  comment: string;
  date: string;
};

export type TReviews = TReview[];
