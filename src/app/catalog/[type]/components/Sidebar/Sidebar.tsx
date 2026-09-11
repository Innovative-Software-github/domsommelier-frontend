import React from 'react';

import { Category } from './Category/Category';
import { TProductType } from '../../../../../constants/productTypes';
import { FiltersPanel } from '../FiltersPanel/FiltersPanel';
import { IFiltersState } from '../FiltersPanel/FiltersFabric/interfaces';
import { IProductFacets } from '../../../../../services/products/requests';
import cls from './Sidebar.module.scss';

export interface ISidebarProps {
  productType: TProductType;
  filters: IFiltersState;
  facets: IProductFacets | null;
  hiddenFields: string[];
  updateFilterArray: (field: string, value: any[]) => void;
  applyFilters: () => void;
}

export const Sidebar: React.FC<ISidebarProps> = ({ productType, filters, facets, hiddenFields, updateFilterArray, applyFilters }) => {
  return (
    <section className={cls.container}>
      <Category productType={productType} />
      <FiltersPanel
        productType={productType}
        filters={filters}
        facets={facets}
        hiddenFields={hiddenFields}
        updateFilterArray={updateFilterArray}
        applyFilters={applyFilters}
      />
    </section>
  );
};
