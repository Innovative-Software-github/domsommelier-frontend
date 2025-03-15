import * as Icons from './Icons/Icons';

export enum IconType {
  Search_24 = 'Search_24',
  Heart_24 = 'Heart_24',
  Basket_24 = 'Basket_24',
  Profile_24 = 'Profile_24',
}

export const iconToComponent: Record<IconType, React.JSX.Element> = {
  [IconType.Search_24]: Icons.Search_24,
  [IconType.Heart_24]: Icons.Heart_24,
  [IconType.Basket_24]: Icons.Basket_24,
  [IconType.Profile_24]: Icons.Profile_24,
};
