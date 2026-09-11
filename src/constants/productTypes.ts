export const productType = {
  wine: 'wine',
  spirit: 'spirit',
  accessories: 'accessories',
  snack: 'snack',
  low_alcohol: 'low_alcohol',
  champagne_and_sparkling: 'champagne_and_sparkling',
} as const;

export const productTypeArray = Object.values(productType) as TProductType[];

export type TProductType = typeof productType[keyof typeof productType];

export const productTypeLabels = {
  wine: 'Вина',
  champagne_and_sparkling: 'Шампанское и игристые вина',
  spirit: 'Крепкие напитки',
  low_alcohol: 'Слабоалкогольные напитки',
  snack: 'Закуски',
  accessories: 'Аксессуары',
} as const;

export type TProductTypeLabels = typeof productTypeLabels[keyof typeof productTypeLabels];

/**
 * Главный фильтр раздела — «вид» товара. Показывается плашками над сеткой каталога
 * (и убирается из боковой панели) и быстрыми ссылками в мобильном меню.
 * Поля — `field` из src/main/resources/data/filters.sql на бэке. У аксессуаров
 * подходящего фильтра нет.
 */
export const PRIMARY_FILTER_FIELD_BY_TYPE: Partial<Record<TProductType, string>> = {
  wine: 'color',
  champagne_and_sparkling: 'subcategory',
  spirit: 'subcategory',
  snack: 'subcategory',
  low_alcohol: 'subcategory',
};
