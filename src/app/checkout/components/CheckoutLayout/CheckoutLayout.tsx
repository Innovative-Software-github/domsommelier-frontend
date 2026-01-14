'use client'

import React from "react";
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

// TODO: Подключить правильный интерфейс когда будем доставать магазины с сервера
interface ISelectedStore {
  id: string;
  name: string;
  address: string;
  workingHours: string;
}

interface ICheckoutResponse {
  deliveryMethod: TDeliveryOptionType;
  paymentMethod: TPaymentOptionType;
  customerName: string;
  customerPhone: string;
  selectedStore?: ISelectedStore;
  pickupDate?: Date;
}

export const CheckoutLayout: React.FC = () => {
  const [checkoutResponse, setCheckoutResponse] = React.useState<ICheckoutResponse>({
    deliveryMethod: 'pickup',
    paymentMethod: 'onsite',
    customerName: '',
    customerPhone: '',
    selectedStore: undefined,
    pickupDate: undefined,
  });

  const checkoutResponseUpdater = createObjectUpdater(setCheckoutResponse);

  return (
    <ContentContainer className={cls.container}>
      <div className={cls.registrationInfo}>
        <DeliveryMethod
          selectedType={checkoutResponse.deliveryMethod}
          onSelectType={(type) => checkoutResponseUpdater('deliveryMethod', type)}
        />

        <PickupFromStore
          selectedStore={checkoutResponse.selectedStore}
          onStoreSelect={(store) => checkoutResponseUpdater('selectedStore', store)}
          selectedDate={checkoutResponse.pickupDate}
          onDateSelect={(date) => checkoutResponseUpdater('pickupDate', date)}
        />

        <PaymentMethod
          selectedType={checkoutResponse.paymentMethod}
          onSelectType={(type) => checkoutResponseUpdater('paymentMethod', type)}
        />

        <CustomerInfo
          name={checkoutResponse.customerName}
          phone={checkoutResponse.customerPhone}
          onChangeName={(value) => checkoutResponseUpdater('customerName', value)}
          onChangePhone={(value) => checkoutResponseUpdater('customerPhone', value)}
        />
      </div>
      <div className={cls.orderInfo}>
        <OrderSummary actionText="Оформить заказ" />
        <Promocode />
      </div>
    </ContentContainer>
  );
};