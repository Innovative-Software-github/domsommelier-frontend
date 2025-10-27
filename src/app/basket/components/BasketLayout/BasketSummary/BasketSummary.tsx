'use client';

import { useSelector } from 'react-redux';
import { basketTotalPriceSelector, basketDiscountSelector, basketDiscountedPriceSelector } from '../../../../../store/basket/selectors';
import cls from './BasketSummary.module.scss';
import { BasketSummaryItem } from './BasketSummaryItem/BasketSummary';
import { BasketSummaryTotal } from './BasketSummaryTotal/BasketSummaryTotal';
import { formatPrice } from '../../../../../utils/formatPrice';
import { Button } from '../../../../../ui/Button/Button';
import { ROUTES } from '../../../../../constants/routes';

export const BasketSummary: React.FC = () => {
  const totalPrice = useSelector(basketTotalPriceSelector);
  const discount = useSelector(basketDiscountSelector);
  const discountedPrice = useSelector(basketDiscountedPriceSelector);

  return (
    <div className={cls.container}>
      <h1 className={cls.title}>Ваш заказ</h1>
      <BasketSummaryItem 
        label="Товары" 
        value={`${formatPrice(totalPrice)} ₽`} 
      />
      {discount > 0 && (
        <BasketSummaryItem 
          label="Скидка" 
          value={`- ${formatPrice(discount)} ₽`} 
          isValueRed 
        />
      )}
      <BasketSummaryTotal 
        totalPrice={discountedPrice}
      />
      <Button
        className={cls.button}
        href={ROUTES.checkout}
      >
        Перейти к оформлению
      </Button>
    </div>
  );
};