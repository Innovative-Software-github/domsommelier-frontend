export type TRangeFilterValue = [number | null, number | null];
export type TMultiSelectFilterValue = string[];
export type TCheckboxFilterValue = boolean;

export interface IRangeFilterConfig {
  id: string;
  type: 'range';
  name: string;
  min: number;
  max: number;
  unit?: string;
  steps: { min: number | null; max: number | null; label: string }[];
}
export interface IMultiSelectFilterConfig {
  id: string;
  type: 'multi_select';
  name: string;
  options: { value: string; label: string }[];
}
export interface ICheckboxFilterConfig {
  id: string;
  type: 'checkbox';
  name: string;
}

export type IFilterConfig =
  | IRangeFilterConfig
  | IMultiSelectFilterConfig
  | ICheckboxFilterConfig;

export type IFiltersState = Record<string, TRangeFilterValue | TMultiSelectFilterValue | TCheckboxFilterValue>;