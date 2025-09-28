import { Layout } from '@/ui/Layout/Layout';
import { HeaderTitle } from '../../ui/HeaderTitle/HeaderTitle';
import { BasketLayout } from './components/BasketLayout/BasketLayout';
import cls from './page.module.scss';

export default async function BasketPage() {
  return (
    <Layout>
      <div className={cls.container}>
        <HeaderTitle title="Корзина" />
        <BasketLayout />
      </div>
    </Layout>
  );
}
