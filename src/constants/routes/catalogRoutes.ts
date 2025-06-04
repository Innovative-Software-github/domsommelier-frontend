export type TProductType =
  | 'wine'
  | 'champagne'
  | 'strong-drinks'
  | 'low-alcohol'
  | 'snacks'
  | 'accessories';

export const productTypeLabels: Record<TProductType, string> = {
  wine: 'Вина',
  champagne: 'Шампанское и игристые вина',
  'strong-drinks': 'Крепкие напитки',
  'low-alcohol': 'Слабоалкогольные напитки',
  snacks: 'Закуски',
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
    productType: 'wine',
    isPrimary: false,
  },
  champagne: {
    href: '/catalog/champagne',
    label: 'Шампанское и игристые вина',
    productType: 'champagne',
    isPrimary: false,
  },
  'strong-drinks': {
    href: '/catalog/strong-drinks',
    label: 'Крепкие напитки',
    productType: 'strong-drinks',
    isPrimary: false,
  },
  'low-alcohol': {
    href: '/catalog/low-alcohol',
    label: 'Слабоалкогольные напитки',
    productType: 'low-alcohol',
    isPrimary: false,
  },
  snacks: {
    href: '/catalog/snacks',
    label: 'Закуски',
    productType: 'snacks',
    isPrimary: false,
  },
  accessories: {
    href: '/catalog/accessories',
    label: 'Аксессуары',
    productType: 'accessories',
    isPrimary: false,
  },
} as const;
