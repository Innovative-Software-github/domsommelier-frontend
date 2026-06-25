import { IFiltersState } from "../../app/catalog/[type]/components/FiltersPanel/FiltersFabric/interfaces";
import { ApiEndpoint } from "../config/apiEndpoints";
import { customFetch } from "../config/customFetch";
import { TProductType } from "../../constants/productTypes";
import { TProduct, TProductCard, TGetFilteredProductsResponse, IPagedResponse } from "./interfaces/base";

export interface IGetFilteredProductsRequest {
  filters: IFiltersState;
  productType: TProductType;
  /** slug выбранного города — ограничивает выдачу доступным в городе ассортиментом. */
  city?: string;
  /** Номер страницы (0-based). */
  page?: number;
  /** Размер страницы. */
  size?: number;
  /** Токен сортировки (popular | price_asc | price_desc | new). */
  sort?: string;
  /**
   * Режим применения результата в сторе (только клиент, на бэкенд не уходит):
   * replace — заменить список (смена фильтров/сортировки, прыжок на страницу),
   * append — добавить в конец («Показать ещё»).
   */
  mode?: 'replace' | 'append';
}

export interface IGetFilteredProductsOptions {
  page?: number;
  size?: number;
  sort?: string;
}

export const getFilteredProducts = async (
  filters: IGetFilteredProductsRequest['filters'],
  category: IGetFilteredProductsRequest['productType'],
  city?: IGetFilteredProductsRequest['city'],
  options?: IGetFilteredProductsOptions,
): Promise<TGetFilteredProductsResponse> => {
  const search = new URLSearchParams({ category });
  if (city) {
    search.set('city', city);
  }
  if (options?.sort) {
    search.set('sort', options.sort);
  }
  search.set('page', String(options?.page ?? 0));
  search.set('size', String(options?.size ?? 20));

  const response = await customFetch<unknown, IFiltersState>(
    {
      path: `${ApiEndpoint.products.getFilteredProducts}?${search.toString()}`,
      method: 'POST',
    },
    filters,
  );

  return normalizePagedProducts(response);
};

/**
 * Приводит ответ к постраничному виду. Подстраховка на случай, если бэкенд вернёт
 * обычный массив (старое поведение /filter без пагинации) — тогда трактуем его как
 * единственную страницу. Гарантирует, что content — всегда массив.
 */
function normalizePagedProducts(raw: unknown): TGetFilteredProductsResponse {
  if (Array.isArray(raw)) {
    const content = raw as TProductCard[];
    return {
      content,
      number: 0,
      size: content.length,
      totalElements: content.length,
      totalPages: content.length > 0 ? 1 : 0,
      first: true,
      last: true,
      numberOfElements: content.length,
    };
  }

  const page = (raw ?? {}) as Partial<IPagedResponse<TProductCard>>;
  const content = Array.isArray(page.content) ? page.content : [];

  return {
    content,
    number: page.number ?? 0,
    size: page.size ?? content.length,
    totalElements: page.totalElements ?? content.length,
    totalPages: page.totalPages ?? (content.length > 0 ? 1 : 0),
    first: page.first ?? true,
    last: page.last ?? true,
    numberOfElements: page.numberOfElements ?? content.length,
  };
}

export const getProductById = async (id: string) => {
  const response = await customFetch<TProduct, { id: string }>(
    {
      path: ApiEndpoint.products.getProductById,
      method: 'GET',
    },
    { id: id }
  );

  return response;
}

/** Страница всех товаров (для генерации sitemap). Бэкенд отдаёт массив карточек. */
export const getAllProducts = async (page: number, size: number): Promise<TProductCard[]> => {
  const response = await customFetch<TProductCard[]>({
    path: `/api/v1/products/all?page=${page}&size=${size}`,
    method: 'GET',
  });

  return response;
};
