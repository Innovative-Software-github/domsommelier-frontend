'use server';

import { ApiEndpoint } from '../config/apiEndpoints';
import { customFetch, IResponse } from '../config/customFetch';
import { IFiltersConfigResponse } from './interfaces';

export const getFiltersConfig = async (): Promise<IFiltersConfigResponse> => {
  const response = await customFetch<IFiltersConfigResponse>({
    path: ApiEndpoint.filters.getFiltersConfig,
    method: 'GET',
    cacheStrategy: {
      cache: 'force-cache',
      revalidate: 60 * 60 * 24,
      tags: ['filtersConfig'],
    },
  });

  return response;
};
