import { IFilterConfig } from '../../app/catalog/components/Sidebar/interfaces';
import { TProductType } from '../../constants/routes/productsRoutes';

export type IFiltersConfigResponse = {
  [categories in TProductType]: IFilterConfig[];
};
