import { IWineCardDescription } from './ProductCard';

export const formatWineDescription = (wine: IWineCardDescription): string => {
  return `${wine.country}, ${wine.color}, ${wine.sweetness}, ${wine.displacement}л`;
};
