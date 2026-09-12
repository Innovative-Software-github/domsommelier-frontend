'use client';

import * as React from 'react';

import { canonicalSelection, optionValue } from '../../../../utils/catalogAttributeFilters';
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

  const selection = canonicalSelection(filterConfig, filterState);
  const isChecked = (label: string) => selection.some((value) => isSameFilterValue(value, label));

  const handleToggle = (label: string) => {
    const next = isChecked(label)
      ? selection.filter((value) => !isSameFilterValue(value, label))
      : [...selection, label];

    onUpdateFilterArray(next);
  };

  // Варианты, которые при текущем выборе дадут ноль товаров, прячем — кроме уже
  // отмеченных, чтобы их можно было снять.
  const allOptions = [...options, ...selection
    .filter(value => !options.some(option => isSameFilterValue(value, optionValue(filterConfig, option))))
    .map(value => ({ value: String(value), label: String(value) }))];
  const visibleOptions = counts
    ? allOptions.filter((option) => (counts[optionValue(filterConfig, option)] ?? 0) > 0 || isChecked(optionValue(filterConfig, option)))
    : allOptions;

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
            checked={isChecked(optionValue(filterConfig, option))}
            onChange={() => handleToggle(optionValue(filterConfig, option))}
          >
            {formatFilterOptionLabel(field, option.label)}
            {counts && <span className={cls.count}>{counts[optionValue(filterConfig, option)] ?? 0}</span>}
          </Checkbox>
        ))}
      </aside>
    </Accordion>
  );
};
