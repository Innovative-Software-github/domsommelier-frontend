'use server';

import { ApiEndpoint } from '../config/apiEndpoints';
import { customFetch, IResponse } from '../config/customFetch';
import { IFiltersConfigResponse } from './interfaces';

export const getFiltersConfig =
  async (): Promise<IFiltersConfigResponse | null> => {
    const { data } = await customFetch<IFiltersConfigResponse>({
      path: ApiEndpoint.filters.getFiltersConfig,
      withErrorHandling: true,
      method: 'GET',
      cacheStrategy: {
        cache: 'force-cache',
        revalidate: 60 * 60 * 24,
        tags: ['filtersConfig'],
      },
    });

    if (!data || typeof data === 'string') {
      return null;
    }

    return data;
  };
