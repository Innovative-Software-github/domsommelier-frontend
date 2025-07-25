import { format, Locale } from 'date-fns';
import { ru } from 'date-fns/locale';

/**
 * Набор стандартных форматов для отображения даты и времени.
 * Ключи описывают назначение формата, значения — строка формата для date-fns.
 *
 * Примеры:
 * - DayMonthTime: дата и время (например, "5 июня, 18:30")
 */
export const timeFormats = {
  dayMonthTime: "d MMMM, HH:mm"
}

/**
 * Форматирует время по строке или Date.
 * @param time - строка времени (например, '2024-11-30T19:00:00') или объект Date
 * @param timeFormat - формат времени (по умолчанию 'HH:mm')
 * @param locale - локаль (по умолчанию ru)
 * @returns строка с отформатированным временем
 */
export function formatDate(
  time: string | Date,
  timeFormat: string = 'HH:mm',
  locale: Locale = ru,
): string {
  const date = typeof time === 'string' ? new Date(time) : time;

  return format(date, timeFormat, { locale });
}