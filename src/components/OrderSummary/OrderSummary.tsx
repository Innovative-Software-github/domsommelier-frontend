'use client';

import { useSelector } from 'react-redux';
import {
  basketItemsTotalSelector,
  basketSaleDiscountSelector,
  basketPersonalDiscountPercentSelector,
  basketPersonalDiscountSelector,
  basketPromoDiscountSelector,
  basketPayableTotalSelector,
} from '../../store/basket/selectors';
import cls from './OrderSummary.module.scss';
import { OrderSummaryItem } from './OrderSummaryItem/OrderSummaryItem';
import { formatPrice } from '../../utils/formatPrice';
import { Button } from '../../ui/Button/Button';
import { ROUTES } from '../../constants/routes';
import { OrderSummaryTotal } from './OrderSummaryTotal/OrderSummaryTotal';

export interface IOrderSummaryProps {
  actionHref?: string;
  actionText: string;
  onActionClick?: () => void;
  isActionLoading?: boolean;
  isActionDisabled?: boolean;
}

export const OrderSummary: React.FC<IOrderSummaryProps> = ({
  actionHref = ROUTES.checkout,
  actionText,
  onActionClick,
  isActionLoading,
  isActionDisabled,
}) => {
  const itemsTotal = useSelector(basketItemsTotalSelector);
  const saleDiscount = useSelector(basketSaleDiscountSelector);
  const personalPercent = useSelector(basketPersonalDiscountPercentSelector);
  const personalDiscount = useSelector(basketPersonalDiscountSelector);
  const promoDiscount = useSelector(basketPromoDiscountSelector);
  const payableTotal = useSelector(basketPayableTotalSelector);

  return (
    <div className={cls.container}>
      <h1 className={cls.title}>Ваш заказ</h1>

      <OrderSummaryItem
        label="Товары"
        value={`${formatPrice(itemsTotal)} ₽`}
      />

      {saleDiscount > 0 && (
        <OrderSummaryItem
          label="Скидка по акции"
          value={`- ${formatPrice(saleDiscount)} ₽`}
          isValueRed
        />
      )}

      {personalDiscount > 0 && (
        <OrderSummaryItem
          label={`Ваша скидка ${personalPercent}%`}
          value={`- ${formatPrice(personalDiscount)} ₽`}
          isValueRed
        />
      )}

      {promoDiscount > 0 && (
        <OrderSummaryItem
          label="Промокод"
          value={`- ${formatPrice(promoDiscount)} ₽`}
          isValueRed
        />
      )}

      <OrderSummaryTotal
        totalPrice={payableTotal}
      />

      <Button
        className={cls.button}
        href={onActionClick ? undefined : actionHref}
        onClick={onActionClick}
        isLoading={isActionLoading}
        isDisabled={isActionDisabled}
      >
        {actionText}
      </Button>
    </div>
  );
};


