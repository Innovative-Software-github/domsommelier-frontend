import { formatPrice } from '../../../../../../utils/formatPrice';
import cls from './BasketSummaryTotal.module.scss';

export interface IBasketSummaryTotalProps {
  totalPrice: number;
}

export const BasketSummaryTotal: React.FC<IBasketSummaryTotalProps> = ({
  totalPrice,
}) => {
  return (
    <div className={cls.total}>
      <p className={cls.totalLabel}>Итого</p>
      <p className={cls.totalPrice}>
        {formatPrice(totalPrice)} ₽
      </p>
    </div>
  );
};