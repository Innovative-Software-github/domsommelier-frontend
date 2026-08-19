import type { Metadata } from 'next';

import { ContentContainer } from '@/ui/ContentContainer/ContentContainer';
import { Layout } from '@/ui/Layout/Layout';
import { Button } from '@/ui/Button/Button';
import { ROUTES } from '@/constants/routes';

import cls from './not-found.module.scss';

export const metadata: Metadata = {
  // Заголовок сайта уже подставляется шаблоном title.template из layout.tsx
  title: 'Страница не найдена',
};

export default function NotFound() {
  return (
    <Layout backgroundTheme="gray">
      <ContentContainer className={cls.container}>
        <p className={cls.code}>404</p>
        <h1 className={cls.title}>Страница не найдена</h1>
        <p className={cls.subtitle}>
          Возможно, она была удалена, перемещена или адрес введён с ошибкой.
        </p>
        <div className={cls.actions}>
          <Button href={ROUTES.home}>На главную</Button>
          <Button variant="darkOutlined" href={ROUTES.catalog}>
            В каталог
          </Button>
        </div>
      </ContentContainer>
    </Layout>
  );
}
