import { CODE_FIELDS, RANGE_FIELDS, normalizeAttributeFilters } from './catalogAttributeFilters';
import { RESERVED_QUERY_KEYS } from './catalogQuery';

export const parseFilterStateFromUrl = (searchParams: URLSearchParams) => {
  const filters: Record<string, any> = {};

  searchParams.forEach((value, key) => {
    // page/sort — не фильтры товара, в тело запроса не идут
    if (RESERVED_QUERY_KEYS.includes(key)) {
      return;
    }
    if (!filters[key]) {
      filters[key] = [];
    }
    filters[key].push(value);
  });

  Object.keys(filters).forEach((key) => {
    const values = filters[key];

    if (RANGE_FIELDS.has(key)) {
      filters[key] = values.map((v: string) => v === 'null' || v === '' ? null : Number(v));
      if (filters[key].length !== 2 || filters[key].some((v: number | null) => v !== null && !Number.isFinite(v))) delete filters[key];
      return;
    }
    if (CODE_FIELDS.has(key)) { filters[key] = values; return; }
    // если параметр встречается один раз и равен "true"/"false"
    if (values.length === 1 && values[0] === "true") {
      filters[key] = true;
    } else if (values.length === 1 && values[0] === "false") {
      filters[key] = false;
    } else {
      // всегда массив: числа → number, строки → строка
      filters[key] = values.map((v: string) =>
        isNaN(Number(v)) ? v : Number(v)
      );
    }
  });

  return normalizeAttributeFilters(filters);
};
