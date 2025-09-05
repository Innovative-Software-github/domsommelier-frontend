import type { IBaseProduct, IBaseProductCard } from './base';

export interface ISpiritDetails {
  category: string;
  strength: string;
  producer?: string;
  volume?: string;
  features?: string[];
}

export interface ISpiritProductCard extends IBaseProductCard<'spirit'>,
  Pick<ISpiritDetails, 'category' | 'strength' | 'volume'> {}

export type TSpiritProduct = IBaseProduct<'spirit', ISpiritDetails>;
