"use client";

import React from "react";
import { TProductType } from "../../../../../constants/productTypes";
import { TProductCard } from "../../../../../services/products/interfaces/base";
import { CatalogBoard } from "../CatalogBoard/CatalogBoard";
import { Sidebar } from "../Sidebar/Sidebar";
import { useFilters } from "../../utils/useFilters";
import { setInitialProductCards } from "../../../../../store/products/actions";
import { useDispatch } from "react-redux";

export interface ICatalogClientWrapperProps {
  productType: TProductType;
  initialProductCards: TProductCard[];
}

export const CatalogClientWrapper: React.FC<ICatalogClientWrapperProps> = ({
  productType,
  initialProductCards,
}) => {
  const dispatch = useDispatch();
  const { filters, updateFilterArray, applyFilters } = useFilters(productType);

  React.useMemo(() => {
    dispatch(setInitialProductCards(initialProductCards));
  }, []);

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
        filters={filters} updateFilterArray={updateFilterArray}
        applyFilters={applyFilters}
      />
    </>
  );
};