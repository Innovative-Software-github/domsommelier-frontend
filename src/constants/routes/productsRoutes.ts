export const productType = {
  wine: 'wine',
  spirit: 'spirit',
  accessories: 'accessories',
  snack: 'snack',
  low_alcohol: 'low_alcohol',
  champagne_and_sparkling: 'champagne_and_sparkling',
} as const;

export type TProductType = typeof productType[keyof typeof productType];

export const productTypeLabels: Record<TProductType, string> = {
  wine: 'Вина',
  champagne_and_sparkling: 'Шампанское и игристые вина',
  spirit: 'Крепкие напитки',
  low_alcohol: 'Слабоалкогольные напитки',
  snack: 'Закуски',
  accessories: 'Аксессуары',
};

export interface ICatalogRoute {
  href: string;
  label: string;
  isPrimary: boolean;
  productType?: TProductType;
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
    href: '/stock',
    label: '% Акции',
    isPrimary: true,
  },
  degustation: {
    href: '/degustation',
    label: 'Дегустации',
    isPrimary: true,
  },
  wine: {
    href: '/catalog/wine',
    label: 'Вина',
    productType: productType.wine,
    isPrimary: false,
  },
  champagne: {
    href: '/catalog/champagne',
    label: 'Шампанское и игристые вина',
    productType: productType.champagne_and_sparkling,
    isPrimary: false,
  },
  'strong-drinks': {
    href: '/catalog/strong-drinks',
    label: 'Крепкие напитки',
    productType: productType.spirit,
    isPrimary: false,
  },
  'low-alcohol': {
    href: '/catalog/low-alcohol',
    label: 'Слабоалкогольные напитки',
    productType: productType.low_alcohol,
    isPrimary: false,
  },
  snacks: {
    href: '/catalog/snacks',
    label: 'Закуски',
    productType: productType.snack,
    isPrimary: false,
  },
  accessories: {
    href: '/catalog/accessories',
    label: 'Аксессуары',
    productType: productType.accessories,
    isPrimary: false,
  },
} as const;
