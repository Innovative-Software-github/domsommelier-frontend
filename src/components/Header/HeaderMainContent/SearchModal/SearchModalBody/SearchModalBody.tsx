'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import { SearchSidebarBlock } from './SearchSidebarBlock/SearchSidebarBlock';
import { ProductCardWithBasket } from '@/ui/ProductCard/ProductCardWithBasket';
import { useProductSearch } from '@/features/search/hooks/useProductSearch';
import { useRecentSearches } from '@/features/search/hooks/useRecentSearches';
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback';
import {
  MIN_SEARCH_QUERY_LENGTH,
  MODAL_PREVIEW_SIZE,
  SEARCH_DEBOUNCE_MS,
} from '@/features/search/constants';
import { currentCitySelector } from '@/store/city/selectors';
import { productTypeArray, productTypeLabels } from '@/constants/productTypes';
import { PRODUCT_TYPES_SEGMENTS, getSearchUrl } from '@/constants/routes';
import { PRODUCT_WORD_FORMS, pluralize } from '@/utils/pluralize';

import cls from './SearchModalBody.module.scss';

export interface ISearchModalBodyProps {
  query: string;
  onQueryChange: (value: string) => void;
  /** Вызывается при переходе на другую страницу — модалку нужно закрыть. */
  onNavigate: () => void;
}

export const SearchModalBody: React.FC<ISearchModalBodyProps> = ({
  query,
  onQueryChange,
  onNavigate,
}) => {
  const currentCity = useSelector(currentCitySelector);
  const { recentSearches, clearRecentSearches } = useRecentSearches();
  const [debouncedQuery, setDebouncedQuery] = React.useState(query);

  const updateDebouncedQuery = useDebouncedCallback(
    (value: string) => setDebouncedQuery(value),
    SEARCH_DEBOUNCE_MS,
  );

  React.useEffect(() => {
    updateDebouncedQuery(query);
  }, [query, updateDebouncedQuery]);

  const { data, isLoading, error } = useProductSearch({
    q: debouncedQuery,
    page: 0,
    pageSize: MODAL_PREVIEW_SIZE,
    city: currentCity?.slug,
  });

  const trimmedQuery = query.trim();
  const isQueryValid = trimmedQuery.length >= MIN_SEARCH_QUERY_LENGTH;
  // Пока идёт debounce, в data ещё результаты прошлого запроса — считаем это загрузкой.
  const isPending = isLoading || trimmedQuery !== debouncedQuery.trim();
  const cards = isQueryValid ? data.content : [];
  const hasMore = !isPending && data.totalElements > cards.length;

  const renderStatus = () => {
    if (!trimmedQuery) {
      return 'Ищите по названию, стране или категории — например, «виски», «красное сухое» или «Франция».';
    }
    if (!isQueryValid) {
      return `Введите минимум ${MIN_SEARCH_QUERY_LENGTH} символа`;
    }
    if (isPending) {
      return cards.length === 0 ? 'Ищем…' : null;
    }
    if (error) {
      return 'Не удалось выполнить поиск. Попробуйте ещё раз.';
    }
    if (cards.length === 0) {
      return `По запросу «${trimmedQuery}» ничего не найдено`;
    }
    return null;
  };

  const status = renderStatus();

  return (
    <div className={cls.container}>
      <div className={cls.sidebar}>
        {recentSearches.length > 0 && (
          <SearchSidebarBlock
            title="Вы искали"
            items={recentSearches.map((item) => ({
              label: item,
              onClick: () => onQueryChange(item),
            }))}
            action={{ label: 'Очистить', onClick: clearRecentSearches }}
          />
        )}
        <SearchSidebarBlock
          title="Категории"
          items={productTypeArray.map((type) => ({
            label: productTypeLabels[type],
            href: PRODUCT_TYPES_SEGMENTS[type],
            onClick: onNavigate,
          }))}
        />
      </div>
      <div className={cls.content}>
        {status && <p className={cls.hint}>{status}</p>}

        {cards.length > 0 && (
          <div className={cls.preview} data-loading={isPending || undefined}>
            {cards.map((card) => (
              <ProductCardWithBasket
                key={card.id}
                option={card}
                className={cls.card}
              />
            ))}
          </div>
        )}

        {hasMore && (
          <Link
            href={getSearchUrl(trimmedQuery)}
            className={cls.showAll}
            onClick={onNavigate}
          >
            Показать все {data.totalElements} {pluralize(data.totalElements, PRODUCT_WORD_FORMS)}
          </Link>
        )}
      </div>
    </div>
  );
};
