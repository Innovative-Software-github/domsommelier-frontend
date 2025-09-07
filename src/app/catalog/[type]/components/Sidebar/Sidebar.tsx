import React from 'react';

import { Category } from './Category/Category';
import { TProductType } from '../../../../../constants/productTypes';
import { FiltersPanel } from '../FiltersPanel/FiltersPanel';
import { IFiltersState } from '../FiltersPanel/FiltersFabric/interfaces';
import cls from './Sidebar.module.scss';

export interface ISidebarProps {
  productType: TProductType;
  filters: IFiltersState;
  updateFilterArray: (field: string, value: any[]) => void;
  applyFilters: () => void;
}

export const Sidebar: React.FC<ISidebarProps> = ({ productType, filters, updateFilterArray, applyFilters }) => {
  return (
    <section className={cls.container}>
      <Category productType={productType} />
      <FiltersPanel productType={productType} filters={filters} updateFilterArray={updateFilterArray} applyFilters={applyFilters} />
    </section>
  );
};
