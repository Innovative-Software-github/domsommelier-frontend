import { useSelector } from 'react-redux';
import { filtersConfigSelector } from '../../../../store/filters/selectors';
import {
  productTypeKeys,
  productTypeLabels,
  TProductType,
  TProductTypeLabels,
} from '../../../../constants/productTypes';
import { IFilterConfig } from '../../../../app/catalog/components/Sidebar/interfaces';

const catalogVisibleFilterKeys: Record<TProductType, string[]> = {
  wine: [],
  spirit: [],
  accessories: [],
  snack: [],
  low_alcohol: [],
  champagne_and_sparkling: [],
} as const;

export interface ICatalogMenuCategories {
  key: TProductType;
  label: TProductTypeLabels;
}

export interface IUseCatalogMenuDataReturn {
  catalogMenuCategories: ICatalogMenuCategories[];
  getVisibleFiltersByKey: (key: TProductType) => IFilterConfig[];
}

export const useCatalogMenuData = () => {
  const filterConfig = useSelector(filtersConfigSelector);

  const catalogMenuCategories = productTypeKeys.map((productTypeKeys) => ({
    key: productTypeKeys,
    label: productTypeLabels[productTypeKeys],
  }));

  const getVisibleFiltersByKey = (key: TProductType) => {
    const visibleFiltersKeys = catalogVisibleFilterKeys[key];

    return visibleFiltersKeys.map(
      (filterName) => filterConfig[key][filterName],
    );
  };

  return {
    catalogMenuCategories,
    getVisibleFiltersByKey,
  };
};
