import { BlockContainer } from '../../../../ui/BlockContainer/BlockContainer';

import cls from './DeliveryMethod.module.scss';
import { DeliveryOption, TDeliveryOptionType } from './DeliveryOption/DeliveryOption';
import { getDeliveryOptions } from './utils';

export interface IDeliveryMethodProps {
  selectedType: TDeliveryOptionType;
  onSelectType: (type: TDeliveryOptionType) => void;
  pickupDate?: Date;
}

export const DeliveryMethod: React.FC<IDeliveryMethodProps> = ({
  selectedType,
  onSelectType,
  pickupDate,
}) => {
  const deliveryOptions = getDeliveryOptions(pickupDate);

  return (
    <BlockContainer>
      <h2 className={cls.title}>Способ получения</h2>

      <div className={cls.deliveryOptions}>
        {deliveryOptions.map((option) => (
          <DeliveryOption
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