import { IStore } from '../interfaces';

export const currentCitySelector = (state: IStore) => state.city?.currentCity;
export const citiesSelector = (state: IStore) => state.city?.cities || [];
