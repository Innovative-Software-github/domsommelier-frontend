export interface ICatalogLink {
  label: string;
  link: string;
  drinkType?: TDrinkType;
  isPrimary: boolean;
}

export type TDrinkType =
  | 'wine'
  | 'champagne'
  | 'strong-drinks'
  | 'low-alcohol'
  | 'snacks'
  | 'accessories';

export const catalogLinks: ICatalogLink[] = [
  {
    label: '% Акции',
    link: './stock',
    isPrimary: true,
  },
  {
    label: 'Дегустации',
    link: './degustation',
    isPrimary: true,
  },
  {
    label: 'Вина',
    link: '/catalog/wine',
    drinkType: 'wine',
    isPrimary: false,
  },
  {
    label: 'Шампанское и игристые вина',
    link: '/catalog/champagne',
    drinkType: 'champagne',
    isPrimary: false,
  },
  {
    label: 'Крепкие напитки',
    link: '/catalog/strong-drinks',
    drinkType: 'strong-drinks',
    isPrimary: false,
  },
  {
    label: 'Слабоалкогольные напитки',
    link: '/catalog/low-alcohol',
    drinkType: 'low-alcohol',
    isPrimary: false,
  },
  {
    label: 'Закуски',
    link: '/catalog/snacks',
    drinkType: 'snacks',
    isPrimary: false,
  },
  {
    label: 'Аксессуары',
    link: '/catalog/accessories',
    drinkType: 'accessories',
    isPrimary: false,
  },
] as const;
