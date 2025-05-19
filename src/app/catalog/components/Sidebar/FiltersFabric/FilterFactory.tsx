import * as React from 'react';

import { RangeFilter } from './RangeFilter/RangeFilter';
import { IFiltersState } from '../utils';
import { MultiSelectFilter } from './MultiSelectFilter/MultiSelectFilter';
import { CheckboxFilter } from './CheckboxFilter/CheckboxFilter';

export interface IFilterFactoryProps {
  filterConfig: any;
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
          filterState={filtersState[filterConfig.id]}
          filterConfig={filterConfig}
          onUpdateFilterArray={(value) =>
            onUpdateFilterArray(filterConfig.id, value)
          }
        />
      );
    case 'multi_select':
      return (
        <MultiSelectFilter
          filterState={filtersState[filterConfig.id]}
          filterConfig={filterConfig}
          onUpdateFilterArray={(value) => {
            onUpdateFilterArray(filterConfig.id, value);
          }}
        />
      );
    case 'checkbox':
      return (
        <CheckboxFilter
          filterState={filtersState[filterConfig.id]}
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
