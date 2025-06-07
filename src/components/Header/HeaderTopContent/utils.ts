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
    label: 'Инвестиции',
    href: ROUTES.investments,
  },
] as const;
