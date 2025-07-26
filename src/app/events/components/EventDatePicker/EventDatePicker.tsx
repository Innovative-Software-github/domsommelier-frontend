'use client';

import * as React from "react";
import { ContentContainer } from "../../../../ui/ContentContainer/ContentContainer";
import { DatePickerMonth } from "./DatePickerMonth/DatePickerMonth";
import styles from './EventDatePicker.module.scss';
import { generateMonthsUntilEndOfYear } from "./utils";
import { isEqual } from "date-fns";
import { IFilters } from "../EventsClient/EventsClient";

export interface ISelectedDate {    
  dateStart?: Date;
  dateEnd?: Date;
}

export interface IEventDatePickerProps {
  dateStart: IFilters['dateStart'];
  dateEnd: IFilters['dateEnd'];
  onDateStartChange: (date: IFilters['dateStart']) => void;
  onDateEndChange: (date: IFilters['dateEnd']) => void;
} 

export const EventDatePicker: React.FC<IEventDatePickerProps> = ({ dateStart, dateEnd, onDateStartChange, onDateEndChange }) => {
  const [hoverDate, setHoverDate] = React.useState<ISelectedDate>({});

  const handleDateClick = (date: Date) => {
    // Если ничего не выбрано или оба значения уже выбраны — начинаем выбор заново
    if (!dateStart || (dateStart && dateEnd)) {
      onDateStartChange(date);
      onDateEndChange(undefined);
      setHoverDate({});
      return;
    }

    // Если выбрана только начальная дата
    if (dateStart && !dateEnd) {
      // Если клик по той же дате — сбрасываем выбор
      if (date.getTime() === dateStart.getTime()) {
        onDateStartChange(undefined);
        onDateEndChange(undefined);
        setHoverDate({});
        return;
      }
      // Если выбрана более ранняя дата — делаем её началом диапазона
      if (date < dateStart) {
        onDateStartChange(date);
        onDateEndChange(dateStart);
        setHoverDate({});
        return;
      }
      // Если выбрана более поздняя дата — делаем её концом диапазона
      onDateStartChange(dateStart);
      onDateEndChange(date);
      setHoverDate({});
      return;
    }
  };

  // Обработчик наведения на день
  const handleDateHover = (date: Date | undefined) => {
    // Если выбран только dateStart и наведён день, показываем диапазон от dateStart до наведённого дня
    if (dateStart && !dateEnd && date) {
      // Если навели на ту же дату, что и dateStart, просто подсвечиваем её
      if (isEqual(date, dateStart)) {
        setHoverDate({
          dateStart: date,
          dateEnd: undefined,
        });
        return;
      }
      // Если навели на другую дату, подсвечиваем диапазон между dateStart и наведённой датой
      // Для этого сохраняем в hoverDate объект с началом и концом диапазона
      setHoverDate({
        dateStart: date < dateStart ? date : dateStart,
        dateEnd: date > dateStart ? date : dateStart,
      } as any); // Приводим к any, чтобы не менять типизацию, обработаем ниже
      return;
    }

    // В остальных случаях просто сохраняем наведённую дату
    setHoverDate({
      dateStart: date,
      dateEnd: undefined,
    });
  };

  const months = generateMonthsUntilEndOfYear(new Date());

  return (
    <ContentContainer className={styles.container}>
      <div className={styles.monthsContainer}>
        {months.map((month) => (
          <DatePickerMonth
            key={Object.keys(month)[0]}
            month={month}
            selectedDate={{ dateStart, dateEnd }}
            onDateClick={handleDateClick}
            hoverDate={hoverDate}
            onDateHover={handleDateHover}
          />
        ))}
      </div>
    </ContentContainer>
  )
};