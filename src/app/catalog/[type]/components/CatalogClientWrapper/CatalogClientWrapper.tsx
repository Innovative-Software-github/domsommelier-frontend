"use client";

import React from "react";
import { TProductType } from "../../../../../constants/productTypes";
import { TGetFilteredProductsResponse } from "../../../../../services/products/interfaces/base";
import { CatalogBoard } from "../CatalogBoard/CatalogBoard";
import { Sidebar } from "../Sidebar/Sidebar";
import { useFilters } from "../../utils/useFilters";
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
  const { filters, sort, updateFilterArray, applyFilters, setSort, loadMore, goToPage } =
    useFilters(productType);

  React.useEffect(() => {
    dispatch(setInitialProductCards(initialProductCards));
  }, [dispatch, initialProductCards]);

  return (
    <>
      <Sidebar
        filters={filters}
        updateFilterArray={updateFilterArray}
        applyFilters={applyFilters}
        productType={productType}
      />

      <CatalogBoard
        productType={productType}
        filters={filters}
        updateFilterArray={updateFilterArray}
        applyFilters={applyFilters}
        sort={sort}
        setSort={setSort}
        loadMore={loadMore}
        goToPage={goToPage}
      />
    </>
  );
};
