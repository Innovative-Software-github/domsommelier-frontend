import { ContentContainer } from '../../../ui/ContentContainer/ContentContainer';
import { Layout } from '../../../ui/Layout/Layout';
import { ProductInformationContainer } from '../components/ProductInformationContainer/ProductInformationContainer';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: number }>;
}) {
  const { productId } = await params;

  return (
    <Layout>
      <ContentContainer>
        <ProductInformationContainer />
      </ContentContainer>
    </Layout>
  );
}
