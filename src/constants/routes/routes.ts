import { catalogRoutes } from './catalogRoutes';

export type TRouteKey =
  | 'catalog'
  | 'about'
  | 'events'
  | 'contacts'
  | 'degustation'
  | 'investments'
  | 'privacyPolicy'
  | 'search';

export interface IRoute {
  href: string;
  label: string;
  children?: typeof catalogRoutes;
}

export const routes: Readonly<Record<TRouteKey, IRoute>> = {
  catalog: {
    href: '/catalog',
    label: 'Каталог',
    children: catalogRoutes,
  },
  about: { href: '/about', label: 'О нас' },
  events: { href: '/events', label: 'Мероприятия' },
  contacts: { href: '/contacts', label: 'Контакты' },
  degustation: { href: '/degustation', label: 'Дегустации' },
  investments: { href: '/investments', label: 'Инвестиции' },
  privacyPolicy: {
    href: '/privacy-policy',
    label: 'Политика конфендециальности',
  },
  search: { href: '/search', label: 'Поиск' },
} as const;
