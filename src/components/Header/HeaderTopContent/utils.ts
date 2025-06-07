import { IRoute, routes } from '@/constants/routes';

const createLink = (route: IRoute) => ({
  label: route.label,
  href: route.href,
});

export const headerTopContentLinks = [
  createLink(routes.about),
  createLink(routes.events),
  createLink(routes.investments),
] as const;
