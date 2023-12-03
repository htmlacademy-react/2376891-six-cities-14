import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, DEFAULT_CITY, SortingOption } from '../../const';
import { TAppProcess } from '../../types/state';

const initialState: TAppProcess = {
  activeCity: DEFAULT_CITY,
  offer: null,
  nearPlaces: [],
  reviews: [],
  sortType: SortingOption.Popular,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setActiveCity: (state, action: PayloadAction<string | null>) => {
      state.activeCity = action.payload;
    },
    dropOffer: (state) => {
      state.offer = null;
      state.nearPlaces = [];
      state.reviews = [];
    },
    setSortType: (state, action: PayloadAction<string | null>) => {
      state.sortType = action.payload;
    },
  },
});

export const {setActiveCity, dropOffer, setSortType} = appProcess.actions;
