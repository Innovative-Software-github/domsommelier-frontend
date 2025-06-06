import * as Icons from './Icons/Icons';

export enum IconType {
  Search_24 = 'Search_24',
  Heart_24 = 'Heart_24',
  Basket_24 = 'Basket_24',
  Profile_24 = 'Profile_24',
  CheckboxArrow_10 = 'CheckboxArrow_10',
  Hamburger_24 = 'Hamburger_24',
  ArrowDown_24 = 'ArrowDown_24',
  ArrowRight_24 = 'ArrowRight_24',
  ArrowUpRight_24 = 'ArrowUpRight_24',
  ArrowUpRight_40 = 'ArrowUpRight_40',
  ArrowUpRight_80 = 'ArrowUpRight_80',
  Filters_24 = 'Filters_24',
  Cancel_24 = 'Cancel_24',
}

export const iconToComponent: Record<IconType, React.JSX.Element> = {
  [IconType.Search_24]: Icons.Search_24,
  [IconType.Heart_24]: Icons.Heart_24,
  [IconType.Basket_24]: Icons.Basket_24,
  [IconType.Profile_24]: Icons.Profile_24,
  [IconType.CheckboxArrow_10]: Icons.CheckboxArrow_10,
  [IconType.Hamburger_24]: Icons.Hamburger_24,
  [IconType.ArrowDown_24]: Icons.ArrowDown_24,
  [IconType.ArrowRight_24]: Icons.ArrowRight_24,
  [IconType.ArrowUpRight_24]: Icons.ArrowUpRight_24,
  [IconType.ArrowUpRight_40]: Icons.ArrowUpRight_40,
  [IconType.ArrowUpRight_80]: Icons.ArrowUpRight_80,
  [IconType.Filters_24]: Icons.Filters_24,
  [IconType.Cancel_24]: Icons.Cancel_24,
};
