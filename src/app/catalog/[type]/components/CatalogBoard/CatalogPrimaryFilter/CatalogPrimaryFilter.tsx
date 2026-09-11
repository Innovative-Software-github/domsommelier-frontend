'use client';

import * as React from 'react';
import clsx from 'clsx';

import { IMultiSelectFilterConfig, TMultiSelectFilterValue } from '../../FiltersPanel/FiltersFabric/interfaces';
import { formatFilterOptionLabel, isSameFilterValue } from '../../../utils/filterOptionLabel';
import cls from './CatalogPrimaryFilter.module.scss';

export interface ICatalogPrimaryFilterProps {
  filterConfig: IMultiSelectFilterConfig;
  value?: TMultiSelectFilterValue;
  /** Подпись варианта → сколько товаров он даст; undefined — счётчики ещё не загружены. */
  counts?: Record<string, number>;
  onChange: (value: TMultiSelectFilterValue) => void;
}

/**
 * Вид товара (виски, коньяк… / красное, белое…) — плашками над сеткой, а не одним из
 * фильтров в середине боковой панели. Применяется сразу, без кнопки «Найти».
 */
export const CatalogPrimaryFilter: React.FC<ICatalogPrimaryFilterProps> = ({
  filterConfig,
  value = [],
  counts,
  onChange,
}) => {
  const { field, name, options } = filterConfig;

  const isChecked = (label: string) => value.some((item) => isSameFilterValue(item, label));

  const visibleOptions = counts
    ? options.filter((option) => (counts[option.label] ?? 0) > 0 || isChecked(option.label))
    : options;

  // Из одного варианта выбирать нечего — плашки только займут место.
  if (visibleOptions.length < 2 && value.length === 0) {
    return null;
  }

  const handleToggle = (label: string) => {
    onChange(
      isChecked(label)
        ? value.filter((item) => !isSameFilterValue(item, label))
        : [...value, label],
    );
  };

  return (
    <div className={cls.container} role="group" aria-label={name}>
      <button
        type="button"
        className={clsx(cls.chip, value.length === 0 && cls.active)}
        aria-pressed={value.length === 0}
        onClick={() => onChange([])}
      >
        Все
      </button>
      {visibleOptions.map((option) => {
        const checked = isChecked(option.label);
        return (
          <button
            key={option.value}
            type="button"
            className={clsx(cls.chip, checked && cls.active)}
            aria-pressed={checked}
            onClick={() => handleToggle(option.label)}
          >
            {formatFilterOptionLabel(field, option.label)}
            {counts && <span className={cls.count}>{counts[option.label] ?? 0}</span>}
          </button>
        );
      })}
    </div>
  );
};
