import { BlockContainer } from '../../../../ui/BlockContainer/BlockContainer';
import { Input } from '../../../../ui/Input/Input';

import cls from './CustomerInfo.module.scss';

export interface ICustomerInfoProps {
  name: string;
  phone: string;
  onChangeName: (value: string) => void;
  onChangePhone: (value: string) => void;
}

export const CustomerInfo: React.FC<ICustomerInfoProps> = ({
  name,
  phone,
  onChangeName,
  onChangePhone,
}) => {
  return (
    <BlockContainer>
      <h2 className={cls.title}>Информация о покупателе</h2>

      <div className={cls.customerInfo}>
        <Input
          theme="gray"
          placeholder="Имя и фамилия"
          value={name}
          onChange={(e) => onChangeName(e.target.value)}
        />

        <Input
          theme="gray"
          placeholder="Номер телефона"
          value={phone}
          onChange={(e) => onChangePhone(e.target.value)}
        />
      </div>
    </BlockContainer>
  )
}