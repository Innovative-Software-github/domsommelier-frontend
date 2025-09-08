'use client';

import React from 'react';
import clsx from 'clsx';

import cls from './CatalogBoard.module.scss';
import { ProductCard } from '../../../../../ui/ProductCard/ProductCard';
import {
  productTypeLabels,
  TProductType,
} from '../../../../../constants/productTypes';
import { FilterControllers } from './FilterControllers/FilterControllers';
import { useSelector } from 'react-redux';
import { productCardsInitialLoadedSelector, productCardsLoadingSelector, productCardsSelector } from '../../../../../store/products/selectors';
import { IFiltersState } from '../FiltersPanel/FiltersFabric/interfaces';
import { TProductCard } from '../../../../../services/products/interfaces/base';

export interface ICatalogBoardProps {
  productType: TProductType;
  filters: IFiltersState;
  updateFilterArray: (field: string, value: any[]) => void;
  applyFilters: () => void;
}

export const CatalogBoard: React.FC<ICatalogBoardProps> = ({
  productType,
  filters,
  updateFilterArray,
  applyFilters,
}) => {
  const productCards = useSelector(productCardsSelector);
  const isProductCardsLoading = useSelector(productCardsLoadingSelector);
  const isProductCardsInitialLoaded = useSelector(productCardsInitialLoadedSelector);

  console.log(productCards);
  console.log(isProductCardsInitialLoaded);

  return (
    <section className={cls.container}>
      <h2 className={cls.title}>{productTypeLabels[productType]}</h2>

      <FilterControllers
        productType={productType}
        filters={filters}
        updateFilterArray={updateFilterArray}
        applyFilters={applyFilters}
      />

      <div className={clsx(cls.board, {
        [cls.isLoading]: isProductCardsLoading,
        [cls.emptyState]: productCards.length === 0 && isProductCardsInitialLoaded,
      })}>
        {productCards.map((card: TProductCard) => (
          <ProductCard
            key={card.id}
            option={card}
            className={cls.card}
          />
        ))}

        {productCards.length === 0 && isProductCardsInitialLoaded && (
          <div className={cls.emptyList}>
            <p>Ничего не найдено</p>
          </div>
        )}
      </div>
    </section>
  );
};
