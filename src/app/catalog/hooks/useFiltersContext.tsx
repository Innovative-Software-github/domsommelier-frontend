'use client';

import React, { createContext, useContext } from 'react';
import { IUseFiltersReturns, useFilters } from '../components/Sidebar/utils';
import { TProductType } from '../../../constants/productTypes';

const FiltersContext = createContext<IUseFiltersReturns | null>(null);

export const useFiltersContext = (): IUseFiltersReturns | null => {
  const ctx = useContext(FiltersContext);

  return ctx as IUseFiltersReturns;
};

interface IFiltersProviderProps extends React.PropsWithChildren {
  productType: TProductType;
}

export const FiltersProvider: React.FC<IFiltersProviderProps> = ({
  productType,
  children,
}) => {
  const filtersApi = useFilters(productType);

  return (
    <FiltersContext.Provider value={filtersApi}>
      {children}
    </FiltersContext.Provider>
  );
};
