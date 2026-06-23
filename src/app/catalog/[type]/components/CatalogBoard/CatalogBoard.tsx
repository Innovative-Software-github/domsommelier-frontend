'use client';

import React from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

import cls from './CatalogBoard.module.scss';
import { ProductCardWithBasket } from '../../../../../ui/ProductCard/ProductCardWithBasket';
import {
  productTypeLabels,
  TProductType,
} from '../../../../../constants/productTypes';
import { FilterControllers } from './FilterControllers/FilterControllers';
import { CatalogPagination } from './CatalogPagination/CatalogPagination';
import {
  productCardsInitialLoadedSelector,
  productCardsLastSelector,
  productCardsLoadingSelector,
  productCardsPageSelector,
  productCardsSelector,
  productCardsTotalPagesSelector,
} from '../../../../../store/products/selectors';
import { IFiltersState } from '../FiltersPanel/FiltersFabric/interfaces';
import { TProductCard } from '../../../../../services/products/interfaces/base';
import { TSortOption } from '../../utils/catalogQuery';

export interface ICatalogBoardProps {
  productType: TProductType;
  filters: IFiltersState;
  updateFilterArray: (field: string, value: any[]) => void;
  applyFilters: () => void;
  sort: TSortOption;
  setSort: (sort: TSortOption) => void;
  loadMore: () => void;
  goToPage: (page: number) => void;
}

export const CatalogBoard: React.FC<ICatalogBoardProps> = ({
  productType,
  filters,
  updateFilterArray,
  applyFilters,
  sort,
  setSort,
  loadMore,
  goToPage,
}) => {
  const productCards = useSelector(productCardsSelector);
  const isProductCardsLoading = useSelector(productCardsLoadingSelector);
  const isProductCardsInitialLoaded = useSelector(productCardsInitialLoadedSelector);
  const page = useSelector(productCardsPageSelector);
  const totalPages = useSelector(productCardsTotalPagesSelector);
  const last = useSelector(productCardsLastSelector);

  const hasItems = (productCards?.length ?? 0) > 0;
  const isEmpty = !hasItems && isProductCardsInitialLoaded;

  return (
    <section className={cls.container}>
      <h2 className={cls.title}>{productTypeLabels[productType]}</h2>

      <FilterControllers
        productType={productType}
        filters={filters}
        updateFilterArray={updateFilterArray}
        applyFilters={applyFilters}
        sort={sort}
        setSort={setSort}
      />

      <div className={clsx(cls.board, {
        [cls.isLoading]: isProductCardsLoading,
        [cls.emptyState]: isEmpty,
      })}>
        {productCards?.map((card: TProductCard) => (
          <ProductCardWithBasket
            key={card.id}
            option={card}
            className={cls.card}
          />
        ))}

        {isEmpty && (
          <div className={cls.emptyList}>
            <p>Ничего не найдено</p>
          </div>
        )}
      </div>

      <CatalogPagination
        page={page}
        totalPages={totalPages}
        last={last}
        hasItems={hasItems}
        onLoadMore={loadMore}
        onGoToPage={goToPage}
      />
    </section>
  );
};
