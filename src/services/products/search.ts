import { IPaginatedResponse } from '../common/interfaces';
import { ApiEndpoint } from '../config/apiEndpoints';
import { customFetch } from '../config/customFetch';
import { TProductCard } from './interfaces/base';

export interface ISearchProductsRequest {
  q: string;
  city?: string;
  page: number;
  size: number;
}

export type ISearchProductsResponse = IPaginatedResponse<TProductCard>;

export const createEmptySearchResponse = (size: number): ISearchProductsResponse => ({
  content: [],
  totalPages: 0,
  totalElements: 0,
  number: 0,
  size,
});

export const searchProducts = async (
  request: ISearchProductsRequest,
  signal?: AbortSignal,
) => {
  const response = await customFetch<ISearchProductsResponse, ISearchProductsRequest>(
    {
      path: ApiEndpoint.products.search,
      method: 'GET',
      signal,
    },
    request,
  );

  return response;
};
