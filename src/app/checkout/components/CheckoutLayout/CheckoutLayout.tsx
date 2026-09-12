'use client'

import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { ContentContainer } from "../../../../ui/ContentContainer/ContentContainer";
import { DeliveryMethod } from "../DeliveryMethod/DeliveryMethod";
import { PaymentMethod } from "../PaymentMethod/PaymentMethod";

import cls from './CheckoutLayout.module.scss';
import { TDeliveryOptionType } from "../DeliveryMethod/DeliveryOption/DeliveryOption";
import { TPaymentOptionType } from "../PaymentMethod/PaymentOption/PaymentOption";
import { createObjectUpdater } from "../../../../utils/createUpdaters";
import { CustomerInfo } from "../CustomerInfo/CustomerInfo";
import { OrderSummary } from "../../../../components/OrderSummary/OrderSummary";
// TODO: промокоды временно скрыты из UI, см. Promocode.tsx
// import { Promocode } from "../Promocode/Promocode";
import { PickupFromStore } from "../PickupFromStore/PickupFromStore";
import { useCheckout } from "../../../../hooks/checkout/useCheckout";
import { basketIsEmptySelector } from "../../../../store/basket/selectors";
import { authCustomerSelector } from "../../../../store/auth/selectors";
import { ROUTES } from '../../../../constants/routes';
import { getProfile, updateProfile } from '@/services/customer/requests';
import { getCustomerDisplayName } from '@/services/customer/utils';

import { normalizeCustomerName, normalizeCustomerPhone, validateCustomerName, validateCustomerPhone } from '../CustomerInfo/validation';

interface ISelectedStore {
  id: number;
  name: string;
  address: string;
  workingHours: string;
}

interface ICheckoutFormState {
  deliveryMethod: TDeliveryOptionType;
  paymentMethod: TPaymentOptionType;
  customerName: string;
  customerPhone: string;
  selectedStore?: ISelectedStore;
  pickupDate?: Date;
}

