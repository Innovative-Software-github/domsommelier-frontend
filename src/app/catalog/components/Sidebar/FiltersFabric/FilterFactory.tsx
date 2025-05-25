'use client';

import * as React from 'react';

import { RangeFilter } from './RangeFilter/RangeFilter';
import { MultiSelectFilter } from './MultiSelectFilter/MultiSelectFilter';
import { CheckboxFilter } from './CheckboxFilter/CheckboxFilter';
import {
  IFilterConfig,
  IFiltersState,
  TCheckboxFilterValue,
  TMultiSelectFilterValue,
  TRangeFilterValue,
} from '../interfaces';
import { isFilterActive } from '../utils';

export interface IFilterFactoryProps {
  filterConfig: IFilterConfig;
  filtersState: IFiltersState;
  onUpdateFilterArray: (field: string, value: any) => void;
}

export const FilterFactory: React.FC<IFilterFactoryProps> = ({
  filterConfig,
  filtersState,
  onUpdateFilterArray,
}) => {
  switch (filterConfig.type) {
    case 'range':
      return (
        <RangeFilter
          isAccordionOpen={isFilterActive(filtersState[filterConfig.id])}
          filterState={filtersState[filterConfig.id] as TRangeFilterValue}
          filterConfig={filterConfig}
          onUpdateFilterArray={(value) =>
            onUpdateFilterArray(filterConfig.id, value)
          }
        />
      );
    case 'multi_select':
      return (
        <MultiSelectFilter
          isAccordionOpen={isFilterActive(filtersState[filterConfig.id])}
          filterState={filtersState[filterConfig.id] as TMultiSelectFilterValue}
          filterConfig={filterConfig}
          onUpdateFilterArray={(value) => {
            onUpdateFilterArray(filterConfig.id, value);
          }}
        />
      );
    case 'checkbox':
      return (
        <CheckboxFilter
          filterState={filtersState[filterConfig.id] as TCheckboxFilterValue}
          filterConfig={filterConfig}
          onUpdateFilterArray={(value) =>
            onUpdateFilterArray(filterConfig.id, value)
          }
        />
      );
    default:
      return null;
  }
};
