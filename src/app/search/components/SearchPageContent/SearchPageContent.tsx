'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

import { SearchInput } from '@/features/search/components/SearchInput/SearchInput';
import { useRecentSearches } from '@/features/search/hooks/useRecentSearches';
import { MIN_SEARCH_QUERY_LENGTH, SEARCH_PAGE_SIZE } from '@/features/search/constants';
import { ISearchProductsResponse, searchProducts } from '@/services/products/search';
import { ProductCardWithBasket } from '@/ui/ProductCard/ProductCardWithBasket';
import { CatalogPagination } from '@/app/catalog/[type]/components/CatalogBoard/CatalogPagination/CatalogPagination';
import { currentCitySelector } from '@/store/city/selectors';
import { productTypeArray, productTypeLabels } from '@/constants/productTypes';
import { PRODUCT_TYPES_SEGMENTS, getSearchUrl } from '@/constants/routes';
import { PRODUCT_WORD_FORMS, pluralize } from '@/utils/pluralize';

import cls from './SearchPageContent.module.scss';

export interface ISearchPageContentProps {
  query: string;
  initialResults: ISearchProductsResponse;
  hadLoadError: boolean;
}

export const SearchPageContent: React.FC<ISearchPageContentProps> = ({
  query,
  initialResults,
  hadLoadError,
}) => {
  const router = useRouter();
  const currentCity = useSelector(currentCitySelector);
  const { addRecentSearch } = useRecentSearches();

  const [inputValue, setInputValue] = React.useState(query);
  const [items, setItems] = React.useState(initialResults.content);
  const [loadedPage, setLoadedPage] = React.useState(initialResults.number);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);

  const { totalElements, totalPages } = initialResults;
  const isQueryValid = query.length >= MIN_SEARCH_QUERY_LENGTH;
  const hasItems = items.length > 0;

  // Запоминаем здесь, а не в местах отправки: сюда ведут и Enter в модалке,
  // и «Показать все», и мобильная шапка, и прямая ссылка.
  React.useEffect(() => {
    if (isQueryValid && !hadLoadError) {
      addRecentSearch(query);
    }
  }, [query, isQueryValid, hadLoadError, addRecentSearch]);

  const handleSubmit = (text: string) => {
    router.push(getSearchUrl(text));
  };

  const loadMore = async () => {
    if (isLoadingMore) {
      return;
    }

    setIsLoadingMore(true);
    try {
      const next = await searchProducts({
        q: query,
        city: currentCity?.slug,
        page: loadedPage + 1,
        size: SEARCH_PAGE_SIZE,
      });
      setItems((prev) => [
        ...prev,
        ...next.content.filter((card) => !prev.some((item) => item.id === card.id)),
      ]);
      setLoadedPage(next.number);
    } catch {
      // Тост с ошибкой уже показал customFetch.
    } finally {
      setIsLoadingMore(false);
    }
  };

  const renderTitle = () => (isQueryValid ? `Результаты по запросу «${query}»` : 'Поиск по каталогу');

  const renderMessage = () => {
    if (!query) {
      return 'Ищите по названию, стране или категории — например, «виски», «красное сухое» или «Франция».';
    }
    if (!isQueryValid) {
      return `Введите минимум ${MIN_SEARCH_QUERY_LENGTH} символа`;
    }
    if (hadLoadError) {
      return 'Не удалось выполнить поиск. Попробуйте ещё раз.';
    }
    if (!hasItems) {
      return 'Ничего не нашлось. Проверьте написание или загляните в каталог:';
    }
    return null;
  };

  const message = renderMessage();

  return (
    <section className={cls.container}>
      <h1 className={cls.title}>{renderTitle()}</h1>

      <SearchInput
        className={cls.input}
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleSubmit}
        autoFocus={!query}
      />

      {isQueryValid && hasItems && (
        <p className={cls.count}>
          Найдено {totalElements} {pluralize(totalElements, PRODUCT_WORD_FORMS)}
        </p>
      )}

      {message && <p className={cls.message}>{message}</p>}

      {!hasItems && (
        <nav className={cls.categories} aria-label="Категории каталога">
          {productTypeArray.map((type) => (
            <Link key={type} href={PRODUCT_TYPES_SEGMENTS[type]} className={cls.category}>
              {productTypeLabels[type]}
            </Link>
          ))}
        </nav>
      )}

      {hasItems && (
        <div className={cls.board} data-loading={isLoadingMore || undefined}>
          {items.map((card) => (
            <ProductCardWithBasket key={card.id} option={card} className={cls.card} />
          ))}
        </div>
      )}

      <CatalogPagination
        page={loadedPage}
        totalPages={totalPages}
        last={loadedPage >= totalPages - 1}
        hasItems={hasItems}
        onLoadMore={loadMore}
        onGoToPage={(page) => router.push(getSearchUrl(query, page))}
      />
    </section>
  );
};
