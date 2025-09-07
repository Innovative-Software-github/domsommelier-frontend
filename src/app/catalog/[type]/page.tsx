import { TProductType } from '../../../constants/productTypes';
import { ContentContainer } from '../../../ui/ContentContainer/ContentContainer';
import { Layout } from '../../../ui/Layout/Layout';
import { getFilteredProducts } from '../../../services/products/requests';
import { CatalogClientWrapper } from './components/CatalogClientWrapper/CatalogClientWrapper';
import { parseFilterStateFromUrl } from './utils/parseFilterStateFromUrl';
import { toUrlSearchParams } from './utils/toUrlSearchParams';

import cls from './CatalogPage.module.scss';

export default async function CatalogPage({
  params,
  searchParams,
}: {
  params: { type: TProductType };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { type: productType } = params;

  const urlSearchParams = toUrlSearchParams(searchParams);
  const filters = parseFilterStateFromUrl(urlSearchParams);
  const initialProductCards = await getFilteredProducts(filters, productType);

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
