import { Layout } from '@/ui/Layout/Layout';
import { ContentContainer } from '@/ui/ContentContainer/ContentContainer';
import { HeaderTitle } from '../../ui/HeaderTitle/HeaderTitle';
import { CheckoutLayout } from './components/CheckoutLayout/CheckoutLayout';
import { AuthGuard } from '@/components/AuthModal/AuthGuard';

export default async function CheckoutPage() {
  return (
    <Layout backgroundTheme='gray'>
      <AuthGuard>
        <ContentContainer>
          <HeaderTitle title="Оформление заказа" />
          <CheckoutLayout />
        </ContentContainer>
      </AuthGuard>
    </Layout>
  );
}
