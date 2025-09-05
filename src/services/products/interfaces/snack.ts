import type { IBaseProduct } from './base';

export interface ISnackDetails {
  category: string;
  pairings?: string[];
  producer?: string;
}

export type TSnackProduct = IBaseProduct<'snack', ISnackDetails>;
