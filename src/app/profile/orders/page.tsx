import { Layout } from '@/ui/Layout/Layout';
import { HeaderTitle } from '@/ui/HeaderTitle/HeaderTitle';
import { AuthGuard } from '@/components/AuthModal/AuthGuard';
import { OrdersLayout } from './components/OrdersLayout/OrdersLayout';

export default function ProfileOrdersPage() {
  return (
    <Layout backgroundTheme="gray">
      <AuthGuard>
        <HeaderTitle title="Мои заказы" />
        <OrdersLayout />
      </AuthGuard>
    </Layout>
  );
}
