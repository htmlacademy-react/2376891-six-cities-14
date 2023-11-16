import { Review } from '../types/review';

export const reviews: Review[] = [
  {
    id: 1,
    user: {
      id: 16,
      isPro: true,
      name: 'Mollie',
      avatarUrl: 'https://14.react.pages.academy/static/avatar/7.jpg'
    },
    rating: 3,
    comment: 'Home is amazing. It\'s like staying in a museum. The rooms, furnishings and artworks are incredible. The views of My Vesuvius',
    date: '2023-09-21T09:23:20.316Z'
  },
  {
    id: 2,
    user: {
      id: 15,
      isPro: false,
      name: 'Kendall',
      avatarUrl: 'https://14.react.pages.academy/static/avatar/6.jpg'
    },
    rating: 4,
    comment: 'Home is amazing. It\'s like staying in a museum. The rooms, furnishings and artworks are incredible. The views of My Vesuvius',
    date: '2023-10-02T09:23:20.316Z'
  },
  {
    id: 3,
    user: {
      id: 14,
      isPro: true,
      name: 'Corey',
      avatarUrl: 'https://14.react.pages.academy/static/avatar/5.jpg'
    },
    rating: 4,
    comment: 'Beautiful space, fantastic location and atmosphere, really a wonderful place to spend a few days. Will be back.',
    date: '2023-09-09T09:23:20.316Z'
  },
  {
    id: 4,
    user: {
      id: 13,
      isPro: false,
      name: 'Zak',
      avatarUrl: 'https://14.react.pages.academy/static/avatar/4.jpg'
    },
    rating: 3,
    comment: 'What an amazing view! The house is stunning and in an amazing location. The large glass wall had an amazing view of the river!',
    date: '2023-09-09T09:23:20.316Z'
  }
];