export const CheckoutLayout: React.FC = () => {
  const router = useRouter();
  const authCustomer = useSelector(authCustomerSelector);
  const isBasketEmpty = useSelector(basketIsEmptySelector);
  const { checkout, isSubmitting, error: checkoutError } = useCheckout();

  const [formState, setFormState] = React.useState<ICheckoutFormState>({
    deliveryMethod: 'pickup',
    paymentMethod: 'onsite',
    customerName: authCustomer ? getCustomerDisplayName(authCustomer) : '',
    customerPhone: '',
    selectedStore: undefined,
    pickupDate: new Date(),
  });

  // Раньше эти поля считались "уже заполненными" (и профильные данные
  // отбрасывались) по одному признаку — непустой строке. Но имя изначально
  // синхронно берётся из authCustomer (данные логина, без отчества — там
  // только firstName/secondName), поэтому оно непустое ещё до этого эффекта,
  // и полное имя с отчеством из getProfile() ниже отбрасывалось всегда, а не
  // изредка. Флаги ниже отличают "это заполнил пользователь" от "это подставили
  // мы сами", чтобы более полные данные из профиля могли дозаполнить поле.
  const isNameEditedRef = React.useRef(false);
  const isPhoneEditedRef = React.useRef(false);

  // "Тронуто" — показываем ошибку у конкретного поля только после того, как
  // пользователь из него ушёл (или уже пытался отправить форму), а не сразу
  // при пустом поле, в которое ещё никто не заходил.
  const nameRef = React.useRef<HTMLInputElement>(null);
  const phoneRef = React.useRef<HTMLInputElement>(null);
  const [touched, setTouched] = React.useState({ name: false, phone: false });

  React.useEffect(() => {
    if (!authCustomer?.id) return;

    getProfile()
      .then((profile) => {
        setFormState((prev) => {
          const displayName = getCustomerDisplayName(profile);
          return {
            ...prev,
            customerName: isNameEditedRef.current ? prev.customerName : (displayName || prev.customerName),
            customerPhone: isPhoneEditedRef.current ? prev.customerPhone : (profile.phone || prev.customerPhone),
          };
        });
      })
      .catch(() => {});
  }, [authCustomer?.id]);

  React.useEffect(() => {
    if (isBasketEmpty) {
      router.replace(ROUTES.basket);
    }
  }, [isBasketEmpty, router]);

  const formUpdater = createObjectUpdater(setFormState);

  const nameValidationError = validateCustomerName(formState.customerName);
  const phoneValidationError = validateCustomerPhone(formState.customerPhone);
  const isNameValid = !nameValidationError;
  const isPhoneValid = !phoneValidationError;

  const isFormValid =
    !!formState.selectedStore &&
    !!formState.pickupDate &&
    isNameValid &&
    isPhoneValid;

  // Ошибки имени/телефона теперь показываются прямо у полей (см. CustomerInfo
  // ниже) — здесь остаётся только то, к чему нет отдельного текстового поля
  // для инлайн-подсказки.
  const validationHints: string[] = [];
  if (!formState.selectedStore) validationHints.push('выберите винотеку');
  if (!formState.pickupDate) validationHints.push('выберите дату получения');

  const nameError = touched.name ? nameValidationError : undefined;
  const phoneError = touched.phone ? phoneValidationError : undefined;

  const handleSubmit = () => {
    if (isSubmitting) return;
    setTouched({ name: true, phone: true });
    if (!isNameValid || !isPhoneValid) {
      const field = !isNameValid ? nameRef.current : phoneRef.current;
      field?.focus();
      field?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }
    if (!formState.selectedStore || !isFormValid || !formState.pickupDate) return;

    const customerName = normalizeCustomerName(formState.customerName);
    const customerPhone = normalizeCustomerPhone(formState.customerPhone);
    updateProfile({ phone: customerPhone }).catch(() => {});

    checkout(formState.selectedStore.id, {
      customerName,
      customerPhone,
      pickupDate: formState.pickupDate.toISOString().split('T')[0],
      paymentMethod: formState.paymentMethod,
    });
  };

  return (
    <ContentContainer className={cls.container}>
      <div className={cls.registrationInfo}>
        <DeliveryMethod
          selectedType={formState.deliveryMethod}
          onSelectType={(type) => formUpdater('deliveryMethod', type)}
        />

        <PickupFromStore
          selectedStore={formState.selectedStore}
          onStoreSelect={(store) => formUpdater('selectedStore', store)}
          selectedDate={formState.pickupDate}
          onDateSelect={(date) => formUpdater('pickupDate', date)}
        />

        <PaymentMethod
          selectedType={formState.paymentMethod}
          onSelectType={(type) => formUpdater('paymentMethod', type)}
        />

        <CustomerInfo
          nameRef={nameRef}
          phoneRef={phoneRef}
          onSubmit={handleSubmit}
          name={formState.customerName}
          phone={formState.customerPhone}
          nameError={nameError}
          phoneError={phoneError}
          onChangeName={(value) => {
            isNameEditedRef.current = true;
            formUpdater('customerName', value);
          }}
          onChangePhone={(value) => {
            isPhoneEditedRef.current = true;
            formUpdater('customerPhone', value);
          }}
          onBlurName={() => {
            formUpdater('customerName', normalizeCustomerName(formState.customerName));
            setTouched((prev) => ({ ...prev, name: true }));
          }}
          onBlurPhone={() => {
            formUpdater('customerPhone', normalizeCustomerPhone(formState.customerPhone));
            setTouched((prev) => ({ ...prev, phone: true }));
          }}
        />
      </div>
      <div className={cls.orderInfo}>
        <OrderSummary
          actionText="Оформить заказ"
          onActionClick={handleSubmit}
          isActionLoading={isSubmitting}
          isActionDisabled={isSubmitting}
        />
        {!isFormValid && validationHints.length > 0 && (
          <p className={cls.validationHint}>Чтобы оформить заказ: {validationHints.join(', ')}.</p>
        )}
        {checkoutError && (
          <p className={cls.errorMessage}>Не удалось оформить заказ. Попробуйте ещё раз.</p>
        )}
        {/* TODO: промокоды временно скрыты из UI, см. Promocode.tsx */}
        {/* <Promocode /> */}
      </div>
    </ContentContainer>
  );
};