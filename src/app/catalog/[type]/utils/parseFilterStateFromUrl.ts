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

  return filters;
};
