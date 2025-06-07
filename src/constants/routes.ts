import { TProductType } from './productTypes';

// TODO: Подумать на счет задания единых названий для роутов

export const ROUTES = {
  home: '/',
  catalog: '/catalog',
  about: '/about',
  events: '/events',
  contacts: '/contacts',
  degustation: '/degustation',
  investments: '/investments',
  privacyPolicy: '/privacy-policy',
  search: '/search',
  product: '/product',
} as const;

export const PRODUCT_TYPES_SEGMENTS: Readonly<Record<TProductType, string>> = {
  wine: '/catalog/wine',
  champagne_and_sparkling: '/catalog/champagne_and_sparkling',
  spirit: '/catalog/spirit',
  low_alcohol: '/catalog/low_alcohol',
  snack: '/catalog/snack',
  accessories: '/catalog/accessories',
} as const;

export type TProductTypesSegments =
  typeof PRODUCT_TYPES_SEGMENTS[keyof typeof PRODUCT_TYPES_SEGMENTS];
