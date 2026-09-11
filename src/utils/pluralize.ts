/**
 * Форма слова после числа: pluralize(5, ['товар', 'товара', 'товаров']) → 'товаров'.
 */
export const pluralize = (count: number, [one, few, many]: [string, string, string]): string => {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return one;
  }
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return few;
  }
  return many;
};

export const PRODUCT_WORD_FORMS: [string, string, string] = ['товар', 'товара', 'товаров'];
