import { BlockContainer } from '../../../../ui/BlockContainer/BlockContainer';
import { Input } from '../../../../ui/Input/Input';

import cls from './CustomerInfo.module.scss';

export interface ICustomerInfoProps {
  nameRef?: React.Ref<HTMLInputElement>;
  phoneRef?: React.Ref<HTMLInputElement>;
  onSubmit?: () => void;
  name: string;
  phone: string;
  nameError?: string;
  phoneError?: string;
  onChangeName: (value: string) => void;
  onChangePhone: (value: string) => void;
  onBlurName?: () => void;
  onBlurPhone?: () => void;
}

export const CustomerInfo: React.FC<ICustomerInfoProps> = ({
  nameRef,
  phoneRef,
  onSubmit,
  name,
  phone,
  nameError,
  phoneError,
  onChangeName,
  onChangePhone,
  onBlurName,
  onBlurPhone,
}) => {
  return (
    <BlockContainer>
      <h2 className={cls.title}>Информация о покупателе</h2>

      <div className={cls.customerInfo}>
        <div className={cls.field}>
          <label htmlFor="checkout-customer-name">
            Имя и фамилия <span aria-hidden="true">*</span>
          </label>
          <Input
            ref={nameRef}
            id="checkout-customer-name"
            name="customerName"
            autoComplete="name"
            required
            onPressEnter={(event) => {
              event.preventDefault();
              onSubmit?.();
            }}
            theme="gray"
            placeholder="Иван Иванов"
            value={name}
            errorText={nameError}
            onChange={(e) => onChangeName(e.target.value)}
            onBlur={onBlurName}
          />
        </div>
        <div className={cls.field}>
          <label htmlFor="checkout-customer-phone">
            Номер телефона <span aria-hidden="true">*</span>
          </label>
          <Input
            ref={phoneRef}
            id="checkout-customer-phone"
            name="customerPhone"
            autoComplete="tel"
            inputMode="tel"
            required
            onPressEnter={(event) => {
              event.preventDefault();
              onSubmit?.();
            }}
            theme="gray"
            placeholder="+7 (912) 345-67-89"
            type="tel"
            value={phone}
            errorText={phoneError}
            onChange={(e) => onChangePhone(e.target.value)}
            onBlur={onBlurPhone}
          />
        </div>
      </div>
    </BlockContainer>
  );
};
