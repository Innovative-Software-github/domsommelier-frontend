import { IStore } from "../interfaces";

export const productCardsSelector = (state: IStore) => state.productCards.cards;
export const productCardsLoadingSelector = (state: IStore) => state.productCards.isLoading;
