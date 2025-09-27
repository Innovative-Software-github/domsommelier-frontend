import { Layout } from '@/ui/Layout/Layout';
import { HeaderTitle } from '../../ui/HeaderTitle/HeaderTitle';
import { ContentContainer } from '../../ui/ContentContainer/ContentContainer';
import { BasketClientWrapper } from './components/BasketClientWrapper/BasketClientWrapper';

export default async function BasketPage() {
  return (
    <Layout>
      <HeaderTitle title="Корзина" />
      <ContentContainer>
        <BasketClientWrapper />
      </ContentContainer>
    </Layout>
  );
}
