export const productType = {
  wine: 'wine',
  spirit: 'spirit',
  accessories: 'accessories',
  snack: 'snack',
  low_alcohol: 'low_alcohol',
  champagne_and_sparkling: 'champagne_and_sparkling',
} as const;

export const productTypeArray = Object.values(productType);

export type TProductType = typeof productType[keyof typeof productType];

export const productTypeLabels: Record<TProductType, string> = {
  wine: 'Вина',
  champagne_and_sparkling: 'Шампанское и игристые вина',
  spirit: 'Крепкие напитки',
  low_alcohol: 'Слабоалкогольные напитки',
  snack: 'Закуски',
  accessories: 'Аксессуары',
};
