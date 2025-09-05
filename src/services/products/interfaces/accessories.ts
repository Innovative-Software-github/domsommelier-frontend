import type { IBaseProduct, IBaseProductCard } from './base';

export interface IAccessoriesDetails {
  producer?: string;
}

export type TAccessoriesProduct = IBaseProduct<'accessories', IAccessoriesDetails>;

export interface IAccessoriesProductCard extends IBaseProductCard, Pick<IAccessoriesDetails, 'producer'> {}
