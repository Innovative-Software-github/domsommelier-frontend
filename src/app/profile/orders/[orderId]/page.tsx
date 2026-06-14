import { Layout } from '@/ui/Layout/Layout';
import { HeaderTitle } from '@/ui/HeaderTitle/HeaderTitle';
import { AuthGuard } from '@/components/AuthModal/AuthGuard';
import { OrderDetailLayout } from './components/OrderDetailLayout/OrderDetailLayout';

interface IProps {
  params: Promise<{ orderId: string }>;
}

export default async function OrderDetailPage({ params }: IProps) {
  const { orderId } = await params;

  return (
    <Layout backgroundTheme="gray">
      <AuthGuard>
        <HeaderTitle title="Детали заказа" />
        <OrderDetailLayout orderId={orderId} />
      </AuthGuard>
    </Layout>
  );
}
