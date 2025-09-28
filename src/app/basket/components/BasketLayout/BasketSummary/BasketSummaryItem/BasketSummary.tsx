import clsx from 'clsx';
import cls from './BasketSummary.module.scss';

export interface IBasketSummaryItemProps {
  label: string;
  value: string;
  isValueRed?: boolean;
}

export const BasketSummaryItem: React.FC<IBasketSummaryItemProps> = ({ label, value, isValueRed }) => {
  return (
    <div className={cls.item}>
      <p className={cls.itemLabel}>{label}</p>
      <p className={clsx(cls.itemValue, {
        [cls.itemValueRed]: isValueRed,
        })}
      >
        {value} ₽
      </p>
    </div>
  );
};
