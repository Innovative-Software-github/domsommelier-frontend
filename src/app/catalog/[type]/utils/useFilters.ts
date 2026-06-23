import React from "react";
import { useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { IFiltersState } from "../components/FiltersPanel/FiltersFabric/interfaces";
import { stringifySearchParams } from "../../../../utils/stringifySearchParams";
import { getFilteredProductsRequest } from "../../../../store/products/actions";
import { productCardsPageSelector } from "../../../../store/products/selectors";
import { useAppDispatch } from "../../../../store/hooks";
import { currentCitySelector } from "../../../../store/city/selectors";
import { TProductType } from "../../../../constants/productTypes";
import { parseFilterStateFromUrl } from "./parseFilterStateFromUrl";
import {
  DEFAULT_SORT,
  PAGE_PARAM,
  PAGE_SIZE,
  SORT_PARAM,
  TSortOption,
  parseSortFromParams,
} from "./catalogQuery";

export interface IUseFiltersReturns {
  filters: IFiltersState;
  sort: TSortOption;
  updateFilterArray: (field: string, value: any[]) => void;
  /** Применить фильтры (кнопка «Найти») — сброс на первую страницу, замена списка. */
  applyFilters: () => void;
  /** Сменить сортировку — сброс на первую страницу, замена списка. */
  setSort: (sort: TSortOption) => void;
  /** «Показать ещё» — догрузить следующую страницу в конец списка. */
  loadMore: () => void;
  /** Перейти на конкретную страницу (0-based) — замена списка. */
  goToPage: (page: number) => void;
}

export const useFilters = (productType: TProductType): IUseFiltersReturns => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const currentCity = useSelector(currentCitySelector);
  const currentPage = useSelector(productCardsPageSelector);

  const [filters, setFilters] = React.useState<IFiltersState>(() => parseFilterStateFromUrl(searchParams));
  const [sort, setSortState] = React.useState<TSortOption>(() => parseSortFromParams(searchParams));

  const updateFilterArray = (field: string, value: any[]) =>
    setFilters((prev) => ({ ...prev, [field]: value }));

  const buildQueryString = (
    nextFilters: IFiltersState,
    nextSort: TSortOption,
    nextPage: number,
  ): string => {
    const parts = [stringifySearchParams(nextFilters)];
    if (nextSort !== DEFAULT_SORT) {
      parts.push(`${SORT_PARAM}=${nextSort}`);
    }
    if (nextPage > 0) {
      parts.push(`${PAGE_PARAM}=${nextPage}`);
    }
    return parts.filter(Boolean).join('&');
  };

  const fetchPage = async (
    nextFilters: IFiltersState,
    nextSort: TSortOption,
    nextPage: number,
    mode: 'replace' | 'append',
  ) => {
    try {
      await dispatch(getFilteredProductsRequest({
        filters: nextFilters,
        productType,
        city: currentCity?.slug,
        page: nextPage,
        size: PAGE_SIZE,
        sort: nextSort,
        mode,
      }));

      // URL синхронизируем только для replace (фильтры/сортировка/прыжок на страницу).
      // Для «Показать ещё» (append) URL не трогаем: смена query перезапускает серверный
      // page.tsx, и setInitialProductCards перезатёр бы дозагруженную ленту первой страницей.
      if (mode === 'replace') {
        router.push(`?${buildQueryString(nextFilters, nextSort, nextPage)}`, { scroll: false });
      }
    } catch (error) {
      console.error('Failed to fetch products page:', error);
    }
  };

  const applyFilters = () => fetchPage(filters, sort, 0, 'replace');

  const setSort = (nextSort: TSortOption) => {
    setSortState(nextSort);
    fetchPage(filters, nextSort, 0, 'replace');
  };

  const loadMore = () => fetchPage(filters, sort, currentPage + 1, 'append');

  const goToPage = (nextPage: number) => fetchPage(filters, sort, nextPage, 'replace');

  return { filters, sort, updateFilterArray, applyFilters, setSort, loadMore, goToPage };
};
