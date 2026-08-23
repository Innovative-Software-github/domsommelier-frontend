'use server';

import { ApiEndpoint } from '../config/apiEndpoints';
import { customFetch } from '../config/customFetch';
import { IFiltersConfigResponse } from './interfaces';

/**
 * Грузится в RootLayout на КАЖДОЙ странице сайта — сбой (сеть/таймаут) не должен
 * ронять весь сайт. При ошибке — пустой конфиг: FiltersPanel/CatalogMenuContent
 * уже отказоустойчивы к отсутствующим ключам (см. filterConfig[productType] ?? {}).
 */
export const getFiltersConfig =
  async (): Promise<IFiltersConfigResponse> => {
    try {
      return await customFetch<IFiltersConfigResponse>({
        path: ApiEndpoint.filters.getFiltersConfig,
        method: 'GET',
        cacheStrategy: {
          cache: 'no-store',
        },
      });
    } catch (error) {
      console.warn('Failed to load filters config:', error);
      return {} as IFiltersConfigResponse;
    }
  };
