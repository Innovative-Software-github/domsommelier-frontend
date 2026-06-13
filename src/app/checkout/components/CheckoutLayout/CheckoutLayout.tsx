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
import { ROUTES } from "../../../../constants/routes";

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
  const { checkout, isSubmitting } = useCheckout();

  const [formState, setFormState] = React.useState<ICheckoutFormState>({
    deliveryMethod: 'pickup',
    paymentMethod: 'onsite',
    customerName: authCustomer
      ? `${authCustomer.firstName ?? ''} ${authCustomer.secondName ?? ''}`.trim()
      : '',
    customerPhone: '',
    selectedStore: undefined,
    pickupDate: undefined,
  });

  React.useEffect(() => {
    if (isBasketEmpty) {
      router.replace(ROUTES.basket);
    }
  }, [isBasketEmpty, router]);

  const formUpdater = createObjectUpdater(setFormState);

  const isFormValid =
    !!formState.selectedStore &&
    !!formState.pickupDate &&
    formState.customerName.trim().length > 0 &&
    formState.customerPhone.trim().length > 0;

  const handleSubmit = () => {
    if (!formState.selectedStore || !isFormValid) return;
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
        <Promocode />
      </div>
    </ContentContainer>
  );
};