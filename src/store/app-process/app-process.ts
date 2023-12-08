import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, DEFAULT_CITY, SortingOption } from '../../const';
import { TAppProcess } from '../../types/state';
import { TOffers } from '../../types/offer';

const initialState: TAppProcess = {
  activeCity: DEFAULT_CITY,
  offer: null,
  reviews: [],
  sortType: SortingOption.Popular,
  offersByCity: [],
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setActiveCity: (state, action: PayloadAction<string>) => {
      state.activeCity = action.payload;
    },
    dropOffer: (state) => {
      state.offer = null;
      state.reviews = [];
    },
    setSortType: (state, action: PayloadAction<string | null>) => {
      state.sortType = action.payload;
    },
    setOffersByCity: (state, action: PayloadAction<TOffers>) => {
      state.offersByCity = action.payload;
    }
  },
});

export const {setActiveCity, dropOffer, setSortType, setOffersByCity} = appProcess.actions;
