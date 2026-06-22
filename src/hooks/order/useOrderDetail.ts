'use client';

import { useCallback, useEffect, useState } from 'react';
import { cancelOrder, getOrderById } from '@/services/orders/requests';
import { getProductById } from '@/services/products/requests';
import { IOrderFull } from '@/services/orders/interfaces';
import { mapOrderItemToProductCard } from '@/utils/order';
import { IOrderDisplayItem } from '@/components/order/OrderProductsList/OrderProductsList';

export interface IUseOrderDetailResult {
  order: IOrderFull | null;
  displayItems: IOrderDisplayItem[];
  isLoading: boolean;
  error: string | null;
  reload: () => void;
  cancel: () => Promise<void>;
  isCancelling: boolean;
  cancelError: string | null;
  cancelSuccess: boolean;
}

/**
 * Загрузка заказа по id + обогащение позиций данными товара (фото),
 * а также отмена заказа. Общая логика для страницы деталей заказа
 * в профиле и страницы подтверждения заказа (checkout/success).
 */
export function useOrderDetail(orderId: string): IUseOrderDetailResult {
  const [order, setOrder] = useState<IOrderFull | null>(null);
  const [displayItems, setDisplayItems] = useState<IOrderDisplayItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);
  const [cancelSuccess, setCancelSuccess] = useState(false);

  const reload = useCallback(() => {
    setIsLoading(true);
    setError(null);
    getOrderById(orderId)
      .then(async (orderData) => {
        const items = await Promise.all(
          orderData.items.map(async (item) => {
            try {
              const product = await getProductById(item.productId);
              return {
                product: mapOrderItemToProductCard(item, product),
                quantity: item.quantity,
                sum: item.sum,
              };
            } catch {
              return {
                product: mapOrderItemToProductCard(item),
                quantity: item.quantity,
                sum: item.sum,
              };
            }
          }),
        );
        setOrder(orderData);
        setDisplayItems(items);
      })
      .catch(() => setError('Не удалось загрузить заказ'))
      .finally(() => setIsLoading(false));
  }, [orderId]);

  useEffect(() => {
    reload();
  }, [reload]);

  const cancel = useCallback(async () => {
    setIsCancelling(true);
    setCancelError(null);
    try {
      await cancelOrder(orderId);
      setOrder((prev) => (prev ? { ...prev, statusName: 'CANCELLED' } : prev));
      setCancelSuccess(true);
    } catch {
      setCancelError('Не удалось отменить заказ. Попробуйте ещё раз.');
    } finally {
      setIsCancelling(false);
    }
  }, [orderId]);

  return {
    order,
    displayItems,
    isLoading,
    error,
    reload,
    cancel,
    isCancelling,
    cancelError,
    cancelSuccess,
  };
}
