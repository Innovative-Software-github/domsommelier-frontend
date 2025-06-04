import { TProductType } from '../../../constants/routes/productsRoutes';
import { getFiltersConfig } from '../../../services/filters/serverRequest';
import { ContentContainer } from '../../../ui/ContentContainer/ContentContainer';
import { Layout } from '../../../ui/Layout/Layout';
import { CatalogBoard } from '../components/CatalogBoard/CatalogBoard';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { FiltersProvider } from '../hooks/useFiltersContext';

import cls from './CatalogPage.module.scss';

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ type: TProductType }>;
}) {
  const { type: productType } = await params;

  return (
    <Layout showCatalogLinks={false}>
      <ContentContainer className={cls.container}>
        <FiltersProvider productType={productType}>
          <Sidebar productType={productType} />
          <CatalogBoard productType={productType} />
        </FiltersProvider>
      </ContentContainer>
    </Layout>
  );
}
