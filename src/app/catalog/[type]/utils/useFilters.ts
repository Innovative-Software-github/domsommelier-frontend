import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IFiltersState } from "../components/FiltersPanel/FiltersFabric/interfaces";
import { stringifySearchParams } from "../../../../utils/stringifySearchParams";
import { getFilteredProductsRequest } from "../../../../store/products/actions";
import { useAppDispatch } from "../../../../store/hooks";
import { TProductType } from "../../../../constants/productTypes";
import { parseFilterStateFromUrl } from "./parseFilterStateFromUrl";

export interface IUseFiltersReturns {
  filters: IFiltersState;
  updateFilterArray: (field: string, value: any[]) => void;
  applyFilters: () => void;
}

export const useFilters = (productType: TProductType): IUseFiltersReturns => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const [filters, setFilters] = React.useState<IFiltersState>(() => parseFilterStateFromUrl(searchParams));

  const updateFilterArray = (field: string, value: any[]) =>
    setFilters((prev) => ({ ...prev, [field]: value }));

  const applyFilters = async () => {
    try {
      await dispatch(getFilteredProductsRequest({ filters, productType }));
      
      const queryString = stringifySearchParams(filters);

      router.push(`?${queryString}`, { scroll: false });
    } catch (error) {
      console.error('Failed to apply filters:', error);
    }
  };

  return { filters, updateFilterArray, applyFilters };
};
