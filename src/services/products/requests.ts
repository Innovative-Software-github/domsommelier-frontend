import { IFiltersState } from "../../app/catalog/components/Sidebar/interfaces";
import { ApiEndpoint } from "../config/apiEndpoints";
import { customFetch } from "../config/customFetch";
import { TProductType } from "../../constants/productTypes";
import { IProduct } from "./interfaces/base";

export const getFilteredProducts = async (
  filters: IFiltersState,
  category: TProductType
) => {
  const response = await customFetch<IProduct[], IFiltersState>(
    {
      path: `${ApiEndpoint.filters.getFilteredProducts}?category=${category}`,
      method: 'POST',
    },
    filters
  );

  return response;
}
