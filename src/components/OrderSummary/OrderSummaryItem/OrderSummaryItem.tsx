import clsx from 'clsx';
import cls from './OrderSummaryItem.module.scss';

export interface IOrderSummaryItemProps {
  label: string;
  value: string;
  isValueRed?: boolean;
}

export const OrderSummaryItem: React.FC<IOrderSummaryItemProps> = ({ label, value, isValueRed }) => {
  return (
    <div className={cls.item}>
      <p className={cls.itemLabel}>{label}</p>
      <p className={clsx(cls.itemValue, {
        [cls.itemValueRed]: isValueRed,
      })}
      >
        {value}
      </p>
    </div>
  );
};


