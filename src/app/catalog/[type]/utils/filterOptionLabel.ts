/** Подпись варианта для показа: объём «0.75» → «0,75 л», остальное как есть. */
export const formatFilterOptionLabel = (field: string, label: string): string => {
  if (field === 'volume') {
    const liters = Number(label);
    return Number.isFinite(liters) ? `${liters.toLocaleString('ru-RU')} л` : label;
  }
  return label;
};

/**
 * Значения из URL превращаются в числа («0.70» → 0.7, см. parseFilterStateFromUrl), а
 * подписи вариантов — строки. Без этого после перезагрузки страницы галочки объёма
 * снимались, хотя фильтр был применён.
 */
export const isSameFilterValue = (a: string | number, b: string | number): boolean => {
  if (a === b) {
    return true;
  }
  const isNumeric = (value: string | number) => String(value).trim() !== '' && !Number.isNaN(Number(value));
  return isNumeric(a) && isNumeric(b) && Number(a) === Number(b);
};
