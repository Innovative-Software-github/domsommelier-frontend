import { TDeliveryOptionType } from "./DeliveryOption/DeliveryOption";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

export const DELIVERY_OPTIONS = [
  {
    type: 'pickup' as TDeliveryOptionType,
    title: 'Забрать из винотеки',
    description: `Сегодня, ${format(new Date(), 'd MMMM', { locale: ru })}`,
  },
] as const;
