import { IRoute, routes } from "../../../../constants/routes/routes";

export const footerNavigationRoutes: IRoute[] = [
  {
    label: routes.catalog.label,
    href: routes.catalog.children?.wine.href!,
  },
  routes.about,
  routes.events,
  routes.contacts,
  routes.degustation,
  routes.investments,
];