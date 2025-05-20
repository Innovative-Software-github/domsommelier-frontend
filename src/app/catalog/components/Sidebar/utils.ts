// TypeScript
'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { stringifySearchParams } from '../../../../utils/stringifySearchParams';
import { IFilterConfig, IFiltersState, TCheckboxFilterValue, TMultiSelectFilterValue, TRangeFilterValue } from './interfaces';

export const filterConfig: IFilterConfig[] = [
  {
    type: 'range',
    id: 'price',
    name: 'Цена',
    min: 0,
    max: 50000,
    unit: '₽',
    steps: [
      { min: 0, max: 1000, label: 'До 1 000 ₽' },
      { min: 1000, max: 3000, label: '1 000–3 000 ₽' },
      { min: 3000, max: 6000, label: '3 000–6 000 ₽' },
      { min: 6000, max: 10000, label: '6 000–10 000 ₽' },
      { min: 10000, max: 50000, label: 'От 10 000 ₽' },
    ],
  },
  {
    id: 'in_stock',
    type: 'checkbox',
    name: 'Наличие в магазинах',
  },
  {
    id: 'color',
    type: 'multi_select',
    name: 'Цвет',
    options: [
      { value: 'white', label: 'Белое' },
      { value: 'red', label: 'Красное' },
      { value: 'rose', label: 'Розовое' },
    ],
  },
] as const;

/** храним info о типах фильтров вида { price: 'range', color: 'multi_select', ... } */
const filterTypesMap = filterConfig.reduce<Record<string, string>>(
  (acc, item) => {
    acc[item.id] = item.type;
    return acc;
  },
  {},
);

const parse = (value: string) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

export function useFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  /** формируем state из URL */
  const initializeFiltersFromUrl = (): IFiltersState => {
    const filtersFromUrl: IFiltersState = {};

    if (!searchParams) return filtersFromUrl;

    /** собираем уникальные ключи query‐строки */
    const paramKeys = new Set<string>();
    searchParams.forEach((_, key) => paramKeys.add(key));

    paramKeys.forEach((key) => {
      const values = searchParams.getAll(key).map(parse);

      if (values.length > 1) {
        // несколько одноимённых параметров → всегда массив
        filtersFromUrl[key] = values;
      } else if (values.length === 1) {
        const single = values[0];

        // если фильтр по конфигу – multi_select, оборачиваем в массив
        if (filterTypesMap[key] === 'multi_select') {
          filtersFromUrl[key] = [single];
        } else {
          filtersFromUrl[key] = single;
        }
      }
    });

    return filtersFromUrl;
  };

  const [filters, setFilters] = React.useState<IFiltersState>(
    initializeFiltersFromUrl(),
  );

  const updateFilterArray = (field: string, value: any[]) =>
    setFilters((prev) => ({ ...prev, [field]: value }));

  const applyFilters = () => {
    const queryString = stringifySearchParams(filters);
    router.push(`?${queryString}`, { scroll: false });
  };

  return { filters, updateFilterArray, applyFilters };
}

export const isFilterActive = (value: TRangeFilterValue | TMultiSelectFilterValue | TCheckboxFilterValue) => {
  if (Array.isArray(value)) return value.some(v => v !== null && v !== '');
  return Boolean(value);
};
