import { IFiltersState } from "../../app/catalog/[type]/components/FiltersPanel/FiltersFabric/interfaces";
import { ApiEndpoint } from "../config/apiEndpoints";
import { customFetch } from "../config/customFetch";
import { TProductType } from "../../constants/productTypes";
import { TProductCard } from "./interfaces/base";

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
      path: `${ApiEndpoint.filters.getFilteredProducts}?category=${category}`,
      method: 'POST',
    },
    filters
  );

  return response;
}
