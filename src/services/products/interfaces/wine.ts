import type { IBaseProduct, IBaseProductCard } from './base';

export interface IWineDetails {
  productionYear: number;
  color: string;
  type?: string;
  grapes: string[];
  producer?: string;
  volume?: string;
  features?: string[];
}

export interface IWineProductCard extends IBaseProductCard,
  Pick<IWineDetails, 'color' | 'type' | 'volume'> {}

export type TWineProduct = IBaseProduct<'wine', IWineDetails>;
