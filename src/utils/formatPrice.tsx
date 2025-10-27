/**
 * Форматирует числовое значение цены в строку с российским разделителем тысяч
 * Округляет значение до целого числа и добавляет пробелы между разрядами
 * 
 * @param price - цена для форматирования
 * @returns отформатированная строка с ценой в российском формате
 * 
 * @example
 * ```typescript
 * formatPrice(1234.56) // "1 235"
 * formatPrice(1000000) // "1 000 000"
 * formatPrice(0) // "0"
 * ```
 */
export const formatPrice = (price: number) => {
  return Math.round(price).toLocaleString('ru-RU');
};
