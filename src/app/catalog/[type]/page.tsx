import { TProductType } from '../../../constants/productTypes';
import { ContentContainer } from '../../../ui/ContentContainer/ContentContainer';
import { Layout } from '../../../ui/Layout/Layout';
import { CatalogBoard } from '../components/CatalogBoard/CatalogBoard';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { FiltersProvider } from '../hooks/useFiltersContext';
import { getFilteredProducts } from '../../../services/products/requests';

import cls from './CatalogPage.module.scss';

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ type: TProductType }>;
}) {
  const { type: productType } = await params;
  const initialProductCards = await getFilteredProducts({}, productType);

  return (
    <Layout showCatalogLinks={false}>
      <ContentContainer className={cls.container}>
        <FiltersProvider productType={productType}>
          <Sidebar productType={productType} />
          <CatalogBoard productType={productType} initialProductCards={initialProductCards} />
        </FiltersProvider>
      </ContentContainer>
    </Layout>
  );
}
