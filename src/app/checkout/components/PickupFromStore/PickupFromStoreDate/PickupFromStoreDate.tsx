'use client';

import React from 'react';
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
  // useMemo, а не пересчёт на каждом рендере: раньше new Date() внутри
  // Array.from пересоздавался при любом перерендере формы (например, при
  // вводе в поле телефона выше по дереву), а key={date.toISOString()}
  // включал миллисекунды — React получал 7 новых ключей и полностью
  // размонтировал/монтировал все карточки дат вместо обновления на месте.
  const dates = React.useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(new Date(), i)),
    [],
  );

  // Используем проп напрямую, а не дублируем его в локальном состоянии —
  // раньше internalSelectedDate синхронизировался с selectedDate только при
  // монтировании и не подхватил бы более позднее внешнее изменение.
  const activeDate = selectedDate ?? dates[0];

  const isSelected = (date: Date) => {
    return format(date, 'yyyy-MM-dd') === format(activeDate, 'yyyy-MM-dd');
  };

  return (
    <div className={cls.container}>
      <h3 className={cls.title}>Дата получения</h3>
      <div className={cls.datesContainer}>
        {dates.map((date) => (
          <button
            key={format(date, 'yyyy-MM-dd')}
            className={`${cls.dateCard} ${isSelected(date) ? cls.dateCardSelected : ''}`}
            onClick={() => onDateSelect(date)}
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
