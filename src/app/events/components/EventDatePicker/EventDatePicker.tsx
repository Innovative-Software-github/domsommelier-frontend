'use client';

import * as React from "react";
import { ContentContainer } from "../../../../ui/ContentContainer/ContentContainer";
import { DatePickerMonth } from "./DatePickerMonth/DatePickerMonth";
import styles from './EventDatePicker.module.scss';
import { generateMonthsUntilEndOfYear } from "./utils";
import { isEqual } from "date-fns";

export interface ISelectedDate {    
  dateStart?: Date;
  dateEnd?: Date;
}

export interface IEventDatePickerProps {} 

export const EventDatePicker: React.FC<IEventDatePickerProps> = () => {
  const [selectedDate, setSelectedDate] = React.useState<ISelectedDate>({});
  const [hoverDate, setHoverDate] = React.useState<ISelectedDate>({});

  const handleDateClick = (date: Date) => {
    const { dateStart, dateEnd } = selectedDate;

    // Если ничего не выбрано или оба значения уже выбраны — начинаем выбор заново
    if (!dateStart || (dateStart && dateEnd)) {
      setSelectedDate({
        dateStart: date,
        dateEnd: undefined,
      });
      setHoverDate({});
      return;
    }

    // Если выбрана только начальная дата
    if (dateStart && !dateEnd) {
      // Если клик по той же дате — сбрасываем выбор
      if (date.getTime() === dateStart.getTime()) {
        setSelectedDate({});
        setHoverDate({});
        return;
      }
      // Если выбрана более ранняя дата — делаем её началом диапазона
      if (date < dateStart) {
        setSelectedDate({
          dateStart: date,
          dateEnd: dateStart,
        });
        setHoverDate({});
        return;
      }
      // Если выбрана более поздняя дата — делаем её концом диапазона
      setSelectedDate({
        dateStart,
        dateEnd: date,
      });
      setHoverDate({});
      return;
    }
  };

  // Обработчик наведения на день
  const handleDateHover = (date: Date | undefined) => {
    const { dateStart, dateEnd } = selectedDate;

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
            selectedDate={selectedDate}
            onDateClick={handleDateClick}
            hoverDate={hoverDate}
            onDateHover={handleDateHover}
          />
        ))}
      </div>
    </ContentContainer>
  )
};