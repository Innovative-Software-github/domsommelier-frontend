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
import { CatalogPrimaryFilter } from './CatalogPrimaryFilter/CatalogPrimaryFilter';
import { CatalogPagination } from './CatalogPagination/CatalogPagination';
import {
  productCardsInitialLoadedSelector,
  productCardsLastSelector,
  productCardsLoadingSelector,
  productCardsPageSelector,
  productCardsSelector,
  productCardsTotalPagesSelector,
} from '../../../../../store/products/selectors';
import {
  IFiltersState,
  IMultiSelectFilterConfig,
  TMultiSelectFilterValue,
} from '../FiltersPanel/FiltersFabric/interfaces';
import { IProductFacets } from '../../../../../services/products/requests';
import { TProductCard } from '../../../../../services/products/interfaces/base';
import { TSortOption } from '../../utils/catalogQuery';

export interface ICatalogBoardProps {
  productType: TProductType;
  filters: IFiltersState;
  facets: IProductFacets | null;
  /** Главный фильтр раздела (вид товара) — плашками над сеткой. */
  primaryFilter?: IMultiSelectFilterConfig;
  hiddenFields: string[];
  updateFilterArray: (field: string, value: any[]) => void;
  applyFilters: () => void;
  applyFilter: (field: string, value: any[]) => void;
  sort: TSortOption;
  setSort: (sort: TSortOption) => void;
  loadMore: () => void;
  goToPage: (page: number) => void;
}

export const CatalogBoard: React.FC<ICatalogBoardProps> = ({
  productType,
  filters,
  facets,
  primaryFilter,
  hiddenFields,
  updateFilterArray,
  applyFilters,
  applyFilter,
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

      {primaryFilter && (
        <CatalogPrimaryFilter
          filterConfig={primaryFilter}
          value={filters[primaryFilter.field] as TMultiSelectFilterValue | undefined}
          counts={facets?.options[primaryFilter.field]}
          onChange={(value) => applyFilter(primaryFilter.field, value)}
        />
      )}

      <FilterControllers
        productType={productType}
        filters={filters}
        facets={facets}
        hiddenFields={hiddenFields}
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
