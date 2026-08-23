'use server';

import { ApiEndpoint } from '../config/apiEndpoints';
import { customFetch } from '../config/customFetch';
import { IFiltersConfigResponse } from './interfaces';

// Единственный потребитель — RootLayout при SSR. Ошибку не глушим здесь,
// фолбэк на сбой — забота вызывающей стороны (см. layout.tsx), там же
// решается, показывать ли пользователю уведомление об этом.
export const getFiltersConfig =
  async (): Promise<IFiltersConfigResponse> => {
    return await customFetch<IFiltersConfigResponse>({
      path: ApiEndpoint.filters.getFiltersConfig,
      method: 'GET',
      cacheStrategy: {
        cache: 'no-store',
      },
    });
  };
