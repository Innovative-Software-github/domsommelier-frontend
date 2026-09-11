"use client";

import React from "react";
import { TProductType } from "../../../../../constants/productTypes";
import { TGetFilteredProductsResponse } from "../../../../../services/products/interfaces/base";
import { CatalogBoard } from "../CatalogBoard/CatalogBoard";
import { Sidebar } from "../Sidebar/Sidebar";
import { useFilters } from "../../utils/useFilters";
import { useFilterFacets } from "../../utils/useFilterFacets";
import { usePrimaryFilter } from "../../utils/usePrimaryFilter";
import { setInitialProductCards } from "../../../../../store/products/actions";
import { useDispatch } from "react-redux";

export interface ICatalogClientWrapperProps {
  productType: TProductType;
  initialProductCards: TGetFilteredProductsResponse;
}

export const CatalogClientWrapper: React.FC<ICatalogClientWrapperProps> = ({
  productType,
  initialProductCards,
}) => {
  const dispatch = useDispatch();
  const { filters, sort, updateFilterArray, applyFilters, applyFilter, setSort, loadMore, goToPage } =
    useFilters(productType);
  const facets = useFilterFacets(productType, filters);
  const primaryFilter = usePrimaryFilter(productType);
  // Главный фильтр показан плашками над сеткой — в боковой панели его не дублируем.
  const hiddenFields = primaryFilter ? [primaryFilter.field] : [];

  React.useEffect(() => {
    dispatch(setInitialProductCards(initialProductCards));
  }, [dispatch, initialProductCards]);

  return (
    <>
      <Sidebar
        filters={filters}
        facets={facets}
        hiddenFields={hiddenFields}
        updateFilterArray={updateFilterArray}
        applyFilters={applyFilters}
        productType={productType}
      />

      <CatalogBoard
        productType={productType}
        filters={filters}
        facets={facets}
        primaryFilter={primaryFilter}
        hiddenFields={hiddenFields}
        updateFilterArray={updateFilterArray}
        applyFilters={applyFilters}
        applyFilter={applyFilter}
        sort={sort}
        setSort={setSort}
        loadMore={loadMore}
        goToPage={goToPage}
      />
    </>
  );
};
