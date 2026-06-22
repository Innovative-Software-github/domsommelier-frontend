'use client';

import React, { useState } from 'react';
import { Button } from '@/ui/Button/Button';
import { Spinner } from '@/ui/Spinner/Spinner';
import { ROUTES } from '@/constants/routes';
import { useOrderDetail } from '@/hooks/order/useOrderDetail';
import { OrderProductsList } from '@/components/order/OrderProductsList/OrderProductsList';
import { OrderCancelBlock } from '@/components/order/OrderCancelBlock/OrderCancelBlock';
import { OrderSummaryTotal } from '@/components/OrderSummary/OrderSummaryTotal/OrderSummaryTotal';
import { STATUS_LABELS, PAYMENT_METHOD_LABELS, formatPickupDate } from '@/utils/order';
import cls from './CheckoutSuccessLayout.module.scss';

interface ICheckoutSuccessLayoutProps {
  orderId: string;
}

export const CheckoutSuccessLayout: React.FC<ICheckoutSuccessLayoutProps> = ({
  orderId,
}) => {
  const {
    order,
    displayItems,
    isLoading,
    error,
    reload,
    cancel,
    isCancelling,
    cancelError,
    cancelSuccess,
  } = useOrderDetail(orderId);
  const [showItems, setShowItems] = useState(false);

  if (isLoading) {
    return (
      <div className={cls.loading}>
        <Spinner size="m" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className={cls.errorBox}>
        <p>{error ?? 'Заказ не найден'}</p>
        <div className={cls.errorActions}>
          <Button variant="outlined" height="H-42" onClick={reload}>
            Повторить
          </Button>
          <Button variant="darkOutlined" height="H-42" href={ROUTES.catalog}>
            В каталог
          </Button>
        </div>
      </div>
    );
  }

  const statusLabel = STATUS_LABELS[order.statusName] ?? order.statusName;
  const totalQuantity = order.items.reduce((acc, item) => acc + item.quantity, 0);
  const canCancel = order.statusName === 'NEW';
  const storeAddress = order.storeAddress ?? order.pickupAddress;

  return (
    <div className={cls.layout}>
      <div className={cls.main}>
        {/* Заказ */}
        <section className={cls.card}>
          <h1 className={cls.orderTitle}>
            Заказ №{order.id.slice(0, 8).toUpperCase()}
          </h1>
          <p className={cls.status}>Статус: {statusLabel}</p>

          {cancelSuccess && (
            <p className={cls.cancelSuccess}>Заказ успешно отменён.</p>
          )}

          {!showItems && <p className={cls.quantity}>{totalQuantity} шт.</p>}

          {showItems && (
            <div className={cls.items}>
              <OrderProductsList items={displayItems} />
            </div>
          )}

          <button
            type="button"
            className={cls.toggle}
            onClick={() => setShowItems((prev) => !prev)}
          >
            {showItems ? 'Скрыть состав заказа' : 'Смотреть состав заказа'}
            <span className={cls.toggleIcon} data-open={showItems} />
          </button>
        </section>

        {/* Напоминание про паспорт */}
        <div className={cls.alert}>
          <span className={cls.alertIcon}>!</span>
          <p>Не забудьте взять паспорт, чтобы получить заказ</p>
        </div>

        {/* Самовывоз из винотеки */}
        <section className={cls.card}>
          <h2 className={cls.cardTitle}>Самовывоз из винотеки</h2>
          <div className={cls.infoList}>
            {order.pickupDate && (
              <div className={cls.infoRow}>
                <p className={cls.infoLabel}>Дата получения</p>
                <p className={cls.infoStrong}>{formatPickupDate(order.pickupDate)}</p>
                <p className={cls.infoMuted}>
                  Дождитесь СМС о том, что заказ готов
                </p>
              </div>
            )}

            <div className={cls.infoRow}>
              {order.storeName && (
                <p className={cls.infoStrong}>{order.storeName}</p>
              )}
              {storeAddress && <p className={cls.infoValue}>{storeAddress}</p>}
              {order.storeWorkingHours && (
                <p className={cls.infoMuted}>{order.storeWorkingHours}</p>
              )}
            </div>

            {order.storePhone && (
              <div className={cls.infoRow}>
                <p className={cls.infoLabel}>Телефон винотеки</p>
                <p className={cls.infoValue}>{order.storePhone}</p>
              </div>
            )}
          </div>
        </section>

        {/* Получение и оплата */}
        <section className={cls.card}>
          <h2 className={cls.cardTitle}>Получение и оплата</h2>
          <div className={cls.infoList}>
            {order.customerName && (
              <div className={cls.infoRow}>
                <p className={cls.infoLabel}>Получатель</p>
                <p className={cls.infoValue}>{order.customerName}</p>
              </div>
            )}
            {order.customerPhone && (
              <div className={cls.infoRow}>
                <p className={cls.infoLabel}>Номер телефона</p>
                <p className={cls.infoValue}>{order.customerPhone}</p>
              </div>
            )}
            {order.paymentMethod && (
              <div className={cls.infoRow}>
                <p className={cls.infoLabel}>Способ оплаты</p>
                <p className={cls.infoValue}>
                  {PAYMENT_METHOD_LABELS[order.paymentMethod] ?? order.paymentMethod}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Действия */}
        <div className={cls.actions}>
          <Button className={cls.continueBtn} href={ROUTES.catalog}>
            Продолжить покупки
          </Button>
          {canCancel && (
            <OrderCancelBlock
              isCancelling={isCancelling}
              cancelError={cancelError}
              onCancel={cancel}
            />
          )}
        </div>
      </div>

      <aside className={cls.sidebar}>
        <div className={cls.summary}>
          <h2 className={cls.summaryTitle}>Ваш заказ</h2>
          <OrderSummaryTotal totalPrice={order.totalAmount} />
        </div>
      </aside>
    </div>
  );
};
