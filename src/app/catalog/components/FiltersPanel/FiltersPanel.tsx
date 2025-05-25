'use client';

import * as React from 'react';
import { filterConfig } from '../Sidebar/utils';
import { useFiltersContext } from '../../hooks/useFiltersContext';
import { FilterFactory } from '../Sidebar/FiltersFabric/FilterFactory';
import { Button } from '../../../../ui/Button/Button';

import cls from './FiltersPanel.module.scss';

export interface IFiltersPanel {
  onSubmitFilters?: () => void;
}

export const FiltersPanel: React.FC<IFiltersPanel> = ({ onSubmitFilters }) => {
  const { filters, updateFilterArray, applyFilters } = useFiltersContext();

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
      {filterConfig.map((filterConfig) => (
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
