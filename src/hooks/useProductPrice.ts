/**
 * Цена товара к показу.
 *
 * Раньше поле называлось `discount` и хранило готовую акционную цену, из-за чего бэкенд
 * валидировал его как процент, а фронт показывал как рубли. Теперь это явный `salePrice`
 * — акционная цена в рублях, `null` если акции нет.
 *
 * Личная скидка клиента здесь НЕ применяется: её считает бэкенд в корзине, и на неакционные
 * товары (см. BasketPriceCalculator). Фронт не умножает цены на проценты.
 *
 * @param price - цена по прайсу
 * @param salePrice - акционная цена (null/0 — акции нет)
 */
export function useProductPrice(price: number, salePrice?: number | null) {
  const hasSale = typeof salePrice === 'number' && salePrice > 0 && salePrice < price;
  const currentPrice = hasSale ? salePrice! : price;

  return {
    hasSale,
    currentPrice,
    /** Зачёркнутая цена — только когда есть акция. */
    oldPrice: hasSale ? price : null,
  };
}
