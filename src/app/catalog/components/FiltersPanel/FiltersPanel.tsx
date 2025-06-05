'use client';

import * as React from 'react';
import { useFiltersContext } from '../../hooks/useFiltersContext';
import { Button } from '../../../../ui/Button/Button';
import cls from './FiltersPanel.module.scss';
import { filtersConfigSelector } from '../../../../store/filters/selectors';
import { useSelector } from 'react-redux';
import { TProductType } from '../../../../constants/routes/productsRoutes';
import { FilterFactory } from '../Sidebar/FiltersFabric/FilterFactory';

export interface IFiltersPanel {
  productType: TProductType;
  onSubmitFilters?: () => void;
}

export const FiltersPanel: React.FC<IFiltersPanel> = ({
  productType,
  onSubmitFilters,
}) => {
  const { filters, updateFilterArray, applyFilters } = useFiltersContext();
  const filtersConfig = useSelector(filtersConfigSelector);

  const handleSumbit = async () => {
    try {
      console.log(filters);

      applyFilters();
      if (onSubmitFilters) {
        onSubmitFilters();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {filtersConfig[productType].map((filterConfig) => (
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
        onClick={handleSumbit}
      >
        Найти
      </Button>
    </>
  );
};
