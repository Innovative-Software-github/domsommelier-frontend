import { IStore } from "../interfaces";

export const productCardsSelector = (state: IStore) => state.productCards.cards;
export const productCardsLoadingSelector = (state: IStore) => state.productCards.isLoading;
export const productCardsInitialLoadedSelector = (state: IStore) => state.productCards.isInitiallyLoad;
