import { ISelectedDate } from "../EventDatePicker";
import { isEqual, isAfter, isBefore } from "date-fns";

// Функция возвращает true, если день выбран:
// - Если выбрана только одна дата (dateStart), то только она выделяется как true
// - Если выбраны две даты (dateStart и dateEnd), то выделяется диапазон между ними включительно
export const isDaySelected = (day: Date, selectedDate: ISelectedDate) => {
  const { dateStart, dateEnd } = selectedDate;

  // Если выбрана только одна дата
  if (dateStart && !dateEnd) {
    return isEqual(dateStart, day);
  }

  // Если выбраны две даты (диапазон)
  if (dateStart && dateEnd) {
    // Проверяем, входит ли день в диапазон (включительно)
    return (
      (isEqual(day, dateStart) || isEqual(day, dateEnd)) ||
      (isAfter(day, dateStart) && isBefore(day, dateEnd))
    );
  }

  return false;
};