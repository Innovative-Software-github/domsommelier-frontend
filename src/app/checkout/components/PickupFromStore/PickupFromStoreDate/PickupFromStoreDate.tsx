'use client';

import React, { useState } from 'react';
import { format, addDays } from 'date-fns';
import { ru } from 'date-fns/locale';
import cls from './PickupFromStoreDate.module.scss';

interface PickupFromStoreDateProps {
  selectedDate?: Date;
  onDateSelect: (date: Date) => void;
}

export const PickupFromStoreDate: React.FC<PickupFromStoreDateProps> = ({
  selectedDate,
  onDateSelect,
}) => {
  const dates = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

  const [internalSelectedDate, setInternalSelectedDate] = useState<Date>(
    selectedDate || dates[0]
  );

  const handleDateSelect = (date: Date) => {
    setInternalSelectedDate(date);
    onDateSelect(date);
  };

  const isSelected = (date: Date) => {
    return format(date, 'yyyy-MM-dd') === format(internalSelectedDate, 'yyyy-MM-dd');
  };

  return (
    <div className={cls.container}>
      <h3 className={cls.title}>Дата получения</h3>
      <div className={cls.datesContainer}>
        {dates.map((date) => (
          <button
            key={date.toISOString()}
            className={`${cls.dateCard} ${isSelected(date) ? cls.dateCardSelected : ''}`}
            onClick={() => handleDateSelect(date)}
            type="button"
          >
            <span className={cls.dateNumber}>
              {format(date, 'd MMMM', { locale: ru })}
            </span>
            <span className={cls.dayOfWeek}>
              {format(date, 'EEEEEE', { locale: ru })}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

