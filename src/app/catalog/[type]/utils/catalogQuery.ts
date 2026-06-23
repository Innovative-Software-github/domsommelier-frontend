import type { ISelectOptions } from '../../../../ui/Select/Select';

/** Размер страницы каталога (товаров за один запрос). */
export const PAGE_SIZE = 12;

/** Имена query-параметров пагинации и сортировки. */
export const SORT_PARAM = 'sort';
export const PAGE_PARAM = 'page';

export type TSortOption = 'popular' | 'price_asc' | 'price_desc' | 'new';

export const DEFAULT_SORT: TSortOption = 'popular';

/** Опции сортировки для дропдауна (ключ уходит на бэкенд в параметр sort). */
export const SORT_OPTIONS: ISelectOptions[] = [
  { key: 'popular', value: 'По популярности' },
  { key: 'price_asc', value: 'Сначала дешёвые' },
  { key: 'price_desc', value: 'Сначала дорогие' },
  { key: 'new', value: 'Новинки' },
];

/**
 * Зарезервированные query-ключи: это не фильтры товара, поэтому исключаются
 * из тела запроса фильтрации (иначе ушли бы как неизвестные поля фильтра).
 */
export const RESERVED_QUERY_KEYS: string[] = [SORT_PARAM, PAGE_PARAM];

export const isSortOption = (value: string | null): value is TSortOption =>
  value !== null && SORT_OPTIONS.some((option) => option.key === value);

/** Сортировка из URL; неизвестное/отсутствует → значение по умолчанию. */
export const parseSortFromParams = (params: URLSearchParams): TSortOption => {
  const raw = params.get(SORT_PARAM);
  return isSortOption(raw) ? raw : DEFAULT_SORT;
};

/** Номер страницы (0-based) из URL; некорректное/отсутствует → 0. */
export const parsePageFromParams = (params: URLSearchParams): number => {
  const raw = Number(params.get(PAGE_PARAM));
  return Number.isInteger(raw) && raw > 0 ? raw : 0;
};
