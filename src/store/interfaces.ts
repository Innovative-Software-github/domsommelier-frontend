import { IFiltersConfigResponse } from '../services/filters/interfaces';

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
  filtersConfig: IFiltersConfigResponse | null;
}

export interface IStore extends IServerData {}
