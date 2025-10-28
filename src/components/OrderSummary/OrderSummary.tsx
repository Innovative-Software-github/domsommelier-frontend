'use client';

import { useSelector } from 'react-redux';
import { basketTotalPriceSelector, basketDiscountSelector, basketDiscountedPriceSelector } from '../../store/basket/selectors';
import cls from './OrderSummary.module.scss';
import { OrderSummaryItem } from './OrderSummaryItem/OrderSummaryItem';
import { formatPrice } from '../../utils/formatPrice';
import { Button } from '../../ui/Button/Button';
import { ROUTES } from '../../constants/routes';
import { OrderSummaryTotal } from './OrderSummaryTotal/OrderSummaryTotal';

export interface IOrderSummaryProps {
  actionHref?: string;
  actionText: string;
}

export const OrderSummary: React.FC<IOrderSummaryProps> = ({
  actionHref = ROUTES.checkout,
  actionText,
}) => {
  const totalPrice = useSelector(basketTotalPriceSelector);
  const discount = useSelector(basketDiscountSelector);
  const discountedPrice = useSelector(basketDiscountedPriceSelector);

  return (
    <div className={cls.container}>
      <h1 className={cls.title}>Ваш заказ</h1>

      <OrderSummaryItem
        label="Товары"
        value={`${formatPrice(totalPrice)} ₽`}
      />

      {discount > 0 && (
        <OrderSummaryItem
          label="Скидка"
          value={`- ${formatPrice(discount)} ₽`}
          isValueRed
        />
      )}

      <OrderSummaryTotal
        totalPrice={discountedPrice}
      />

      <Button
        className={cls.button}
        href={actionHref}
      >
        {actionText}
      </Button>
    </div>
  );
};


