import { TDrinkType } from '../../../constants/routes/catalogRoutes';
import { ContentContainer } from '../../../ui/ContentContainer/ContentContainer';
import { Layout } from '../../../ui/Layout/Layout';

import cls from './CatalogPage.module.scss';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: TDrinkType }>;
}) {
  const { productId } = await params;

  return (
    <Layout showCatalogLinks={false}>
      <ContentContainer className={cls.container}>
        {productId}
      </ContentContainer>
    </Layout>
  );
}
