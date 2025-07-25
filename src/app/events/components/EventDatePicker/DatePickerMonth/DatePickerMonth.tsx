import clsx from 'clsx';
import { ISelectedDate } from '../EventDatePicker';
import styles from './DatePickerMonth.module.scss';
import { isDaySelected } from './utils';
import { isEqual } from 'date-fns';

export interface IDatePickerMonthProps {
  month: Record<string, Date[]>;
  selectedDate: ISelectedDate;
  hoverDate: ISelectedDate;
  onDateClick: (date: Date) => void;
  onDateHover: (date: Date | undefined) => void;
}

const dayShortNames = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

export const DatePickerMonth: React.FC<IDatePickerMonthProps> = ({ month, selectedDate, hoverDate, onDateClick, onDateHover }) => {
  const monthName = Object.keys(month)[0];
  const days = month[monthName];

  return (
    <div className={styles.container}>
      <div className={styles.monthName}>{monthName}</div>
      <div className={styles.days}>
        {days.map((day) => (
          <button
            key={day.getDate()}
            className={clsx(styles.dayContainer, {
              [styles.selectedDay]: isDaySelected(day, selectedDate),
              [styles.hoveredDay]: hoverDate && isDaySelected(day, hoverDate),
            })}
            onMouseEnter={() => onDateHover(day)}
            onMouseLeave={() => onDateHover(undefined)}
            onClick={() => onDateClick(day)}
          >
            <div className={styles.dayNumber}>{day.getDate()}</div>
            <div className={styles.dayShortName}>
              {dayShortNames[day.getDay()]}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};