import { TPaymentOptionType } from './PaymentOption/PaymentOption';

export const PAYMENT_OPTIONS = [
  {
    type: 'onsite' as TPaymentOptionType,
    title: 'При получении',
    description: 'Наличными или картой в винотеке',
  },
] as const;


