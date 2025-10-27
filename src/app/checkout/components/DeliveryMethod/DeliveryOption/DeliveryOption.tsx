import { MethodContainer } from '../../../ui/MethodContainer/MethodContainer';
import cls from './DeliveryOption.module.scss';

export type TDeliveryOptionType = 'pickup';

export interface IDeliveryOptionProps {
  type: TDeliveryOptionType;
  title: string;
  date: string;
  price: string;
  selected: boolean;
  onSelect: () => void;
}

export const DeliveryOption: React.FC<IDeliveryOptionProps> = ({
  type,
  title,
  date,
  price,
  selected,
  onSelect,
}) => {
  return (
    <MethodContainer selected={selected} onSelect={onSelect}>
      <div className={cls.title}>{title}</div>
      <div className={cls.date}>{date}</div>
      <div className={cls.price}>{price}</div>
    </MethodContainer>
  )
}