import { TProductType } from '../../../../constants/productTypes';

export type TRangeFilterValue = [number | null, number | null];
export type TMultiSelectFilterValue = string[];
export type TCheckboxFilterValue = boolean;

export interface IRangeFilterConfig {
  category: TProductType;
  id: string;
  type: 'range';
  name: string;
  min: number;
  max: number;
  unit?: string;
  field: string;
  steps: { min: number | null; max: number | null; label: string }[];
}

export interface IMultiSelectFilterConfig {
  category: TProductType;
  id: string;
  type: 'multi_select';
  name: string;
  field: string;
  options: { value: string; label: string }[];
}

export interface ICheckboxFilterConfig {
  id: string;
  type: 'checkbox';
  name: string;
  field: string;
  category: TProductType;
}

export type IFilterConfig =
  | IRangeFilterConfig
  | IMultiSelectFilterConfig
  | ICheckboxFilterConfig;

export type IFiltersState = Record<
  string,
  TRangeFilterValue | TMultiSelectFilterValue | TCheckboxFilterValue
>;
