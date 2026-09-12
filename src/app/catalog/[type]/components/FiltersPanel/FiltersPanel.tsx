'use client';

import * as React from 'react';
import { isFilterVisible } from '../../utils/catalogAttributeFilters';
import { Button } from '../../../../../ui/Button/Button';
import cls from './FiltersPanel.module.scss';
import { filtersConfigSelector } from '../../../../../store/filters/selectors';
import { useSelector } from 'react-redux';
import { TProductType } from '../../../../../constants/productTypes';
import { FilterFactory } from './FiltersFabric/FilterFactory';
import { IFiltersState } from './FiltersFabric/interfaces';
import { IProductFacets } from '../../../../../services/products/requests';
import { PRODUCT_WORD_FORMS, pluralize } from '../../../../../utils/pluralize';

export interface IFiltersPanel {
  productType: TProductType;
  filters: IFiltersState;
  /** Счётчики вариантов при текущем выборе; null — ещё не загружены. */
  facets: IProductFacets | null;
  /** Поля, которые уже показаны в другом месте (плашки вида над сеткой). */
  hiddenFields?: string[];
  updateFilterArray: (field: string, value: any[]) => void;
  applyFilters: () => void;
}

export const FiltersPanel: React.FC<IFiltersPanel> = ({
  productType,
  filters,
  facets,
  hiddenFields = [],
  updateFilterArray,
  applyFilters,
}) => {
  const filtersConfig = useSelector(filtersConfigSelector);
  const productTypeFiltersConfig = filtersConfig[productType] ?? {};

  return (
    <>
      {Object.values(productTypeFiltersConfig)
        .filter((filterConfig) => !hiddenFields.includes(filterConfig.field) && isFilterVisible(filterConfig, filters))
        .map((filterConfig) => (
          <div key={filterConfig.id} className={cls.filter}>
            <FilterFactory
              filterConfig={filterConfig}
              filtersState={filters}
              facets={facets}
              onUpdateFilterArray={updateFilterArray}
            />
          </div>
        ))}

      <Button
        variant="default"
        className={cls.submitButton}
        onClick={applyFilters}
      >
        {facets
          ? `Показать ${facets.total} ${pluralize(facets.total, PRODUCT_WORD_FORMS)}`
          : 'Найти'}
      </Button>
    </>
  );
};
