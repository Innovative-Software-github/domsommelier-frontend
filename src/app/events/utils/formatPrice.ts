/**
 * Форматирует цену с разделением разрядов и добавлением символа рубля.
 * Если цена 0 или меньше, возвращает 'Бесплатно'.
 * @param price - число (цена)
 * @returns строка с форматированной ценой или 'Бесплатно'
 */
export function formatEventPrice(price: number): string {
  return price > 0 ? `${price.toLocaleString('ru-RU')} ₽` : 'Бесплатно';
}