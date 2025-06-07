import { routes } from '../../../constants/routes';
import { ICategoryLink } from './CategoryLink/CategoryLink';

const catalog = routes.catalog.children!;

export const categoryLinksList: readonly ICategoryLink[] = [
  {
    label: catalog.wine.label,
    href: catalog.wine.href,
  },
  {
    label: catalog['strong-drinks'].label,
    href: catalog['strong-drinks'].href,
  },
  {
    label: catalog.champagne.label,
    href: catalog.champagne.href,
  },
  {
    label: catalog['low-alcohol'].label,
    href: catalog['low-alcohol'].href,
  },
  {
    label: catalog.snacks.label,
    href: catalog.snacks.href,
  },
  {
    label: catalog.accessories.label,
    href: catalog.accessories.href,
  },
] as const;
