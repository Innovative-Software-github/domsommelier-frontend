import React from 'react';
import { useSelector } from 'react-redux';

import { IFiltersState } from '../components/FiltersPanel/FiltersFabric/interfaces';
import { IProductFacets, getProductFacets } from '../../../../services/products/requests';
import { currentCitySelector } from '../../../../store/city/selectors';
import { TProductType } from '../../../../constants/productTypes';

const FACETS_DEBOUNCE_MS = 250;

/**
 * Счётчики вариантов фильтров для текущего (ещё не применённого) выбора: сколько
 * товаров даст каждая галочка и весь выбор целиком. Пока грузятся новые — отдаём
 * прошлые, чтобы список вариантов не мигал; null — ещё ни разу не загрузились.
 */
export const useFilterFacets = (
  productType: TProductType,
  filters: IFiltersState,
): IProductFacets | null => {
  const citySlug = useSelector(currentCitySelector)?.slug;
  const [state, setState] = React.useState<{ productType: TProductType; facets: IProductFacets } | null>(null);

  // Объект filters пересоздаётся на каждое изменение — зависим от содержимого.
  const filtersKey = JSON.stringify(filters);

  React.useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      getProductFacets(JSON.parse(filtersKey), productType, citySlug, controller.signal)
        .then((facets) => setState({ productType, facets }))
        .catch(() => {
          // Без счётчиков фильтры работают как раньше — просто без подсказок.
        });
    }, FACETS_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [filtersKey, productType, citySlug]);

  return state?.productType === productType ? state.facets : null;
};
