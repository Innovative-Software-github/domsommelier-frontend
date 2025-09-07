import { IFiltersState } from "../../app/catalog/[type]/components/FiltersPanel/FiltersFabric/interfaces";
import { ApiEndpoint } from "../config/apiEndpoints";
import { customFetch } from "../config/customFetch";
import { TProductType } from "../../constants/productTypes";
import { TProduct, TProductCard } from "./interfaces/base";

export interface IGetFilteredProductsRequest {
  filters: IFiltersState;
  productType: TProductType;
}

export const getFilteredProducts = async (
  filters: IGetFilteredProductsRequest['filters'],
  category: IGetFilteredProductsRequest['productType'],
) => {
  const response = await customFetch<TProductCard[], IFiltersState>(
    {
      path: `${ApiEndpoint.products.getFilteredProducts}?category=${category}`,
      method: 'POST',
    },
    filters
  );

  return response;
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
