import { ICity } from '@/store/city/interfaces';
import { customFetch } from '@/services/config/customFetch';
import { ICityResponse } from './interfaces';

/** Активные города присутствия. Работает и на сервере (SSR), и на клиенте. */
export const getCities = async (): Promise<ICity[]> => {
  const response = await customFetch<ICityResponse[]>({
    path: '/api/v1/cities',
    method: 'GET',
  });

  return response.map(({ id, slug, name }) => ({ id, slug, name }));
};
