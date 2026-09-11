'use client';

import * as React from 'react';

import cls from './MultiSelectFilter.module.scss';
import { Accordion } from '../../../../../../../ui/Accordion/Accordion';
import { Checkbox } from '../../../../../../../ui/Checkbox/Checkbox';
import {
  IMultiSelectFilterConfig,
  TMultiSelectFilterValue,
} from '../interfaces';
import { formatFilterOptionLabel, isSameFilterValue } from '../../../../utils/filterOptionLabel';

export interface IMultiSelectFilterProps {
  isAccordionOpen?: boolean;
  filterConfig: IMultiSelectFilterConfig;
  filterState: TMultiSelectFilterValue;
  /** Подпись варианта → сколько товаров он даст; undefined — счётчики ещё не загружены. */
  counts?: Record<string, number>;
  onUpdateFilterArray: (value: TMultiSelectFilterValue) => void;
}

export const MultiSelectFilter: React.FC<IMultiSelectFilterProps> = ({
  filterConfig,
  filterState = [],
  counts,
  isAccordionOpen = false,
  onUpdateFilterArray,
}) => {
  const { name, field, options } = filterConfig;

  const isChecked = (label: string) => filterState.some((value) => isSameFilterValue(value, label));

  const handleToggle = (label: string) => {
    const next = isChecked(label)
      ? filterState.filter((value) => !isSameFilterValue(value, label))
      : [...filterState, label];

    onUpdateFilterArray(next);
  };

  // Варианты, которые при текущем выборе дадут ноль товаров, прячем — кроме уже
  // отмеченных, чтобы их можно было снять.
  const visibleOptions = counts
    ? options.filter((option) => (counts[option.label] ?? 0) > 0 || isChecked(option.label))
    : options;

  if (visibleOptions.length === 0) {
    return null;
  }

  return (
    <Accordion
      title={name}
      className={cls.accordion}
      isDefaultOpen={isAccordionOpen}
    >
      <aside className={cls.container}>
        {visibleOptions.map((option) => (
          <Checkbox
            key={option.value}
            theme="gray"
            checked={isChecked(option.label)}
            onChange={() => handleToggle(option.label)}
          >
            {formatFilterOptionLabel(field, option.label)}
            {counts && <span className={cls.count}>{counts[option.label] ?? 0}</span>}
          </Checkbox>
        ))}
      </aside>
    </Accordion>
  );
};
