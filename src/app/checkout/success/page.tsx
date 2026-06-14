'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Layout } from '@/ui/Layout/Layout';
import { ContentContainer } from '@/ui/ContentContainer/ContentContainer';
import { Button } from '@/ui/Button/Button';
import { ROUTES, getOrderUrl } from '@/constants/routes';
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
            <Button className={cls.actionButton} href={ROUTES.home}>
              На главную
            </Button>
            {orderId ? (
              <Button
                className={cls.actionButton}
                variant="outlined"
                href={getOrderUrl(orderId)}
                height="H-36"
              >
                Детали заказа
              </Button>
            ) : (
              <Button
                className={cls.actionButton}
                variant="outlined"
                href={ROUTES.profileOrders}
                height="H-36"
              >
                Мои заказы
              </Button>
            )}
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
