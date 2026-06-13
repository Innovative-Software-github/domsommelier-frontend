'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Layout } from '@/ui/Layout/Layout';
import { ContentContainer } from '@/ui/ContentContainer/ContentContainer';
import { Button } from '@/ui/Button/Button';
import { ROUTES } from '@/constants/routes';
import cls from './CheckoutSuccess.module.scss';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <Layout backgroundTheme="gray">
      <ContentContainer>
        <div className={cls.container}>
          <h1 className={cls.title}>Заказ оформлен!</h1>
          <p className={cls.subtitle}>Спасибо за покупку. Мы ждём вас в винотеке.</p>
          {orderId && (
            <p className={cls.orderId}>
              Номер заказа: <strong>{orderId}</strong>
            </p>
          )}
          <div className={cls.actions}>
            <Button href={ROUTES.home}>На главную</Button>
            <Button variant="outlined" href={ROUTES.catalog}>В каталог</Button>
          </div>
        </div>
      </ContentContainer>
    </Layout>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
