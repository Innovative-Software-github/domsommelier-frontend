'use client';

import * as React from 'react';
import { Button } from '../../../../../ui/Button/Button';
import cls from './FiltersPanel.module.scss';
import { filtersConfigSelector } from '../../../../../store/filters/selectors';
import { useSelector } from 'react-redux';
import { TProductType } from '../../../../../constants/productTypes';
import { FilterFactory } from './FiltersFabric/FilterFactory';
import { IFiltersState } from './FiltersFabric/interfaces';

export interface IFiltersPanel {
  productType: TProductType;
  filters: IFiltersState;
  updateFilterArray: (field: string, value: any[]) => void;
  applyFilters: () => void;
}

export const FiltersPanel: React.FC<IFiltersPanel> = ({
  productType,
  filters,
  updateFilterArray,
  applyFilters,
}) => {
  const filtersConfig = useSelector(filtersConfigSelector);

  return (
    <>
      {Object.values(filtersConfig[productType]).map((filterConfig) => (
        <div key={filterConfig.id} className={cls.filter}>
          <FilterFactory
            filterConfig={filterConfig}
            filtersState={filters}
            onUpdateFilterArray={updateFilterArray}
          />
        </div>
      ))}

      <Button
        variant="default"
        className={cls.submitButton}
        onClick={applyFilters}
      >
        Найти
      </Button>
    </>
  );
};
