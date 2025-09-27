import { AnyAction, createStore, Dispatch, ThunkDispatch } from "@reduxjs/toolkit";
import { IFiltersConfigResponse } from "../services/filters/interfaces";
import { IProductCardsState } from "./products/reducers";
import { IBasketReducer } from "./basket/reducers";

export type TAPIErrorDescriptor = {
  code: number;
  message: string;
};

export type TAPIError =
  | null
  | undefined
  | {
      error: TAPIErrorDescriptor | TAPIErrorDescriptor[];
    }
  | TAPIErrorDescriptor[];

export interface IServerData {
  filtersConfig: IFiltersConfigResponse;
}

export interface IStore extends IServerData {
  productCards: IProductCardsState;
  basketReducer: IBasketReducer
}

export interface IStoreItemState {
  isLoading: boolean;
  error: TAPIError;
}

export type TAppStore = ReturnType<typeof createStore>;

export type TRootState = TAppStore['getState'];
export type TAppDispatch = ThunkDispatch<IStore, undefined, AnyAction> &
  Dispatch<AnyAction>;

export interface IAsyncThunkConfig {
  dispatch: TAppDispatch;
  state: IStore;
  rejectValue: TAPIError;
}
