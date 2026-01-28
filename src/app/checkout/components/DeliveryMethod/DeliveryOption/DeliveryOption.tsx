import { MethodContainer } from '../../../ui/MethodContainer/MethodContainer';
import cls from './DeliveryOption.module.scss';

export type TDeliveryOptionType = 'pickup';

export interface IDeliveryOptionProps {
  type: TDeliveryOptionType;
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}

export const DeliveryOption: React.FC<IDeliveryOptionProps> = ({
  type,
  title,
  description,
  selected,
  onSelect,
}) => {
  return (
    <MethodContainer selected={selected} onSelect={onSelect}>
      <div className={cls.title}>{title}</div>
      <div className={cls.description}>{description}</div>
    </MethodContainer>
  )
}