import { ContentContainer } from '../../../ui/ContentContainer/ContentContainer';
import { Layout } from '../../../ui/Layout/Layout';
import { ProductInformationContainer } from './components/ProductInformationContainer/ProductInformationContainer';
import cls from './page.module.scss';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: number }>;
}) {
  const { productId } = await params;

  return (
    <Layout footerClassName={cls.footer}>
      <ContentContainer className={cls.container}>
        <ProductInformationContainer />
      </ContentContainer>
    </Layout>
  );
}
