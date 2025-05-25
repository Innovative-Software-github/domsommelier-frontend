'use client';

import React, { createContext, useContext } from 'react';
import { IUseFiltersReturns, useFilters } from '../components/Sidebar/utils';

const FiltersContext = createContext<IUseFiltersReturns | null>(null);

export const useFiltersContext = (): IUseFiltersReturns => {
  const ctx = useContext(FiltersContext);
  if (!ctx) {
    throw new Error('useFiltersContext must be used within <FiltersProvider>');
  }
  return ctx;
};

export const FiltersProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const filtersApi = useFilters();

  return (
    <FiltersContext.Provider value={filtersApi}>
      {children}
    </FiltersContext.Provider>
  );
};
