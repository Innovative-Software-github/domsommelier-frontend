import { IFilterConfig } from '../../app/catalog/components/Sidebar/interfaces';
import { TProductType } from '../../constants/productTypes';

export type IFiltersConfigResponse = {
  [category in TProductType]: {
    [filterName: string]: IFilterConfig;
  };
};
