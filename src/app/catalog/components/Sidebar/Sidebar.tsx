'use client';

import React from 'react';

import { Category } from './Category/Category';
import { TDrinkType } from '../../../../constants/catalogLinks';
import { Button } from '../../../../ui/Button/Button';
import { filterConfig, useFilters } from './utils';

import cls from './Sidebar.module.scss';
import { FilterFactory } from './FiltersFabric/FilterFactory';

export interface ISidebarProps {
  drinkType: TDrinkType;
}

export const Sidebar: React.FC<ISidebarProps> = ({ drinkType }) => {
  const {
    filters: filtersState,
    updateFilterArray,
    applyFilters,
  } = useFilters();

  const handleSumbit = async () => {
    try {
      console.log(filtersState);

      applyFilters();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(filtersState);

  return (
    <section className={cls.container}>
      <Category drinkType={drinkType} />
      {filterConfig.map((filterConfig: any) => (
        <div key={filterConfig.id} className={cls.filter}>
          <FilterFactory
            key={filterConfig.id}
            filtersState={filtersState}
            filterConfig={filterConfig}
            onUpdateFilterArray={updateFilterArray}
          />
        </div>
      ))}
      <Button className={cls.submitButton} onClick={handleSumbit}>
        Найти
      </Button>
    </section>
  );
};
