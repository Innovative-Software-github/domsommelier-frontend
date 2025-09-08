import { IFiltersConfigResponse } from "../services/filters/interfaces";
import { IProductCardsState } from "./products/reducers";

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
}

export interface IStoreItemState {
  isLoading: boolean;
  error: TAPIError;
}
