'use client';

import * as React from 'react';
import { useFiltersContext } from '../../hooks/useFiltersContext';
import { Button } from '../../../../ui/Button/Button';
import cls from './FiltersPanel.module.scss';
import { filtersConfigSelector } from '../../../../store/filters/selectors';
import { useSelector } from 'react-redux';
import { TProductType } from '../../../../constants/productTypes';
import { FilterFactory } from '../Sidebar/FiltersFabric/FilterFactory';
import { getFilteredProducts } from '../../../../services/products/requests';

export interface IFiltersPanel {
  productType: TProductType;
  onSubmitFilters?: () => void;
}

export const FiltersPanel: React.FC<IFiltersPanel> = ({
  productType,
  onSubmitFilters,
}) => {
  const context = useFiltersContext();
  const filtersConfig = useSelector(filtersConfigSelector);

  if (!context || !filtersConfig || !filtersConfig[productType])
    return <div>Не удалось загрузить фильтры</div>;

  const { filters, updateFilterArray, applyFilters } = context;

  const handleSumbit = async () => {
    try {
      const response = await getFilteredProducts(filters, productType);
      console.log(response);

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
        onClick={handleSumbit}
      >
        Найти
      </Button>
    </>
  );
};
