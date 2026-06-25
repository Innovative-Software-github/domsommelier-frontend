import type { Metadata } from 'next';
import { TProductType, productTypeLabels } from '../../../constants/productTypes';
import { ContentContainer } from '../../../ui/ContentContainer/ContentContainer';
import { Layout } from '../../../ui/Layout/Layout';
import { getFilteredProducts } from '../../../services/products/requests';
import { getSelectedCitySlug } from '../../../services/city/serverRequest';
import { SITE_NAME } from '@/constants/site';
import { CatalogClientWrapper } from './components/CatalogClientWrapper/CatalogClientWrapper';
import { parseFilterStateFromUrl } from './utils/parseFilterStateFromUrl';
import { toUrlSearchParams } from './utils/toUrlSearchParams';
import { PAGE_SIZE, parsePageFromParams, parseSortFromParams } from './utils/catalogQuery';

import cls from './CatalogPage.module.scss';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: TProductType }>;
}): Promise<Metadata> {
  const { type } = await params;
  const label = productTypeLabels[type];

  if (!label) {
    return { title: 'Каталог' };
  }

  const description = `Купить ${label.toLowerCase()} в винном бутике «${SITE_NAME}». Большой выбор, фильтры по вкусу, доставка и самовывоз.`;
  const canonical = `/catalog/${type}`;

  return {
    title: label,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      url: canonical,
      title: `${label} — ${SITE_NAME}`,
      description,
    },
  };
}

export default async function CatalogPage({
  params,
  searchParams,
}: {
  params: Promise<{ type: TProductType }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { type: productType } = await params;

  const urlParams = await searchParams;
  const urlSearchParams = toUrlSearchParams(urlParams);
  const filters = parseFilterStateFromUrl(urlSearchParams);
  const sort = parseSortFromParams(urlSearchParams);
  const page = parsePageFromParams(urlSearchParams);

  const citySlug = await getSelectedCitySlug();
  const initialProductCards = await getFilteredProducts(filters, productType, citySlug, {
    page,
    size: PAGE_SIZE,
    sort,
  });

  return (
    <Layout showCatalogLinks={false}>
      <ContentContainer className={cls.container}>
        <CatalogClientWrapper
          productType={productType}
          initialProductCards={initialProductCards}
        />
      </ContentContainer>
    </Layout>
  );
}