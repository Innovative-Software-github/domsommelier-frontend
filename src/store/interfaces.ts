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

export interface IServerData {}

export interface IStore extends IServerData {}
