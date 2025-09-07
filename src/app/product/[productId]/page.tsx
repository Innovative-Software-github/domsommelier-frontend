import { getProductById } from '../../../services/products/requests';
import { ContentContainer } from '../../../ui/ContentContainer/ContentContainer';
import { Layout } from '../../../ui/Layout/Layout';
import { ProductInformationContainer } from './components/ProductInformationContainer/ProductInformationContainer';
import cls from './page.module.scss';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  const product = await getProductById(productId);

  return (
    <Layout footerClassName={cls.footer}>
      <ContentContainer className={cls.container}>
        <ProductInformationContainer product={product} />
      </ContentContainer>
    </Layout>
  );
}
