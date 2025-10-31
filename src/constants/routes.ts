

export const ROUTES = {
  home: '/',
  catalog: '/catalog',
  about: '/about',
  events: '/events',
  contacts: '/contacts',
  degustation: '/degustation',
  investments: '/investments',
  privacyPolicy: '/privacy-policy',
  basket: '/basket',
  checkout: '/checkout',
  search: '/search',
  product: '/product',
} as const;

export const PRODUCT_TYPES_SEGMENTS = {
  wine: '/catalog/wine',
  champagne_and_sparkling: '/catalog/champagne_and_sparkling',
  spirit: '/catalog/spirit',
  low_alcohol: '/catalog/low_alcohol',
  snack: '/catalog/snack',
  accessories: '/catalog/accessories',
} as const;

export type TProductTypesSegments =
  typeof PRODUCT_TYPES_SEGMENTS[keyof typeof PRODUCT_TYPES_SEGMENTS];

export const getProductUrl = (productId: string): string => {
  return `${ROUTES.product}/${productId}`;
};
