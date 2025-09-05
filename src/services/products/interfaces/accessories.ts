import type { IBaseProduct } from './base';

export interface IAccessoriesDetails {
  producer?: string;
}

export type TAccessoriesProduct = IBaseProduct<'accessories', IAccessoriesDetails>;
