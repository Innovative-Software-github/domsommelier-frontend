import type { IFilterConfig, IFiltersState, IMultiSelectFilterConfig } from '../components/FiltersPanel/FiltersFabric/interfaces';

export const SUBTYPE_FIELDS: Record<string, 'whisky' | 'cognac'> = {
  whiskyType: 'whisky', whiskyBlendStyle: 'whisky', whiskyAge: 'whisky',
  cognacClassification: 'cognac', cognacAge: 'cognac', cognacOrigin: 'cognac',
};
export const RANGE_FIELDS = new Set(['price', 'year', 'strength', 'whiskyAge', 'cognacAge']);
export const CODE_FIELDS = new Set(['grape', 'brand', 'region', 'appellation', 'grapeComposition', 'sparklingMethod', 'agingVessel', 'whiskyType', 'whiskyBlendStyle', 'cognacClassification', 'cognacOrigin']);

export function selectedSubtype(filters: IFiltersState): 'whisky' | 'cognac' | undefined {
  const values = filters.subcategory;
  if (!Array.isArray(values) || values.length !== 1) return undefined;
  const value = String(values[0]).trim().toLowerCase();
  if (['виски', 'whisky', 'whiskey'].includes(value)) return 'whisky';
  if (['коньяк', 'cognac'].includes(value)) return 'cognac';
  return undefined;
}
export function normalizeAttributeFilters(filters: IFiltersState): IFiltersState {
  const subtype = selectedSubtype(filters);
  return Object.fromEntries(Object.entries(filters).filter(([field]) => !SUBTYPE_FIELDS[field] || SUBTYPE_FIELDS[field] === subtype));
}
export function isFilterVisible(config: IFilterConfig, filters: IFiltersState): boolean {
  return !config.subtype || config.subtype === selectedSubtype(filters);
}
export function optionValue(config: IMultiSelectFilterConfig, option: { value: string; label: string }): string {
  return config.selectionMode === 'value' ? option.value : option.label;
}

/** Old bookmarked labels remain checked after switching a field to stable codes. */
export function canonicalSelection(config: IMultiSelectFilterConfig, values: string[]): string[] {
  if (config.selectionMode !== 'value') return values;
  return values.map(value => config.options.find(o => o.value === value)?.value
    ?? config.options.find(o => o.label === value)?.value ?? value);
}
