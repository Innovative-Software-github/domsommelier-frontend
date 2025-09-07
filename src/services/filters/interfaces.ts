import { IFilterConfig } from '../../app/catalog/[type]/components/FiltersPanel/FiltersFabric/interfaces';
import { TProductType } from '../../constants/productTypes';

export type IFiltersConfigResponse = {
  [category in TProductType]: {
    [filterName: string]: IFilterConfig;
  };
};
