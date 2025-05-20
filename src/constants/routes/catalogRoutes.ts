export type TDrinkType =
  | 'wine'
  | 'champagne'
  | 'strong-drinks'
  | 'low-alcohol'
  | 'snacks'
  | 'accessories';

export interface ICatalogRoute {
  href: string;
  label: string;
  isPrimary: boolean;
  drinkType?: TDrinkType;
}

export type CatalogRouteKey =
  | 'stock'
  | 'degustation'
  | 'wine'
  | 'champagne'
  | 'strong-drinks'
  | 'low-alcohol'
  | 'snacks'
  | 'accessories';

export const catalogRoutes: Readonly<Record<CatalogRouteKey, ICatalogRoute>> = {
  stock: {
    href: '/catalog/stock',
    label: '% Акции',
    isPrimary: true,
  },
  degustation: {
    href: '/catalog/degustation',
    label: 'Дегустации',
    isPrimary: true,
  },
  wine: {
    href: '/catalog/wine',
    label: 'Вина',
    drinkType: 'wine',
    isPrimary: false,
  },
  champagne: {
    href: '/catalog/champagne',
    label: 'Шампанское и игристые вина',
    drinkType: 'champagne',
    isPrimary: false,
  },
  'strong-drinks': {
    href: '/catalog/strong-drinks',
    label: 'Крепкие напитки',
    drinkType: 'strong-drinks',
    isPrimary: false,
  },
  'low-alcohol': {
    href: '/catalog/low-alcohol',
    label: 'Слабоалкогольные напитки',
    drinkType: 'low-alcohol',
    isPrimary: false,
  },
  snacks: {
    href: '/catalog/snacks',
    label: 'Закуски',
    drinkType: 'snacks',
    isPrimary: false,
  },
  accessories: {
    href: '/catalog/accessories',
    label: 'Аксессуары',
    drinkType: 'accessories',
    isPrimary: false,
  },
} as const;