'use server';

import { ApiEndpoint } from '../config/apiEndpoints';
import { customFetch } from '../config/customFetch';
import { IFiltersConfigResponse } from './interfaces';

export const getFiltersConfig =
  async (): Promise<IFiltersConfigResponse> => {
    const response = await customFetch<IFiltersConfigResponse>({
      path: ApiEndpoint.filters.getFiltersConfig,
      method: 'GET',
      cacheStrategy: {
        cache: 'no-store',
      },
    });

    return response;
  };
