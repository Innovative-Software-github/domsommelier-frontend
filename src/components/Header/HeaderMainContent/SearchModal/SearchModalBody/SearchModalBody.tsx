'use client';

import * as React from 'react';
import { useSelector } from 'react-redux';

import { SearchSidebarBlock } from './SearchSidebarBlock/SearchSidebarBlock';
import { ProductCardWithBasket } from '@/ui/ProductCard/ProductCardWithBasket';
import { useProductSearch } from '@/features/search/hooks/useProductSearch';
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback';
import {
  MODAL_PREVIEW_SIZE,
  SEARCH_DEBOUNCE_MS,
} from '@/features/search/constants';
import { currentCitySelector } from '@/store/city/selectors';

import cls from './SearchModalBody.module.scss';

export interface ISearchModalBodyProps {
  query: string;
}

export const SearchModalBody: React.FC<ISearchModalBodyProps> = ({ query }) => {
  const currentCity = useSelector(currentCitySelector);
  const [debouncedQuery, setDebouncedQuery] = React.useState(query);

  const updateDebouncedQuery = useDebouncedCallback(
    (value: string) => setDebouncedQuery(value),
    SEARCH_DEBOUNCE_MS,
  );

  React.useEffect(() => {
    updateDebouncedQuery(query);
  }, [query, updateDebouncedQuery]);

  const { data, isLoading, isQueryValid } = useProductSearch({
    q: debouncedQuery,
    page: 0,
    pageSize: MODAL_PREVIEW_SIZE,
    city: currentCity?.slug,
  });

  const showEmptyResults = isQueryValid && !isLoading && data.content.length === 0;
  const showShortQueryHint = query.trim().length > 0 && !isQueryValid;

  return (
    <div className={cls.container}>
      <div className={cls.sidebar}>
        <SearchSidebarBlock
          title="Популярные запросы"
          options={['Красное вино', 'Красное вино', 'Красное вино']}
        />
        <SearchSidebarBlock
          title="Категории"
          options={['Вина', 'Игристые', 'Красное вино']}
        />
      </div>
      <div className={cls.content}>
        <div
          className={cls.preview}
          data-loading={isLoading || undefined}
        >
          {data.content.map((card) => (
            <ProductCardWithBasket
              key={card.id}
              option={card}
              className={cls.card}
            />
          ))}

          {showShortQueryHint && (
            <p className={cls.hint}>Введите минимум 2 символа</p>
          )}

          {showEmptyResults && (
            <p className={cls.hint}>Ничего не найдено</p>
          )}
        </div>
      </div>
    </div>
  );
};
