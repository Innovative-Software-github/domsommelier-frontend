import { ROUTES } from '@/constants/routes';

export const headerTopContentLinks = [
  {
    label: 'О нас',
    href: ROUTES.about,
  },
  {
    label: 'Мероприятия',
    href: ROUTES.events,
  },
  {
    label: 'Частные мероприятия',
    href: ROUTES.privateEvents,
  },
] as const;
