export interface IRoute {
  readonly href: string;
  readonly label: string;
}

export type RouteKey =
  | 'catalog'
  | 'about'
  | 'events'
  | 'contacts'
  | 'degustation'
  | 'investments'
  | 'privacyPolicy';

export const routes: Readonly<Record<RouteKey, IRoute>> = {
  catalog: { href: '/catalog', label: 'Каталог' },
  about: { href: '/about', label: 'О нас' },
  events: { href: '/events', label: 'Мероприятия' },
  contacts: { href: '/contacts', label: 'Контакты' },
  degustation: { href: '/degustation', label: 'Дегустации' },
  investments: { href: '/investments', label: 'Инвестиции' },
  privacyPolicy: {
    href: '/privacy-policy',
    label: 'Политика конфендециальности',
  },
};
