/**
 * Хук для работы с ценами продукта
 * 
 * @param price - основная цена продукта
 * @param discount - скидка (может быть null или числом)
 * @returns объект с информацией о ценах
 */
export function useProductPrice(price: number, discount?: number | null) {
  const hasDiscount = typeof discount === 'number' && discount > 0;
  const currentPrice = hasDiscount ? discount! : price;

  return {
    hasDiscount,
    currentPrice,
    discount: discount || null,
  };
}