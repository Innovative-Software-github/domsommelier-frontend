'use client';

import React, { createContext, useContext } from 'react';
import { IUseFiltersReturns, useFilters } from '../components/Sidebar/utils';
import { TProductType } from '../../../constants/routes/productsRoutes';

const FiltersContext = createContext<IUseFiltersReturns | null>(null);

export const useFiltersContext = (): IUseFiltersReturns => {
  const ctx = useContext(FiltersContext);
  if (!ctx) {
    throw new Error('useFiltersContext must be used within <FiltersProvider>');
  }
  return ctx;
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
