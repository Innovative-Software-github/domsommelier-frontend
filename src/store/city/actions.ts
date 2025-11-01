import { createAction } from '@reduxjs/toolkit';
import { ICity } from './interfaces';

export const setCurrentCity = createAction<ICity>('city/setCurrentCity');
export const setCities = createAction<ICity[]>('city/setCities');

