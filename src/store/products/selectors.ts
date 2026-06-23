import { IStore } from "../interfaces";

export const productCardsSelector = (state: IStore) => state.productCards.cards;
export const productCardsLoadingSelector = (state: IStore) => state.productCards.isLoading;
export const productCardsInitialLoadedSelector = (state: IStore) => state.productCards.isInitiallyLoad;
export const productCardsPageSelector = (state: IStore) => state.productCards.page;
export const productCardsTotalPagesSelector = (state: IStore) => state.productCards.totalPages;
export const productCardsTotalElementsSelector = (state: IStore) => state.productCards.totalElements;
export const productCardsLastSelector = (state: IStore) => state.productCards.last;
