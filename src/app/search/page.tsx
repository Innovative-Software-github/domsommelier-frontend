import type { Metadata } from 'next';

import { Layout } from '@/ui/Layout/Layout';
import { ContentContainer } from '@/ui/ContentContainer/ContentContainer';
import { ServerErrorToast } from '@/components/ServerErrorToast/ServerErrorToast';
import { getSelectedCitySlug } from '@/services/city/serverRequest';
import { createEmptySearchResponse, searchProducts } from '@/services/products/search';
import { MIN_SEARCH_QUERY_LENGTH, SEARCH_PAGE_SIZE } from '@/features/search/constants';
import { SearchPageContent } from './components/SearchPageContent/SearchPageContent';

type TSearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const readQuery = (value: string | string[] | undefined): string =>
  typeof value === 'string' ? value.trim() : '';

/** В URL страницы с 1, на бэкенде — с 0. */
const readPage = (value: string | string[] | undefined): number => {
  const page = Number(typeof value === 'string' ? value : 1);
  return Number.isInteger(page) && page > 1 ? page - 1 : 0;
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: TSearchParams;
}): Promise<Metadata> {
  const query = readQuery((await searchParams).q);

  return {
    title: query ? `Поиск: ${query}` : 'Поиск',
    // Выдачу в индекс не пускаем: бесконечное число страниц-дублей каталога.
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({ searchParams }: { searchParams: TSearchParams }) {
  const params = await searchParams;
  const query = readQuery(params.q);
  const page = readPage(params.page);

  let hadLoadError = false;
  let initialResults = createEmptySearchResponse(SEARCH_PAGE_SIZE);

  if (query.length >= MIN_SEARCH_QUERY_LENGTH) {
    const city = await getSelectedCitySlug();
    // Сбой не должен ронять страницу — показываем пустую выдачу и тост.
    initialResults = await searchProducts({ q: query, city, page, size: SEARCH_PAGE_SIZE }).catch(
      (error) => {
        console.warn('Failed to search products:', error);
        hadLoadError = true;
        return createEmptySearchResponse(SEARCH_PAGE_SIZE);
      },
    );
  }

  return (
    <Layout>
      <ContentContainer>
        {/* key: новый запрос или страница — сбрасываем догруженные «Показать ещё» карточки. */}
        <SearchPageContent
          key={`${query}:${page}`}
          query={query}
          initialResults={initialResults}
          hadLoadError={hadLoadError}
        />
      </ContentContainer>
      {hadLoadError && (
        <ServerErrorToast message="Не удалось выполнить поиск. Попробуйте обновить страницу." />
      )}
    </Layout>
  );
}
