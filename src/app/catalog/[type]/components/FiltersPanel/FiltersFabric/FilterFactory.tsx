'use client';

import * as React from 'react';

import { MultiSelectFilter } from './MultiSelectFilter/MultiSelectFilter';
import { CheckboxFilter } from './CheckboxFilter/CheckboxFilter';
import {
  IFilterConfig,
  IFiltersState,
  TCheckboxFilterValue,
  TMultiSelectFilterValue,
  TRangeFilterValue,
} from './interfaces';
import { isFilterActive } from '../../../utils/isFilterActive';
import { RangeFilter } from './RangeFilter/RangeFilter';
import { IProductFacets } from '../../../../../../services/products/requests';

export interface IFilterFactoryProps {
  filterConfig: IFilterConfig;
  filtersState: IFiltersState;
  /** Счётчики вариантов при текущем выборе; null — ещё не загружены. */
  facets?: IProductFacets | null;
  onUpdateFilterArray: (field: string, value: any) => void;
}

export const FilterFactory: React.FC<IFilterFactoryProps> = ({
  filterConfig,
  filtersState,
  facets,
  onUpdateFilterArray,
}) => {
  switch (filterConfig.type) {
    case 'range':
      return (
        <RangeFilter
          isAccordionOpen={isFilterActive(filtersState[filterConfig.field])}
          filterState={filtersState[filterConfig.field] as TRangeFilterValue}
          filterConfig={filterConfig}
          onUpdateFilterArray={(value) =>
            onUpdateFilterArray(filterConfig.field, value)
          }
        />
      );

    case 'multi_select':
      return (
        <MultiSelectFilter
          isAccordionOpen={isFilterActive(filtersState[filterConfig.field])}
          filterState={filtersState[filterConfig.field] as TMultiSelectFilterValue}
          filterConfig={filterConfig}
          counts={facets?.options[filterConfig.field]}
          onUpdateFilterArray={(value) => {
            onUpdateFilterArray(filterConfig.field, value);
          }}
        />
      );

    case 'checkbox':
      return (
        <CheckboxFilter
          filterState={filtersState[filterConfig.field] as TCheckboxFilterValue}
          filterConfig={filterConfig}
          onUpdateFilterArray={(value) =>
            onUpdateFilterArray(filterConfig.field, value)
          }
        />
      );
    default:
      return null;
  }
};
