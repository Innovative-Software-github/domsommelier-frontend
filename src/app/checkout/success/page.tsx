'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Layout } from '@/ui/Layout/Layout';
import { ContentContainer } from '@/ui/ContentContainer/ContentContainer';
import { Button } from '@/ui/Button/Button';
import { ROUTES } from '@/constants/routes';
import { CheckoutSuccessLayout } from './components/CheckoutSuccessLayout/CheckoutSuccessLayout';
import cls from './CheckoutSuccess.module.scss';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  if (!orderId) {
    return (
      <Layout backgroundTheme="gray">
        <ContentContainer>
          <div className={cls.fallback}>
            <h1 className={cls.fallbackTitle}>Заказ оформлен!</h1>
            <p className={cls.fallbackSubtitle}>
              Спасибо за покупку. Мы ждём вас в винотеке.
            </p>
            <div className={cls.fallbackActions}>
              <Button className={cls.fallbackButton} href={ROUTES.catalog}>
                Продолжить покупки
              </Button>
              <Button
                className={cls.fallbackButton}
                variant="outlined"
                href={ROUTES.profileOrders}
                height="H-48"
              >
                Мои заказы
              </Button>
            </div>
          </div>
        </ContentContainer>
      </Layout>
    );
  }

  return (
    <Layout backgroundTheme="gray">
      <ContentContainer>
        <CheckoutSuccessLayout orderId={orderId} />
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
