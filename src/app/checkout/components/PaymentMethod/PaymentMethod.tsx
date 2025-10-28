import { BlockContainer } from '../../../../ui/BlockContainer/BlockContainer';

import cls from './PaymentMethod.module.scss';
import { PaymentOption, TPaymentOptionType } from './PaymentOption/PaymentOption';
import { PAYMENT_OPTIONS } from './utils';

export interface IPaymentMethodProps {
  selectedType: TPaymentOptionType;
  onSelectType: (type: TPaymentOptionType) => void;
}

export const PaymentMethod: React.FC<IPaymentMethodProps> = ({
  selectedType,
  onSelectType,
}) => {
  return (
    <BlockContainer>
      <h2 className={cls.title}>Способ оплаты</h2>

      <div className={cls.paymentOptions}>
        {PAYMENT_OPTIONS.map((option: typeof PAYMENT_OPTIONS[number]) => (
          <PaymentOption
            key={option.type}
            {...option}
            selected={selectedType === option.type}
            onSelect={() => onSelectType(option.type)}
          />
        ))}
      </div>
    </BlockContainer>
  )
}


