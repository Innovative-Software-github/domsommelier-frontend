import { PRODUCT_TYPES_SEGMENTS, ROUTES } from '../../../../constants/routes';

export const footerNavigationRoutes = [
  {
    label: 'Каталог',
    href: PRODUCT_TYPES_SEGMENTS.wine,
  },
  {
    label: 'О нас',
    href: ROUTES.about,
  },
  {
    label: 'Мероприятия',
    href: ROUTES.events,
  },
  {
    label: 'Контакты',
    href: ROUTES.contacts,
  },
  {
    label: 'Дегустации',
    href: ROUTES.degustation,
  },
  {
    label: 'Инвестиции',
    href: ROUTES.investments,
  },
] as const;
