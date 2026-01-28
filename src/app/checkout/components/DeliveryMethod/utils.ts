import { TDeliveryOptionType } from "./DeliveryOption/DeliveryOption";

export const DELIVERY_OPTIONS = [
  {
    type: 'pickup' as TDeliveryOptionType,
    title: 'Забрать из винотеки',
    description: 'Сегодня, 25 октября',
  },
] as const;
