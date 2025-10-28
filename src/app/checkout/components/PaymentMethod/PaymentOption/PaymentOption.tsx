import { MethodContainer } from '../../../ui/MethodContainer/MethodContainer';
import cls from './PaymentOption.module.scss';

export type TPaymentOptionType = 'onsite';

export interface IPaymentOptionProps {
  type: TPaymentOptionType;
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}

export const PaymentOption: React.FC<IPaymentOptionProps> = ({
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


