// TypeScript
'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { stringifySearchParams } from '../../../../utils/stringifySearchParams';
import {
  IFilterConfig,
  IFiltersState,
  TCheckboxFilterValue,
  TMultiSelectFilterValue,
  TRangeFilterValue,
} from './interfaces';
import { useSelector } from 'react-redux';
import { filtersConfigSelector } from '../../../../store/filters/selectors';
import { TProductType } from '../../../../constants/routes/productsRoutes';

const parse = (value: string) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

export interface IUseFiltersReturns {
  filters: IFiltersState;
  updateFilterArray: (field: string, value: any[]) => void;
  applyFilters: () => void;
}

export function useFilters(productType: TProductType): IUseFiltersReturns {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filtersConfig = useSelector(filtersConfigSelector);

  /** храним info о типах фильтров вида { price: 'range', color: 'multi_select', ... } */
  const filterTypesMap = filtersConfig[productType].reduce<
    Record<string, string>
  >((acc, item) => {
    acc[item.id] = item.type;
    return acc;
  }, {});

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

export const isFilterActive = (
  value: TRangeFilterValue | TMultiSelectFilterValue | TCheckboxFilterValue,
) => {
  if (Array.isArray(value)) return value.some((v) => v !== null && v !== '');
  return Boolean(value);
};
