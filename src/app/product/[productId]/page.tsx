import { TDrinkType } from '../../../constants/routes/catalogRoutes';
import { ContentContainer } from '../../../ui/ContentContainer/ContentContainer';
import { Layout } from '../../../ui/Layout/Layout';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: TDrinkType }>;
}) {
  const { productId } = await params;

  return (
    <Layout>
      <ContentContainer>
        <div className=""></div>
      </ContentContainer>
    </Layout>
  );
}
