import { createReducer } from '@reduxjs/toolkit';
import { TProductCard } from '../../services/products/interfaces/base';
import { getFilteredProductsRequest, setInitialProductCards } from './actions';
import { IStoreItemState } from '../interfaces';
import { addFulfilledState, addPendingState, addRejectState } from '../utils';

export type TStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface IProductCardsState extends IStoreItemState {
  cards: TProductCard[];
  isInitiallyLoad: boolean;
  /** Текущая загруженная страница (0-based). */
  page: number;
  totalPages: number;
  totalElements: number;
  /** true — текущая страница последняя (нечего догружать). */
  last: boolean;
}

const initialState: IProductCardsState = {
  cards: [],
  // false до первой загрузки — иначе при SSR/первом рендере мигает «Ничего не найдено»
  isInitiallyLoad: false,
  isLoading: false,
  error: null,
  page: 0,
  totalPages: 0,
  totalElements: 0,
  last: true,
};

export const productCards = createReducer(initialState, (builder) => {
  builder
    .addCase(getFilteredProductsRequest.pending, (state) => addPendingState(state))
    .addCase(getFilteredProductsRequest.fulfilled, (state, action) => {
      const { content, number, totalPages, totalElements, last } = action.payload;
      // append — «Показать ещё» (добавляем в конец), иначе заменяем список
      state.cards = action.meta.arg.mode === 'append' ? [...state.cards, ...content] : content;
      state.page = number;
      state.totalPages = totalPages;
      state.totalElements = totalElements;
      state.last = last;
      state.isInitiallyLoad = true;

      addFulfilledState(state);
    })
    .addCase(getFilteredProductsRequest.rejected, (state, { payload }) => {
      addRejectState(state, { payload, type: getFilteredProductsRequest.rejected.type });
    })
    .addCase(setInitialProductCards, (state, { payload }) => {
      state.cards = payload.content;
      state.page = payload.number;
      state.totalPages = payload.totalPages;
      state.totalElements = payload.totalElements;
      state.last = payload.last;
      state.isInitiallyLoad = true;
    });
});

export default productCards;
