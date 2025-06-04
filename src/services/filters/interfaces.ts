import { IFilterConfig } from '../../app/catalog/components/Sidebar/interfaces';
import { TProductsTypes } from '../../constants/interfaces/products';

export type IFiltersConfigResponse = {
  [categories in TProductsTypes]: IFilterConfig[];
};
