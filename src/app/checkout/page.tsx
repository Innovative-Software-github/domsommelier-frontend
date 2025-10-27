import { Layout } from '@/ui/Layout/Layout';
import { ContentContainer } from '@/ui/ContentContainer/ContentContainer';
import { HeaderTitle } from '../../ui/HeaderTitle/HeaderTitle';
import { CheckoutLayout } from './components/CheckoutLayout/CheckoutLayout';

export default async function SearchPage() {
  return (
    <Layout backgroundTheme='gray'>
      <ContentContainer>
        <HeaderTitle title="Оформление заказа" />
        <CheckoutLayout />
      </ContentContainer>
    </Layout>
  );
}
