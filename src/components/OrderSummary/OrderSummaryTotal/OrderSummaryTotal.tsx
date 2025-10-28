import { formatPrice } from '../../../utils/formatPrice';
import cls from './OrderSummaryTotal.module.scss';

export interface IOrderSummaryTotalProps {
  totalPrice: number;
}

export const OrderSummaryTotal: React.FC<IOrderSummaryTotalProps> = ({
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


