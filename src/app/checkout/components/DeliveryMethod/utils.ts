import { TDeliveryOptionType } from "./DeliveryOption/DeliveryOption";
import { format, isToday, isTomorrow } from "date-fns";
import { ru } from "date-fns/locale";

// Функция, а не константа: раньше это был `const DELIVERY_OPTIONS = [...]`
// с датой, вычисленной один раз при загрузке модуля — она "замораживалась"
// до полной перезагрузки страницы.
//
// pickupDate — реально выбранная в PickupFromStoreDate дата самовывоза, а не
// всегда "сегодня": раньше описание всегда показывало текущую дату, даже
// если пользователь выбрал другой день из недельного списка.
export const getDeliveryOptions = (pickupDate?: Date) => {
  const date = pickupDate ?? new Date();
  const formattedDate = format(date, 'd MMMM', { locale: ru });

  const description = isToday(date)
    ? `Сегодня, ${formattedDate}`
    : isTomorrow(date)
      ? `Завтра, ${formattedDate}`
      : formattedDate;

  return [
    {
      type: 'pickup' as TDeliveryOptionType,
      title: 'Забрать из винотеки',
      description,
    },
  ] as const;
};
