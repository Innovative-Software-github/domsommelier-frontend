import { useSelector } from 'react-redux';

import { IMultiSelectFilterConfig } from '../components/FiltersPanel/FiltersFabric/interfaces';
import { filtersConfigSelector } from '../../../../store/filters/selectors';
import { PRIMARY_FILTER_FIELD_BY_TYPE, TProductType } from '../../../../constants/productTypes';

/** Конфиг главного фильтра раздела (вид товара) или undefined, если у раздела его нет. */
export const usePrimaryFilter = (productType: TProductType): IMultiSelectFilterConfig | undefined => {
  const filtersConfig = useSelector(filtersConfigSelector);
  const field = PRIMARY_FILTER_FIELD_BY_TYPE[productType];
  const config = field ? filtersConfig[productType]?.[field] : undefined;

  return config?.type === 'multi_select' ? config : undefined;
};
