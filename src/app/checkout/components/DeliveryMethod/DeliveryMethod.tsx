import { BlockContainer } from '../../../../ui/BlockContainer/BlockContainer';

import cls from './DeliveryMethod.module.scss';
import { DeliveryOption, TDeliveryOptionType } from './DeliveryOption/DeliveryOption';

export interface IDeliveryMethodProps {
  selectedType: TDeliveryOptionType;
  onSelectType: (type: TDeliveryOptionType) => void;
}

export const DeliveryMethod: React.FC<IDeliveryMethodProps> = ({
  selectedType,
  onSelectType,
}) => {

  return (
    <BlockContainer>
      <h2 className={cls.title}>Способ получения</h2>

      <div className={cls.deliveryOptions}>
        <DeliveryOption
          type="pickup"
          title="Забрать из винотеки"
          date="Сегодня, 25 октября"
          price="Бесплатно"
          selected={selectedType === 'pickup'}
          onSelect={() => onSelectType('pickup')}
        />
      </div>
    </BlockContainer>
  )
}