import React from "react";
import { useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { IFiltersState } from "../components/FiltersPanel/FiltersFabric/interfaces";
import { stringifySearchParams } from "../../../../utils/stringifySearchParams";
import { getFilteredProductsRequest } from "../../../../store/products/actions";
import { useAppDispatch } from "../../../../store/hooks";
import { currentCitySelector } from "../../../../store/city/selectors";
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
  const currentCity = useSelector(currentCitySelector);

  const [filters, setFilters] = React.useState<IFiltersState>(() => parseFilterStateFromUrl(searchParams));

  const updateFilterArray = (field: string, value: any[]) =>
    setFilters((prev) => ({ ...prev, [field]: value }));

  const applyFilters = async () => {
    try {
      await dispatch(getFilteredProductsRequest({ filters, productType, city: currentCity?.slug }));
      
      const queryString = stringifySearchParams(filters);

      router.push(`?${queryString}`, { scroll: false });
    } catch (error) {
      console.error('Failed to apply filters:', error);
    }
  };

  return { filters, updateFilterArray, applyFilters };
};
