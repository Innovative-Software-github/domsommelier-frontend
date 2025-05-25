'use client';

import * as React from 'react';

import { FilterFactory } from '../Sidebar/FiltersFabric/FilterFactory';
import { filterConfig, IUseFiltersReturns } from '../Sidebar/utils';
import { IFilterConfig } from '../Sidebar/interfaces';

import cls from './FilterFactoryContainer.module.scss';

export interface IFilterFactoryContainerProps {
  filtersFabric: IUseFiltersReturns;
}

export const FilterFactoryContainer: React.FC<IFilterFactoryContainerProps> = ({
  filtersFabric,
}) => {
  const { filters: filtersState, updateFilterArray } = filtersFabric;

  return (
    <>
      {filterConfig.map((filterConfig: IFilterConfig) => (
        <div key={filterConfig.id} className={cls.filter}>
          <FilterFactory
            key={filterConfig.id}
            filtersState={filtersState}
            filterConfig={filterConfig}
            onUpdateFilterArray={updateFilterArray}
          />
        </div>
      ))}
    </>
  );
};
