import { createReducer } from '@reduxjs/toolkit';
import { setCurrentCity, setCities } from './actions';
import { ICityState } from './interfaces';

const initialState: ICityState = {
  currentCity: null,
  cities: [],
};

export const cityReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCurrentCity, (state, { payload }) => {
      state.currentCity = payload;
    })
    .addCase(setCities, (state, { payload }) => {
      state.cities = payload;
    });
});

