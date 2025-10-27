import { TDeliveryOptionType } from "./DeliveryOption/DeliveryOption";

export const DELIVERY_OPTIONS = [
  {
    type: 'pickup' as TDeliveryOptionType,
    title: 'Забрать из винотеки',
    date: 'Сегодня, 25 октября',
    price: 'Бесплатно',
  },
] as const;
