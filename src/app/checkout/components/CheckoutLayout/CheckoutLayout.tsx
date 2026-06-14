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
import { Promocode } from "../Promocode/Promocode";
import { PickupFromStore } from "../PickupFromStore/PickupFromStore";
import { useCheckout } from "../../../../hooks/checkout/useCheckout";
import { basketIsEmptySelector } from "../../../../store/basket/selectors";
import { authCustomerSelector } from "../../../../store/auth/selectors";
import { ROUTES } from '../../../../constants/routes';
import { getProfile, updateProfile } from '@/services/customer/requests';
import { getCustomerDisplayName } from '@/services/customer/utils';

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

  React.useEffect(() => {
    if (!authCustomer?.id) return;

    getProfile()
      .then((profile) => {
        setFormState((prev) => {
          const displayName = getCustomerDisplayName(profile);
          return {
            ...prev,
            customerName: prev.customerName.trim() ? prev.customerName : (displayName || prev.customerName),
            customerPhone: prev.customerPhone.trim() ? prev.customerPhone : (profile.phone || prev.customerPhone),
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

  const isPhoneValid = /^(\+7|8|7)?[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/.test(
    formState.customerPhone.trim(),
  );

  const isFormValid =
    !!formState.selectedStore &&
    !!formState.pickupDate &&
    formState.customerName.trim().length > 0 &&
    isPhoneValid;

  const validationHints: string[] = [];
  if (!formState.selectedStore) validationHints.push('выберите винотеку');
  if (!formState.customerName.trim()) validationHints.push('укажите имя');
  if (!isPhoneValid) validationHints.push('укажите корректный номер телефона');

  const handleSubmit = () => {
    if (!formState.selectedStore || !isFormValid) return;
    if (formState.customerPhone.trim()) {
      updateProfile({ phone: formState.customerPhone }).catch(() => {});
    }
    checkout(formState.selectedStore.id);
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
          name={formState.customerName}
          phone={formState.customerPhone}
          onChangeName={(value) => formUpdater('customerName', value)}
          onChangePhone={(value) => formUpdater('customerPhone', value)}
        />
      </div>
      <div className={cls.orderInfo}>
        <OrderSummary
          actionText="Оформить заказ"
          onActionClick={handleSubmit}
          isActionLoading={isSubmitting}
          isActionDisabled={!isFormValid || isSubmitting}
        />
        {!isFormValid && validationHints.length > 0 && (
          <p className={cls.validationHint}>Чтобы оформить заказ: {validationHints.join(', ')}.</p>
        )}
        {checkoutError && (
          <p className={cls.errorMessage}>Не удалось оформить заказ. Попробуйте ещё раз.</p>
        )}
        <Promocode />
      </div>
    </ContentContainer>
  );
};