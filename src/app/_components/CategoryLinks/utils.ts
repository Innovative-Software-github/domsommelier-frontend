import { routes } from '../../../constants/routes/routes';
import { ICategoryLink } from './CategoryLink/CategoryLink';

const catalog = routes.catalog.children!;

export const categoryLinksList: readonly ICategoryLink[] = [
  {
    label: 'Вино',
    href: catalog.wine.href,
  },
  {
    label: 'Крепкие напитки',
    href: catalog['strong-drinks'].href,
  },
  {
    label: 'Шампанское и игристые вина',
    href: catalog.champagne.href,
  },
  {
    label: 'Слабоалкогольные напитки',
    href: catalog['low-alcohol'].href,
  },
  {
    label: 'Закуски',
    href: catalog.snacks.href,
  },
  {
    label: 'Аксессуары',
    href: catalog.accessories.href,
  },
] as const;
