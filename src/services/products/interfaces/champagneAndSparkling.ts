import type { IBaseProduct, IBaseProductCard } from './base';

export interface IChampagneAndSparklingDetails {
  category: string;
  content: string;
  color: string;
  producer?: string;
  volume?: string;
  features?: string[];
}

export interface IChampagneAndSparklingProductCard extends IBaseProductCard,
  Pick<IChampagneAndSparklingDetails, 'category' | 'content' | 'color' | 'volume' | 'producer' | 'features'> {}

export type TChampagneAndSparklingProduct = IBaseProduct<'champagne_and_sparkling', IChampagneAndSparklingDetails>;
