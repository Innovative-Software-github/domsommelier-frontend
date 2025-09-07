import { TRangeFilterValue, TMultiSelectFilterValue, TCheckboxFilterValue  } from "../components/FiltersPanel/FiltersFabric/interfaces";

export const isFilterActive = (
  value: TRangeFilterValue | TMultiSelectFilterValue | TCheckboxFilterValue,
) => {
  if (Array.isArray(value)) return value.some((v) => v !== null && v !== '');
  return Boolean(value);
};
