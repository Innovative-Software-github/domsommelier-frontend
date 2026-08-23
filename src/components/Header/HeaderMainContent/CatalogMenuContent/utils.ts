import { useSelector } from 'react-redux';
import { filtersConfigSelector } from '../../../../store/filters/selectors';
import {
  productTypeArray,
  productTypeLabels,
  TProductType,
  TProductTypeLabels,
} from '../../../../constants/productTypes';
import { IFilterConfig } from '../../../../app/catalog/[type]/components/FiltersPanel/FiltersFabric/interfaces';

// Поля соответствуют `field` из конфига фильтров на бэке. У аксессуаров
// нет подходящего multi_select-фильтра для быстрой навигации (как и в
// мобильном меню — см. QUICK_FILTER_FIELD_BY_TYPE в MobileMenu.tsx),
// поэтому там пустой список.
const catalogVisibleFilterKeys: Record<TProductType, string[]> = {
  wine: ['color'],
  spirit: ['subcategory'],
  accessories: [],
  snack: ['subcategory'],
  low_alcohol: ['subcategory'],
  champagne_and_sparkling: ['color'],
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

  const catalogMenuCategories = productTypeArray.map((productType) => ({
    key: productType,
    label: productTypeLabels[productType],
  }));

  const getVisibleFiltersByKey = (key: TProductType) => {
    const visibleFiltersKeys = catalogVisibleFilterKeys[key];
    const categoryFilters = filterConfig[key] ?? {};

    return visibleFiltersKeys
      .map((filterName) => categoryFilters[filterName])
      .filter(Boolean);
  };

  return {
    catalogMenuCategories,
    getVisibleFiltersByKey,
  };
};
