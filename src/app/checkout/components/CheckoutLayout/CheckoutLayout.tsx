'use client'

import React from "react";
import { ContentContainer } from "../../../../ui/ContentContainer/ContentContainer";
import { DeliveryMethod } from "../DeliveryMethod/DeliveryMethod";

import cls from './CheckoutLayout.module.scss';
import { TDeliveryOptionType } from "../DeliveryMethod/DeliveryOption/DeliveryOption";
import { createObjectUpdater } from "../../../../utils/createUpdaters";

export const CheckoutLayout: React.FC = () => {
  const [checkoutResponse, setCheckoutResponse] = React.useState<{ deliveryMethod: TDeliveryOptionType }>({
    deliveryMethod: 'pickup',
  });

  const checkoutResponseUpdater = createObjectUpdater(setCheckoutResponse);

  return (
    <ContentContainer className={cls.container}>
      <DeliveryMethod
        selectedType={checkoutResponse.deliveryMethod}
        onSelectType={(type) => checkoutResponseUpdater('deliveryMethod', type)}
      />
    </ContentContainer>
  );
};