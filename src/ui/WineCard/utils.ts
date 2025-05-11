import { IWineCardDescription } from './WineCard';

export const formatWineDescription = (wine: IWineCardDescription): string => {
  return `${wine.country}, ${wine.color}, ${wine.sweetness}, ${wine.displacement}л`;
};
