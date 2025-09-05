import type { IBaseProduct, IBaseProductCard } from './base';

export interface ILowAlcoholDetails {
  category: string;
  producer: string;
  volume: string;
  strength: string;
  features: string[];
}

export interface ILowAlcoholProductCard extends IBaseProductCard,
  Pick<ILowAlcoholDetails, 'category' | 'strength' | 'volume'> {}

export type TLowAlcoholProduct = IBaseProduct<'low_alcohol', ILowAlcoholDetails>;
