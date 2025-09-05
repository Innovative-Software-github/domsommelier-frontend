import { IFiltersState } from "../../app/catalog/components/Sidebar/interfaces";
import { ApiEndpoint } from "../config/apiEndpoints";
import { customFetch } from "../config/customFetch";
import { TProductType } from "../../constants/productTypes";
import { TProductCard } from "./interfaces/base";

export const getFilteredProducts = async (
  filters: IFiltersState,
  category: TProductType
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
