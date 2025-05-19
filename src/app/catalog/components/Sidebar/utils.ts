'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { stringifySearchParams } from '../../../../utils/stringifySearchParams';

export type IFiltersState = Record<string, any>;

export function useFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initializeFiltersFromUrl = (): IFiltersState => {
    const filtersFromUrl: IFiltersState = {};

    if (searchParams) {
      const paramKeys = new Set<string>();
      searchParams.forEach((_, key) => {
        paramKeys.add(key);
      });

      paramKeys.forEach((key) => {
        const values = searchParams.getAll(key);

        if (values.length > 1) {
          filtersFromUrl[key] = values.map((value) => {
            try {
              return JSON.parse(value);
            } catch (e) {
              return value;
            }
          });
        } else if (values.length === 1) {
          // Single value
          try {
            filtersFromUrl[key] = JSON.parse(values[0]);
          } catch (e) {
            filtersFromUrl[key] = values[0];
          }
        }
      });
    }

    return filtersFromUrl;
  };

  const [filters, setFilters] = React.useState<IFiltersState>(
    initializeFiltersFromUrl(),
  );

  const updateFilterValue = (field: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const updateFilterArray = (field: string, value: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const applyFilters = async () => {
    const queryString = stringifySearchParams(filters);

    router.push(`?${queryString}`, { scroll: false });
  };

  return {
    filters,
    updateFilterValue,
    updateFilterArray,
    applyFilters,
  };
}

export const filterConfig = [
  {
    type: 'range',
    id: 'price',
    isAccordionOpen: true,
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
