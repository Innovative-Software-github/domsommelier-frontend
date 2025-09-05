import type { IBaseProduct, IBaseProductCard } from './base';

export interface ISnackDetails {
  category: string;
  pairings?: string[];
  producer?: string;
}

export interface ISnackProductCard extends IBaseProductCard, Pick<ISnackDetails, 'category' | 'pairings' | 'producer'> {}

export type TSnackProduct = IBaseProduct<'snack', ISnackDetails>;
