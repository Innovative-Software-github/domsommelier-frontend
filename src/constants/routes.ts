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

export const PRODUCT_TYPES_ROUTES = {
  stock: '/stock',
  degustation: '/degustation',
  wine: '/catalog/wine',
  champagne: '/catalog/champagne_and_sparkling',
  'strong-drinks': '/catalog/spirit',
  'low-alcohol': '/catalog/low_alcohol',
  snacks: '/catalog/snack',
  accessories: '/catalog/accessories',
} as const;