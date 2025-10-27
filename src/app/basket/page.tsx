import { Layout } from '@/ui/Layout/Layout';
import { HeaderTitle } from '../../ui/HeaderTitle/HeaderTitle';
import { BasketLayout } from './components/BasketLayout/BasketLayout';

export default async function BasketPage() {
  return (
    <Layout backgroundTheme='gray'>
      <HeaderTitle title="Корзина" />
      <BasketLayout />
    </Layout>
  );
}
